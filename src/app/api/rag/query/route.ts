export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'content-type,user-agent',
    },
  });
}
function withCORS(res: Response) { res.headers.set('Access-Control-Allow-Origin','*'); return res; }

import { embed } from "../_shared/embeddings";
export async function POST(req: Request) {
  try {
    const { message, match_count = 3, similarity_threshold = 0.2 } = await req.json();
    if (!message) return withCORS(new Response(JSON.stringify({ error: "message is required" }), { status: 400 }));
    const v = await embed(message);
    const matches: any[] = []; // replace with real vector DB query
    return withCORS(new Response(JSON.stringify({ ok: true, dim: v.length, match_count, similarity_threshold, matches }), { status: 200 }));
  } catch (e: any) {
    return withCORS(new Response(JSON.stringify({ error: e.message || "query failed" }), { status: 500 }));
  }
}

