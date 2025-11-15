"use client";
import { motion } from "framer-motion";
import mascotes from '@/data/mascotes';
import MascoteCardAnimated from './MascoteCardAnimated';

// Cache busting: v2 - Force fresh bundle generation
const SECTION_VERSION = "v2.0.0";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.1
    } 
  },
};

export default function MascotesSectionAnimated() {
  return (
    <section 
      id="mascotes" 
      className="py-16 md:py-20 bg-[rgb(var(--bg))]"
      data-section-version={SECTION_VERSION}
    >
      <div className="container-pro">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-2"
          initial={{ opacity: 0, y: -16 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Conheca as Nossas Mascotes
        </motion.h2>

        <motion.p 
          className="text-center text-blue-200 mb-8 md:mb-10"
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          Boris • Laya • Irina
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
        >
          {mascotes.map((m) => (
            <MascoteCardAnimated key={m.id} m={m} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
