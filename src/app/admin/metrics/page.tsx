'use client';
import { useEffect, useState } from 'react';
import Gate from '../_components/Gate';

export default function MetricsPage() {
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/metrics', { cache: 'no-store' })
      .then(r => r.json())
      .then(j => setData(j))
      .catch(e => setErr(String(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Gate>
      <main style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>CRSET - Métricas</h1>
        {loading && <div>A carregar...</div>}
        {err && <pre style={{ whiteSpace: 'pre-wrap', color: 'crimson' }}>{err}</pre>}
        {data && <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>}
      </main>
    </Gate>
  );
}
