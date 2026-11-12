function smsConfigured() {
  return Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_MESSAGING_SERVICE_SID);
}

function messagesUrl(suffix = '.json') {
  const account = encodeURIComponent(process.env.TWILIO_ACCOUNT_SID);
  return new URL(`https://api.twilio.com/2010-04-01/Accounts/${account}/Messages${suffix}`);
}

function twilioRequest(url, fields, headers = {}) {
  const credentials = `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`;
  return fetch(url, {
    method: fields ? 'POST' : 'GET',
    headers: { ...headers, Authorization: 'Basic ' + Buffer.from(credentials).toString('base64') },
    body: fields ? new URLSearchParams(fields) : undefined,
    signal: AbortSignal.timeout(8000)
  });
}

async function sendSms(to, body, from) {
  if (!smsConfigured() || !to) return { skipped: true };
  try {
    const fields = { To: to, MessagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID, Body: body };
    if (from) fields.From = from;
    const response = await twilioRequest(messagesUrl(), fields);
    const message = await response.json();
    if (!response.ok) {
      console.error('Twilio SMS rejected', response.status, message.code);
      return { ok: false };
    }
    return { ok: true, sid: message.sid };
  } catch (error) {
    console.error('Twilio SMS request failed', error.name);
    return { ok: false };
  }
}

module.exports = { smsConfigured, messagesUrl, twilioRequest, sendSms };
