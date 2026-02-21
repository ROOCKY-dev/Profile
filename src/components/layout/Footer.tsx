import Link from 'next/link';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function Footer() {
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
          href={`mailto:${PORTFOLIO_DATA.personal.email}`}
          className="block w-full border-y border-border-dark py-12 md:py-24 group cursor-hover relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
          <h3 className="relative z-10 text-[8vw] leading-none font-bold text-text-main group-hover:text-background-dark transition-colors duration-300 glitch-hover">
            {PORTFOLIO_DATA.personal.email.toUpperCase()}
          </h3>
        </a>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-12 gap-8">
          <div className="flex gap-8">
            <Link href={PORTFOLIO_DATA.personal.socials.linkedin} className="font-mono text-sm text-text-muted hover:text-primary border-b border-transparent hover:border-primary transition-all cursor-hover">LINKEDIN</Link>
            <Link href={PORTFOLIO_DATA.personal.socials.github} className="font-mono text-sm text-text-muted hover:text-primary border-b border-transparent hover:border-primary transition-all cursor-hover">GITHUB</Link>
            <Link href={PORTFOLIO_DATA.personal.socials.twitter} className="font-mono text-sm text-text-muted hover:text-primary border-b border-transparent hover:border-primary transition-all cursor-hover">TWITTER</Link>
          </div>

          <div className="text-right">
            <p className="font-mono text-xs text-text-muted">© 2025 CREATIVE SPARK PORTFOLIO.</p>
            <p className="font-mono text-xs text-text-muted mt-1">DESIGNED IN THE VOID.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
