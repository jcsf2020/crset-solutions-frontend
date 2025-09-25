import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import HeroSciFi from '@/components/HeroSciFi';
import NavigationSciFi from '@/components/NavigationSciFi';

// Client components with optimized loading states
const ServicesGrid = dynamic(() => import('@/components/ServicesGrid'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="text-sm text-muted-foreground animate-pulse">Carregando serviços...</div>
      </div>
    </div>
  ),
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="text-sm text-muted-foreground animate-pulse">Carregando contacto...</div>
      </div>
    </div>
  ),
});

const FooterSciFi = dynamic(() => import('@/components/FooterSciFi'), {
  ssr: false,
  loading: () => <div className="min-h-[200px] bg-background/50 animate-pulse rounded" />,
});

export const metadata: Metadata = {
  title: 'CRSET Solutions - Automação Inteligente para Empresas',
  description: 'Transformamos processos complexos em soluções elegantes e eficientes. IA Conversacional, Automação de Processos e Integração Empresarial.',
  keywords: ['automação', 'IA', 'inteligência artificial', 'processos empresariais', 'CRSET'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CRSET Solutions - Automação Inteligente',
    description: 'Soluções de automação e IA para empresas que pensam no futuro.',
    url: 'https://crsetsolutions.com',
    siteName: 'CRSET Solutions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CRSET Solutions',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRSET Solutions - Automação Inteligente',
    description: 'Soluções de automação e IA para empresas que pensam no futuro.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://crsetsolutions.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage() {
  return (
    <>
      <NavigationSciFi />
      
      <main>
        {/* Hero Section */}
        <HeroSciFi />
        
        {/* Services Section */}
        <section className="py-24 relative">
          <div className="container-pro">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                Soluções Empresariais
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Descobra como as nossas soluções podem transformar a sua empresa
              </p>
            </div>
            <ServicesGrid />
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-24 relative">
          <div className="container-pro">
            <ContactSection />
          </div>
        </section>
      </main>
      
      <FooterSciFi />
    </>
  );
}
