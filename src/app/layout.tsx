import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from '@/components/ui/ToastSystem';
import SmoothScroll from '@/components/ui/SmoothScroll';
import CursorTrail from '@/components/ui/CursorTrail';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nebula Flow - Portfolio",
  description: "Interactive 3D Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased overflow-x-hidden bg-void text-text-primary selection:bg-primary selection:text-void`}
      >
        <NoiseOverlay />
        <SmoothScroll />
        <CursorTrail />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
