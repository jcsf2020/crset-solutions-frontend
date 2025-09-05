export const runtime = 'nodejs';

function ok() { return Response.json({ ok: true }); }

async function handler(req: Request) {
  const u = new URL(req.url);
  // aceita header ou query param (fallback)
  const token = req.headers.get('x-webhook-secret') ?? u.searchParams.get('token');
  const want = process.env.WEBHOOK_SECRET || '';
  if (want && token !== want) {
    return new Response('forbidden', { status: 403 });
  }
  console.log('[health] hit', new Date().toISOString(), req.method, u.search);
  return ok();
}

export const GET = handler;
export const POST = handler;
