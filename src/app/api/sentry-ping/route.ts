import * as Sentry from '@sentry/nextjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() { Sentry.captureMessage('sentry-ping: GET'); throw new Error('sentry-ping (server)'); }
export async function POST() { Sentry.captureMessage('sentry-ping: POST'); throw new Error('sentry-ping (server)'); }
