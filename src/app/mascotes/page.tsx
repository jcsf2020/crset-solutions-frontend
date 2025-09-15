import MascotesGrid from "../_components/MascotesGrid";

export const metadata = {
  title: "Mascotes — CR_SET SOLUÇÕES",
  description: "Boris, Laya e Irina — funções oficiais e branding estável da CR_SET.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* HERO leve + acessível */}
      <section className="crs-beam crs-scanlines crs-grid crs-glass rounded-3xl p-8 sm:p-12">
        <h1 className="text-white text-3xl sm:text-6xl font-extrabold tracking-tight">
          CR_SET SOLUÇÕES
        </h1>
        <p className="mt-2 text-white/80">
          As mascotes oficiais da CR_SET.
        </p>
        <div className="mt-4">
          <a href="/#contacto" className="crs-cta">Falar com a CRSET</a>
        </div>
      </section>

      <MascotesGrid />
    </main>
  );
}
