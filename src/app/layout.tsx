import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import { PerformanceProvider } from "@/lib/PerformanceContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: 'Roocky | Developer Portfolio',
        template: '%s | Roocky',
    },

    description: 'A brutalist, high-performance portfolio showcasing web development and creative coding projects of ROOCKYdev | Ahmed Ghaithan.',
    metadataBase: new URL('https://roocky.dev'),
    openGraph: {
        title: 'Roocky | Developer Portfolio',
        description: 'Web development and creative coding projects of ROOCKYdev | Ahmed Ghaithan. ',
        url: 'https://roocky.dev',
        siteName: 'Roockydev Portfolio',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Roocky | Developer Portfolio',
        description: 'Web development and creative coding projects of ROOCKYdev | Ahmed Ghaithan.',
    },
    robots: {
        index: true,
        follow: true,
    },
    /*
    verification: {
        google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    },
    */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased bg-background-dark text-text-main font-display selection:bg-primary selection:text-background-dark overflow-x-hidden`}
      >
        <PerformanceProvider>
          <NoiseOverlay />
          <CustomCursor />
          <Navbar />
          {children}
        </PerformanceProvider>
      </body>
    </html>
  );
}
