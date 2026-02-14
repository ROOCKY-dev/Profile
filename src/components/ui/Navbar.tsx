'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Mail } from 'lucide-react';
import ContactModal from './ContactModal';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'info-section' },
    { name: 'Projects', id: 'projects-section' }, // Need to ensure this ID exists or points to InfoSection
    { name: 'Game', id: 'game-section' },
  ];

  // Note: 'projects-section' might be inside InfoSection.
  // InfoSection contains ProjectReveal. I should probably just scroll to InfoSection or add an ID inside InfoSection.
  // For now I'll point Projects to info-section as well, or update InfoSection later to have a specific ID for projects.

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
              <span className="text-xl font-bold font-mono tracking-tighter text-white">
                ROOCKY<span className="text-cyan-400">.DEV</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  {link.name}
                </button>
              ))}

              <div className="h-4 w-px bg-white/10" />

              <a
                href="#" // Placeholder for CV
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <FileText size={16} />
                CV
              </a>

              <button
                onClick={() => setIsContactOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all border border-white/5 hover:border-white/20"
              >
                <Mail size={16} />
                Contact Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-400 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-black/90 border-b border-white/5 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left text-base font-medium text-zinc-400 hover:text-white py-2"
                  >
                    {link.name}
                  </button>
                ))}

                <div className="h-px w-full bg-white/5 my-2" />

                <a
                  href="#"
                  className="flex items-center gap-2 text-base font-medium text-zinc-400 hover:text-cyan-400 py-2"
                >
                  <FileText size={18} />
                  Open CV
                </a>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  <Mail size={18} />
                  Contact Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
