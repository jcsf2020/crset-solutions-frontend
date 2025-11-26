import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/home/SocialProof";
import { ValueProps } from "@/components/home/ValueProps";
import { HowWeWork } from "@/components/home/HowWeWork";
import { FAQ } from "@/components/home/FAQ";
import { MascotBubble } from "@/components/home/MascotBubble";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/**
 * Force LIGHT theme on first paint (without touching layout.tsx)
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

export const metadata: Metadata = {
  title: "CRSET Solutions — Automation that impresses",
  description: "Automation and AGI applied to business. Modern design, real results.",
  alternates: {
    canonical: "https://crsetsolutions.com/en",
    languages: {
      'pt': 'https://crsetsolutions.com',
      'en': 'https://crsetsolutions.com/en',
    },
  },
};

export default function HomePageEN() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
      <ForceLight />

      {/* Header Navigation */}
      <header className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/en" className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            CRSET
          </Link>
          <nav id="navigation" className="hidden md:flex items-center space-x-8 text-sm font-medium" aria-label="Main navigation">
            <Link href="/en" className="hover:text-purple-600 transition-colors">Home</Link>
            <Link href="/en/services" className="hover:text-purple-600 transition-colors">Services</Link>
            <Link href="/en/pricing" className="hover:text-purple-600 transition-colors">Plans & Pricing</Link>
            <Link href="/en/help" className="hover:text-purple-600 transition-colors">Help</Link>
            <Link href="https://agi.crsetsolutions.com" className="hover:text-purple-600 transition-colors">AGI Demo</Link>
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
                Results in days, not months
              </span>
            </div>
            
            {/* Main Heading */}
            <h1 className="font-display text-6xl md:text-8xl font-black leading-none tracking-tight">
              <span className="block text-slate-900">Automation</span>
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                that impresses
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl">
              Modern design, clean code and real results. It's not just functional — it's <span className="font-bold text-purple-600">beautiful</span>.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-bold rounded-2xl shadow-xl-vibrant hover:shadow-glow-purple transition-all duration-300 hover:scale-105"
              >
                <Link href="/en/services">
                  <span className="relative z-10">View Interactive Demo</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-bold rounded-2xl border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 hover:scale-105"
              >
                <Link href="https://wa.me/351914423688?text=Hi! I would like to know more about CRSET services.">
                  WhatsApp direct
                </Link>
              </Button>
            </div>
            
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm text-sm font-semibold text-slate-700">
                <span className="text-xl">⚡</span>
                Fast delivery
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm text-sm font-semibold text-slate-700">
                <span className="text-xl">🎨</span>
                Impactful design
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-purple-100 shadow-sm text-sm font-semibold text-slate-700">
                <span className="text-xl">🚀</span>
                Direct support
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
          © 2025 CRSET Solutions. Quick links:{" "}
          <Link className="underline hover:text-purple-600 transition-colors" href="/en/services">Services</Link> ·{" "}
          <Link className="underline hover:text-purple-600 transition-colors" href="/en/pricing">Pricing</Link> ·{" "}
          <Link className="underline hover:text-purple-600 transition-colors" href="/en/help">Help</Link>
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
            "description": "Automation and AGI applied to business. Modern design, real results.",
            "url": "https://crsetsolutions.com/en",
            "logo": "https://crsetsolutions.com/logo.png",
            "sameAs": [
              "https://agi.crsetsolutions.com"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://crsetsolutions.com/en#contact"
            },
            "offers": {
              "@type": "AggregateOffer",
              "description": "Automation and AGI services for businesses",
              "url": "https://crsetsolutions.com/en/services"
            }
          })
        }}
      />
    </main>
  );
}
