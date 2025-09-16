import Link from "next/link";

export const metadata = {
  title: "CRSET Solutions — Automação prática. Sem circo.",
  description: "Automação e AGI aplicada ao negócio. Resultados práticos, sem circo.",
};

export default function Page() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12 space-y-12">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">CRSET Solutions</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">Início</Link>
          <Link href="/servicos" className="hover:underline">Serviços</Link>
          <Link href="/precos" className="hover:underline">Planos & Preços</Link>
          <Link href="/centro-de-ajuda" className="hover:underline">Ajuda</Link>
        </nav>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-medium">Automação prática. Sem circo.</h2>
        <p className="text-muted-foreground">
          Implementamos AGI/automação orientada a resultados. Entregas simples, métricas claras e zero drama.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/servicos" className="rounded-xl px-4 py-2 border hover:bg-accent">Começar</Link>
          <Link href="/faq" className="rounded-xl px-4 py-2 border hover:bg-accent">FAQ</Link>
          <Link href="/mascotes" className="rounded-xl px-4 py-2 border hover:bg-accent">Mascotes</Link>
          <Link href="/precos" className="rounded-xl px-4 py-2 border hover:bg-accent">Ver Preços</Link>
          <Link href="/demo" className="rounded-xl px-4 py-2 border hover:bg-accent">Demo AGI</Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-5">
          <h3 className="font-semibold mb-1">Setup rápido</h3>
          <p className="text-sm text-muted-foreground">Onboarding simples. Integrações na prática.</p>
        </div>
        <div className="rounded-2xl border p-5">
          <h3 className="font-semibold mb-1">Métricas</h3>
          <p className="text-sm text-muted-foreground">KPIs visíveis. Nada de caixa preta.</p>
        </div>
        <div className="rounded-2xl border p-5">
          <h3 className="font-semibold mb-1">Suporte direto</h3>
          <p className="text-sm text-muted-foreground">Sem burocracia. Canal direto e resolutivo.</p>
        </div>
      </section>

      <footer className="text-xs text-muted-foreground">
        © CRSET Solutions. Links rápidos:{" "}
        <Link className="underline" href="/servicos">Serviços</Link> ·{" "}
        <Link className="underline" href="/precos">Preços</Link> ·{" "}
        <Link className="underline" href="/centro-de-ajuda">Ajuda</Link>
      </footer>
    </main>
  );
}
