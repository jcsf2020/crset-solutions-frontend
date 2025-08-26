export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Payload = { agent?: string; input: string; sessionId?: string };

const enc = new TextEncoder();

const sysMap: Record<string, string> = {
  boris: 'You are Boris: security, automation, DevOps. Be short and practical.',
  laya:  'You are Laya: comms and org. Be clear and action-oriented.',
  irina: 'You are Irina: analytics and insights. Prefer bullets and metrics.',
};
function systemFor(a: string) {
  return sysMap[(a || '').toLowerCase()] || 'You are a technical assistant. Be concise and useful.';
}
function sanitizeBaseUrl(raw: string) {
  const noQuotes = (raw || '').trim().replace(/^['"]|['"]$/g, '');
  return noQuotes.replace(/\/+$/, '');
}
function streamFrom(chunks: string[]) {
  return new ReadableStream<Uint8Array>({
    start(c) {
      let i = 0;
      const pump = () => { if (i < chunks.length) { c.enqueue(enc.encode(chunks[i++])); setTimeout(pump, 40); } else c.close(); };
      pump();
    }
  });
}
function mockStream(agent: string) {
  const name = (agent || 'boris').toUpperCase();
  return streamFrom([
    `[${name}] `, 'thinking...\n\n',
    '- mock online; backend=mock\n',
    '- amanhã ligamos o backend real com calma.\n'
  ]);
}
async function openAIStream(agent: string, input: string) {
  const key = (process.env.OPENAI_API_KEY || '').trim();
  if (!key) throw new Error('no_openai_key');

  const model = (process.env.AGI_OPENAI_MODEL || 'gpt-4o-mini').trim();
  const base = sanitizeBaseUrl(process.env.AGI_OPENAI_BASE_URL || 'https://api.openai.com/v1');
  const url = `${base}/chat/completions`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model, stream: true, temperature: 0.2,
      messages: [
        { role: 'system', content: systemFor(agent) },
        { role: 'user', content: input }
      ]
    })
  });
  if (!res.ok || !res.body) throw new Error(`upstream_${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  return new ReadableStream<Uint8Array>({
    async pull(c) {
      const { value, done } = await reader.read();
      if (done) { c.close(); return; }
      const chunk = decoder.decode(value);
      for (const raw of chunk.split('\n')) {
        const line = raw.trim();
        if (!line.startsWith('data:')) continue;
        const data = line.slice(5).trim();
        if (data === '[DONE]') { c.close(); return; }
        try {
          const json = JSON.parse(data);
          const delta = json?.choices?.[0]?.delta?.content;
          if (delta) c.enqueue(enc.encode(delta));
        } catch { /* ignore partial frames */ }
      }
    }
  });
}
export async function POST(req: Request) {
  const gate = (process.env.AGI_API_KEY || '').trim();
  if (gate) {
    const auth = req.headers.get('authorization') || '';
    if (auth !== `Bearer ${gate}`) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401, headers: { 'content-type': 'application/json' }
      });
    }
  }

  let body: Payload;
  try { body = await req.json(); }
  catch {
    return new Response(JSON.stringify({ error: 'bad_json' }), {
      status: 400, headers: { 'content-type': 'application/json' }
    });
  }

  const agent = (body.agent || 'boris');
  const input = (body.input || '').trim();
  if (!input) {
    return new Response(JSON.stringify({ error: 'empty_input' }), {
      status: 400, headers: { 'content-type': 'application/json' }
    });
  }
  if (input.length > 2000) {
    return new Response(JSON.stringify({ error: 'too_long', max: 2000 }), {
      status: 413, headers: { 'content-type': 'application/json' }
    });
  }

  const prefer = ((process.env.AGI_BACKEND || 'mock').trim().toLowerCase());
  let used: 'openai' | 'mock' = 'mock';
  let stream: ReadableStream<Uint8Array> | null = null;
  let err = '';

  if (prefer === 'openai' && (process.env.OPENAI_API_KEY || '').trim()) {
    try { stream = await openAIStream(agent, input); used = 'openai'; }
    catch (e: any) { err = String(e?.message || e); }
  }
  if (!stream) { stream = mockStream(agent); used = 'mock'; }

  return new Response(stream, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'x-agi-backend': used,
      ...(used === 'mock' ? { 'x-agi-mock': '1' } : {}),
      ...(err ? { 'x-agi-error': err } : {})
    }
  });
}
