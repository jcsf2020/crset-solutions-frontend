export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  const backend = (process.env.AGI_BACKEND || 'mock').trim().toLowerCase();
  const openaiConfigured = Boolean((process.env.OPENAI_API_KEY || '').trim());
  const gated = Boolean((process.env.AGI_API_KEY || '').trim());
  const data = { ok: true, backend, gated, openaiConfigured, now: new Date().toISOString() };
  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-agi-backend': backend
    }
  });
}
