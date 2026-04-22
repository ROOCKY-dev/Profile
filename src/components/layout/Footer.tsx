"use client";

import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export default function Footer() {
  const D = PORTFOLIO_DATA;
  const email = D.personal.email;

  return (
    <footer id="contact" className="bg-black text-white p-6 md:p-12 lg:p-20 overflow-hidden relative border-t-2 border-black min-h-screen flex flex-col justify-center snap-start">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none grid-bg" />

      <div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-20 lg:gap-40 items-center py-20">
        {/* Left Side: Contact */}
        <div className="flex flex-col justify-center">
          <div>
            <span className="label-text text-gray-700 block mb-12 uppercase tracking-[8px] font-black">07 / LET'S BUILD SOMETHING</span>
            
            <a 
              href={`mailto:${email}`}
              className="giant-email block cursor-pointer group select-none"
            >
              {email.split("").map((char, i) => (
                <span key={i}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </a>

            <p className="mt-20 text-2xl md:text-3xl text-gray-500 max-w-2xl leading-[1.1] font-black tracking-tighter uppercase">
              Ship a mod, design a site, spin up an AI pipeline. Quick
              projects and long-haul ones both welcome.
            </p>
          </div>

          <div className="mt-20 flex flex-wrap gap-8">
            <a href={`mailto:${email}`} className="btn bg-white text-black border-white hover:bg-black hover:text-white px-12 h-[64px] text-xs font-black shadow-[10px_10px_0_rgba(255,255,255,0.1)] hover:shadow-none transition-all">
              <span>Send Email</span>
              <span>→</span>
            </a>
            <a href={D.personal.socials.wa} className="btn bg-transparent text-white border-white hover:bg-white hover:text-black px-12 h-[64px] text-xs font-black">
              <span>Direct Chat</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Right Side: Directory */}
        <div className="flex flex-col justify-center border-l-0 lg:border-l-2 border-gray-900 lg:pl-20">
          <div>
            <span className="label-text text-gray-800 mb-16 block uppercase tracking-[4px] font-black underline decoration-gray-800 underline-offset-8 decoration-4">Directory // Workshop</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 font-mono text-[13px] font-bold tracking-[3px] uppercase">
              <div className="space-y-12">
                <div className="flex flex-col gap-4">
                  <span className="text-gray-700 text-[10px] tracking-[4px] font-black">Socials</span>
                  <a href={D.personal.socials.github} className="text-white hover:text-gray-400 transition-all hover:translate-x-3 inline-block">Github</a>
                  <a href={D.personal.socials.instagram} className="text-white hover:text-gray-400 transition-all hover:translate-x-3 inline-block">Instagram</a>
                  <a href={D.personal.socials.wa} className="text-white hover:text-gray-400 transition-all hover:translate-x-3 inline-block">WhatsApp</a>
                </div>
              </div>

              <div className="space-y-12">
                <div className="flex flex-col gap-4">
                  <span className="text-gray-700 text-[10px] tracking-[4px] font-black">Base</span>
                  <span className="text-white">Kuala Lumpur, MY</span>
                  <span className="text-white">{D.personal.tzLabel} · MYT</span>
                  <span className="text-white">UNITEN — Cyber Sec</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-40 border-t-2 border-gray-900 pt-16">
            <div className="label-text text-gray-800 mb-8 uppercase tracking-[4px] font-black">Engineered with</div>
            <div className="grid grid-cols-2 gap-10 font-mono text-[11px] text-gray-600 tracking-[3px] uppercase font-black">
              <div className="flex flex-col gap-3">
                <span className="text-gray-400">Next.js 16</span>
                <span className="text-gray-400">React 19</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-gray-400">Tailwind 4</span>
                <span className="text-gray-400">Framer 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-24 pt-12 border-t border-gray-950 flex flex-col md:flex-row justify-between gap-10 font-mono text-[11px] text-gray-900 tracking-[6px] uppercase font-black bg-black z-20">
        <span>© 2026 {D.personal.name}</span>
        <div className="flex gap-16">
          <span>PORTFOLIO {D.portfolio.issue}</span>
          <span>V {D.portfolio.version}</span>
        </div>
      </div>
    </footer>
  );
}
