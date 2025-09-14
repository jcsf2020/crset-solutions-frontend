'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  rootMargin?: string;
  idleTimeout?: number;
};

export default function Defer({ children, rootMargin = '200px', idleTimeout = 1200 }: Props) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (show) return;

    let io: IntersectionObserver | null = null;
    let idleId: number | null = null;

    const reveal = () => {
      if (!show) setShow(true);
      if (io) { io.disconnect(); io = null; }
      if (idleId !== null) {
        // @ts-ignore
        if ('cancelIdleCallback' in window) (window as any).cancelIdleCallback(idleId);
        else clearTimeout(idleId);
        idleId = null;
      }
    };

    // Visível no viewport
    if ('IntersectionObserver' in window && ref.current) {
      io = new IntersectionObserver((entries) => {
        for (const e of entries) if (e.isIntersecting) { reveal(); break; }
      }, { rootMargin });
      io.observe(ref.current);
    }

    // Ou quando o browser estiver idle (fallback com timeout)
    const startIdle = () => reveal();
    // @ts-ignore
    if ('requestIdleCallback' in window) idleId = (window as any).requestIdleCallback(startIdle, { timeout: idleTimeout });
    else idleId = window.setTimeout(startIdle, idleTimeout);

    return () => {
      if (io) io.disconnect();
      if (idleId !== null) {
        // @ts-ignore
        if ('cancelIdleCallback' in window) (window as any).cancelIdleCallback(idleId);
        else clearTimeout(idleId);
      }
    };
  }, [show, rootMargin, idleTimeout]);

  return <div ref={ref}>{show ? children : null}</div>;
}
