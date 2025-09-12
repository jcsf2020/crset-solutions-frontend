import { Inter } from "next/font/google";

export const fontSans = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap",
  preload: true
});

export const fontHeading = Inter({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  display: "swap",
  preload: true
});
