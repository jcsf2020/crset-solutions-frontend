import Link from "next/link";

export const metadata = {
  title: "Precos — CRSET",
  description: "Planos simples, foco em resultado",
  alternates: { canonical: "/precos" },
};

type PlanProps = {
  name: string;
  setup: string;   // one-time
  monthly: string; // per month
  bullets: string[];
  highlight?: boolean;
};

function Plan({ name, setup, monthly, bullets, highlight = false }: PlanProps) {
  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 ${
        highlight ? "border-white/30 bg-white/5 shadow" : "border-white/15"
      }`}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="mt-3 flex items-baseline gap-3">
        <div className="text-3xl font-bold">Setup {setup}</div>
        <div className="text-base text-muted-foreground">+ {monthly}</div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {bullets.map((b, i) => (
          <li key={i}>• {b}</li>
        ))}
      </ul>
      <div className="mt-6">
        <Link
          href="/servicos"
          className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
        >
          Pedir proposta
        </Link>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Planos &amp; Precos</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Valores base. Precos sem IVA. Personalizacoes sob orcamento.
        </p>
      </header>

      {/* Linha principal */}
      <section className="grid gap-6 md:grid-cols-3">
        <Plan
          name="Essential"
          setup="EUR 990"
          monthly="EUR 79/m"
          bullets={[
            "Site CRSET pronto a usar",
            "Leads por email (Resend)",
            "Atualizacoes basicas",
          ]}
        />
        <Plan
          name="Pro"
          setup="EUR 2900"
          monthly="EUR 149/m"
          highlight
          bullets={[
            "Automacoes de marketing",
            "Leads + integracoes Notion/Supabase",
            "Relatorios base",
          ]}
        />
        <Plan
          name="Enterprise"
          setup="EUR 5900"
          monthly="EUR 299/m"
          bullets={[
            "Layout e modulos custom",
            "SLA de prioridade",
            "Integracoes avancadas",
          ]}
        />
      </section>

      {/* Linha por nichos */}
      <section className="mt-10 grid gap-6 md:grid-cols-4">
        <Plan
          name="Imobiliaria"
          setup="EUR 3900"
          monthly="EUR 199/m"
          bullets={[
            "Modulos de imoveis",
            "Agendamento de visitas",
            "Integracoes com portais",
          ]}
        />
        <Plan
          name="Agenda"
          setup="EUR 1900"
          monthly="EUR 119/m"
          bullets={[
            "Paginas de servico",
            "Reserva de slots",
            "Alertas por email",
          ]}
        />
        <Plan
          name="Ecommerce"
          setup="EUR 3500"
          monthly="EUR 149/m"
          bullets={[
            "Catalogo + checkout",
            "Integracao Shopify (opcional)",
            "Relatorios simples",
          ]}
        />
        <Plan
          name="Catalogo"
          setup="EUR 2500"
          monthly="EUR 129/m"
          bullets={[
            "Catalogo de produtos",
            "Formularios de pedido",
            "Leads integradas",
          ]}
        />
      </section>

      <footer className="mt-10 text-sm text-muted-foreground">
        Precisas de outro pacote?{" "}
        <Link href="/faq" className="underline">
          Fala connosco
        </Link>
        .
      </footer>
    </main>
  );
}
