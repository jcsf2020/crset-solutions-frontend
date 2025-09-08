import * as Sentry from '@sentry/nextjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAllowed(req: Request) {
  const need = (process.env.SENTRY_PING_SECRET || '').trim();
  if (!need) return process.env.VERCEL_ENV !== 'production'; // aberto fora de prod
  const got = req.headers.get('x-sentry-ping-secret') || '';
  return got === need;
}

export async function GET(req: Request) {
  if (!isAllowed(req)) return new Response('not found', { status: 404 });
  Sentry.captureMessage('sentry-ping: GET');
  throw new Error('sentry-ping (server)');
}

export async function POST(req: Request) {
  if (!isAllowed(req)) return new Response('not found', { status: 404 });
  Sentry.captureMessage('sentry-ping: POST');
  throw new Error('sentry-ping (server)');
}
