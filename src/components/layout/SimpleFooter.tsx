import Link from 'next/link';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function SimpleFooter() {
  return (
    <footer className="bg-background-dark border-t border-border-dark py-8 px-6 md:px-12 flex justify-between items-center text-sm font-mono text-text-muted">
      <div>
        © 2026 ROOCKYdev PORTFOLIO.
      </div>
      <div className="flex gap-6">
        <Link href={PORTFOLIO_DATA.personal.socials.instagram} className="hover:text-primary transition-colors cursor-hover">INSTAGRAM</Link>
        <Link href={PORTFOLIO_DATA.personal.socials.github} className="hover:text-primary transition-colors cursor-hover">GITHUB</Link>
        <Link href={PORTFOLIO_DATA.personal.socials.wa} className="hover:text-primary transition-colors cursor-hover">WHATSAPP</Link>
      </div>
    </footer>
  );
}
