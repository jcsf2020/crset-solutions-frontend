"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white/90 backdrop-blur" data-hide-sticky-cta>
      <div className="container-pro py-10 grid gap-8 md:grid-cols-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">CRSET Solutions</h3>
          <p className="muted text-sm">Solucoes digitais inteligentes para captar, organizar e escalar.</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Produto</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/start" className="hover:underline">Comecar</Link></li>
            <li><Link href="/precos" className="hover:underline">Precos</Link></li>
            <li><a href="/servicos" className="hover:underline">Servicos</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Empresa</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/#contacto" className="hover:underline">Equipa</a></li>
            <li><a href="#contacto" className="hover:underline">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Suporte</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:crsetsolutions@gmail.com" className="hover:underline">crsetsolutions@gmail.com</a></li>
            <li><a href="#" className="hover:underline">Centro de ajuda</a></li>
          </ul>
        </div>
      </div>

      <div className="container-pro py-6 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="muted text-xs"> ${new Date().getFullYear()} CRSET Solutions. Todos os direitos reservados.</p>
        <div className="flex items-center gap-4 text-xs">
          <a href="#" className="hover:underline">Termos</a>
          <a href="#" className="hover:underline">Privacidade</a>
          <a href="https://wa.me/351914423688?text=Quero%20demo%20CRSET" target="_blank" rel="noopener noreferrer" className="btn-secondary px-3 py-1.5">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
