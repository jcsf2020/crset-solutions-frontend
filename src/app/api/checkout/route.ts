import { stripe, hasStripe, getPriceId, priceEnvSnapshot } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || process.env.PRIMARY_HOST || 'https://crsetsolutions.com';
    const { plan } = await req.json();
    const _snap = priceEnvSnapshot();
    console.log('[checkout] plan', plan, 'env', _snap);

    if (!hasStripe) {
      return Response.json({ error: 'STRIPE_NOT_CONFIGURED' }, { status: 500 });
    }

    const price = getPriceId(String(plan || '').toLowerCase());
    if (!price) {
      return Response.json({ error: 'INVALID_PLAN' }, { status: 400 });
    }

    const session = await (stripe as any).checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/precos?ok=1`,
      cancel_url: `${origin}/precos?cancel=1`,
      allow_promotion_codes: true,
    });

    return Response.json({ url: session.url });
  } catch (e: any) {
    console.error('[checkout] error', e?.message);
    return Response.json({ error: 'CHECKOUT_ERROR' }, { status: 500 });
  }
}
