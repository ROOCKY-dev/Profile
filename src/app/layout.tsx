import type { Metadata } from 'next';
import { Archivo, Archivo_Black, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import TopTicker from '@/components/layout/TopTicker';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { Analytics } from "@vercel/analytics/next";

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--sans',
});

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--mono',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--space',
});

export const metadata: Metadata = {
  title: 'AG — ROOCKY.DEV / Portfolio No. 04',
  description: 'Creative Thinker & Tech Enthusiast based in Kuala Lumpur. Crafting immersive digital experiences; bridging the gap between imagination and reality.',
  metadataBase: new URL("https://roocky.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <Analytics />
      </head>
      <body className="antialiased">
        <div className="paper-grain" />
        <ScrollProgress />
        <TopTicker />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
