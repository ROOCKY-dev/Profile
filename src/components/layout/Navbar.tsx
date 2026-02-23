'use client';

import { useState } from 'react';
import Link from 'next/link';
import ServiceMenu from '@/components/ui/ServiceMenu';
import { usePerformance } from '@/lib/PerformanceContext';

/**
 * Main navigation component.
 * Handles desktop and mobile navigation, service menu toggle, and performance settings.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { performanceLevel, cyclePerformanceLevel } = usePerformance();

  const getPerformanceConfig = () => {
    switch (performanceLevel) {
      case 'high':
        return { label: 'High Quality', icon: 'bolt', color: 'border-primary/30 text-primary' };
      case 'mid':
        return { label: 'Balanced', icon: 'settings_slow_motion', color: 'border-yellow-400/50 text-yellow-400' };
      case 'low':
        return { label: 'Performance', icon: 'speed', color: 'bg-primary text-background-dark border-primary' };
      default:
        return { label: 'High Quality', icon: 'bolt', color: 'border-primary/30 text-primary' };
    }
  };

  const perfConfig = getPerformanceConfig();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border-dark bg-background-dark/90 backdrop-blur-sm">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-hover magnet-target">
            <span className={`material-symbols-outlined text-primary text-2xl ${performanceLevel === 'high' ? 'animate-pulse-fast' : ''}`}>bolt</span>
            <span className="font-bold tracking-tighter text-xl">ROOCKY . dev</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/work" className="text-sm font-mono text-text-muted hover:text-primary transition-colors hover:line-through decoration-primary decoration-2 cursor-hover">01. WORK</Link>
            <Link href="/#capabilities" className="text-sm font-mono text-text-muted hover:text-primary transition-colors hover:line-through decoration-primary decoration-2 cursor-hover">02. CAPABILITIES</Link>
            {/* Assuming "about" section exists or will exist, mapping it to a suitable section or keeping it if it works */}
            <Link href="/#about" className="text-sm font-mono text-text-muted hover:text-primary transition-colors hover:line-through decoration-primary decoration-2 cursor-hover">03. ABOUT</Link>
            <button
                onClick={() => setIsMenuOpen(true)}
                className="text-sm font-mono text-text-muted hover:text-primary transition-colors hover:line-through decoration-primary decoration-2 cursor-hover"
            >
                04. SERVICES
            </button>
          </div>

          <button 
            onClick={cyclePerformanceLevel}
            className={`flex items-center gap-2 px-4 py-2 border transition-all cursor-hover magnet-target font-mono text-xs uppercase tracking-widest ${perfConfig.color}`}
          >
            <span className="material-symbols-outlined text-sm">
              {perfConfig.icon}
            </span>
            {perfConfig.label}
          </button>
        </div>
      </nav>

      {/* Service Menu Overlay */}
      {isMenuOpen && <ServiceMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
