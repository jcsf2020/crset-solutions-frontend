'use client';
import { useEffect, useState } from 'react';
import Gate from '../_components/Gate';

type M = {
  total: number;
  last24h: number;
  last7d: number;
  top_utm: [string, number][];
  by_day: { date: string; count: number }[];
};

export default function MetricsPage() {
  const [m, setM] = useState<M | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setErr(null);
    fetch('/api/metrics', { cache: 'no-store' })
      .then(r => r.json())
      .then(j => setM(j as M))
      .catch(e => setErr(String(e)))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const series = m?.by_day ?? [];
  const max = Math.max(1, ...series.map(d => d.count));

  return (
    <Gate>
      <main style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>CRSET — Métricas</h1>
          <button onClick={load} disabled={loading} style={{ marginLeft: 'auto', border: '1px solid #ddd', borderRadius: 10, padding: '6px 10px' }}>
            {loading ? 'A atualizar…' : 'Atualizar'}
          </button>
        </div>

        {err && <div style={{ color: 'crimson', marginBottom: 12 }}>Erro: {err}</div>}

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(12,minmax(0,1fr))', gap: 12, marginBottom: 16 }}>
          <div style={{ gridColumn: 'span 4', border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ opacity: .6, fontSize: 12 }}>Total</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{m?.total ?? '—'}</div>
          </div>
          <div style={{ gridColumn: 'span 4', border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ opacity: .6, fontSize: 12 }}>Últimas 24h</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{m?.last24h ?? '—'}</div>
          </div>
          <div style={{ gridColumn: 'span 4', border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ opacity: .6, fontSize: 12 }}>Últimos 7 dias</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{m?.last7d ?? '—'}</div>
          </div>

          <div style={{ gridColumn: 'span 12', border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ opacity: .6, fontSize: 12, marginBottom: 6 }}>Série (14 dias)</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 44 }}>
              {series.length ? series.map((d, i) => (
                <div key={i} title={`${d.date}: ${d.count}`}
                  style={{ width: 10, height: Math.max(2, Math.round((d.count / max) * 38)), borderRadius: 3, background: '#ddd' }} />
              )) : <span style={{ opacity: .6, fontSize: 12 }}>—</span>}
            </div>
          </div>

          <div style={{ gridColumn: 'span 12', border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ opacity: .6, fontSize: 12, marginBottom: 8 }}>Top UTM</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(m?.top_utm ?? []).length ? m!.top_utm.map(([k, c], i) => (
                <span key={i} style={{ border: '1px solid #ddd', borderRadius: 999, padding: '4px 8px', fontSize: 12 }}>
                  {k} • {c}
                </span>
              )) : <span style={{ opacity: .6, fontSize: 12 }}>—</span>}
            </div>
          </div>
        </section>
      </main>
    </Gate>
  );
}
