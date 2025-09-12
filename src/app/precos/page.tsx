'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

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
    <main className="container py-12 space-y-12 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Header with mascot */}
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src="/mascotes/boris_variacao_1.png"
              alt="Mascote Boris - Planos CRSET"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 96px, 128px"
              loading="lazy"
            />
          </div>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl text-center text-foreground">Planos CRSET Solutions</h1>
        <p className="text-center text-muted text-lg max-w-2xl mx-auto">Escolhe o plano ideal para a tua empresa.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((p) => (
          <Card key={p.key} className="rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border-slate-200 bg-white space-y-6">
            <div className="space-y-3">
              <h2 className="font-heading text-2xl text-foreground">{p.name}</h2>
              <p className="text-4xl font-heading text-primary">{p.price}</p>
            </div>
            <ul className="text-base space-y-3">
              {p.features.map((f, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-700">{f}</span>
                </li>
              ))}
            </ul>
            {p.key === 'essencial' ? (
              <Button 
                className="w-full shadow-md hover:shadow-lg transition-shadow" 
                size="lg" 
                onClick={() => subscribe(p.key)} 
                disabled={loadingPlan === p.key}
              >
                {loadingPlan === p.key ? 'A abrir checkout...' : 'Subscrever'}
              </Button>
            ) : (
              <Button asChild variant="ghost" size="lg" className="w-full hover:bg-slate-100">
                <a href="/start">Fala connosco</a>
              </Button>
            )}
          </Card>
        ))}
      </div>

      <p className="text-center text-base text-muted max-w-lg mx-auto">Sem fidelizacao. Podes cancelar quando quiseres.</p>
    </main>
  );
}
