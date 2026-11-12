const { createHmac } = require('node:crypto');
const { smsConfigured, messagesUrl, twilioRequest, sendSms } = require('./twilio-sms');
const { addLeadNote } = require('./kommo');

const FOLLOW_UPS = new Map([
  [1, `{{contact.name}}, fick du mitt meddelande?😊`],
  [3, `Hej {{contact.name}}!

Är du fortfarande intresserad av vårt erbjudande på CO2 behandlingar?

Vi har endast 3 platser kvar för detta erbjudandet nu.

Vill du boka en tid? Svara på det här SMS:et så hjälper jag dig.`],
  [4, `Hej

Rania här från Rayn i Helsingborg

Jag ville bara återkoppla då du visat intresse för vår CO2 kampanj.

Vi har nu ett fåtal tider kvar för erbjudandet, är du fortfarande intresserad?

Svara gärna "Ja" så hjälper jag dig vidare.

(OM du inte längre är intresserad får du gärna svara "Nej", så vi vet.)

Vi finns i Helsingborg på Roskildegatan 4

Detta är mitt sista meddelande om kampanjen.

Vänliga hälsningar,
Rania

073-649 76 52`]
]);
const DAY_MS = 86400000;
const TIME_ZONE = 'Europe/Stockholm';
const MAP_NAME = 'rayn-co2-follow-ups';
const dayFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit'
});

function localDay(date) {
  const parts = Object.fromEntries(dayFormat.formatToParts(date).map(({ type, value }) => [type, value]));
  return Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)) / DAY_MS;
}

function followUpsConfigured() {
  return smsConfigured() && Boolean(process.env.CRON_SECRET);
}

function mapsUrl() {
  const service = encodeURIComponent(process.env.TWILIO_FOLLOW_UP_SYNC_SERVICE_SID || 'default');
  return `https://sync.twilio.com/v1/Services/${service}/Maps`;
}

function itemsUrl(key) {
  const suffix = key ? '/' + encodeURIComponent(key) : '';
  return new URL(`${mapsUrl()}/${MAP_NAME}/Items${suffix}`);
}

async function readJson(response, operation) {
  if (!response.ok) throw new Error(`${operation}: HTTP ${response.status}`);
  return response.json();
}

async function createMap() {
  const response = await twilioRequest(mapsUrl(), { UniqueName: MAP_NAME });
  if (!response.ok && response.status !== 409) await readJson(response, 'Create follow-up map');
}

async function enrollFollowUp(phone, contactName, confirmationSid, consentedAt, leadId) {
  if (!followUpsConfigured() || !confirmationSid) return;
  const key = createHmac('sha256', process.env.TWILIO_AUTH_TOKEN).update(phone).digest('hex');
  const data = { confirmationSid, contactName, consentedAt: consentedAt.toISOString(), leadId };
  const fields = { Key: key, Data: JSON.stringify(data), Ttl: '604800' };
  let response = await twilioRequest(itemsUrl(), fields);
  if (response.status === 404) {
    await createMap();
    response = await twilioRequest(itemsUrl(), fields);
  }
  // A repeated submission for the same number must not start another sequence.
  if (!response.ok && response.status !== 409) await readJson(response, 'Create follow-up');
}

async function hasReply(confirmation) {
  const sentAt = Date.parse(confirmation.date_sent);
  const url = messagesUrl();
  url.search = new URLSearchParams({
    From: confirmation.to,
    To: confirmation.from,
    'DateSent>': new Date(sentAt).toISOString().slice(0, 10),
    PageSize: '50'
  });
  let pageUrl = url;
  while (pageUrl) {
    const page = await readJson(await twilioRequest(pageUrl), 'Check SMS replies');
    if (page.messages.some(message => message.direction === 'inbound' &&
      Date.parse(message.date_created) >= sentAt)) return true;
    pageUrl = page.next_page_uri && new URL(page.next_page_uri, url);
  }
  return false;
}

async function updateItem(item, changes) {
  const response = await twilioRequest(itemsUrl(item.key),
    { Data: JSON.stringify({ ...item.data, ...changes }) }, { 'If-Match': item.revision });
  if ([404, 409, 412].includes(response.status)) return false;
  if (!response.ok) await readJson(response, 'Update follow-up');
  return true;
}

async function processItem(item, today) {
  const { contactName, firstName, confirmationSid, consentedAt, lastAttemptDay, replied, scheduleVersion, leadId } = item.data;
  if (replied || lastAttemptDay === today) return 'skipped';
  const enrollmentDay = localDay(new Date(consentedAt));
  const day = today - enrollmentDay;
  const lastAttemptOffset = lastAttemptDay - enrollmentDay;
  // Do not repeat messages already attempted on days 2 or 3 under the old schedule.
  if (!scheduleVersion && ((day === 3 && lastAttemptOffset >= 2) || (day === 4 && lastAttemptOffset >= 3))) {
    return 'skipped';
  }
  const text = FOLLOW_UPS.get(day);
  if (!text) return 'skipped';

  const url = messagesUrl('/' + encodeURIComponent(confirmationSid) + '.json');
  const first = await readJson(await twilioRequest(url), 'Check confirmation delivery');
  if (first.status !== 'delivered' || !first.date_sent || !first.from || !first.to) return 'skipped';
  if (await hasReply(first)) {
    await updateItem(item, { replied: true });
    return 'replied';
  }
  // Claim the day before sending. A request with an ambiguous outcome must not be repeated.
  if (!await updateItem(item, { lastAttemptDay: today, scheduleVersion: 2 })) return 'skipped';
  if (await hasReply(first)) return 'replied';
  const name = contactName || firstName;
  const message = name
    ? text.replace('{{contact.name}}', () => name)
    : text.replace(/^\{\{contact\.name\}\}, f/, 'F').replace('Hej {{contact.name}}!', 'Hej!');
  const body = `${message}\n\nReply STOP to unsubscribe.`;
  const result = await sendSms(first.to, body, first.from);
  if (!result.ok) return 'failed';
  if (leadId) {
    const note = await addLeadNote(leadId, `Morgon-SMS dag ${day} · mottaget av Twilio för utskick\n\n${body}\n\nTwilio-referens: ${result.sid}`);
    if (!note.ok) throw new Error(`Log SMS ${result.sid} on Kommo lead ${leadId}: HTTP ${note.status}`);
  }
  return 'sent';
}

async function runFollowUps(now = new Date()) {
  const today = localDay(now);
  const counts = { sent: 0, replied: 0, skipped: 0, failed: 0 };
  let url = itemsUrl();
  url.searchParams.set('PageSize', '50');
  while (url) {
    let response = await twilioRequest(url);
    if (response.status === 404) {
      await createMap();
      response = await twilioRequest(url);
    }
    const page = await readJson(response, 'List SMS follow-ups');
    for (let index = 0; index < page.items.length; index += 5) {
      const results = await Promise.allSettled(page.items.slice(index, index + 5).map(item => processItem(item, today)));
      for (const result of results) {
        if (result.status === 'fulfilled') counts[result.value] += 1;
        else {
          counts.failed += 1;
          console.error('SMS follow-up processing failed', result.reason.message);
        }
      }
    }
    url = page.meta.next_page_url && new URL(page.meta.next_page_url, url);
  }
  return counts;
}

module.exports = { enrollFollowUp, followUpsConfigured, runFollowUps };
