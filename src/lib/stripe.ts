import Stripe from 'stripe';

export const hasStripe = !!process.env.STRIPE_SECRET_KEY;

export const stripe = hasStripe
  ? new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' })
  : (null as any);

// Normaliza PT/EN e remove acentos (NFD + faixa de diacríticos)
export function getPriceId(plan: string) {
  const p = (plan ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  switch (p) {
    case 'essencial':
    case 'essential':
    case 'basico':
    case 'basic':
      return process.env.STRIPE_PRICE_ESSENCIAL || process.env.STRIPE_PRICE_ESSENTIAL;
    case 'profissional':
    case 'pro':
      return process.env.STRIPE_PRICE_PROFISSIONAL || process.env.STRIPE_PRICE_PRO;
    case 'enterprise':
      return process.env.STRIPE_PRICE_ENTERPRISE;
    default:
      return undefined;
  }
}
