/**
 * Price management utilities with environment variables and fallbacks
 */

export const env = (k: string, fb?: string) => (process.env[k] ?? fb ?? "").trim();

export function pricePair(prefix: string, fbSetup: string, fbMonth: string) {
  const setup = env(`NEXT_PUBLIC_PRICE_${prefix}_SETUP`, fbSetup);
  const month = env(`NEXT_PUBLIC_PRICE_${prefix}_MONTH`, fbMonth);
  return { setup, month };
}

// Fallback prices for all services
export const PRICE_FALLBACKS = {
  ESSENTIAL: { setup: "€990", month: "€59-€79/m" },
  PRO: { setup: "€2.4k-€3.5k", month: "€129-€199/m" },
  ENTERPRISE: { setup: "Sob consulta", month: "Custom" },
  IMOBILIARIA: { setup: "€2.9k-€4.9k", month: "€179-€249/m" },
  AGENDA: { setup: "€1.2k-€2.5k", month: "€79-€129/m" },
  ECOMMERCE: { setup: "€1.5k-€3k", month: "€99-€149/m + Shopify" },
  CATALOGO: { setup: "€1.8k-€3.2k", month: "€99-€149/m" },
} as const;

export type ServiceKey = keyof typeof PRICE_FALLBACKS;

