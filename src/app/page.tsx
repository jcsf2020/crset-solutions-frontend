import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

import Hero from '@/components/hero';
import Defer from '@/lib/defer';

// Client bits (adiados; sem SSR para reduzir TBT)
const ClientPageRootLazy = dynamic(() => import('./ClientPageRoot'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false, loading: () => null });
const TestimonialsLazy = dynamic(() => import('@/components/Testimonials'), { ssr: false, loading: () => null });
const HomeCTAsLazy = dynamic(() => import('./_components/HomeCTAs'), { ssr: false, loading: () => null });

export const metadata: Metadata = {
  openGraph: { url: 'https://crset-solutions-frontend.vercel.app/' },
  alternates: { canonical: 'https://crset-solutions-frontend.vercel.app/' },
};

export default function Page() {
  return (
    <>
      <Hero />
      <ClientPageRootLazy />
      <Defer rootMargin="200px" idleTimeout={1200}>
        <TestimonialsLazy />
      </Defer>
      <Contact />
      <div className="px-6">
        <Defer rootMargin="200px" idleTimeout={1200}>
          <HomeCTAsLazy />
        </Defer>
      </div>
    </>
  );
}

