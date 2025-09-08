// Util único para chamadas a /api seguro em SSR e no browser
export async function apiFetch(path: string, init?: RequestInit) {
  if (!path || !path.startsWith('/')) throw new Error('apiFetch: use um path absoluto começado por "/"');
  if (typeof window === 'undefined') {
    // Server: construir URL absoluta com headers (sem importar next/headers no topo p/ suportar client components)
    const { headers } = await import('next/headers');
    const h = headers();
    const host = h.get('host') || process.env.VERCEL_URL || 'localhost:3000';
    const proto = h.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    const base = host.startsWith('http') ? host : `${proto}://${host}`;
    return fetch(`${base}${path}`, init);
  }
  // Client: usar relativo normalmente
  return fetch(path, init);
}
