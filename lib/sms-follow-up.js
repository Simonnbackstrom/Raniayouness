/* ==========================================================================
   Påminnelse-SMS dag 1, 3 och 4 efter intresseanmälan (körs av Vercel cron
   via /api/sms-follow-up, varje morgon).

   Nya anmälningar: påminnelserna skickas av Salesbots i Kommo
   ("CO2 – Påminnelse dag 1/3/4"), så de syns i Kommo Chats i samma
   konversation som bekräftelsen. Texterna ändras i Kommo → Bots.

   Innan en påminnelse skickas kontrolleras i Twilio att:
     - bekräftelsen kom fram till kunden (status delivered)
     - kunden inte har svarat (ett svar, även STOP, stoppar påminnelserna)

   Anmälningar gjorda före bytet till Kommo-bottar (har confirmationSid)
   fortsätter som förut och skickas direkt via Twilio tills de löper ut.
   ========================================================================== */
const { createHmac } = require('node:crypto');
const { smsConfigured, messagesUrl, twilioRequest, sendSms } = require('./twilio-sms');
const { addLeadNote, runSalesbot, BOTS } = require('./kommo');

/* Texter för anmälningar gjorda före bytet till Kommo-bottar */
const LEGACY_FOLLOW_UPS = new Map([
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

/* Anmäler ett nummer till påminnelserna. Bekräftelsen har redan startats i Kommo. */
async function enrollFollowUp(phone, contactName, consentedAt, leadId) {
  if (!followUpsConfigured() || !phone || !leadId) return;
  const key = createHmac('sha256', process.env.TWILIO_AUTH_TOKEN).update(phone).digest('hex');
  const data = { phone, contactName, consentedAt: consentedAt.toISOString(), leadId, sender: 'kommo' };
  const fields = { Key: key, Data: JSON.stringify(data), Ttl: '604800' };
  let response = await twilioRequest(itemsUrl(), fields);
  if (response.status === 404) {
    await createMap();
    response = await twilioRequest(itemsUrl(), fields);
  }
  // A repeated submission for the same number must not start another sequence.
  if (!response.ok && response.status !== 409) await readJson(response, 'Create follow-up');
}

/* Går igenom alla Twilio-meddelanden som matchar filtret och returnerar true om något uppfyller test() */
async function anyMessage(filter, test) {
  const url = messagesUrl();
  url.search = new URLSearchParams({ ...filter, PageSize: '50' });
  let pageUrl = url;
  while (pageUrl) {
    const page = await readJson(await twilioRequest(pageUrl), 'List SMS');
    if (page.messages.some(test)) return true;
    pageUrl = page.next_page_uri && new URL(page.next_page_uri, url);
  }
  return false;
}

function dayParam(sinceMs) {
  return new Date(sinceMs).toISOString().slice(0, 10);
}

/* Kom bekräftelsen (eller något annat utgående SMS) fram till kunden efter anmälan? */
function confirmationDelivered(phone, sinceMs) {
  return anyMessage({ To: phone, 'DateSent>': dayParam(sinceMs) }, (m) =>
    String(m.direction).startsWith('outbound') && m.status === 'delivered' &&
    Date.parse(m.date_created) >= sinceMs);
}

/* Har kunden skickat något SMS till oss efter anmälan? */
function repliedSince(phone, sinceMs) {
  return anyMessage({ From: phone, 'DateSent>': dayParam(sinceMs) }, (m) =>
    m.direction === 'inbound' && Date.parse(m.date_created) >= sinceMs);
}

async function updateItem(item, changes) {
  const response = await twilioRequest(itemsUrl(item.key),
    { Data: JSON.stringify({ ...item.data, ...changes }) }, { 'If-Match': item.revision });
  if ([404, 409, 412].includes(response.status)) return false;
  if (!response.ok) await readJson(response, 'Update follow-up');
  return true;
}

/* Nya anmälningar: påminnelsen skickas av en Kommo-bot och syns i Chats */
async function processKommoItem(item, today) {
  const { phone, consentedAt, lastAttemptDay, replied, leadId } = item.data;
  if (replied || lastAttemptDay === today || !phone || !leadId) return 'skipped';
  const day = today - localDay(new Date(consentedAt));
  const botId = BOTS.followUp[day];
  if (!botId) return 'skipped';

  const sinceMs = Date.parse(consentedAt);
  if (!await confirmationDelivered(phone, sinceMs)) return 'skipped';
  if (await repliedSince(phone, sinceMs)) {
    await updateItem(item, { replied: true });
    return 'replied';
  }
  // Claim the day before sending. A request with an ambiguous outcome must not be repeated.
  if (!await updateItem(item, { lastAttemptDay: today })) return 'skipped';
  if (await repliedSince(phone, sinceMs)) return 'replied';

  const result = await runSalesbot(botId, leadId);
  if (!result.ok) {
    console.error('Kommo salesbot (påminnelse dag ' + day + ')', result.status, JSON.stringify(result.data).slice(0, 300));
    return 'failed';
  }
  return 'sent';
}

/* Anmälningar gjorda före bytet: oförändrad logik, skickas direkt via Twilio */
async function processLegacyItem(item, today) {
  const { contactName, firstName, confirmationSid, consentedAt, lastAttemptDay, replied, scheduleVersion, leadId } = item.data;
  if (replied || lastAttemptDay === today) return 'skipped';
  const enrollmentDay = localDay(new Date(consentedAt));
  const day = today - enrollmentDay;
  const lastAttemptOffset = lastAttemptDay - enrollmentDay;
  // Do not repeat messages already attempted on days 2 or 3 under the old schedule.
  if (!scheduleVersion && ((day === 3 && lastAttemptOffset >= 2) || (day === 4 && lastAttemptOffset >= 3))) {
    return 'skipped';
  }
  const text = LEGACY_FOLLOW_UPS.get(day);
  if (!text) return 'skipped';

  const url = messagesUrl('/' + encodeURIComponent(confirmationSid) + '.json');
  const first = await readJson(await twilioRequest(url), 'Check confirmation delivery');
  if (first.status !== 'delivered' || !first.date_sent || !first.from || !first.to) return 'skipped';
  const sentAt = Date.parse(first.date_sent);
  if (await repliedSince(first.to, sentAt)) {
    await updateItem(item, { replied: true });
    return 'replied';
  }
  if (!await updateItem(item, { lastAttemptDay: today, scheduleVersion: 2 })) return 'skipped';
  if (await repliedSince(first.to, sentAt)) return 'replied';
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

function processItem(item, today) {
  return item.data && item.data.confirmationSid ? processLegacyItem(item, today) : processKommoItem(item, today);
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
