import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
  fallback: ['system-ui','Segoe UI','Roboto','Helvetica','Arial'],
  preload: true,
  weight: ['400','500','600','700'],
  variable: '--font-inter'
});
