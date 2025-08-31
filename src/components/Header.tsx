"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="container-pro flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          CRSET Solutions
        </Link>

        {/* Nav (desktop) */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/servicos" className="hover:text-gray-900 transition">Servicos</Link>
          <Link href="/precos" className="hover:text-gray-900 transition">Precos</Link>
          <Link href="/#contacto" className="hover:text-gray-900 transition">Equipa</Link>
          <Link href="/#contacto" className="hover:text-gray-900 transition">Contacto</Link>
        </nav>

        {/* CTAs (desktop) */}
        <div className="hidden md:flex gap-3">
          <Link href="/start" className="btn-primary">Comecar</Link>
          <a
            href="https://wa.me/351914423688?text=Quero%20demo%20CRSET"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            WhatsApp
          </a>
        </div>

        {/* Burger (mobile) */}
        <button
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-black transition ${open ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`block h-0.5 w-5 bg-black transition ${open ? "opacity-0" : ""}`}></span>
            <span className={`block h-0.5 w-5 bg-black transition ${open ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
          </div>
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="md:hidden border-t border-gray-200">
          <div className="container-pro py-4 flex flex-col gap-4">
            <Link href="/servicos" onClick={() => setOpen(false)} className="text-base">Servicos</Link>
            <Link href="/precos" onClick={() => setOpen(false)} className="text-base">Precos</Link>
            <Link href="/#contacto" onClick={() => setOpen(false)} className="text-base">Equipa</Link>
            <Link href="/#contacto" onClick={() => setOpen(false)} className="text-base">Contacto</Link>
            <div className="pt-2 flex gap-3">
              <Link href="/start" onClick={() => setOpen(false)} className="btn-primary flex-1 text-center">Comecar</Link>
              <a
                href="https://wa.me/351914423688?text=Quero%20demo%20CRSET"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 text-center"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
