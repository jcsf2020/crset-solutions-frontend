const env = {
  dsn: process.env.SENTRY_DSN || '',
  env: process.env.SENTRY_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
  release: process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_APP_VERSION || undefined,
};
const isLocal = !process.env.VERCEL && (env.env === 'development' || env.env === 'local');
const base = {
  dsn: env.dsn || undefined,
  environment: env.env,
  release: env.release,
  tracesSampleRate: isLocal ? 0 : 0.2,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0.1,
  autoSessionTracking: false,
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'cancelled',
    'AbortError',
    'NetworkError when attempting to fetch resource.',
  ],
  beforeSend(event){ if(isLocal) return null; return event; },
};
export { env, base };
