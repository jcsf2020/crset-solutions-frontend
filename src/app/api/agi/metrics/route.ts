export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { redis } from '../../../../lib/redis';

function j(data: any, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export function OPTIONS() { return new Response(null, { status: 204 }); }

export async function GET(req: Request) {
  const gate = (process.env.AGI_API_KEY || '').trim();
  const auth = req.headers.get('authorization') || '';
  if (gate && auth !== 'Bearer ' + gate) return j({ error: 'unauthorized' }, 401);

  if (!redis) return j({ ok: false, error: 'no_redis' }, 500);

  const raw = await redis.lrange<string>('agi:logs', 0, 199);
  const sample = raw.slice(0, 10).map((s) => { try { return JSON.parse(s); } catch { return s; } });

  return j({ ok: true, count: raw.length, sample });
}
