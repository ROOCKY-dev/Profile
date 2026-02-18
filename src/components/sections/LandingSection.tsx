'use client';

import { useState, useRef, useEffect } from 'react';
import { BotStatus, FocusLevel } from '@/lib/types';
import { LANDING_CONTENT } from '@/lib/data';
import CoreVisualizer from '@/components/CoreVisualizer';
import ContactModal from '@/components/ui/ContactModal';
import { STATUS_HEX_COLORS } from '@/lib/constants';
import { Terminal, Zap, Share2, Mail, Power, ChevronDown } from 'lucide-react';

interface LandingSectionProps {
  status: BotStatus;
  setStatus: (status: BotStatus) => void;
  focusLevel: FocusLevel;
  setFocusLevel: (level: FocusLevel) => void;
  errorCount: number;
  voiceLevel?: number;
  customColor?: string;
}

/**
 * Landing Section (Hero)
 *
 * Implements the "Atom Orb" design with centered layout, parallax stars,
 * and a floating system status controller.
 */
export default function LandingSection({
    status, setStatus,
    focusLevel, setFocusLevel,
    voiceLevel, customColor
}: LandingSectionProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!bgRef.current) return;
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        bgRef.current.style.transform = `translate(-${x}px, -${y}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
     const element = document.getElementById(id);
     if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
     }
  };

  const handleStatusChange = (newStatus: BotStatus, newFocus: FocusLevel = 'NORMAL') => {
      setStatus(newStatus);
      setFocusLevel(newFocus);
  };

  // Determine ambient color based on status
  const ambientColor = customColor || STATUS_HEX_COLORS[status] || '#ffffff';

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-void snap-start">

      {/* Background Layers */}
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

      {/* Parallax Stars */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-40 transition-transform duration-100 ease-out pointer-events-none"
        style={{
            backgroundImage: `
                radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px),
                radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px),
                radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 3px)
            `,
            backgroundSize: '550px 550px, 350px 350px, 250px 250px',
            backgroundPosition: '0 0, 40px 60px, 130px 270px'
        }}
      />

      {/* Ambient Glow */}
      <div
        className="absolute inset-0 z-0 blur-[120px] transition-colors duration-700 ease-in-out opacity-20"
        style={{ backgroundColor: ambientColor }}
      />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">

        {/* The Orb */}
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mb-8 perspective-1000 pointer-events-auto">
             <CoreVisualizer
                status={status}
                voiceLevel={voiceLevel}
                customColor={customColor}
                focusLevel={focusLevel}
             />
        </div>

        {/* Typography */}
        <div className="text-center z-20 space-y-4 animate-float pointer-events-auto">
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]" style={{ textShadow: `0 0 30px ${ambientColor}33` }}>
                {LANDING_CONTENT.name.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">{LANDING_CONTENT.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="font-code text-text-muted text-sm md:text-base tracking-[0.2em] uppercase">
                {LANDING_CONTENT.roles.join(' // ')}
            </p>
        </div>

        {/* Scroll Prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-auto cursor-pointer" onClick={() => scrollToSection('info-section')}>
            <span className="font-code text-[10px] tracking-widest text-text-muted uppercase animate-blink">Initiate Sequence</span>
            <ChevronDown className="text-primary animate-bounce w-6 h-6" />
        </div>
      </div>

      {/* Floating Status Controller (Dev Tools Panel) */}
      <div className="absolute bottom-6 left-6 z-40 hidden md:block pointer-events-auto">
        <div className="bg-void/60 backdrop-blur-md border border-glass-border rounded-lg p-4 shadow-2xl w-[280px]">
            <div className="flex items-center justify-between mb-3 border-b border-glass-border pb-2">
                <span className="font-code text-xs text-text-muted uppercase tracking-wider">System Status</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-accent-gold"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-glow"></div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {/* CODE */}
                <button
                    onClick={() => handleStatusChange('CODING', 'NORMAL')}
                    className="group relative flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-primary/20 border border-transparent hover:border-primary/50 transition-all duration-300"
                >
                    <Terminal size={16} className="text-text-muted group-hover:text-primary" />
                    <span className="font-code text-xs text-text-muted group-hover:text-primary">CODE</span>
                    {status === 'CODING' && focusLevel === 'NORMAL' && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"></div>}
                </button>

                {/* FOCUS */}
                <button
                    onClick={() => handleStatusChange('CODING', 'HYPER_FOCUSED')}
                    className="group relative flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-accent-red/20 border border-transparent hover:border-accent-red/50 transition-all duration-300"
                >
                    <Zap size={16} className="text-text-muted group-hover:text-accent-red" />
                    <span className="font-code text-xs text-text-muted group-hover:text-accent-red">FOCUS</span>
                    {status === 'CODING' && focusLevel === 'HYPER_FOCUSED' && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-accent-red shadow-[0_0_8px_var(--color-accent-red)]"></div>}
                </button>

                {/* SOCIAL */}
                <button
                    onClick={() => handleStatusChange('DISCORD', 'NORMAL')}
                    className="group relative flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-accent-purple/20 border border-transparent hover:border-accent-purple/50 transition-all duration-300"
                >
                    <Share2 size={16} className="text-text-muted group-hover:text-accent-purple" />
                    <span className="font-code text-xs text-text-muted group-hover:text-accent-purple">SOCIAL</span>
                    {status === 'DISCORD' && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-accent-purple shadow-[0_0_8px_var(--color-accent-purple)]"></div>}
                </button>

                {/* EMAIL */}
                <button
                    onClick={() => handleStatusChange('BROWSING', 'NORMAL')}
                    className="group relative flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-accent-gold/20 border border-transparent hover:border-accent-gold/50 transition-all duration-300"
                >
                    <Mail size={16} className="text-text-muted group-hover:text-accent-gold" />
                    <span className="font-code text-xs text-text-muted group-hover:text-accent-gold">EMAIL</span>
                    {status === 'BROWSING' && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-accent-gold shadow-[0_0_8px_var(--color-accent-gold)]"></div>}
                </button>

                {/* OFFLINE */}
                <button
                    onClick={() => handleStatusChange('OFFLINE')}
                    className="col-span-2 group relative flex items-center justify-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/30 transition-all duration-300 mt-1"
                >
                    <Power size={16} className="text-text-muted group-hover:text-white" />
                    <span className="font-code text-xs text-text-muted group-hover:text-white">GO OFFLINE</span>
                    {status === 'OFFLINE' && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"></div>}
                </button>
            </div>
        </div>
      </div>

    </section>
  );
}
