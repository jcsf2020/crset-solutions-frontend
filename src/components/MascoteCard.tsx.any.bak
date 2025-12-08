"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Mascote } from "@/data/mascotes";

const card = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible:{ opacity: 1, y: 0, scale: 1, transition:{ type:"spring", stiffness:140, damping:18, duration:0.5 } }
};

const img = {
  hover:{ scale: 1.06, rotate: 2, transition: { duration: 0.3 } },
  tap:{ scale: 0.97 }
};

export default function MascoteCard({ m }: { m: Mascote }) {
  const openChat = () => {
    window.dispatchEvent(
      new CustomEvent("crset:chat:open", { detail: { mascot: m.id, greeting: `Ola! Sou ${m.name}.` } })
    );
  };

  return (
    <motion.div
      className="glass-card p-6 rounded-2xl cursor-pointer"
      variants={card}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onClick={openChat}
      data-testid={`mascot-${m.id}`}
    >
      <motion.div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl"
                  variants={img} whileHover="hover" whileTap="tap">
        <Image
          src={m.src}
          alt={`Mascote ${m.name}`}
          fill
          className="object-contain"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          priority={m.id === "boris"}
        />
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-1">{m.name}</h3>
      <p className="text-sm text-blue-300 mb-2">{m.title}</p>
      <p className="text-sm text-gray-300">{m.blurb}</p>
    </motion.div>
  );
}
