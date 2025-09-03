"use client";
import Image from "next/image";

export default function MascoteIrina() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/mascotes/irina.png"
        alt="Irina - Inteligência e Dados"
        width={512}
        height={512}
        sizes="(max-width: 640px) 200px, (max-width: 1024px) 256px, 512px"
        placeholder="blur"
        blurDataURL="/mascotes/irina.png"
      />
      <p className="mt-4 text-lg font-semibold">Irina - Inteligência e Dados</p>
    </div>
  );
}
