export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { redis } from '@/lib/redis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
const WHSEC = process.env.STRIPE_WEBHOOK_SECRET!;

export async function GET() { return NextResponse.json({ ok: true }); }

export async function POST(req: NextRequest) {
  try {
    if (!WHSEC) return NextResponse.json({ ok:false, error:'Missing STRIPE_WEBHOOK_SECRET' }, { status:500 });
    const sig = req.headers.get('stripe-signature');
    if (!sig) return NextResponse.json({ ok:false, error:'No signature' }, { status:400 });

    const raw = await req.text();
    const event = await stripe.webhooks.constructEventAsync(raw, sig, WHSEC);

    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object as Stripe.Checkout.Session;
        const customer = typeof s.customer === 'string' ? s.customer : (s.customer as any)?.id;
        const sub = typeof s.subscription === 'string' ? s.subscription : (s.subscription as any)?.id;
        await redis?.hset(`stripe:session:${s.id}`, {
          id: s.id, status:'completed', customer_id: customer ?? '', subscription_id: sub ?? '',
          amount_total: String(s.amount_total ?? 0), currency: s.currency ?? 'eur', created: String(s.created ?? 0),
        });
        if (customer) await redis?.sadd(`stripe:customer:${customer}:sessions`, s.id);
        console.log('✅ checkout.session.completed', { id:s.id, customer, sub, amount_total:s.amount_total ?? null });
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const customer = typeof sub.customer === 'string' ? sub.customer : (sub.customer as any)?.id;
        const price = sub.items?.data?.[0]?.price?.id ?? '';
        await redis?.hset(`stripe:sub:${sub.id}`, {
          id: sub.id, customer_id: customer ?? '', status: sub.status, price_id: price,
          current_period_end: String(sub.current_period_end ?? 0), cancel_at_period_end: String(sub.cancel_at_period_end ?? false),
        });
        if (customer) await redis?.set(`stripe:customer:${customer}:active_sub`, sub.id);
        console.log(`ℹ️ ${event.type}`, { id:sub.id, status:sub.status, price, current_period_end: sub.current_period_end });
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
