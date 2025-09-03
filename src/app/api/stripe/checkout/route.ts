import { NextResponse } from "next/server";

export async function POST() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!stripeKey || !priceId) {
    console.warn("⚠️ Stripe checkout desativado (sem STRIPE_SECRET_KEY/STRIPE_PRICE_ID)");
    return NextResponse.json({ ok: false, disabled: true }, { status: 200 });
  }
  // TODO: implementar checkout real quando as envs estiverem configuradas
  return NextResponse.json({ ok: true }, { status: 200 });
}
