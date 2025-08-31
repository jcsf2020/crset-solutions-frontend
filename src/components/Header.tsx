"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          CRSET Solutions
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/#servicos" className="hover:text-gray-900 transition">Servicos</Link>
          <Link href="/precos" className="hover:text-gray-900 transition">Precos</Link>
          <Link href="/#equipa" className="hover:text-gray-900 transition">Equipa</Link>
          <Link href="/#contacto" className="hover:text-gray-900 transition">Contacto</Link>
        </nav>

        {/* CTA */}
        <div className="flex gap-3">
          <Link
            href="/start"
            className="px-4 py-2 rounded-xl font-semibold text-white bg-black hover:bg-black/90 active:scale-[.99] transition"
          >
            Comecar
          </Link>
          <a
            href="https://wa.me/351000000000?text=Quero%20demo%20CRSET"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl font-semibold border border-black/10 hover:bg-gray-50 transition"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
