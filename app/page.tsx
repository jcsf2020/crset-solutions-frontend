import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/home/SocialProof";
import { ValueProps } from "@/components/home/ValueProps";
import { HowWeWork } from "@/components/home/HowWeWork";
import { FAQ } from "@/components/home/FAQ";
import { MascotBubble } from "@/components/home/MascotBubble";

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
          <Link href="https://agi.crsetsolutions.com" className="hover:underline">Demo AGI</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative py-24 md:py-28">
        {/* Decorative Layers */}
        {/* Grid fino */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "center",
          }}
        />
        
        {/* Beams suaves */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 via-transparent to-fuchsia-400/20" />
          <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400/15 via-transparent to-purple-500/15" />
        </div>

        {/* Rings finos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full ring-1 ring-white/10 blur-[1px] opacity-30" />
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full ring-1 ring-white/10 blur-[1px] opacity-30" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full ring-1 ring-white/10 blur-[1px] opacity-20" />
        </div>

        <div className="relative z-10 grid gap-10 md:grid-cols-2 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80">
              Foco em resultados • zero drama
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Automação prática.<br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                Sem circo.
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-prose leading-relaxed">
              Implementamos AGI/automação no que mexe o ponteiro: processos críticos,
              métricas claras e entregas simples. Você vê o impacto — não o "show".
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                asChild 
                className="rounded-xl px-6 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                <Link href="/servicos">Começar agora</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="rounded-xl px-6 py-3 border-white/20 bg-white/5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                <Link href="/precos">Ver preços</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="rounded-xl px-6 py-3 border-white/20 bg-white/5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                <Link href="https://agi.crsetsolutions.com">Ver demo AGI</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <span className="rounded-lg border border-white/20 bg-white/5 px-3 py-1">Entrega rápida</span>
              <span className="rounded-lg border border-white/20 bg-white/5 px-3 py-1">KPIs visíveis</span>
              <span className="rounded-lg border border-white/20 bg-white/5 px-3 py-1">Suporte direto</span>
            </div>
          </div>

          {/* Visual placeholder (glass) */}
          <div className="bg-white/5 ring-1 ring-white/10 shadow-lg rounded-xl p-6 md:p-8">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white/70 mb-2">Estado do sistema</div>
              <pre className="font-mono text-sm leading-6 text-white/80">
{`uptime: 42h
status: NOMINAL
módulos: ui, motion, mascots
rede: online`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Value Props */}
      <ValueProps />

      {/* How We Work */}
      <HowWeWork />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <footer className="text-xs text-muted-foreground">
        © CRSET Solutions. Links rápidos:{" "}
        <Link className="underline" href="/servicos">Serviços</Link> ·{" "}
        <Link className="underline" href="/precos">Preços</Link> ·{" "}
        <Link className="underline" href="/centro-de-ajuda">Ajuda</Link>
      </footer>

      {/* Mascot Assistant */}
      <MascotBubble />
    </main>
  );
}

