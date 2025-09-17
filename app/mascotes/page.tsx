export const metadata = {
  title: "Mascotes — CRSET",
  description: "A nossa família de mascotes",
  alternates: { canonical: "/mascotes" },
};

const MASCOTS = [
  { name: "Bolt", role: "engenheiro apressado", blurb: "Adora automatizar tudo o que é repetitivo." },
  { name: "Neko", role: "UX vigilante", blurb: "Garante que cada fluxo é simples e claro." },
  { name: "Turingo", role: "AGI nerd", blurb: "Fala APIs, streams e tokens como ninguém." },
];

export default function Page() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10 space-y-8">
      <h1 className="text-3xl font-semibold">Mascotes</h1>
      <p className="text-muted-foreground">Companheiros que representam como trabalhamos.</p>

      <div className="grid gap-6 md:grid-cols-3">
        {MASCOTS.map(m => (
          <div key={m.name} className="rounded-2xl border border-white/15 p-6 bg-white/5">
            <div className="text-xl font-semibold">{m.name}</div>
            <div className="text-sm text-white/70">{m.role}</div>
            <p className="mt-3 text-sm text-muted-foreground">{m.blurb}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
