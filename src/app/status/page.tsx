export const metadata = { title: 'Estado do sistema • CRSET' };
export const dynamic = 'force-dynamic';

async function getJSON(url:string){
  try{
    const r = await fetch(url, { cache: 'no-store' });
    if(!r.ok) return null;
    return r.json();
  }catch{ return null; }
}

export default async function StatusPage(){
  const [s, health] = await Promise.all([
    getJSON('/api/agi/status'),
    getJSON('/api/health'),
  ]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Estado do sistema</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card label="Backend" value={s?.backend ?? '—'} />
        <Card label="Gated" value={String(!!s?.gated)} />
        <Card label="AGI /status" value={s?.ok ? 'OK' : '—'} />
        <Card label="Health" value={health?.ok ? 'OK' : '—'} />
      </div>
      <p className="mt-8 text-sm text-white/60">Actualizado: {s?.now ? new Date(s.now).toLocaleString() : '—'}</p>
    </main>
  );
}

function Card({label, value}:{label:string; value:string}){
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm text-white/60">{label}</div>
      <div className="mt-1 text-xl font-medium">{value}</div>
    </div>
  );
}
