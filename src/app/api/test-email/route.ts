export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const key = (process.env.RESEND_API_KEY || '').trim();
  if (!key) {
    return Response.json(
      { ok: false, error: 'RESEND_API_KEY missing in Vercel (Production)' },
      { status: 500, headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
    );
  }
  const to = (process.env.ALERT_TO || 'crsetsolutions@gmail.com').trim();
  const from = (process.env.RESEND_FROM || 'CRSET <onboarding@resend.dev>').trim();

  const payload = { from, to, subject: 'CRSET - Teste de notificação', text: `Ping OK @ ${new Date().toISOString()}` };

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  let detail = '';
  try { detail = JSON.stringify(await resp.json()); } catch {}
  return Response.json(
    { ok: resp.ok, to, from, status: resp.status, detail },
    { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
  );
}
