/* ==========================================================================
   RAYN – Kommo-koppling för formuläret "Fråga om pris" (Cloudflare Worker)
   --------------------------------------------------------------------------
   Tar emot formuläret från CO2-sidan och skapar ett lead med kontakt i Kommo.
   Kommo-token ligger som hemlig miljövariabel här, aldrig i webbsidans kod.

   Miljövariabler (Cloudflare → Worker → Settings → Variables and Secrets):
     KOMMO_SUBDOMAIN         t.ex. "raynbeauty" för raynbeauty.kommo.com   (krävs)
     KOMMO_TOKEN             Long-lived token, lägg som SECRET              (krävs)
     ALLOWED_ORIGINS         Kommaseparerade adresser som får skicka, t.ex.
                             "https://www.raynbeauty.se,https://raynbeauty.se"  (krävs)
     KOMMO_PIPELINE_ID       Pipeline där leadet hamnar (valfritt, annars standard)
     KOMMO_STATUS_ID         Steg i pipelinen (valfritt, annars första steget)
     KOMMO_RESPONSIBLE_USER  Användar-ID som blir ansvarig (valfritt)
     KOMMO_TAGS              Taggar, kommaseparerade (valfritt, standard
                             "Webbformulär,CO2 kampanj")
     KOMMO_UTM_FIELDS        "true" = fyll Kommos UTM-fält (utm_source m.fl.).
                             Kräver att fälten finns i kontot. Standard: av,
                             UTM skrivs då bara i anteckningen.

   Svar till webbsidan: { ok: true, lead_id } eller { ok: false, error }.
   ========================================================================== */

const TREATMENTS = ['Botox', 'Fillers', 'HIFU & Trådlyft', 'HydraFacial', 'Laser & IPL', 'Läppfiller',
  'Microneedling', 'Skinbooster', 'Övrigt / vet ej'];
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function clean(v, max) {
  return typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '';
}

function cors(origin, env) {
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const ok = origin && allowed.includes(origin);
  return {
    ok,
    headers: {
      'Access-Control-Allow-Origin': ok ? origin : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin'
    }
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' } });
}

async function kommo(env, path, body, attempt = 1) {
  const res = await fetch(`https://${env.KOMMO_SUBDOMAIN}.kommo.com${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.KOMMO_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
  /* Ett nytt försök vid tillfälliga fel (för många anrop eller serverfel hos Kommo) */
  if ((res.status === 429 || res.status >= 500) && attempt < 3) {
    await new Promise((r) => setTimeout(r, 800 * attempt));
    return kommo(env, path, body, attempt + 1);
  }
  return { ok: res.ok, status: res.status, data };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const c = cors(origin, env);

    if (request.method === 'OPTIONS') return new Response(null, { status: c.ok ? 204 : 403, headers: c.headers });
    if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405, c.headers);
    if (!c.ok) return json({ ok: false, error: 'origin' }, 403, c.headers);
    if (!env.KOMMO_SUBDOMAIN || !env.KOMMO_TOKEN) return json({ ok: false, error: 'config' }, 500, c.headers);

    let input;
    try { input = await request.json(); } catch (e) { return json({ ok: false, error: 'json' }, 400, c.headers); }
    if (!input || typeof input !== 'object') return json({ ok: false, error: 'json' }, 400, c.headers);

    /* Spam: dold kryssruta i formuläret */
    if (input.botcheck) return json({ ok: true, lead_id: null }, 200, c.headers);

    const treatment = clean(input.treatment, 60);
    const name = clean(input.name, 120);
    const phone = clean(input.phone, 40);
    const email = clean(input.email, 160).toLowerCase();
    const message = clean(input.message, 2000);
    const page = clean(input.page, 300);
    const utm = {};
    UTM_KEYS.forEach((k) => { const v = clean(input.utm && input.utm[k], 200); if (v) utm[k] = v; });
    const fromMeta = !!input.fbclid;

    if (!TREATMENTS.includes(treatment)) return json({ ok: false, error: 'treatment' }, 422, c.headers);
    if (!phone && !email) return json({ ok: false, error: 'contact' }, 422, c.headers);
    if (phone && !/^[0-9+() ]{7,}$/.test(phone)) return json({ ok: false, error: 'phone' }, 422, c.headers);
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: 'email' }, 422, c.headers);

    /* Kontakt */
    const contactFields = [];
    if (phone) contactFields.push({ field_code: 'PHONE', values: [{ value: phone, enum_code: 'MOB' }] });
    if (email) contactFields.push({ field_code: 'EMAIL', values: [{ value: email, enum_code: 'WORK' }] });

    /* Lead */
    const tags = (env.KOMMO_TAGS || 'Webbformulär,CO2 kampanj').split(',').map((s) => s.trim()).filter(Boolean);
    if (fromMeta) tags.push('Meta annons');
    const lead = {
      name: `Prisfråga: ${treatment}`,
      _embedded: {
        tags: tags.map((t) => ({ name: t })),
        contacts: [{ first_name: name || 'Okänt namn', custom_fields_values: contactFields }]
      }
    };
    if (env.KOMMO_PIPELINE_ID) lead.pipeline_id = Number(env.KOMMO_PIPELINE_ID);
    if (env.KOMMO_STATUS_ID) lead.status_id = Number(env.KOMMO_STATUS_ID);
    if (env.KOMMO_RESPONSIBLE_USER) lead.responsible_user_id = Number(env.KOMMO_RESPONSIBLE_USER);
    if (env.KOMMO_UTM_FIELDS === 'true' && Object.keys(utm).length) {
      lead.custom_fields_values = Object.keys(utm).map((k) => ({ field_code: k.toUpperCase(), values: [{ value: utm[k] }] }));
    }

    const created = await kommo(env, '/api/v4/leads/complex', [lead]);
    if (!created.ok || !Array.isArray(created.data) || !created.data[0] || !created.data[0].id) {
      console.error('Kommo leads/complex', created.status, JSON.stringify(created.data).slice(0, 1000));
      return json({ ok: false, error: 'kommo' }, 502, c.headers);
    }
    const leadId = created.data[0].id;

    /* Anteckning med allt som skickades */
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
    const note = await kommo(env, '/api/v4/leads/notes', [{ entity_id: leadId, note_type: 'common', params: { text: lines.join('\n') } }]);
    if (!note.ok) console.error('Kommo notes', note.status, JSON.stringify(note.data).slice(0, 500)); /* leadet finns ändå */

    return json({ ok: true, lead_id: leadId }, 200, c.headers);
  }
};
