export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const gateOn = (process.env.AGI_GATE === 'true') || !!process.env.AGI_TEST_KEY;
  return new Response(JSON.stringify({
    ok: true,
    backend: process.env.AGI_BACKEND ?? 'openai',
    gated: gateOn,
    now: new Date().toISOString()
  }, null, 2), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store, max-age=0',
      'x-robots-tag': 'noindex'
    }
  });
}
