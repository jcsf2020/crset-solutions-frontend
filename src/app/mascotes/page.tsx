import MascotesGrid from "../_components/MascotesGrid";

export const metadata = {
  title: "Mascotes — CRSET Solutions",
  description: "Conhece a nossa equipa de mascotes: Boris, Laya e Irina",
  alternates: { canonical: "/mascotes" },
};

export default function Page() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Mascotes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Conhece a nossa equipa de mascotes que representam os valores e a personalidade da CRSET Solutions.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">A Nossa Equipa</h2>
        <MascotesGrid />
      </div>

      <div className="bg-muted/50 rounded-2xl p-6 text-center space-y-4">
        <h3 className="text-lg font-semibold">Trabalham em Equipa</h3>
        <p className="text-muted-foreground">
          Boris, Laya e Irina representam as diferentes áreas da nossa empresa: 
          operações e segurança, comunicação e suporte, e análise e inteligência. 
          Juntos, garantem que cada projeto é executado com excelência.
        </p>
      </div>
    </main>
  );
}
