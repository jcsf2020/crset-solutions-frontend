import Link from "next/link";

export const metadata = {
  title: "CRSET Solutions — Automação prática. Sem circo.",
  description: "Automação e AGI aplicada ao negócio. Resultados práticos, sem circo.",
  alternates: { canonical: '/' },
};

export default function Page() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12 space-y-14">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">CRSET Solutions</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">Início</Link>
          <Link href="/servicos" className="hover:underline">Serviços</Link>
          <Link href="/precos" className="hover:underline">Planos & Preços</Link>
          <Link href="/centro-de-ajuda" className="hover:underline">Ajuda</Link>
          <Link href="/demo" className="hover:underline">Demo AGI</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Foco em resultados • zero drama
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
            Automação prática.<br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Sem circo.
            </span>
          </h2>
          <p className="text-muted-foreground max-w-prose">
            Implementamos AGI/automação no que mexe o ponteiro: processos críticos,
            métricas claras e entregas simples. Você vê o impacto — não o “show”.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/servicos" className="rounded-xl px-5 py-2.5 border bg-primary/5 hover:bg-primary/10">
              Começar agora
            </Link>
            <Link href="/precos" className="rounded-xl px-5 py-2.5 border hover:bg-accent">
              Ver preços
            </Link>
            <Link href="/demo" className="rounded-xl px-5 py-2.5 border hover:bg-accent">
              Ver demo AGI
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="rounded-lg border px-3 py-1">Entrega rápida</span>
            <span className="rounded-lg border px-3 py-1">KPIs visíveis</span>
            <span className="rounded-lg border px-3 py-1">Suporte direto</span>
          </div>
        </div>

        {/* Visual placeholder (estático) */}
        <div className="rounded-2xl border p-6 md:p-8">
          <div className="rounded-xl border p-4">
            <div className="text-sm text-muted-foreground">Estado do sistema</div>
            <pre className="mt-1 font-mono text-sm leading-6">
{`uptime: 42h
status: NOMINAL
módulos: ui, motion, mascots
rede: online`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-xs text-muted-foreground">
        © CRSET Solutions. Links rápidos:{" "}
        <Link className="underline" href="/servicos">Serviços</Link> ·{" "}
        <Link className="underline" href="/precos">Preços</Link> ·{" "}
        <Link className="underline" href="/centro-de-ajuda">Ajuda</Link>
      </footer>
    </main>
  );
}
