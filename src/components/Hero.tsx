"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-neutral-100 dark:from-black dark:to-neutral-900 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
        Automação Inteligente para o Futuro
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-10">
        CRSET Solutions combina tecnologia de ponta com mascotes únicas para transformar negócios em experiências inteligentes.
      </p>
      <div className="flex justify-center gap-8">
        <Image unoptimized src="/mascotes/oficiais/boris_variacao_1/Boris_variacao_1-w200.webp" alt="Boris" width={200} height={200} className="rounded-xl" priority />
        <Image unoptimized src="/mascotes/oficiais/laya_variacao_1/laya_variacao_1-w200.webp" alt="Laya" width={200} height={200} className="rounded-xl" priority />
        <Image unoptimized src="/mascotes/oficiais/irina_variacao_1/irina_variacao_1-w200.webp" alt="Irina" width={200} height={200} className="rounded-xl" priority />
      </div>
      <div className="mt-10">
        <motion.a
          href="/servicos"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Explorar Serviços
        </motion.a>
      </div>
    </section>
  );
}
