'use client';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl md:text-6xl font-semibold leading-tight">
          Automacao real para PMEs.
          <span className="block opacity-70">Converte leads. Fatura. Escala.</span>
        </h1>
        <p className="mt-4 text-base md:text-lg opacity-80">
          CRSET Solutions - stack afiada para vender e operar, sem ruido.
        </p>
        <div className="hidden md:flex gap-3 mt-8">
          <Link href="/start" className="px-5 py-3 rounded-xl bg-black text-white">
            Comecar agora
          </Link>
          <Link href="/Precos" className="px-5 py-3 rounded-xl border">
            Ver Precos
          </Link>
        </div>
      </div>
      {/* CTA fixo em mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white/80 backdrop-blur p-3 flex gap-2">
        <Link href="/start" className="flex-1 px-4 py-3 rounded-lg bg-black text-white text-center">Comecar</Link>
        <Link href="/Precos" className="flex-1 px-4 py-3 rounded-lg border text-center">Precos</Link>
      </div>
    </section>
  );
}
