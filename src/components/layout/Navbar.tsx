'use client';

import { useState } from 'react';
import Link from 'next/link';
import ServiceMenu from '@/components/ui/ServiceMenu';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border-dark bg-background-dark/90 backdrop-blur-sm">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-hover magnet-target">
            <span className="material-symbols-outlined text-primary text-2xl animate-pulse-fast">bolt</span>
            <span className="font-bold tracking-tighter text-xl">CREATIVE SPARK</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-sm font-mono text-text-muted hover:text-primary transition-colors hover:line-through decoration-primary decoration-2 cursor-hover">01. WORK</a>
            <a href="#capabilities" className="text-sm font-mono text-text-muted hover:text-primary transition-colors hover:line-through decoration-primary decoration-2 cursor-hover">02. CAPABILITIES</a>
            <a href="#about" className="text-sm font-mono text-text-muted hover:text-primary transition-colors hover:line-through decoration-primary decoration-2 cursor-hover">03. ABOUT</a>
            <button
                onClick={() => setIsMenuOpen(true)}
                className="text-sm font-mono text-text-muted hover:text-primary transition-colors hover:line-through decoration-primary decoration-2 cursor-hover"
            >
                04. SERVICES
            </button>
          </div>

          <button className="bg-primary text-background-dark font-bold text-sm px-5 py-2 hover:bg-white transition-colors uppercase tracking-widest cursor-hover magnet-target">
            Hire Me
          </button>
        </div>
      </nav>

      {/* Service Menu Overlay */}
      {isMenuOpen && <ServiceMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
