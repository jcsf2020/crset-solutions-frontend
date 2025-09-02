import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from 'next'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StickyCTA from "@/components/StickyCTA";
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRSET Solutions - Solucoes Digitais Inteligentes',
  description: 'Solucoes digitais personalizadas com as nossas mascotes especializadas: Boris, Laya e Irina. Automatizacao, organizacao e insights para o seu sucesso.',
  keywords: 'desenvolvimento web, aplicacoes mobile, automacao, e-commerce, solucoes cloud, consultoria tech, IA, inteligencia artificial, mascotes digitais',
  authors: [{ name: 'CRSET Solutions' }],
  metadataBase: new URL('https://crsetsolutions.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'CRSET Solutions - Solucoes Digitais Inteligentes',
    description: 'Transforme o seu negocio com tecnologia inteligente. Boris, Laya e Irina trabalham para o seu sucesso.',
    url: 'https://crsetsolutions.com',
    siteName: 'CRSET Solutions',
    locale: 'pt_PT',
    type: 'website',
    images: [
      {
        url: 'https://crsetsolutions.com/images/social-share-1200x630.jpg?v=202508252240',
        width: 1200,
        height: 630,
        alt: 'CRSET Solutions - Boris, Laya e Irina',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRSET Solutions - Solucoes Digitais Inteligentes',
    description: 'Transforme o seu negocio com tecnologia inteligente',
    images: ['https://crsetsolutions.com/images/social-share-1200x630.jpg?v=202508252240'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* Google Analytics GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CRSET2025GO"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CRSET2025GO', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true
              });
            `,
          }}
        />

          {/* Meta Pixel desativado ate configurar NEXT_PUBLIC_META_PIXEL_ID */}

        {/* LinkedIn Insight Tag */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "2025GO";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
            `,
          }}
        />

        {/* Meta Pixel NoScript */}
          {/* Meta Pixel NoScript desativado */}
      </head>
      <body className={inter.className}><Header />
        {children}
        <Footer />
        <StickyCTA />
    <SpeedInsights />
  </body>
    </html>
  )
}

