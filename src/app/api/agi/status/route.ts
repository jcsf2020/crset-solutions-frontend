export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const gateOn = (process.env.AGI_GATE === 'true') || !!process.env.AGI_TEST_KEY;

  return new Response(JSON.stringify({
    ok: true,
    backend: process.env.AGI_BACKEND ?? 'openai',
    gated: gateOn,
    openaiConfigured: true,
    now: new Date().toISOString(),
    debug: {
      gateVar: process.env.AGI_GATE ?? null,
      hasServerKey: !!process.env.AGI_TEST_KEY
    }
  }, null, 2), {
    headers: {
      'content-type':'application/json',
      'cache-control':'no-store, max-age=0',
      'x-robots-tag':'noindex',
      'x-content-type-options':'nosniff',
      'referrer-policy':'strict-origin-when-cross-origin',
      'permissions-policy':'camera=(), microphone=(), geolocation=()'
    }
  });
}
