import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRSET Solutions - Soluções Digitais Inteligentes',
  description: 'Soluções digitais personalizadas com as nossas mascotes especializadas: Boris, Laya e Irina. Automatização, organização e insights para o seu sucesso.',
  keywords: 'desenvolvimento web, aplicações mobile, automação, e-commerce, soluções cloud, consultoria tech',
  authors: [{ name: 'CRSET Solutions' }],
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

