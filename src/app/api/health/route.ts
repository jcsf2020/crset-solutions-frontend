export async function GET() {
  const urls = [
    { name: 'fe_leads',   url: `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/leads` || '/api/leads' },
    { name: 'fe_metrics', url: `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/metrics` || '/api/metrics' },
    { name: 'be_health',  url: 'https://crset-api-production.up.railway.app/health' },
  ];

  const checks = await Promise.all(urls.map(async (u) => {
    try {
      const r = await fetch(u.url, { cache: 'no-store' });
      return { name: u.name, url: u.url, ok: r.ok, status: r.status };
    } catch (e:any) {
      return { name: u.name, url: u.url, ok: false, status: 0, error: String(e?.message || e) };
    }
  }));

  return Response.json({
    ts: new Date().toISOString(),
    env: process.env.ENVIRONMENT || 'production',
    checks,
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    }
  });
}
