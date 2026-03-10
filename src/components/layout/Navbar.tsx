'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceMenu from '@/components/ui/ServiceMenu';
import { usePerformance } from '@/lib/PerformanceContext';
import { cn } from '@/lib/utils';

/**
 * Glass-styled navigation component.
 * Features frosted glass effect, smooth scroll detection, and performance controls.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { performanceLevel, cyclePerformanceLevel } = usePerformance();

  // Detect scroll for glass blur intensity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/work', label: 'Work', number: '01' },
    { href: '/#capabilities', label: 'Capabilities', number: '02' },
    { href: '/#about', label: 'About', number: '03' },
  ];

  const getPerformanceConfig = () => {
    switch (performanceLevel) {
      case 'high':
        return { label: 'Full', icon: 'auto_awesome', color: 'text-primary border-primary/30' };
      case 'mid':
        return { label: 'Balanced', icon: 'tune', color: 'text-secondary border-secondary/30' };
      case 'low':
        return { label: 'Lite', icon: 'bolt', color: 'text-green-400 border-green-400/30 bg-green-400/10' };
      default:
        return { label: 'Full', icon: 'auto_awesome', color: 'text-primary border-primary/30' };
    }
  };

  const perfConfig = getPerformanceConfig();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          scrolled
            ? 'bg-background-dark/60 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="w-full px-6 py-4 flex items-center justify-between max-w-[1800px] mx-auto">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group cursor-hover"
          >
            <motion.div 
              className="relative w-10 h-10 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg group-hover:bg-primary/30 transition-colors" />
              <span className="material-symbols-outlined text-primary text-2xl relative z-10">
                bolt
              </span>
            </motion.div>
            <span className="font-bold tracking-tight text-xl text-text-main">
              ROOCKY<span className="text-primary">.</span>dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 cursor-hover"
              >
                <span className="font-mono text-xs text-primary/50 mr-2 group-hover:text-primary transition-colors">
                  {link.number}
                </span>
                <span className="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">
                  {link.label}
                </span>
                <motion.div
                  className="absolute bottom-0 left-4 right-4 h-px bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group relative px-4 py-2 cursor-hover"
            >
              <span className="font-mono text-xs text-primary/50 mr-2 group-hover:text-primary transition-colors">
                04
              </span>
              <span className="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">
                Services
              </span>
              <motion.div
                className="absolute bottom-0 left-4 right-4 h-px bg-primary origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Performance toggle */}
            <motion.button
              onClick={cyclePerformanceLevel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border backdrop-blur-sm',
                'font-mono text-xs uppercase tracking-wider transition-all duration-300',
                'cursor-hover',
                perfConfig.color
              )}
            >
              <span className="material-symbols-outlined text-sm">
                {perfConfig.icon}
              </span>
              {perfConfig.label}
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-primary/20 bg-primary/5 cursor-hover"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-primary">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-primary/10 bg-background-dark/80 backdrop-blur-xl"
            >
              <div className="px-6 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors cursor-hover"
                  >
                    <span className="font-mono text-xs text-primary/60">{link.number}</span>
                    <span className="text-text-main">{link.label}</span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsMenuOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors cursor-hover"
                >
                  <span className="font-mono text-xs text-primary/60">04</span>
                  <span className="text-text-main">Services</span>
                </button>
                
                {/* Mobile performance toggle */}
                <button
                  onClick={cyclePerformanceLevel}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 px-4 py-3 mt-4 rounded-lg border',
                    'font-mono text-xs uppercase tracking-wider transition-all',
                    perfConfig.color
                  )}
                >
                  <span className="material-symbols-outlined text-sm">
                    {perfConfig.icon}
                  </span>
                  {perfConfig.label} Mode
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Service Menu Overlay */}
      <ServiceMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
