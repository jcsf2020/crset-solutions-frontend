import Link from "next/link";

export const metadata = {
  title: "Preços — CRSET",
  description: "Planos simples, foco em resultado",
  alternates: { canonical: "/precos" },
};

function Plan({
  name, price, period, bullets, highlight = false,
}: { name:string; price:string; period:string; bullets:string[]; highlight?:boolean }) {
  return (
    <div className={`rounded-2xl border p-6 md:p-8 ${highlight ? "border-white/30 bg-white/5 shadow" : "border-white/15"}`}>
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="mt-2 text-3xl font-bold">
        {price}
        <span className="text-base font-normal text-muted-foreground">/{period}</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {bullets.map((b, i) => <li key={i}>• {b}</li>)}
      </ul>
      <div className="mt-6">
        <Link href="/servicos" className="underline">Começar</Link>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10 space-y-10">
      <header>
        <h1 className="text-3xl font-semibold">Planos & Preços</h1>
        <p className="text-muted-foreground mt-2">Transparência e iteração rápida. Cancelar quando quiser.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Plan
          name="Starter"
          price="€0"
          period="setup"
          bullets={[
            "Avaliação & plano de 1 sprint",
            "Landing + captação de leads",
            "Métricas básicas e alertas",
          ]}
        />
        <Plan
          name="Essential"
          price="€490"
          period="mês"
          highlight
          bullets={[
            "Fluxos de e-mail + CRM",
            "Integrações chave (Stripe/Resend/Supabase)",
            "Dashboards e guardrails",
          ]}
        />
        <Plan
          name="Growth"
          price="€1.490"
          period="mês"
          bullets={[
            "AGI/assistentes orientados a processos",
            "Testes E2E + relatórios semanais",
            "SLA e acompanhamento dedicado",
          ]}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        * Valores indicativos. Personalizamos conforme o contexto. <Link href="/faq" className="underline">Ver FAQ</Link>.
      </p>
    </main>
  );
}
