import MascotesGrid from "../_components/MascotesGrid";

export const metadata = {
  title: "Mascotes — CR_SET SOLUÇÕES",
  description: "Boris, Laya e Irina — funções oficiais e branding estável da CR_SET.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <section className="rounded-3xl bg-surface ring-1 ring-[var(--ring)] p-6 sm:p-10">
        <h1 className="text-[var(--text)] text-3xl sm:text-6xl font-extrabold tracking-tight">
          CR_SET SOLUÇÕES
        </h1>
        <p className="mt-2 text-muted">
          As mascotes oficiais da CR_SET.
        </p>
      </section>

      <MascotesGrid />
    </main>
  );
}
