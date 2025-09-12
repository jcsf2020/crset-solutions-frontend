'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    { name: 'Essencial', key: 'essencial', price: '49EUR/mes', features: ['CRM de Leads basico','Automacao de contactos (Email + WhatsApp)','1 Agente (Boris OU Laya OU Irina)'] },
    { name: 'Profissional', key: 'profissional', price: '149EUR/mes', features: ['Tudo do Essencial','Multi-agente (Boris + Laya + Irina)','Dashboards analiticos','Integracao Google Ads + Meta Ads','Ate 5 utilizadores'] },
    { name: 'Enterprise', key: 'enterprise', price: '499EUR/mes', features: ['Plataforma White-label (branding proprio)','Consultoria + Setup incluido','API privada dedicada','Suporte prioritario'] },
  ];

  async function subscribe(planKey: string) {
    try {
      setLoadingPlan(planKey);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ plan: planKey }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json?.error === 'stripe_unconfigured') {
          alert('Pagamento desativado neste momento. Quando quiseres ligar o Stripe, define STRIPE_SECRET_KEY e PRICE_* nos envs.');
        } else {
          alert('Erro: ' + (json?.error || res.statusText));
        }
        return;
      }
      if (json?.url) window.location.href = json.url;
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <main className="container py-12 space-y-8">
      <h1 className="font-heading text-4xl md:text-5xl text-center text-foreground">Planos CRSET Solutions</h1>
      <p className="text-center text-muted">Escolhe o plano ideal para a tua empresa.</p>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.key} className="rounded-2xl p-6">
            <h2 className="font-heading text-xl text-foreground">{p.name}</h2>
            <p className="text-3xl font-heading text-primary mt-1 mb-3">{p.price}</p>
            <ul className="text-sm space-y-2 mb-4">
              {p.features.map((f, i) => (
                <li key={i} className="flex gap-2 items-start"><span aria-hidden>v</span><span>{f}</span></li>
              ))}
            </ul>
            {p.key === 'essencial' ? (
              <Button className="w-full" size="lg" onClick={() => subscribe(p.key)} disabled={loadingPlan === p.key}>
                {loadingPlan === p.key ? 'A abrir checkout...' : 'Subscrever'}
              </Button>
            ) : (
              <Button asChild variant="ghost" size="lg" className="w-full">
                <a href="/start">Fala connosco</a>
              </Button>
            )}
          </Card>
        ))}
      </div>

      <p className="text-center text-sm text-muted">Sem fidelizacao. Podes cancelar quando quiseres.</p>
    </main>
  );
}
