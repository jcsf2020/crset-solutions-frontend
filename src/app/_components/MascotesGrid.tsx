import Image from "next/image";
import { MASCOTES } from "../../content/mascotes";

export default function MascotesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {MASCOTES.map((m) => (
        <figure
          key={m.id}
          className="rounded-2xl ring-1 ring-[var(--ring)] bg-[var(--card)]/90 p-4 transition hover:bg-[var(--card)]"
        >
          <div className="overflow-hidden rounded-xl">
            <Image
              src={m.ativo}
              alt={m.imagens[0]?.alt ?? `${m.nome} — ${m.funcao}`}
              width={800}
              height={800}
              className="aspect-square object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
            />
          </div>
          <figcaption className="mt-3">
            <p className="text-lg font-semibold leading-snug break-words text-[var(--text-strong)]">
              {m.imagens.find(i => i.file === m.ativo)?.title ?? `${m.nome} — ${m.funcao}`}
            </p>
            <p className="text-sm leading-snug text-[var(--muted)]">{m.nome} — mascote</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
