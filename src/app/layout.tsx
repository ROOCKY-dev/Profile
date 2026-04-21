import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FloatingShapes from "@/components/ui/FloatingShapes";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Roocky | Developer Portfolio",
    template: "%s | Roocky",
  },
  description:
    "Portfolio of Ahmed Ghaithan — creative developer building web, games, and AI tools from Malaysia.",
  metadataBase: new URL("https://roocky.dev"),
  openGraph: {
    title: "Roocky | Developer Portfolio",
    description:
      "Portfolio of Ahmed Ghaithan — creative developer building web, games, and AI tools from Malaysia.",
    url: "https://roocky.dev",
    siteName: "Roockydev Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roocky | Developer Portfolio",
    description:
      "Portfolio of Ahmed Ghaithan — creative developer building web, games, and AI tools from Malaysia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Analytics />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} font-sans antialiased bg-white text-black overflow-x-hidden`}
      >
        <Navbar />
        <FloatingShapes />
        {children}
      </body>
    </html>
  );
}
