import Link from "next/link";

export const metadata = {
  title: "Serviços — CRSET",
  description: "O que fazemos e como entregamos",
  alternates: { canonical: "/servicos" },
};

export default function Page() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10 space-y-10">
      <header>
        <h1 className="text-3xl font-semibold">Serviços</h1>
        <p className="text-muted-foreground mt-2">
          Ciclos curtos, KPIs visíveis e entrega real em produção.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Lançamento Rápido (1–2 semanas)</h2>
        <ul className="list-disc pl-6 text-sm leading-7 text-muted-foreground">
          <li>Landing otimizada + captação de leads</li>
          <li>Integração CRM/Supabase + workflows de e-mail</li>
          <li>Relatórios básicos e alertas</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">AGI & Automação</h2>
        <ul className="list-disc pl-6 text-sm leading-7 text-muted-foreground">
          <li>Assistentes e chatbots orientados a processos</li>
          <li>Integrações com Notion, Gmail, Slack e webhooks</li>
          <li>Guardrails, métricas e modo “humano-no-loop”</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Integrações & Dados</h2>
        <ul className="list-disc pl-6 text-sm leading-7 text-muted-foreground">
          <li>Stripe, Resend, Supabase e serviços de terceiros</li>
          <li>Dashboards de saúde (status/metrics) e telemetry</li>
          <li>CI/CD, monitorização e testes E2E</li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link className="underline" href="/precos">Ver planos & preços</Link>
        <span className="text-muted-foreground">·</span>
        <a className="underline" href="https://agi.crsetsolutions.com" target="_blank" rel="noreferrer">Ver demo AGI</a>
        <span className="text-muted-foreground">·</span>
        <a className="underline" href="mailto:crsetsolutions@gmail.com">Falar com a equipa</a>
      </div>
    </main>
  );
}
