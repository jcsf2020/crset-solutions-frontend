export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Payload = { agent?: string; input: string; sessionId?: string };

const enc = new TextEncoder();

function mockStream(agent: string) {
  const name = (agent || 'boris').toUpperCase();
  const chunks = [
    `[${name}] `, 'thinking...\n\n',
    '- mock online; backend=mock\n',
    '- amanhã ligamos o backend real com calma.\n'
  ];
  return new ReadableStream<Uint8Array>({
    start(c) {
      let i = 0;
      const pump = () => {
        if (i < chunks.length) { c.enqueue(enc.encode(chunks[i++])); setTimeout(pump, 40); }
        else c.close();
      };
      pump();
    }
  });
}

export async function POST(req: Request) {
  // (opcional) gating por AGI_API_KEY
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

  const stream = mockStream(body.agent || 'boris');
  return new Response(stream, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'x-agi-backend': 'mock',
      'x-agi-mock': '1'
    }
  });
}
