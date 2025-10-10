"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function FloatingMascots() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('crset_show_mascots');
    if (stored !== null) {
      setIsVisible(stored === 'true');
    } else {
      // Por padrão, mostrar as mascotes
      setIsVisible(true);
      localStorage.setItem('crset_show_mascots', 'true');
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Boris - canto inferior esquerdo */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <div className="relative w-24 h-24 md:w-32 md:h-32 opacity-90 hover:opacity-100 transition-opacity">
          <Image
            src="/mascotes/boris.png"
            alt="Boris - Operações & Segurança"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 96px, 128px"
            priority={false}
          />
        </div>
      </div>

      {/* Laya - canto superior direito */}
      <div className="absolute top-20 right-4 pointer-events-auto">
        <div className="relative w-24 h-24 md:w-32 md:h-32 opacity-90 hover:opacity-100 transition-opacity">
          <Image
            src="/mascotes/Laya.png"
            alt="Laya - Comunicação & Suporte"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 96px, 128px"
            priority={false}
          />
        </div>
      </div>

      {/* Irina - meio direito */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-auto">
        <div className="relative w-24 h-24 md:w-32 md:h-32 opacity-90 hover:opacity-100 transition-opacity">
          <Image
            src="/mascotes/Irina.png"
            alt="Irina - Análise & Inteligência"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 96px, 128px"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
