"use client";

import { SITE } from "@/lib/data";

export default function Footer() {
  const emailChars = SITE.personal.email.split("");

  return (
    <footer id="contact" className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-48 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20">
          
          {/* Left: Huge CTA */}
          <div>
            <span className="badge mb-12">04 // Let's Build Something</span>
            
            <a 
              href={`mailto:${SITE.personal.email}`}
              className="flex flex-wrap font-display text-[clamp(40px,8vw,120px)] font-bold tracking-tight uppercase text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors duration-500 leading-none group"
            >
              {emailChars.map((char, i) => (
                <span 
                  key={i}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-4"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </a>
            
            <p className="mt-12 text-xl md:text-2xl text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Ship a mod, design a site, spin up an AI pipeline. Quick projects and long-haul ones both welcome.
            </p>

            <div className="mt-16 flex gap-6">
              <a href={`mailto:${SITE.personal.email}`} className="btn-primary">
                Send Email
              </a>
              <a href={SITE.personal.socials.wa} target="_blank" rel="noreferrer" className="btn-ghost">
                Direct Chat
              </a>
            </div>
          </div>

          {/* Right: Directory */}
          <div className="flex flex-col gap-16 lg:pl-12 lg:border-l border-[var(--border-subtle)]">
            <div>
              <span className="label mb-6 block text-[var(--text-secondary)]">Socials</span>
              <ul className="space-y-4">
                {Object.entries(SITE.personal.socials).map(([key, url]) => (
                  <li key={key}>
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="font-mono text-sm tracking-widest uppercase text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                    >
                      {key} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="label mb-6 block text-[var(--text-secondary)]">Base</span>
              <ul className="space-y-2 font-mono text-xs tracking-wider uppercase text-[var(--text-tertiary)]">
                <li>{SITE.personal.location}</li>
                <li>{SITE.personal.tzLabel} · MYT</li>
              </ul>
            </div>

            <div className="pt-12 border-t border-[var(--border-subtle)]">
              <span className="label mb-6 block text-[var(--text-secondary)]">Tech</span>
              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] tracking-wider uppercase text-[var(--text-tertiary)]">
                <div className="flex flex-col gap-2">
                  <span>Next.js 16</span>
                  <span>React 19</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span>Tailwind 4</span>
                  <span>Framer 12</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-32 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] tracking-widest uppercase text-[var(--text-tertiary)]">
          <span>© 2026 {SITE.personal.name}</span>
          <span>PORTFOLIO V4 // REIMAGINED</span>
        </div>
      </div>
    </footer>
  );
}
