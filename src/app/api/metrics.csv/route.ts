export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Metrics = {
  total: number;
  last24h: number;
  last7d: number;
  by_day: { date: string; count: number }[];
  top_utm: [string, number][];
};

export async function GET(req: Request) {
  try {
    const origin = new URL(req.url).origin;
    const r = await fetch(`${origin}/api/metrics`, { cache: 'no-store' });
    if (!r.ok) return new Response(`error: /api/metrics ${r.status}`, { status: 500 });

    const m = (await r.json()) as Metrics;
    const rows = [['date','count'], ...((m.by_day || []).map(d => [d.date, String(d.count)]))];

    const csv = rows.map(cols => cols.map(v => /[",\n]/.test(v) ? `"${v.replace(/"/g,'""')}"` : v).join(',')).join('\n');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename=metrics.csv',
        'Cache-Control': 'no-store, max-age=0, must-revalidate'
      }
    });
  } catch (e: any) {
    return new Response(`error: ${e?.message || String(e)}`, { status: 500 });
  }
}
