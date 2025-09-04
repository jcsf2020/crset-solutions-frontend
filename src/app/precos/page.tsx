'use client';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    { name: 'Essencial',     key: 'essencial',     price: '49€/mês',  features: [
      'CRM de Leads básico',
      'Automação de contactos (Email + WhatsApp)',
      '1 Agente (Boris OU Laya OU Irina)',
    ]},
    { name: 'Profissional',  key: 'profissional',  price: '149€/mês', features: [
      'Tudo do Essencial',
      'Multi-agente (Boris + Laya + Irina)',
      'Dashboards analíticos',
      'Integração Google Ads + Meta Ads',
      'Até 5 utilizadores',
    ]},
    { name: 'Enterprise',    key: 'enterprise',    price: '499€/mês', features: [
      'Plataforma White-label (branding próprio)',
      'Consultoria + Setup incluído',
      'API privada dedicada',
      'Suporte prioritário',
    ]},
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
        if (json?.error === 'STRIPE_NOT_CONFIGURED') {
          alert('Pagamento ainda não está configurado (Stripe). Fica já tudo pronto - só falta definir as chaves STRIPE.');
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
    <main className="mx-auto max-w-5xl p-6 space-y-12">
      <h1 className="text-3xl font-bold text-center">Planos CRSET Solutions</h1>
      <p className="text-center text-gray-600">Escolhe o plano ideal para a tua empresa.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.key} className="p-6 rounded-2xl shadow-lg border">
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-2xl font-bold text-blue-600 mb-4">{plan.price}</p>
            <ul className="space-y-2 text-sm mb-4">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">✅ {f}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => subscribe(plan.key)}
              disabled={!!loadingPlan}
              className="mt-2 w-full rounded bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loadingPlan === plan.key ? 'A abrir checkout…' : 'Subscrever'}
            </button>
          </Card>
        ))}
      </div>
    </main>
  );
}
