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

function addLeadNote(leadId, text) {
  return kommo('/api/v4/leads/notes', [{ entity_id: leadId, note_type: 'common', params: { text } }]);
}

/* ---------------------------------------------------------------------------
   Salesbots i Kommo (Kommo → Bots). Bottarna skickar SMS via Twilio Text
   Messaging, så meddelandet syns i Kommo Chats och man kan svara där.
   Texterna ändras i Kommo, inte här. ID:na kan bytas med miljövariabler.
   --------------------------------------------------------------------------- */
const BOTS = {
  confirmation: process.env.KOMMO_BOT_CONFIRMATION || '12908', /* CO2 – Bekräftelse-SMS */
  followUp: {
    1: process.env.KOMMO_BOT_FOLLOW_UP_DAY1 || '12924',       /* CO2 – Påminnelse dag 1 */
    3: process.env.KOMMO_BOT_FOLLOW_UP_DAY3 || '12926',       /* CO2 – Påminnelse dag 3 */
    4: process.env.KOMMO_BOT_FOLLOW_UP_DAY4 || '12928'        /* CO2 – Påminnelse dag 4 */
  }
};

/* Startar en Salesbot på ett lead. Kommo svarar 202 när boten är startad. */
function runSalesbot(botId, leadId) {
  return kommo('/api/v2/salesbot/run', [{ bot_id: Number(botId), entity_id: Number(leadId), entity_type: 2 }]);
}

module.exports = { kommo, addLeadNote, runSalesbot, BOTS };
