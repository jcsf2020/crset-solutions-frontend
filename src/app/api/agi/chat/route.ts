export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Payload = { agent?: string; input: string; sessionId?: string };

const enc = new TextEncoder();

function systemFor(agent: string) {
  const a = String(agent || '').toLowerCase();
  if (a === 'boris') return 'You are Boris: security, automation, DevOps. Be short and practical.';
  if (a === 'laya')  return 'You are Laya: comms and org. Be clear and action-oriented.';
  if (a === 'irina') return 'You are Irina: analytics and insights. Prefer bullets and metrics.';
  return 'You are a technical assistant. Be concise and useful.';
}

function mockStream(agent: string) {
  const chunks = [
    `[${agent.toUpperCase()}] `, 'thinking...\n\n',
    '- quick diag: OG/Twitter OK; CTA points to /demo; missing real backend calls.\n',
    '- next: wire AGI backend, chat UI, gating.\n\n',
    'OK from mock endpoint.\n'
  ];
  return new ReadableStream<Uint8Array>({
    start(controller) {
      let i = 0;
      const tick = () => {
        if (i < chunks.length) { controller.enqueue(enc.encode(chunks[i++])); setTimeout(tick, 40); }
        else controller.close();
      };
      tick();
    }
  });
}

async function openAIStream(agent: string, input: string) {
  const key = process.env.OPENAI_API_KEY || '';
  const model = process.env.AGI_OPENAI_MODEL || 'gpt-4o-mini';
  if (!key) throw new Error('no_openai_key');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.3,
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
    async pull(controller) {
      const { value, done } = await reader.read();
      if (done) { controller.close(); return; }
      const chunk = decoder.decode(value);
      for (const line of chunk.split('\n')) {
        const t = line.trim();
        if (!t.startsWith('data:')) continue;
        const data = t.slice(5).trim();
        if (data === '[DONE]') { controller.close(); return; }
        try {
          const json = JSON.parse(data);
          const delta = json?.choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(enc.encode(delta));
        } catch { /* ignore partial frames */ }
      }
    }
  });
}

export async function POST(req: Request) {
  // optional gating
  const gate = process.env.AGI_API_KEY || '';
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

  const agent = (body.agent || 'boris').toLowerCase();
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

  const prefer = (process.env.AGI_BACKEND || 'mock').toLowerCase();
  let used = 'mock';
  let stream: ReadableStream<Uint8Array> | null = null;
  let err = '';

  if (prefer === 'openai' && (process.env.OPENAI_API_KEY || '')) {
    try { stream = await openAIStream(agent, input); used = 'openai'; }
    catch (e: any) { err = String(e?.message || e); }
  }
  if (!stream) stream = mockStream(agent);

  return new Response(stream, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'x-agi-backend': used,
      ...(used === 'mock' ? { 'x-agi-mock': '1' } : {}),
      ...(err ? { 'x-agi-error': err } : {})
    }
  });
}
