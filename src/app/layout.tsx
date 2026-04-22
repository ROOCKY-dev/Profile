import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Archivo_Black } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
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
    <html lang="en" className="scroll-smooth snap-y snap-mandatory">
      <head>
        <Analytics />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} ${archivoBlack.variable} font-sans antialiased bg-white text-black`}
      >
        <Navbar />
        {children}

        {/* Mouse Parallax Variables */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                const root = document.documentElement;
                window.addEventListener('mousemove', (e) => {
                  const mvx = (e.clientX / window.innerWidth) - 0.5;
                  const mvy = (e.clientY / window.innerHeight) - 0.5;
                  root.style.setProperty('--mx', mvx.toFixed(3));
                  root.style.setProperty('--my', mvy.toFixed(3));
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
