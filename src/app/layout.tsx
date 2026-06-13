import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ROOCKY.DEV — Creative Developer",
    template: "%s | ROOCKY.DEV",
  },
  description:
    "Portfolio of Ahmed Ghaithan — creative developer building web, games, and AI tools from Malaysia.",
  metadataBase: new URL("https://roocky.dev"),
  openGraph: {
    title: "ROOCKY.DEV — Creative Developer",
    description:
      "Portfolio of Ahmed Ghaithan — creative developer building web, games, and AI tools from Malaysia.",
    url: "https://roocky.dev",
    siteName: "ROOCKY.DEV",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROOCKY.DEV — Creative Developer",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        style={{ background: '#050508', color: '#f0f0f5' }}
        suppressHydrationWarning
      >
        {/* Film Grain Overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Mouse-following Glow */}
        <div id="mouse-glow" className="mouse-glow" aria-hidden="true" suppressHydrationWarning />

        <Navbar />
        {children}

        {/* Mouse Glow Tracker Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                const glow = document.getElementById('mouse-glow');
                if (!glow) return;
                let rAF;
                window.addEventListener('mousemove', (e) => {
                  if (rAF) return;
                  rAF = requestAnimationFrame(() => {
                    glow.style.left = e.clientX + 'px';
                    glow.style.top = e.clientY + 'px';
                    rAF = null;
                  });
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
