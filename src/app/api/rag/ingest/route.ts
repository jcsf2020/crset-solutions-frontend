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
    const { id, source, text } = await req.json();
    if (!text) return withCORS(new Response(JSON.stringify({ error: "text is required" }), { status: 400 }));
    const v = await embed(text);
    return withCORS(new Response(JSON.stringify({ ok: true, id, source, dim: v.length }), { status: 200 }));
  } catch (e: any) {
    return withCORS(new Response(JSON.stringify({ error: e.message || "ingest failed" }), { status: 500 }));
  }
}

