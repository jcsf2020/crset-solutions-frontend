export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function sendEmail(key: string, from: string, to: string, subject: string, text: string) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, text })
  });
}

export async function GET(req: Request) {
  const key  = (process.env.RESEND_API_KEY || '').trim();
  if (!key) return Response.json({ ok:false, error:'RESEND_API_KEY missing' }, { status:500 });

  const to   = (process.env.ALERT_TO    || 'crsetsolutions@gmail.com').trim();
  const from = (process.env.RESEND_FROM || 'CRSET <onboarding@resend.dev>').trim();
  const origin = (process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://crsetsolutions.com').trim();

  const url = new URL(req.url);
  const force = url.searchParams.get('force');

  if (force) {
    const subject = 'CRSET Health: FORCED TEST';
    const text = `Forced at ${new Date().toISOString()}`;
    await sendEmail(key, from, to, subject, text);
    return Response.json({ ok:true, forced:true }, { headers:{'Cache-Control':'no-store, max-age=0, must-revalidate'} });
  }

  let h: any;
  try {
    const r = await fetch(`${origin}/api/health`, { cache:'no-store' });
    h = await r.json();
  } catch (e: any) {
    await sendEmail(key, from, to, 'CRSET Health: erro ao ler /api/health', String(e?.message || e));
    return Response.json({ ok:false, error:'health fetch failed' }, { headers:{'Cache-Control':'no-store, max-age=0, must-revalidate'} });
  }

  const checks = Array.isArray(h?.checks) ? h.checks : [];
  const bad = checks.filter((c: any) => !c?.ok);
  if (bad.length) {
    const lines = bad.map((c: any) => `${c.name} status=${c.status} ms=${c.ms} url=${c.url}`).join('\n');
    const subject = `CRSET Health: ${bad.length} falha(s)`;
    const text = `TS: ${h.ts}\nENV: ${h.env}\n\n${lines}`;
    await sendEmail(key, from, to, subject, text);
  }

  return Response.json({ ok:true, fails: bad.length }, { headers:{'Cache-Control':'no-store, max-age=0, must-revalidate'} });
}
