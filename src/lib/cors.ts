/**
 * Middleware de CORS seguro
 * Apenas permite origens específicas em vez de '*'
 */

const ALLOWED_ORIGINS = [
  'https://crsetsolutions.com',
  'https://www.crsetsolutions.com',
  'https://crset-solutions-frontend.vercel.app',
  process.env.NEXT_PUBLIC_FRONTEND_URL,
].filter(Boolean);

export function getCORSHeaders(origin: string | null) {
  const isAllowed = origin && ALLOWED_ORIGINS.includes(origin);
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : '',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'content-type,authorization',
    'Access-Control-Max-Age': '86400',
  };
}

export function withCORS(response: Response, origin: string | null) {
  const headers = getCORSHeaders(origin);
  Object.entries(headers).forEach(([key, value]) => {
    if (value) response.headers.set(key, value);
  });
  return response;
}
