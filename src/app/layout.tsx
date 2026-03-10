import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import { PerformanceProvider } from "@/lib/PerformanceContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'Roocky | Creative Developer',
    template: '%s | Roocky',
  },
  description: 'Premium portfolio showcasing web development, creative coding, and AI-powered projects by Ahmed Ghaithan (ROOCKYdev). Building immersive digital experiences.',
  metadataBase: new URL('https://roocky.dev'),
  keywords: ['web developer', 'creative coder', 'portfolio', 'Next.js', 'React', 'AI development', 'game development', 'ROOCKYdev'],
  authors: [{ name: 'Ahmed Ghaithan', url: 'https://roocky.dev' }],
  creator: 'ROOCKYdev',
  openGraph: {
    title: 'Roocky | Creative Developer',
    description: 'Premium portfolio showcasing web development, creative coding, and AI-powered projects.',
    url: 'https://roocky.dev',
    siteName: 'ROOCKYdev Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ROOCKYdev Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roocky | Creative Developer',
    description: 'Premium portfolio showcasing web development, creative coding, and AI-powered projects.',
    images: ['/og-image.jpg'],
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

export const viewport: Viewport = {
  themeColor: '#7C5CFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased bg-background-dark text-text-main font-display selection:bg-primary selection:text-white overflow-x-hidden`}
      >
        <PerformanceProvider>
          {/* Background gradient base */}
          <div className="fixed inset-0 bg-gradient-to-b from-background-dark via-[#0a0a1a] to-background-deep -z-10" />
          
          {/* Noise texture overlay */}
          <NoiseOverlay />
          
          {/* Custom cursor */}
          <CustomCursor />
          
          {/* Navigation */}
          <Navbar />
          
          {/* Main content */}
          {children}
        </PerformanceProvider>
      </body>
    </html>
  );
}
