import Link from 'next/link';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function Footer() {
  const email = PORTFOLIO_DATA.personal.email;
  const [localPart, domainPart] = email.split('@');

  return (
    <footer className="relative py-20 px-6 border-b border-border-dark bg-surface-highlight overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#CCFF00 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            LET&apos;S BUILD<span className="text-primary animate-pulse">_</span>
          </h2>
        </div>

        <a
            href={`mailto:${email}`}
            className="block w-full border-y border-border-dark py-12 md:py-24 group cursor-hover relative overflow-hidden"
        >
          {/* Background Hover Reveal */}
          <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>

          <div className="relative z-10 overflow-hidden">

            {/* --- DEFAULT STATE --- */}
            <div className="flex flex-col group-hover:-translate-y-full transition-all duration-500 ease-in-out">
              {/* Part 1: Before '@' (Smaller, No Wrap, Truncates if too long) */}
              <span className="text-[5vw] md:text-[4vw] font-bold text-text-main leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                {localPart.toUpperCase()}
              </span>
              {/* Part 2: After '@' (Bigger, Breaks words if needed) */}
              <span className="text-[6vw] md:text-[7vw] font-bold text-text-main leading-none break-all mt-[-1vw]">
                @{domainPart.toUpperCase()}
              </span>
            </div>

            {/* --- HOVER STATE --- */}
            <div className="absolute inset-0 flex flex-col translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out">
              <span className="text-[5vw] md:text-[4vw] font-bold text-background-dark leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                {localPart.toUpperCase()}
              </span>
              <span className="text-[6vw] md:text-[7vw] font-bold text-background-dark leading-none break-all mt-[-1vw]">
                @{domainPart.toUpperCase()}
              </span>
            </div>

          </div>
        </a>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-12 gap-8">
          <div className="flex gap-8">
            <Link href={PORTFOLIO_DATA.personal.socials.instagram} className="font-mono text-sm text-text-muted hover:text-primary border-b border-transparent hover:border-primary transition-all cursor-hover">INSTAGRAM</Link>
            <Link href={PORTFOLIO_DATA.personal.socials.github} className="font-mono text-sm text-text-muted hover:text-primary border-b border-transparent hover:border-primary transition-all cursor-hover">GITHUB</Link>
            <Link href={PORTFOLIO_DATA.personal.socials.wa} className="font-mono text-sm text-text-muted hover:text-primary border-b border-transparent hover:border-primary transition-all cursor-hover">WHATSAPP</Link>
          </div>

          <div className="text-right">
            <p className="font-mono text-xs text-text-muted">© 2026 ROOCKYdev PORTFOLIO.</p>
            <p className="font-mono text-xs text-text-muted mt-1">DESIGNED IN THE FORGE.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
