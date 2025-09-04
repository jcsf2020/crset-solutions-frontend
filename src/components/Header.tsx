"use client";
import Link from "next/link";

export default function Header() {
  const nav = [
    { href: "/", label: "Início" },
    { href: "/servicos", label: "Serviços" },
    { href: "/precos", label: "Planos & Preços" },
    // { href: "/agi-live", label: "AGI Live" }, // oculto até estar pronto
    { href: "/centro-de-ajuda", label: "Ajuda" },
  ];
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-lg">CRSET</Link>
        <nav className="flex gap-6 text-sm">
          {nav.map(i => (
            <Link key={i.href} href={i.href} className="hover:opacity-80">{i.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
