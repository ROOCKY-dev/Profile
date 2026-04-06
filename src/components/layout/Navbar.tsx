'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WorkshopStatus from '@/components/ui/WorkshopStatus';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-[60px] border-b-[3px] border-black transition-colors duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-[13px] font-black tracking-[4px] uppercase"
        >
          AG — ROOCKY.DEV
        </Link>
        <WorkshopStatus className="hidden md:inline-flex" />
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/work"
          className="text-[10px] font-bold tracking-[3px] uppercase text-gray hover:text-black transition-colors"
        >
          Work
        </Link>
        <a
          href="#about"
          className="text-[10px] font-bold tracking-[3px] uppercase text-gray hover:text-black transition-colors"
        >
          About
        </a>
        <a
          href="#services"
          className="text-[10px] font-bold tracking-[3px] uppercase text-gray hover:text-black transition-colors"
        >
          Services
        </a>
        <a
          href="#contact"
          className="text-[10px] font-bold tracking-[3px] uppercase bg-black text-white px-4 py-2 hover:bg-gray-bg hover:text-black transition-colors border-2 border-black"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
