import { NextResponse } from "next/server";

export async function POST() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;
  // Sem config → não crasha preview/prod sem secret
  if (!stripeKey || !priceId) {
    console.warn("⚠️ Stripe checkout desativado (sem STRIPE_SECRET_KEY/STRIPE_PRICE_ID)");
    return NextResponse.json({ ok:false, disabled:true }, { status: 200 });
  }
  // TODO: aqui entra a tua lógica Stripe real quando estiver configurado
  return NextResponse.json({ ok:true }, { status: 200 });
}
