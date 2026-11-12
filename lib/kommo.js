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

module.exports = { kommo, addLeadNote };
