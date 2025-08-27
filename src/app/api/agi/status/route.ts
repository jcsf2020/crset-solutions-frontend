export const dynamic = 'force-dynamic';

function bool(v?: string | null) {
  return (v ?? 'false').toLowerCase() === 'true';
}

export async function GET() {
  const gated = bool(process.env.AGI_GATE);
  const openaiConfigured = Boolean(
    process.env.AGI_OPENAI_BASE_URL ||
    process.env.AGI_OPENAI_MODEL ||
    process.env.OPENAI_API_KEY ||
    process.env.GROQ_API_KEY
  );

  const body = {
    ok: true,
    backend: 'openai',
    gated,
    openaiConfigured,
    now: new Date().toISOString(),
  };

  const res = new Response(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store, max-age=0',
    },
  });

  // 🔒 Headers de segurança forçados
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set('X-Robots-Tag', 'noindex');

  return res;
}
