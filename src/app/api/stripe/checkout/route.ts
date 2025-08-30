export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

function isLiveKey(k:string){ return /^sk_live_/.test(k||''); }

export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  const { priceId, success_url, cancel_url } = body || {};

  if (!priceId) return NextResponse.json({error:'priceId missing'}, {status:400});

  const SK = process.env.STRIPE_SECRET_KEY || '';
  const LIVE_ALLOWED = (process.env.STRIPE_LIVE_ALLOWED||'0') === '1';
  if (isLiveKey(SK) && !LIVE_ALLOWED) {
    return NextResponse.json({error:'live disabled'}, {status:403});
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(SK, { apiVersion: '2024-06-20' });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: success_url || 'https://crsetsolutions.com/success',
    cancel_url: cancel_url || 'https://crsetsolutions.com/pricing',
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url }, { status: 200 });
}
