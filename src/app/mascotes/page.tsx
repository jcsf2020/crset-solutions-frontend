import Image from "next/image";

const files = [
  // Boris
  "/mascotes/Boris.png","/mascotes/boris_variacao_1.png","/mascotes/boris_variacao_2.png","/mascotes/boris_variacao_3.png","/mascotes/boris_variacao_automacao.png",
  // Irina
  "/mascotes/Irina.png","/mascotes/irina_variacao_1.png","/mascotes/irina_variacao_2.png","/mascotes/irina_variacao_3.png","/mascotes/irina_variacao_insights.png",
  // Laya
  "/mascotes/Laya.png","/mascotes/laya_variacao_1.png","/mascotes/laya_variacao_2.png","/mascotes/laya_variacao_3.png","/mascotes/laya_casual_coworking.png","/mascotes/laya_lider_equipa.png","/mascotes/laya_futurista_tech.png","/mascotes/laya_variacao_comunicacao.png",
  // Conjuntas
  "/mascotes/crset_mascotes_conjunta.png","/mascotes/crset_mascotes_conjunta_equipa.png","/mascotes/crset_mascotes_conjunta_nova.png","/mascotes/crset_mascotes_conjunta_refinada.png",
];

export default function MascotesPage() {
  return (
    <main className="max-w-6xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Mascotes CRSET</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {files.map((src) => (
          <div key={src} className="rounded-xl shadow-sm border p-3 bg-white dark:bg-neutral-900">
            <Image src={src} alt={src.split("/").pop()||"mascote"} width={800} height={800} className="rounded-lg h-auto w-full" priority />
            <p className="mt-2 text-sm text-center break-all">{src.replace("/mascotes/","")}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
