import Link from 'next/link';

type Tier = { name:string; price:string; features:string[]; slug:string; highlight?:boolean };

const tiers: Tier[] = [
  { name: 'Essencial',   price: 'EUR 29/mes',  slug:'essencial',
    features: ['Landing + Captacao', 'Leads basicas', 'Email SDR lite'] },
  { name: 'Profissional', price: 'EUR 79/mes', slug:'profissional', highlight:true,
    features: ['Automation Playbooks', 'Stripe Billing', 'Dashboards', 'WhatsApp Cloud*'] },
  { name: 'Enterprise',   price: 'EUR 199/mes', slug:'enterprise',
    features: ['White-label', 'SLA & SSO', 'Integracoes custom', 'Relatorios avancados'] },
];

export default function PrecosPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-semibold">Planos & Precos</h1>
      <p className="opacity-80 mt-3">Comeca pequeno. Escala quando fizer sentido.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {tiers.map(t => (
          <div key={t.slug} className={`rounded-2xl border p-6 ${t.highlight ? 'shadow-lg' : ''}`}>
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-semibold">{t.name}</h2>
              <span className="text-lg">{t.price}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {t.features.map((f,i)=> <li key={i} className="opacity-80">- {f}</li>)}
            </ul>
            <Link
              href={`/start?plan=${t.slug}`}
              className={`mt-6 inline-block px-4 py-3 rounded-xl ${t.highlight ? 'bg-black text-white' : 'border'}`}
            >
              Comecar agora
            </Link>
          </div>
        ))}
      </div>
      <p className="text-xs opacity-60 mt-6">* Integracoes sujeitas a configuracao.</p>
    </div>
  );
}
