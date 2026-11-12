/* ==========================================================================
   RAYN – Kommo-koppling för intresseformuläret (Vercel-funktion)
   --------------------------------------------------------------------------
   Ligger i /api/kommo.js och publiceras automatiskt av Vercel tillsammans med
   webbplatsen. Adressen blir https://<er-domän>/api/kommo.

   Formulären på /co2/ skickar hit. Funktionen skapar ett lead med kontakt i
   Kommo och lägger en anteckning med allt kunden skrev, plus kampanjkälla.
   Kommo-token ligger som miljövariabel i Vercel, aldrig i webbsidans kod.

   Miljövariabler (Vercel → Project → Settings → Environment Variables):
     KOMMO_SUBDOMAIN         raniayouness                                 (krävs)
     KOMMO_TOKEN             Long-lived token från Kommo                  (krävs)
     KOMMO_PIPELINE_ID       Pipeline där leadet hamnar (valfritt)
     KOMMO_STATUS_ID         Steg i pipelinen (valfritt)
     KOMMO_RESPONSIBLE_USER  Användar-ID som blir ansvarig (valfritt)
     KOMMO_TAGS              Taggar, kommaseparerade (valfritt, standard
                             "Webbformulär,CO2 kampanj")
     ALLOWED_ORIGINS         Extra domäner som får skicka (valfritt). Den egna
                             domänen är alltid tillåten.

   SMS via Twilio (valfritt – utan de tre första skickas inga SMS):
     TWILIO_ACCOUNT_SID           Account SID från Twilio Console (börjar med AC)
     TWILIO_AUTH_TOKEN            Auth Token från Twilio Console
     TWILIO_MESSAGING_SERVICE_SID Messaging Service "RAYN" (börjar med MG)
     RAYN_NOTIFY_PHONE            (valfritt) Ranias mobil, t.ex. +46701234567.
                                  Får ett SMS per nytt lead.
     SMS_TEXT                     (valfritt) SMS-text som har företräde framför Kommo-mallen.

   SMS-TEXTEN ÄNDRAS I KOMMO
     Om SMS_TEXT är tom hämtas mallen "SMS bekräftelse webbformulär" i Kommo.
     Funktionen skapar mallen vid behov. Ändra texten där:
       Kommo → Settings → Chat settings → Templates (Mallar)
     {{contact.name}} eller {namn} byts mot kundens förnamn.
     Finns ingen mall används standardtexten nedan.

   SMS skickas efter att leadet skapats i Kommo. Misslyckas ett SMS loggas
   felet, men leadet och svaret till kunden påverkas inte. Svarar kunden på
   SMS:et hamnar svaret i Kommos chatt via Twilio-integrationen.

   Tar emot: { name, email, phone?, message?, interest?, treatment?,
               form_position?, page?, utm?, fbclid? }
   Kräver e-post eller telefon.
   ========================================================================== */

const { sendSms } = require('../lib/twilio-sms');
const { enrollFollowUp } = require('../lib/sms-follow-up');
const { kommo, addLeadNote } = require('../lib/kommo');
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function clean(v, max) {
  return typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '';
}

function originAllowed(req) {
  const origin = req.headers.origin || '';
  if (!origin) return true; /* samma domän skickar ibland utan Origin */
  let host = '';
  try { host = new URL(origin).host; } catch (e) { return false; }
  if (host === req.headers.host) return true;
  if (/\.vercel\.app$/.test(host) && /^raniayouness/.test(host)) return true; /* förhandsversioner */
  const extra = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return extra.includes(origin);
}

/* Svenskt nummer → E.164 (+46…). Returnerar '' om numret inte ser giltigt ut. */
function toE164(p) {
  let d = String(p || '').replace(/[^\d+]/g, '');
  if (!d) return '';
  if (d.startsWith('00')) d = '+' + d.slice(2);
  else if (d.startsWith('0')) d = '+46' + d.slice(1);
  else if (!d.startsWith('+')) d = '+' + d;
  return /^\+\d{8,15}$/.test(d) ? d : '';
}

const DEFAULT_SMS = 'Hej {{contact.name}}! Tack för din intresseanmälan till RAYN Beauty Spa & Wellness. Vi hör av oss inom kort. Frågor? Ring 073 649 76 52.';
const SMS_OPT_OUT_LINE = 'Reply STOP to unsubscribe.';
const TEMPLATE_EXTERNAL_ID = 'rayn-sms-bekraftelse';
const TEMPLATE_NAME = 'SMS bekräftelse webbformulär';

async function kommoGet(path) {
  const r = await fetch(`https://${process.env.KOMMO_SUBDOMAIN}.kommo.com${path}`, {
    headers: { Authorization: `Bearer ${process.env.KOMMO_TOKEN}` }
  });
  if (r.status === 204) return { ok: true, data: null };
  const text = await r.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
  return { ok: r.ok, status: r.status, data };
}

/* En angiven SMS_TEXT har företräde. Annars hämtas texten från Kommo. */
async function getSmsText() {
  const configuredText = (process.env.SMS_TEXT || '').trim();
  if (configuredText) return configuredText;
  try {
    const found = await kommoGet(`/api/v4/chats/templates?filter[external_id][]=${TEMPLATE_EXTERNAL_ID}&limit=50`);
    const list = found.data && found.data._embedded && found.data._embedded.chat_templates;
    const tpl = Array.isArray(list) && list.find((x) => x.external_id === TEMPLATE_EXTERNAL_ID);
    if (tpl && typeof tpl.content === 'string' && tpl.content.trim()) return tpl.content.trim();
    if (found.ok && !tpl) {
      const made = await kommo('/api/v4/chats/templates', [{
        name: TEMPLATE_NAME, content: DEFAULT_SMS, is_editable: true, type: 'amocrm', external_id: TEMPLATE_EXTERNAL_ID
      }]);
      if (!made.ok) console.error('Kommo skapa mall', made.status, JSON.stringify(made.data).slice(0, 400));
    } else if (!found.ok) {
      console.error('Kommo hämta mall', found.status, JSON.stringify(found.data).slice(0, 400));
    }
  } catch (e) {
    console.error('Kommo mall', e && e.message);
  }
  return DEFAULT_SMS;
}

function fillText(tpl, firstName) {
  const message = tpl
    .replace(/\{\{\s*contact\.name\s*\}\}|\{namn\}/gi, firstName || '')
    .replace(/Hej\s+!/g, 'Hej!')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  return message.endsWith(SMS_OPT_OUT_LINE) ? message : `${message}\n\n${SMS_OPT_OUT_LINE}`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') { res.status(405).send(JSON.stringify({ ok: false, error: 'method' })); return; }
  if (!originAllowed(req)) { res.status(403).send(JSON.stringify({ ok: false, error: 'origin' })); return; }
  if (!process.env.KOMMO_SUBDOMAIN || !process.env.KOMMO_TOKEN) {
    console.error('KOMMO_SUBDOMAIN eller KOMMO_TOKEN saknas i Vercel');
    res.status(500).send(JSON.stringify({ ok: false, error: 'config' })); return;
  }

  let input = req.body;
  if (typeof input === 'string') { try { input = JSON.parse(input); } catch (e) { input = null; } }
  if (!input || typeof input !== 'object') { res.status(400).send(JSON.stringify({ ok: false, error: 'json' })); return; }

  if (input.botcheck) { res.status(200).send(JSON.stringify({ ok: true, lead_id: null })); return; } /* spam */

  const interest = clean(input.interest, 80) || clean(input.treatment, 80) || 'CO2 laser';
  const name = clean(input.name, 120);
  const phone = clean(input.phone, 40);
  const email = clean(input.email, 160).toLowerCase();
  const message = clean(input.message, 2000);
  const page = clean(input.page, 300);
  const followUpConsent = input.sms_follow_up === true && Boolean(phone);
  const consentedAt = new Date();
  const formPosition = clean(input.form_position, 20);
  const utm = {};
  UTM_KEYS.forEach((k) => { const v = clean(input.utm && input.utm[k], 200); if (v) utm[k] = v; });
  const fromMeta = !!input.fbclid;

  const bad = (error) => res.status(422).send(JSON.stringify({ ok: false, error }));
  if (!phone && !email) return bad('contact');
  if (phone && !/^[0-9+() ]{7,}$/.test(phone)) return bad('phone');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('email');

  const contactFields = [];
  if (phone) contactFields.push({ field_code: 'PHONE', values: [{ value: phone, enum_code: 'MOB' }] });
  if (email) contactFields.push({ field_code: 'EMAIL', values: [{ value: email, enum_code: 'WORK' }] });

  const tags = (process.env.KOMMO_TAGS || 'Webbformulär,CO2 kampanj').split(',').map((s) => s.trim()).filter(Boolean);
  if (fromMeta) tags.push('Meta annons');
  const lead = {
    name: `Intresse: ${interest}`,
    _embedded: {
      tags: tags.map((t) => ({ name: t })),
      contacts: [{ first_name: name || 'Okänt namn', custom_fields_values: contactFields }]
    }
  };
  if (process.env.KOMMO_PIPELINE_ID) lead.pipeline_id = Number(process.env.KOMMO_PIPELINE_ID);
  if (process.env.KOMMO_STATUS_ID) lead.status_id = Number(process.env.KOMMO_STATUS_ID);
  if (process.env.KOMMO_RESPONSIBLE_USER) lead.responsible_user_id = Number(process.env.KOMMO_RESPONSIBLE_USER);

  const created = await kommo('/api/v4/leads/complex', [lead]);
  if (!created.ok || !Array.isArray(created.data) || !created.data[0] || !created.data[0].id) {
    console.error('Kommo leads/complex', created.status, JSON.stringify(created.data).slice(0, 1000));
    res.status(502).send(JSON.stringify({ ok: false, error: 'kommo' })); return;
  }
  const leadId = created.data[0].id;

  const lines = [
    'Intresseanmälan från CO2-sidan',
    `Intresserad av: ${interest}`,
    `Namn: ${name || 'ej angivet'}`,
    `E-post: ${email || 'ej angivet'}`,
    phone ? `Telefon: ${phone}` : null,
    `Meddelande: ${message || 'inget'}`,
    `Formulär: ${formPosition === 'hero' ? 'överst på sidan' : formPosition === 'bottom' ? 'längst ner på sidan' : 'okänt'}`,
    `Sida: ${page || 'okänd'}`,
    `Kampanj: ${UTM_KEYS.filter((k) => utm[k]).map((k) => `${k}=${utm[k]}`).join(', ') || 'ingen UTM'}`,
    `Klick från Meta-annons: ${fromMeta ? 'ja' : 'nej'}`
  ].filter(Boolean);

  /* SMS: bekräftelse till kunden och notis till Rania (skickas parallellt) */
  const firstName = (name.split(/\s+/)[0] || '').slice(0, 20);
  const customerPhone = toE164(phone);
  const contactInfo = [phone, email].filter(Boolean).join(', ');
  const smsText = customerPhone && process.env.TWILIO_ACCOUNT_SID ? fillText(await getSmsText(), firstName) : '';
  const [smsCustomer, smsRania] = await Promise.all([
    sendSms(customerPhone, smsText),
    sendSms(toE164(process.env.RAYN_NOTIFY_PHONE),
      `Nytt lead från CO2-sidan: ${(name || 'Okänt namn').slice(0, 40)}, ${contactInfo.slice(0, 60)}. Intresse: ${interest.slice(0, 40)}. Se Kommo.`)
  ]);
  if (smsCustomer.ok) lines.push('SMS-bekräftelse skickad till kunden');
  else if (phone && !customerPhone) lines.push('Ingen SMS-bekräftelse: ogiltigt mobilnummer');
  if (followUpConsent) {
    lines.push(`Samtycke till upp till tre SMS om CO2-kampanjen: ${consentedAt.toISOString()}`);
    if (smsCustomer.ok) {
      try {
        await enrollFollowUp(customerPhone, name, smsCustomer.sid, consentedAt, leadId);
      } catch (error) {
        console.error('Could not enroll SMS follow-up', error.message);
        lines.push('SMS-uppföljningen kunde inte schemaläggas');
      }
    }
  }

  const note = await addLeadNote(leadId, lines.join('\n'));
  if (!note.ok) console.error('Kommo notes', note.status, JSON.stringify(note.data).slice(0, 500));
  if (smsRania.skipped === undefined && !smsRania.ok) console.error('Notis-SMS till Rania misslyckades');

  res.status(200).send(JSON.stringify({ ok: true, lead_id: leadId }));
};
