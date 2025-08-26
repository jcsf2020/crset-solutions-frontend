export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { logAgiRoute } from '../../../../lib/agi-log';

type Payload = { agent?: string; input: string; sessionId?: string };

function systemFor(agent: string) {
  const a = String(agent || '').toLowerCase();
  if (a === 'boris') return 'You are Boris: security, automation, DevOps. Be short and practical.';
  if (a === 'laya')  return 'You are Laya: comms and org. Be clear and action-oriented.';
  if (a === 'irina') return 'You are Irina: analytics and insights. Prefer bullets and metrics.';
  return 'You are a technical assistant. Be concise and useful.';
}
const clean = (s: string) => (s || '').trim().replace(/^['"]|['"]$/g, '').replace(/\/+$/,'');

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
  const ok = res.ok;
  let usage: any = null;
  let text = '(empty)';
  if (ok) {
    const json: any = await res.json();
    usage = json?.usage || null;
    text = String(json?.choices?.[0]?.message?.content ?? '').trim() || 'OK';
  }
  return { ok, text, usage, status: res.status };
}

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204 });
}

export async function POST(req: Request) {
  const t0 = Date.now();

  // Gate opcional
  const gate = (process.env.AGI_API_KEY || '').trim();
  if (gate) {
    const auth = req.headers.get('authorization') || '';
    if (auth !== 'Bearer ' + gate) {
      await logAgiRoute({ path: '/api/agi/chat', method: 'POST', ok: false, why: 'unauthorized' });
      return new Response('unauthorized', { status: 401, headers: { 'content-type': 'application/json' } });
    }
  }

  let body: Payload;
  try { body = await req.json(); }
  catch {
    await logAgiRoute({ path: '/api/agi/chat', method: 'POST', ok: false, why: 'bad_json' });
    return new Response('bad_json', { status: 400, headers: { 'content-type': 'application/json' } });
  }

  const agent = (body.agent || 'boris').toLowerCase();
  const input = (body.input || '').trim();
  if (!input) return new Response('empty_input', { status: 400, headers: { 'content-type': 'application/json' } });
  if (input.length > 2000) return new Response('too_long', { status: 413, headers: { 'content-type': 'application/json' } });

  const prefer = (process.env.AGI_BACKEND || 'mock').trim().toLowerCase();
  const base   = (process.env.AGI_OPENAI_BASE_URL || 'https://api.openai.com/v1').trim();
  const model  = (process.env.AGI_OPENAI_MODEL || 'gpt-4o-mini').trim();
  const key    = (process.env.OPENAI_API_KEY || '').trim();

  let text = '[mock] streaming ativo';
  let used: 'openai' | 'mock' = 'mock';
  let usage: any = null;
  let status = 200;

  if (prefer === 'openai' && key) {
    const r = await ask(base, key, model, agent, input);
    text = r.text; usage = r.usage; status = r.status;
    used = r.ok ? 'openai' : 'mock';
    if (!r.ok) text = '[mock] upstream_error_' + status;
  } else {
    text = input ? 'OK' : '[mock] no input';
  }

  const latency = Date.now() - t0;

  await logAgiRoute({
    path: '/api/agi/chat',
    method: 'POST',
    ok: status >= 200 && status < 300,
    backend: used,
    model,
    latency_ms: latency,
    tokens_total: usage?.total_tokens ?? null,
    tokens_prompt: usage?.prompt_tokens ?? null,
    tokens_completion: usage?.completion_tokens ?? null,
  });

  return new Response(text, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'x-agi-backend': used,
      'x-agi-upstream-base': clean(base),
      'x-agi-upstream-model': model,
      ...(usage?.total_tokens ? { 'x-agi-usage-total': String(usage.total_tokens) } : {}),
      ...(usage?.prompt_tokens ? { 'x-agi-usage-prompt': String(usage.prompt_tokens) } : {}),
      ...(usage?.completion_tokens ? { 'x-agi-usage-completion': String(usage.completion_tokens) } : {}),
      'x-agi-latency-ms': String(latency),
    }
  });
}
