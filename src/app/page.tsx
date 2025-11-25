import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/home/SocialProof";
import { ValueProps } from "@/components/home/ValueProps";
import { HowWeWork } from "@/components/home/HowWeWork";
import { FAQ } from "@/components/home/FAQ";
import { MascotBubble } from "@/components/home/MascotBubble";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

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
  title: "CRSET Solutions — Automação que impressiona",
  description: "Automação e AGI aplicada ao negócio. Design moderno, resultados reais.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
      <ForceLight />

      {/* Header Navigation */}
      <header className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            CRSET
          </Link>
          <nav id="navigation" className="hidden md:flex items-center space-x-8 text-sm font-medium" aria-label="Navegação principal">
            <Link href="/" className="hover:text-purple-600 transition-colors">Início</Link>
            <Link href="/servicos" className="hover:text-purple-600 transition-colors">Serviços</Link>
            <Link href="/precos" className="hover:text-purple-600 transition-colors">Planos & Preços</Link>
            <Link href="/faq" className="hover:text-purple-600 transition-colors">Ajuda</Link>
            <Link href="https://agi.crsetsolutions.com" className="hover:text-purple-600 transition-colors">Demo AGI</Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* Hero Section - REDESIGNED */}
      <section id="main-content" className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Resultados em dias, não meses
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="font-display text-6xl md:text-8xl font-black leading-none tracking-tight">
              <span className="block text-slate-900">Automação</span>
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                que impressiona
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl">
              Design moderno, código limpo e resultados reais. Não é só funcional — é <span className="font-bold text-purple-600">bonito</span>.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-bold rounded-2xl shadow-xl-vibrant hover:shadow-glow-purple transition-all duration-300 hover:scale-105"
              >
                <Link href="/servicos">
                  <span className="relative z-10">Ver Demo Interativa</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-bold rounded-2xl border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 hover:scale-105"
              >
                <Link href="https://wa.me/351914423688?text=Olá! Gostaria de saber mais sobre os serviços CRSET.">
                  WhatsApp direto
                </Link>
              </Button>
            </div>
            
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm text-sm font-semibold text-slate-700">
                <span className="text-xl">⚡</span>
                Entrega rápida
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm text-sm font-semibold text-slate-700">
                <span className="text-xl">🎨</span>
                Design impactante
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm text-sm font-semibold text-slate-700">
                <span className="text-xl">🚀</span>
                Suporte direto
              </span>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main gradient card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-1 shadow-2xl">
              <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-12 h-[500px] flex items-center justify-center">
                {/* Animated gradient orbs */}
                <div className="relative w-full h-full">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float"></div>
                  <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
                  <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-orange-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-9xl animate-pulse">⚡</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-glow-purple flex items-center justify-center text-4xl animate-bounce">
              🚀
            </div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-400 to-orange-500 shadow-glow-pink flex items-center justify-center text-3xl animate-bounce" style={{animationDelay: '1s'}}>
              ✨
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <SocialProof />
      </div>

      {/* Value Props */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <ValueProps />
      </div>

      {/* How We Work */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <HowWeWork />
      </div>

      {/* FAQ */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <FAQ />
      </div>

      {/* Footer */}
      <footer className="container mx-auto max-w-7xl px-4 py-12 text-center text-sm text-slate-600">
        <p>
          © 2025 CRSET Solutions. Links rápidos:{" "}
          <Link className="underline hover:text-purple-600 transition-colors" href="/servicos">Serviços</Link> ·{" "}
          <Link className="underline hover:text-purple-600 transition-colors" href="/precos">Preços</Link> ·{" "}
          <Link className="underline hover:text-purple-600 transition-colors" href="/faq">Ajuda</Link>
        </p>
      </footer>

      {/* Mascot Assistant */}
      <MascotBubble />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CRSET Solutions",
            "description": "Automação e AGI aplicada ao negócio. Design moderno, resultados reais.",
            "url": "https://crsetsolutions.com",
            "logo": "https://crsetsolutions.com/logo.png",
            "sameAs": [
              "https://agi.crsetsolutions.com"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://crsetsolutions.com/#contact"
            },
            "offers": {
              "@type": "AggregateOffer",
              "description": "Serviços de automação e AGI para empresas",
              "url": "https://crsetsolutions.com/servicos"
            }
          })
        }}
      />
    </main>
  );
}
