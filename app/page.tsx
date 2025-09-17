import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/home/SocialProof";
import { ValueProps } from "@/components/home/ValueProps";
import { HowWeWork } from "@/components/home/HowWeWork";
import { FAQ } from "@/components/home/FAQ";
import { MascotBubble } from "@/components/home/MascotBubble";

/**
 * Forca o tema LIGHT no 1o paint (sem tocar em layout.tsx)
 */
function ForceLight() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html:
          "try{localStorage.setItem('theme','light');var d=document.documentElement;d.classList.remove('dark');d.classList.add('light');}catch(_){/*noop*/}",
      }}
    />
  );
}

export const metadata = {
  title: "CRSET Solutions — Automação prática. Sem circo.",
  description: "Automação e AGI aplicada ao negócio. Resultados práticos, sem circo.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12 space-y-14">
      <ForceLight />

      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">CRSET Solutions</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">Início</Link>
          <Link href="/servicos" className="hover:underline">Serviços</Link>
          <Link href="/precos" className="hover:underline">Planos & Preços</Link>
          <Link href="/faq" className="hover:underline">Ajuda</Link>
          <Link href="https://agi.crsetsolutions.com" className="hover:underline">Demo AGI</Link>
        </nav>
      </header>

      {/* Hero claro com fallback de mascote */}
      <section className="relative overflow-hidden rounded-2xl border border-black/10 bg-white text-black p-6 md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full border border-black/20 bg-black/5 px-4 py-1.5 text-sm">
              Foco em resultados • zero drama
            </p>
            <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Automação prática.
              <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-neutral-600">
                Resultado em dias, não meses.
              </span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-700 max-w-prose leading-relaxed">
              Ciclos curtos, KPIs visíveis em produção e zero circo. Começa pequeno, entrega real.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-xl px-6 py-3">
                <Link href="/servicos">Começar agora</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl px-6 py-3 border-black/20 hover:bg-black/5"
              >
                <Link href="/precos">Ver preços</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl px-6 py-3 border-black/20 hover:bg-black/5"
              >
                <Link href="https://agi.crsetsolutions.com">Ver demo AGI</Link>
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-700">
              <span className="rounded-lg border border-black/20 bg-black/5 px-3 py-1">Entrega rápida</span>
              <span className="rounded-lg border border-black/20 bg-black/5 px-3 py-1">KPIs visíveis</span>
              <span className="rounded-lg border border-black/20 bg-black/5 px-3 py-1">Suporte direto</span>
            </div>
          </div>

          {/* Imagem fallback (sem dependencias) */}
          <div className="justify-self-end">
            <img
              src="/og.png"
              alt="Mascote CRSET"
              className="w-full max-w-md rounded-xl border border-black/10"
              loading="eager"
            />
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
        <Link className="underline" href="/faq">Ajuda</Link>
      </footer>

      {/* Mascot Assistant */}
      <MascotBubble />
    </main>
  );
}
