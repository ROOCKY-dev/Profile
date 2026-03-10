import Link from 'next/link';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function SimpleFooter() {
  return (
    <footer className="bg-background-dark/50 backdrop-blur-sm border-t border-primary/10 py-8 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-text-muted">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary/50 text-lg">bolt</span>
          <span>&copy; {new Date().getFullYear()} ROOCKYdev</span>
        </div>
        <div className="flex gap-6">
          <Link 
            href={PORTFOLIO_DATA.personal.socials.instagram} 
            className="hover:text-primary transition-colors cursor-hover flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">photo_camera</span>
            Instagram
          </Link>
          <Link 
            href={PORTFOLIO_DATA.personal.socials.github} 
            className="hover:text-primary transition-colors cursor-hover flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">code</span>
            GitHub
          </Link>
          <Link 
            href={PORTFOLIO_DATA.personal.socials.wa} 
            className="hover:text-primary transition-colors cursor-hover flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            WhatsApp
          </Link>
        </div>
      </div>
    </footer>
  );
}
