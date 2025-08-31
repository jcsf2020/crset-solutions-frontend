"use client";

import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  recommended?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "49 EUR/mes",
    blurb: "Landing + captacao para validar canal.",
    features: ["Landing + Captacao", "Leads basicas", "Email SDR lite", "Suporte por email"]
  },
  {
    name: "Growth",
    price: "149 EUR/mes",
    blurb: "Stack para escalar aquisicao e operacao.",
    features: ["White-label", "SLA e SSO", "Integracoes custom", "Relatorios avancados"],
    recommended: true
  },
  {
    name: "Scale",
    price: "Sob consulta",
    blurb: "Projeto sob-medida com roadmap continuo.",
    features: ["Discovery e Roadmap", "Data pipeline e BI", "Orquestracao de funis", "Suporte dedicado"]
  }
];

function Card({ plan }: { plan: Plan }) {
  return (
    <div
      className={`card p-6 md:p-7 flex flex-col justify-between relative ${plan.recommended ? "ring-1 ring-black/10" : ""}`}
      aria-label={`Plano ${plan.name}`}
    >
      {plan.recommended && (
        <div className="absolute -top-3 right-4 rounded-full border border-black/10 bg-white px-3 py-1 text-xs shadow">
          Recomendado
        </div>
      )}

      <header className="space-y-1">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <p className="muted">{plan.blurb}</p>
      </header>

      <div className="my-5">
        <div className="text-3xl font-semibold">{plan.price}</div>
        <div className="text-xs muted mt-1">sem fidelizacao</div>
      </div>

      <ul className="space-y-2 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Link href="/start" className="btn-primary px-4 py-2 text-center">Comecar agora</Link>
        <a
          href="https://wa.me/351000000000?text=Quero%20demo%20CRSET"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary px-4 py-2 text-center"
        >
          Falar no WhatsApp
        </a>
      </div>

      <p className="text-[11px] muted mt-4">* Integracoes sujeitas a configuracao.</p>
    </div>
  );
}

export default function Pricing() {
  return (
    <section className="py-14 md:py-20" data-hide-sticky-cta>
      <div className="container-pro">
        <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl font-semibold">Planos & Precos</h1>
          <p className="muted mt-3">
            Escolhe o plano certo para o teu momento. Upgrade facil quando estiveres pronto para escalar.
          </p>
        </header>

        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.name} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
