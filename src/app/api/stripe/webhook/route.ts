export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  try {
    if (!STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ ok: false, error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 });
    }

    const sig = req.headers.get('stripe-signature');
    if (!sig) return NextResponse.json({ ok: false, error: 'No signature' }, { status: 400 });

    const raw = await req.text();
    const event = await stripe.webhooks.constructEventAsync(raw, sig, STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object as Stripe.Checkout.Session;
        console.log('✅ checkout.session.completed', {
          id: s.id,
          customer: s.customer,
          sub: s.subscription,
          amount_total: s.amount_total ?? null,
        });
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        console.log(`ℹ️ ${event.type}`, {
          id: sub.id,
          status: sub.status,
          price: sub.items?.data?.[0]?.price?.id,
          current_period_end: sub.current_period_end,
        });
        break;
      }
      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice;
        console.log('⚠️ invoice.payment_failed', { id: inv.id, customer: inv.customer });
        break;
      }
      default:
        console.log('➡️ Unhandled event', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('❌ Webhook error', err?.message || err);
    return new NextResponse('Webhook error', { status: 400 });
  }
}
