"use client";
import Image from "next/image";

export default function MascoteBoris() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/mascotes/oficiais/boris_variacao_1/Boris_variacao_1-w512.webp"
        alt="Boris - Especialista em Automação"
        width={512}
        height={512}
        sizes="(max-width: 640px) 200px, (max-width: 1024px) 256px, 512px"
        placeholder="blur"
        blurDataURL="/mascotes/oficiais/boris_variacao_1/Boris_variacao_1-w200.webp"
        priority
      />
      <p className="mt-4 text-lg font-semibold">Boris — Automação</p>
    </div>
  );
}
