import Link from "next/link";

export default function HomeCTAs() {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Link 
        href="/servicos" 
        className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Ver Serviços
      </Link>
      <Link 
        href="/precos" 
        className="inline-flex items-center px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Planos & Preços
      </Link>
      <Link 
        href="/agi-live" 
        className="inline-flex items-center px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Demo AGI (JWT)
      </Link>
    </div>
  );
}
