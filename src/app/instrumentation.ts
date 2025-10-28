export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    import('@sentry/nextjs')
      .then(S => {
        S.init({
          dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
          tracesSampleRate: 0.1,
          environment: process.env.NODE_ENV || 'production',
        });
      })
      .catch(() => {});
  }
}
