import Link from "next/link";

export default function HomeCTAs() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link href="/servicos" className="px-5 py-3 rounded-md bg-blue-600 text-white">Ver Servicos</Link>
      <Link href="/precos" className="px-5 py-3 rounded-md border">Planos & Precos</Link>
      <Link href="/agi-live" className="px-5 py-3 rounded-md border">Demo AGI (JWT)</Link>
    </div>
  );
}
