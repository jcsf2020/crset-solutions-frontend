export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Payload = { agent?: string; input: string; sessionId?: string };

function systemFor(agent: string) {
  const a = String(agent || '').toLowerCase();
  if (a === 'boris') return 'You are Boris: security, automation, DevOps. Be short and practical.';
  if (a === 'laya')  return 'You are Laya: comms and org. Be clear and action-oriented.';
  if (a === 'irina') return 'You are Irina: analytics and insights. Prefer bullets and metrics.';
  return 'You are a technical assistant. Be concise and useful.';
}

const clean = (s: string) =>
  (s || '').trim().replace(/^['"]|['"]$/g, '').replace(/\/+$/, '');
async function ask(base: string, key: string, model: string, agent: string, input: string) {
  const url = clean(base) + '/chat/completions';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + key },
    body: JSON.stringify({
      model,
      stream: false,
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemFor(agent) },
        { role: 'user',   content: input }
      ]
    })
  });
  if (!res.ok) throw new Error('upstream_' + res.status);
  const json: any = await res.json();
  return String(json?.choices?.[0]?.message?.content ?? '').trim() || '(empty)';
}
export async function POST(req: Request) {
  // optional gate
  const gate = (process.env.AGI_API_KEY || '').trim();
  if (gate) {
    const auth = req.headers.get('authorization') || '';
    if (auth !== ('Bearer ' + gate)) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401, headers: { 'content-type': 'application/json' }
      });
    }
  }

  let body: Payload;
  try { body = await req.json(); }
  catch { return new Response(JSON.stringify({ error: 'bad_json' }), { status: 400, headers: { 'content-type': 'application/json' } }); }

  const agent = (body.agent || 'boris').toLowerCase();
  const input = (body.input || '').trim();
  if (!input) return new Response(JSON.stringify({ error: 'empty_input' }), { status: 400, headers: { 'content-type': 'application/json' } });
  if (input.length > 2000) return new Response(JSON.stringify({ error: 'too_long', max: 2000 }), { status: 413, headers: { 'content-type': 'application/json' } });

  const prefer = (process.env.AGI_BACKEND || 'mock').trim().toLowerCase();
  const base   = (process.env.AGI_OPENAI_BASE_URL || 'https://api.openai.com/v1').trim();
  const model  = (process.env.AGI_OPENAI_MODEL || 'gpt-4o-mini').trim();
  const key    = (process.env.OPENAI_API_KEY || '').trim();
  let used: 'mock' | 'openai' = 'mock';
  let err = '';
  let text =
    '[' + agent.toUpperCase() + '] thinking...\n\n' +
    '- mock online; backend=mock\n' +
    '- amanhã ligamos o backend real com calma.\n';

  if (prefer === 'openai' && key) {
    try { text = await ask(base, key, model, agent, input); used = 'openai'; }
    catch (e: any) { err = String(e?.message || e); used = 'mock'; }
  }

  return new Response(text, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'x-agi-backend': used,
      'x-agi-upstream-base': clean(base),
      'x-agi-upstream-model': model,
      ...(used === 'mock' ? { 'x-agi-mock': '1' } : {}),
      ...(err ? { 'x-agi-error': err } : {})
    }
  });
}
