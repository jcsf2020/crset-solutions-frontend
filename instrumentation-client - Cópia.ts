export function register() {
  // Só inicializa em produção (mantém tua política)
  if (process.env.NODE_ENV !== 'production') return;

  // Evita init duplicado no cliente
  if ((globalThis as any).__SENTRY_INIT__) return;

  (globalThis as any).__SENTRY_INIT__ = true;

  // Carga tardia para não prender o bundle
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Sentry = require('@sentry/nextjs');

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || 'production',
    tracesSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
  });
}

/** Sentry router transitions (Next 14+ exige este export) */
export const onRouterTransitionStart = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') return;
  // lazy-require para não pesar o bundle
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Sentry = require('@sentry/nextjs');
  // @ts-ignore - tipagem interna do SDK
  return Sentry.captureRouterTransitionStart(...(args as any));
};
