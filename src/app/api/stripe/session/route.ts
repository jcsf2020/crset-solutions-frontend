export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Disable Stripe session creation when not configured. */
export async function POST(req: Request) {
  const SK =
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_API_KEY ||
    process.env.NEXT_PRIVATE_STRIPE_SECRET;

  if (!SK) {
    return new Response(
      JSON.stringify({ ok: false, error: 'stripe_not_configured' }),
      { status: 501, headers: { 'content-type': 'application/json' } }
    );
  }

  const { default: Stripe } = await import('stripe');
  // @ts-ignore - basic runtime usage is fine
  const stripe = new Stripe(SK);

  const payload = await req.json().catch(() => ({}));
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: payload.line_items || [],
    success_url: payload.success_url || 'https://crsetsolutions.com/sucesso',
    cancel_url: payload.cancel_url || 'https://crsetsolutions.com/cancelado',
  });

  return new Response(JSON.stringify({ ok: true, id: session.id }), {
    headers: { 'content-type': 'application/json' },
  });
}

/** Optional: block GET explicitly to avoid pre-render confusion */
export async function GET() {
  return new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), {
    status: 405,
    headers: { 'content-type': 'application/json' },
  });
}
