/* ==========================================================================
   RAYN – Kommo-koppling för formuläret "Fråga om pris" (Vercel-funktion)
   --------------------------------------------------------------------------
   Ligger i /api/kommo.js och publiceras automatiskt av Vercel tillsammans med
   webbplatsen. Adressen blir https://<er-domän>/api/kommo.

   Formuläret på /co2/ skickar hit. Funktionen skapar ett lead med kontakt i
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
   ========================================================================== */

const TREATMENTS = ['Botox', 'Fillers', 'HIFU & Trådlyft', 'HydraFacial', 'Laser & IPL', 'Läppfiller',
  'Microneedling', 'Skinbooster', 'Övrigt / vet ej'];
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

async function kommo(path, body, attempt = 1) {
  const res = await fetch(`https://${process.env.KOMMO_SUBDOMAIN}.kommo.com${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.KOMMO_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
  /* Nytt försök vid tillfälliga fel hos Kommo */
  if ((res.status === 429 || res.status >= 500) && attempt < 3) {
    await new Promise((r) => setTimeout(r, 800 * attempt));
    return kommo(path, body, attempt + 1);
  }
  return { ok: res.ok, status: res.status, data };
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

  const treatment = clean(input.treatment, 60);
  const name = clean(input.name, 120);
  const phone = clean(input.phone, 40);
  const email = clean(input.email, 160).toLowerCase();
  const message = clean(input.message, 2000);
  const page = clean(input.page, 300);
  const utm = {};
  UTM_KEYS.forEach((k) => { const v = clean(input.utm && input.utm[k], 200); if (v) utm[k] = v; });
  const fromMeta = !!input.fbclid;

  const bad = (error) => res.status(422).send(JSON.stringify({ ok: false, error }));
  if (!TREATMENTS.includes(treatment)) return bad('treatment');
  if (!phone && !email) return bad('contact');
  if (phone && !/^[0-9+() ]{7,}$/.test(phone)) return bad('phone');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('email');

  const contactFields = [];
  if (phone) contactFields.push({ field_code: 'PHONE', values: [{ value: phone, enum_code: 'MOB' }] });
  if (email) contactFields.push({ field_code: 'EMAIL', values: [{ value: email, enum_code: 'WORK' }] });

  const tags = (process.env.KOMMO_TAGS || 'Webbformulär,CO2 kampanj').split(',').map((s) => s.trim()).filter(Boolean);
  if (fromMeta) tags.push('Meta annons');
  const lead = {
    name: `Prisfråga: ${treatment}`,
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
    'Prisfråga från CO2-sidan',
    `Behandling: ${treatment}`,
    `Namn: ${name || 'ej angivet'}`,
    `Telefon: ${phone || 'ej angivet'}`,
    `E-post: ${email || 'ej angivet'}`,
    `Meddelande: ${message || 'inget'}`,
    `Sida: ${page || 'okänd'}`,
    `Kampanj: ${UTM_KEYS.filter((k) => utm[k]).map((k) => `${k}=${utm[k]}`).join(', ') || 'ingen UTM'}`,
    `Klick från Meta-annons: ${fromMeta ? 'ja' : 'nej'}`
  ];
  const note = await kommo('/api/v4/leads/notes', [{ entity_id: leadId, note_type: 'common', params: { text: lines.join('\n') } }]);
  if (!note.ok) console.error('Kommo notes', note.status, JSON.stringify(note.data).slice(0, 500));

  res.status(200).send(JSON.stringify({ ok: true, lead_id: leadId }));
};
