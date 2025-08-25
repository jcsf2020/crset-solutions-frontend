export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Payload = { agent?: 'boris'|'laya'|'irina'|string; input: string; sessionId?: string };

const encoder = new TextEncoder();
function streamFrom(chunks: string[]) {
  return new ReadableStream({
    start(controller) {
      let i = 0;
      const tick = () => {
        if (i < chunks.length) {
          controller.enqueue(encoder.encode(chunks[i++]));
          setTimeout(tick, 60);
        } else {
          controller.close();
        }
      };
      tick();
    }
  });
}

export async function POST(req: Request) {
  // Fallback: se não houver env, fica ativo (mock)
  const enabled = ((process.env.AGI_PUBLIC_ENABLED ?? 'true') + '').toLowerCase() === 'true';
  const key = process.env.AGI_API_KEY;

  // Se houver chave, exige header. Se não houver, só bloqueia se enabled=false explícito
  if (key) {
    const auth = req.headers.get('authorization') || '';
    if (auth !== `Bearer ${key}`) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
    }
  } else if (!enabled) {
    return new Response(JSON.stringify({ error: 'disabled' }), { status: 503 });
  }

  let body: Payload;
  try { body = await req.json(); } catch { return new Response(JSON.stringify({ error: 'bad_json' }), { status: 400 }); }

  const agent = (body.agent || 'boris').toLowerCase();
  const input = (body.input || '').trim();
  if (!input) return new Response(JSON.stringify({ error: 'empty_input' }), { status: 400 });
  if (input.length > 2000) return new Response(JSON.stringify({ error: 'too_long', max: 2000 }), { status: 413 });

  const header = `🤖 ${agent.toUpperCase()} · `;
  const chunks = [
    header, 'a pensar…\n\n',
    '• Diagnóstico rápido: OG/Twitter OK; CTA aponta para demo; faltam chamadas reais ao motor.\n',
    '• Próximos passos: ligar backend AGI, UI de chat e gating.\n\n',
    '✅ Esta resposta veio do mock do endpoint. '
  ];

  return new Response(streamFrom(chunks), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'x-agi-mock': '1' }
  });
}
