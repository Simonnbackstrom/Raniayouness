const { followUpsConfigured, runFollowUps } = require('../lib/sms-follow-up');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ ok: false });
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ ok: false });
  }
  if (!followUpsConfigured()) return res.status(503).json({ ok: false });
  try {
    const counts = await runFollowUps();
    return res.status(counts.failed ? 502 : 200).json(counts);
  } catch (error) {
    console.error('SMS follow-up job failed', error.message);
    return res.status(502).json({ ok: false });
  }
};
