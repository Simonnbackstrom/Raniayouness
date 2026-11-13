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

   BEKRÄFTELSE-SMS VIA KOMMO (syns i Kommo Chats)
     När leadet skapats startar funktionen Salesboten "CO2 – Bekräftelse-SMS"
     i Kommo. Boten skickar SMS:et via Twilio Text Messaging, så meddelandet
     syns i Kommo Chats och kundens svar hamnar i samma konversation.
     Texten ändras i Kommo → Bots → CO2 – Bekräftelse-SMS.
     {{contact.first_name}} byts mot kundens förnamn.
     Bot-ID:n står i lib/kommo.js och kan bytas med miljövariabler:
       KOMMO_BOT_CONFIRMATION     (standard 12908)
       KOMMO_BOT_FOLLOW_UP_DAY1   (standard 12924)
       KOMMO_BOT_FOLLOW_UP_DAY3   (standard 12926)
       KOMMO_BOT_FOLLOW_UP_DAY4   (standard 12928)
     Kundens mobilnummer sparas som +46… i Kommo. Det krävs för att SMS:et
     ska komma fram och för att svaret ska kopplas till rätt kontakt.

   Twilio (används för notis-SMS till Rania och för påminnelserna):
     TWILIO_ACCOUNT_SID           Account SID från Twilio Console (börjar med AC)
     TWILIO_AUTH_TOKEN            Auth Token från Twilio Console
     TWILIO_MESSAGING_SERVICE_SID Messaging Service "RAYN" (börjar med MG)
     RAYN_NOTIFY_PHONE            (valfritt) Ranias mobil, t.ex. +46701234567.
                                  Får ett SMS per nytt lead.

   Misslyckas bekräftelsen loggas felet och står i anteckningen på leadet,
   men leadet och svaret till kunden påverkas inte.

   META CONVERSIONS API (valfritt – utan de två första skickas inget):
     META_PIXEL_ID          Samma pixel-ID som i co2/js/config.js
     META_CAPI_TOKEN        Åtkomsttoken: Events Manager → pixeln →
                            Inställningar → Conversions API → Generera åtkomsttoken
     META_API_VERSION       (valfritt) standard v25.0
     META_TEST_EVENT_CODE   (valfritt) kod från fliken Testhändelser, t.ex.
                            TEST12345. Ta bort när testet är klart!

   Lead skickas till Meta från servern när leadet skapats i Kommo, men BARA om
   besökaren godkänt marknadsföringscookies och inte är i testläge
   (?rayn_test=1). Samma event_id som pixeln använder skickas med, så Meta
   deduplicerar pixel + server till en händelse. Kontaktuppgifter skickas
   bara SHA-256-krypterade. Resultatet står i anteckningen i Kommo.

   Tar emot: { name, email, phone?, message?, interest?, treatment?,
               form_position?, page?, utm?, fbclid?, test?,
               meta?: { event_name, event_id, consent, fbp, fbc, fbclid,
                        fbclid_ts, event_source_url, custom_data } }
   Kräver e-post eller telefon.
   ========================================================================== */

const crypto = require('crypto');
const { sendSms } = require('../lib/twilio-sms');
const { enrollFollowUp } = require('../lib/sms-follow-up');
const { kommo, addLeadNote, runSalesbot, BOTS } = require('../lib/kommo');

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

/* ---------------------------------------------------------------------------
   Meta Conversions API
   --------------------------------------------------------------------------- */
function sha256(v) {
  return v ? crypto.createHash('sha256').update(v).digest('hex') : '';
}

/* Samma normalisering som i co2/js/lead-form.js (Metas krav: bara siffror, med landskod) */
function metaPhone(p) {
  let d = String(p || '').replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('00')) d = d.slice(2);
  else if (d.startsWith('0')) d = '46' + d.slice(1);
  return d;
}

function metaFirstName(n) {
  return String(n || '').trim().split(/\s+/)[0].toLowerCase().replace(/[^\p{L}]/gu, '');
}

function clientIp(req) {
  const fwd = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || String(req.headers['x-real-ip'] || '').trim() || (req.socket && req.socket.remoteAddress) || '';
}

/* Läser och kontrollerar meta-delen från formuläret */
function readMeta(m) {
  if (!m || typeof m !== 'object') return null;
  const eventId = clean(m.event_id, 120);
  if (!/^[A-Za-z]+\.[A-Za-z0-9-]{8,100}$/.test(eventId)) return null;
  const cookie = (v) => { const s = clean(v, 300); return /^fb\.\d\.\d+\.[\w.\-]+$/.test(s) ? s : ''; };
  const custom = {};
  if (m.custom_data && typeof m.custom_data === 'object') {
    Object.keys(m.custom_data).slice(0, 15).forEach((k) => {
      const v = clean(m.custom_data[k], 200);
      if (/^[a-z_]{1,40}$/.test(k) && v) custom[k] = v;
    });
  }
  const fbclid = clean(m.fbclid, 500);
  const ts = Number(m.fbclid_ts) || 0;
  return {
    eventName: /^[A-Za-z]{2,40}$/.test(String(m.event_name || '')) ? m.event_name : 'Lead',
    eventId,
    consent: m.consent === true,
    fbp: cookie(m.fbp),
    /* Saknas _fbc-cookien men vi har fbclid från landningen: bygg fbc enligt Metas format */
    fbc: cookie(m.fbc) || (fbclid && /^[\w-]+$/.test(fbclid) ? `fb.1.${ts > 0 ? ts : Date.now()}.${fbclid}` : ''),
    sourceUrl: /^https:\/\//.test(clean(m.event_source_url, 500)) ? clean(m.event_source_url, 500) : '',
    custom
  };
}

async function sendMetaLead(req, meta, contact) {
  const pixel = process.env.META_PIXEL_ID, token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return { skipped: 'ej konfigurerat i Vercel' };
  if (!meta) return { skipped: 'event_id saknas' };
  if (contact.test) return { skipped: 'testläge' };
  if (!meta.consent) return { skipped: 'inget samtycke till marknadsföring' };

  const user = {
    client_ip_address: clientIp(req) || undefined,
    client_user_agent: clean(req.headers['user-agent'], 500) || undefined,
    fbp: meta.fbp || undefined,
    fbc: meta.fbc || undefined
  };
  const em = sha256(contact.email);
  const ph = sha256(metaPhone(contact.phone));
  const fn = sha256(metaFirstName(contact.name));
  if (em) user.em = [em];
  if (ph) user.ph = [ph];
  if (fn) user.fn = [fn];
  if (em || ph) user.country = [sha256('se')];

  const body = {
    data: [{
      event_name: meta.eventName,
      event_id: meta.eventId,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: meta.sourceUrl || contact.page || undefined,
      action_source: 'website',
      user_data: user,
      custom_data: meta.custom
    }],
    access_token: token
  };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE.trim();

  const version = (process.env.META_API_VERSION || 'v25.0').trim();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const r = await fetch(`https://graph.facebook.com/${version}/${encodeURIComponent(pixel)}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctrl.signal
    });
    const text = await r.text();
    if (!r.ok) { console.error('Meta CAPI', r.status, text.slice(0, 500)); return { ok: false }; }
    return { ok: true };
  } catch (e) {
    console.error('Meta CAPI fetch', e && e.message);
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
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
  /* Uppföljning av kundens egen intresseanmälan (beskrivs i integritetspolicyn). Kunden kan svara STOP. */
  const followUpConsent = Boolean(phone);
  const consentedAt = new Date();
  const formPosition = clean(input.form_position, 20);
  const utm = {};
  UTM_KEYS.forEach((k) => { const v = clean(input.utm && input.utm[k], 200); if (v) utm[k] = v; });
  const isTest = input.test === true;
  const meta = readMeta(input.meta);
  /* Från Meta = klick med fbclid ELLER UTM-taggad Meta-annons */
  const fromMeta = !!input.fbclid || /^(facebook|fb|instagram|ig|meta)$/i.test(utm.utm_source || '');

  const bad = (error) => res.status(422).send(JSON.stringify({ ok: false, error }));
  if (!phone && !email) return bad('contact');
  if (phone && !/^[0-9+() ]{7,}$/.test(phone)) return bad('phone');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('email');

  /* +46… i Kommo: krävs för att Kommo-botens SMS ska komma fram och för att
     kundens svar ska kopplas till rätt kontakt. Ogiltiga nummer sparas som de skrevs. */
  const customerPhone = toE164(phone);
  const contactFields = [];
  if (phone) contactFields.push({ field_code: 'PHONE', values: [{ value: customerPhone || phone, enum_code: 'MOB' }] });
  if (email) contactFields.push({ field_code: 'EMAIL', values: [{ value: email, enum_code: 'WORK' }] });

  /* Förnamn och efternamn i separata fält, så att {{contact.first_name}} i bottarna blir bara förnamnet */
  const nameParts = name.split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || 'Okänt namn';
  const lastName = nameParts.slice(1).join(' ');

  const tags = (process.env.KOMMO_TAGS || 'Webbformulär,CO2 kampanj').split(',').map((s) => s.trim()).filter(Boolean);
  if (fromMeta && !isTest) tags.push('Meta annons');
  if (isTest) tags.push('Test');
  const lead = {
    name: `Intresse: ${interest}`,
    _embedded: {
      tags: tags.map((t) => ({ name: t })),
      contacts: [{
        first_name: firstName,
        ...(lastName ? { last_name: lastName } : {}),
        custom_fields_values: contactFields
      }]
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
    isTest ? 'TESTANMÄLAN (skickad i testläge, räknas inte i Meta)' : null,
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

  /* Bekräftelse via Kommo-bot (syns i Chats), notis till Rania via Twilio och Lead till Meta, parallellt */
  const contactInfo = [customerPhone || phone, email].filter(Boolean).join(', ');
  const confirmation = customerPhone
    ? runSalesbot(BOTS.confirmation, leadId).catch((e) => ({ ok: false, status: 0, data: e && e.message }))
    : Promise.resolve({ skipped: true });
  const [smsCustomer, smsRania, metaResult] = await Promise.all([
    confirmation,
    sendSms(toE164(process.env.RAYN_NOTIFY_PHONE),
      `${isTest ? 'TEST – ' : ''}Nytt lead från CO2-sidan: ${(name || 'Okänt namn').slice(0, 40)}, ${contactInfo.slice(0, 60)}. Intresse: ${interest.slice(0, 40)}. Se Kommo.`),
    sendMetaLead(req, meta, { email, phone, name, page, test: isTest })
  ]);
  if (smsCustomer.ok) lines.push('SMS-bekräftelse skickad via Kommo-bot (syns i Chats)');
  else if (phone && !customerPhone) lines.push('Ingen SMS-bekräftelse: ogiltigt mobilnummer');
  else if (customerPhone) {
    console.error('Kommo salesbot (bekräftelse)', smsCustomer.status, JSON.stringify(smsCustomer.data).slice(0, 500));
    lines.push('SMS-bekräftelsen kunde inte startas i Kommo – se Vercel-loggen');
  }
  lines.push(`Skickad till Meta (Conversions API): ${metaResult.ok ? 'ja' : metaResult.skipped ? `nej – ${metaResult.skipped}` : 'nej – fel, se Vercel-loggen'}`);
  if (followUpConsent) {
    lines.push(`Uppföljning av intresseanmälan: upp till tre SMS om CO2-kampanjen (svara STOP för att avsluta). Anmäld ${consentedAt.toISOString()}`);
    if (smsCustomer.ok) {
      try {
        await enrollFollowUp(customerPhone, firstName, consentedAt, leadId);
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
