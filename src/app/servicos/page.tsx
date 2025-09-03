import Link from "next/link";

const ITEMS = [
  { nome: "Integracao AI", desc: "Automatiza leads, chat e processos", preço: "desde 49EUR/mes", cta: "/precos" },
  { nome: "Imobiliaria Smart", desc: "CRM + captacao + AGI para imobiliarias", preço: "sob consulta", cta: "/imobiliaria" },
  { nome: "White-label SaaS", desc: "Licencia a plataforma com a tua marca", preço: "desde 499EUR/mes", cta: "/precos" },
];

export default function ServiçosPage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Serviços CRSET Solutions</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {ITEMS.map((s) => (
          <div key={s.nome} className="border rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-semibold">{s.nome}</h2>
            <p className="text-gray-600 mt-1">{s.desc}</p>
            <p className="mt-2 font-bold">{s.preço}</p>
            <Link href={s.cta} className="inline-block mt-4 px-4 py-2 rounded-md bg-blue-600 text-white">
              Saber mais
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
