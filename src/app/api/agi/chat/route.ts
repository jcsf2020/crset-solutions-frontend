export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Payload = { agent?: string; input: string; sessionId?: string };

const enc = new TextEncoder();

function streamFrom(chunks: string[]) {
  return new ReadableStream({
    start(controller) {
      let i = 0;
      const tick = () => {
        if (i < chunks.length) {
          controller.enqueue(enc.encode(chunks[i++]));
          setTimeout(tick, 50);
        } else {
          controller.close();
        }
      };
      tick();
    }
  });
}

export async function POST(req: Request) {
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

  const chunks = [
    `[${agent.toUpperCase()}] `, 'thinking...\n\n',
    '- quick diag: OG/Twitter OK; CTA points to demo; missing real backend calls.\n',
    '- next: wire AGI backend, chat UI, gating.\n\n',
    'OK from mock endpoint.\n'
  ];

  return new Response(streamFrom(chunks), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'x-agi-mock': '1' }
  });
}
