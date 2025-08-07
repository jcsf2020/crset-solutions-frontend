import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRSET Solutions - Soluções Digitais Inteligentes',
  description: 'Soluções digitais personalizadas com as nossas mascotes especializadas: Boris, Laya e Irina. Automatização, organização e insights para o seu sucesso.',
  keywords: 'desenvolvimento web, aplicações mobile, automação, e-commerce, soluções cloud, consultoria tech',
  authors: [{ name: 'CRSET Solutions' }],
  openGraph: {
    title: 'CRSET Solutions - Soluções Digitais Inteligentes',
    description: 'Transforme o seu negócio com tecnologia inteligente',
    url: 'https://crsetsolutions.com',
    siteName: 'CRSET Solutions',
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CRSET Solutions - Soluções Digitais Inteligentes',
    description: 'Transforme o seu negócio com tecnologia inteligente',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

