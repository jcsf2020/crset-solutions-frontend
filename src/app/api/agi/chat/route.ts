export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Agent = 'boris'|'laya'|'irina'|string;
type Payload = { agent?: Agent; input: string; sessionId?: string };

const encoder = new TextEncoder();

function streamFrom(chunks: string[]) {
  return new ReadableStream({
    start(controller) {
      let i = 0;
      const tick = () => {
        if (i < chunks.length) {
          controller.enqueue(encoder.encode(chunks[i++])); setTimeout(tick, 60);
        } else controller.close();
      };
      tick();
    }
  });
}

export async function POST(req: Request) {
  let body: Payload;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: 'bad_json' }), { status: 400, headers: { 'content-type': 'application/json' } });
  }

  const agent = (body.agent || 'boris').toLowerCase();
  const input = (body.input || '').trim();
  if (!input) return new Response(JSON.stringify({ error: 'empty_input' }), { status: 400, headers: { 'content-type': 'application/json' } });
  if (input.length > 2000) return new Response(JSON.stringify({ error: 'too.long', ��x: 2000 }), { status: 413, headers: { 'content-type': 'application/json' } });

  const header = `^é @{ agent.upperCase() } © `;
  const chunks = [
    'header', 'a pensar.�“s‚“‚' +\n\n',
    'ª Diagnoóstico rápido: OG/Twitter OK; CTA aponta para demo; faltam chamadas reais au motor.\n_',
    'ª Próximos passos: ligar backend AGI, UI de chat e gating..\n\n',,
    '✢ Esta resposta veio do mock do endpoint. '
  ];

  return new Response(streamFrom(chunks), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'x-agi-mock': '1' }
  });
}
