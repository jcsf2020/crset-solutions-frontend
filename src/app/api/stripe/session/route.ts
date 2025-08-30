export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') || searchParams.get('session_id');
  if (!id) return NextResponse.json({ error: 'missing session id' }, { status: 400 });

  try {
    const sess = await stripe.checkout.sessions.retrieve(id, { expand: ['customer', 'subscription'] });
    const sub = typeof sess.subscription === 'string' ? null : (sess.subscription ?? null);
    const customer = typeof sess.customer === 'string' ? null : (sess.customer ?? null);
    return NextResponse.json({
      id: sess.id,
      status: sess.status,
      customer_id: typeof sess.customer === 'string' ? sess.customer : customer?.id ?? null,
      customer_email: sess.customer_details?.email ?? (customer as any)?.email ?? null,
      subscription_id: typeof sess.subscription === 'string' ? sess.subscription : sub?.id ?? null,
      subscription_status: sub?.status ?? null,
      amount_total: sess.amount_total,
      currency: sess.currency,
      created: sess.created,
    });
  } catch (e: any) {
    const msg = e?.message || 'retrieve failed';
    const code = msg.includes('No such') ? 404 : 500;
    return NextResponse.json({ error: msg }, { status: code });
  }
}
