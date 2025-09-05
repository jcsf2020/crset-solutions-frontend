import Stripe from 'stripe';

export const hasStripe = !!process.env.STRIPE_SECRET_KEY;

export const stripe = hasStripe
  ? new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2024-06-20',
    })
  : (null as any);

export function getPriceId(plan: string) {
  switch (plan) {
    case 'essencial':   return process.env.STRIPE_PRICE_ESSENCIAL;
    case 'profissional':return process.env.STRIPE_PRICE_PROFISSIONAL;
    case 'enterprise':  return process.env.STRIPE_PRICE_ENTERPRISE;
    default:            return undefined;
  }
}
