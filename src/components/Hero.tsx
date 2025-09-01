"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-neutral-100 dark:from-black dark:to-neutral-900 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
        Automacao Inteligente para o Futuro
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-10">
        CRSET Solutions combina tecnologia de ponta com mascotes unicas para transformar negocios em experiencias inteligentes.
      </p>
      <div className="flex justify-center gap-8">
        <Image src="/mascotes/oficiais/Boris.png" alt="Boris" width={200} height={200} className="rounded-xl" priority />
        <Image src="/mascotes/oficiais/Laya.png" alt="Laya" width={200} height={200} className="rounded-xl" priority />
        <Image src="/mascotes/oficiais/Irina.png" alt="Irina" width={200} height={200} className="rounded-xl" priority />
      </div>
      <div className="mt-10">
        <a
          href="#servicos"
          className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Explorar Servicos
        </a>
      </div>
    </section>
  );
}
