import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

import Hero from '@/components/hero';
import Defer from '@/lib/defer';

// Client bits (adiados; sem SSR) + placeholders com altura para evitar CLS
const ClientPageRootLazy = dynamic(() => import('./ClientPageRoot'), {
  ssr: false,
  loading: () => null,
});
const Contact = dynamic(() => import('@/components/Contact'), {
  ssr: false,
  loading: () => <div className="min-h-[560px]" aria-hidden />,
});
const TestimonialsLazy = dynamic(() => import('@/components/Testimonials'), {
  ssr: false,
  loading: () => <div className="min-h-[560px]" aria-hidden />,
});
const HomeCTAsLazy = dynamic(() => import('./_components/HomeCTAs'), {
  ssr: false,
  loading: () => <div className="min-h-[240px]" aria-hidden />,
});

export const metadata: Metadata = {
  openGraph: { url: 'https://crset-solutions-frontend.vercel.app/' },
  alternates: { canonical: 'https://crset-solutions-frontend.vercel.app/' },
};

export default function Page() {
  return (
    <>
      <Hero />

      <ClientPageRootLazy />

      {/* Testimonials: reserva altura para não empurrar nada antes de montar */}
      <section aria-label="testimonials" className="min-h-[560px]">
        <Defer rootMargin="200px" idleTimeout={1200}>
          <TestimonialsLazy />
        </Defer>
      </section>

      {/* Contact com placeholder fixo para evitar CLS */}
      <Contact />

      <div className="px-6">
        {/* HomeCTAs: reserva altura antes de montar */}
        <section aria-label="home-ctas" className="min-h-[240px]">
          <Defer rootMargin="200px" idleTimeout={1200}>
            <HomeCTAsLazy />
          </Defer>
        </section>
      </div>
    </>
  );
}
