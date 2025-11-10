"use client";
import { motion } from "framer-motion";
import mascotes from '@/data/mascotes';
import MascoteCard from './MascoteCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function MascotesSection() {
  return (
    <section id="mascotes" className="py-16 md:py-20 bg-[rgb(var(--bg))]">
      <div className="container-pro">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2"
           initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
           Conheca as Nossas Mascotes
        </motion.h2>

        <motion.p className="text-center text-blue-200 mb-8 md:mb-10"
           initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
           Boris • Laya • Irina
        </motion.p>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {mascotes.map((m) => (<MascoteCard key={m.id} m={m} />))}
        </motion.div>
      </div>
    </section>
  );
}
