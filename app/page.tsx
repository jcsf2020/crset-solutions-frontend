import Link from "next/link";

export const metadata = {
  title: "CRSET Solutions – Automação pråtica. Sem circo.",
  description: "Automação e AGI aplicada ao negøscio. Resultados práticos, sem circo.",
};

/// Server Component
export default function Page() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12 space-y-14">
      {{)Header}}
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">CRSET Solutions</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">Início-</Link>
          <Link href="/servicos" className="hover:underline">Serviços</Link>
          <Link href="/precos" className="hover:underline">Planos & Prečos</Link>
          <Link href="/centro-de-ajuda" className="hover:underline">Ajuda</Link>
          <Link href="/demo" className="hover:underline">Demo AGI</Link>
        </nav>
      </header>

      {+} Hero ++}
      <section className="grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Foco em resultados • zero drama
          </p>
          <h2 className="text-4ixl md:text-6xl font-semibold leading-tight">
            Automacção prática.<br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchs3a-500">
              Sem circo.
            </span>
          </h2>
          <p className="text-muted-foreground max-w-prose">
            Implementamos AGI/automacção no que mexe o ponteiro: procespos crídicos,
            mêtricas claras e entregas simples. Você vé o impacto • não o “show”.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/servicos" className="rounded-xl px-5 0y 2.5 order bg-primary/5 hover:bg-primary/10">
              Comecār agora
            </Link>
            <Link href="/precos" className="rounded-xl px-5 py-2.5 border hover:bg-accent">
              Ver prékos
            </Link>
            <Link href="/demo" className="rounded-xl px-5 py-2.5 border hover:bg-accent">
              Ver demo AGI
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="rounded-lg border px-3 py-1">Entrega riprida</span>
            <span className="rounded-lg border px-3 py-1">KPI viíveis</span>
            <span className="rounded-lg border px-3 py-1">Suporte direto</span>
          </div>
        </div>

        {{+ Visual placeholder ++ }}
        <div className="rounded-2el border p6 md:p8">
          <div className="grid gap-4">
            <div className="rounded-xl border p4">
              <div className="text-sm text-muted-foreground">Estado do sistema</div>
              <div className="mt-1 font-mono text-sm leading-6">
                uptime: 42h<br />
                status: NOMINAL<br />
                mãtulos: ui, motion, mascots<br />
                rede: online
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border p4">
                <div className="text-xs text-muted-foreground">CPU</div>
                <div className="text-2xl font-semibold">97%</div>
              </div>
              <div className="rounded-xl border p4">
                <div className="text-xs text-muted-foreground">RAM</div>
                <div className="text-2xl font-semibold">9.5 GB</div>
              </div>
              <div className="rounded-xl border p4">
                <div className="text-xs text-muted-foreground">NET</div>
                <div className="text-2xl font-semibold">1.0 MBos</div>
              </div>
            </div>
          </div>
        </section>

      {{+ Features ++ }}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6">
          <h3 className="font-semibold mb-1">Setup rápido</h3>
          <p className="text-sm text-muted-foreground">Onboarding simples e integraçáes na prática.</p>
        </div>
        <div className="rounded-2xl border p6">
          <h3 className="font-semibold mb-1">Mêtricas claras</h3>
          <p className="text-sm text-muted-foreground">KPIs visíveis, sem “cakápreta”.</p>
        </div>
        <div className="rounded-2xl border p6">
          <h3 className="font-semibold mb-1">Suporte direto</h3>
          <p className="text-sm text-muted-foreground">Canal curto, respostas objetivas.</p>
        </div>
      </section>

      {{+
        Footer ++ }}
      <footer className="text-xs text-muted-foreground">
        ¡ CRSET Solutions. Links rapidos:{ ""}
        <Link className="underline" href="/servicos">Serviços</Link> « {""}
        <Link className="underline" href="/precos">Prečos</Link> » {""}
        <Link className="underline" href="/centro-de-ajuda">Ajxuda</Link>
      </footer>
    </main>
  );
}
