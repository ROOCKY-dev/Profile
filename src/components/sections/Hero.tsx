'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { usePerformance } from '@/lib/PerformanceContext';

export default function Hero() {
  const { hero } = PORTFOLIO_DATA;
  const { performanceLevel } = usePerformance();

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 border-b border-border-dark overflow-hidden">
      {/* Background Abstract Grid */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Gradient Orb */}
      {performanceLevel !== 'low' && (
        <div className={`absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none ${performanceLevel === 'high' ? 'animate-pulse-fast' : ''}`} />
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col gap-2 mb-8">
          <motion.p
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="font-mono text-primary text-sm tracking-widest uppercase mb-4"
          >
            {hero.subtitle}
          </motion.p>

          <h1 className="text-[11vw] leading-[0.85] font-bold tracking-tighter uppercase mix-blend-lighten break-words relative">
            <span
              className="block hover:text-stroke hover:text-transparent transition-all duration-300 cursor-hover glitch-hover"
              data-text={hero.title[0]}
            >
              {hero.title[0]}
            </span>
            <span
              className="block ml-[10vw] text-primary glitch-hover"
              data-text={hero.title[1]}
            >
              {hero.title[1]}
            </span>
            <span
              className="block text-right hover:text-stroke-primary hover:text-transparent transition-all duration-300 cursor-hover glitch-hover"
              data-text={hero.title[2]}
            >
              {hero.title[2]}
            </span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mt-12">
          <div className="max-w-md">
            <p className="font-mono text-text-muted text-lg leading-relaxed border-l-2 border-primary pl-4">
              {hero.description}
            </p>
          </div>

          <div className="flex gap-4">
            <button className="group relative px-8 py-4 bg-primary text-background-dark font-bold uppercase tracking-wider hover:bg-white transition-all overflow-hidden cursor-hover">
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <Link href="/work" className="px-8 py-4 border border-primary text-primary font-bold uppercase tracking-wider hover:bg-primary/10 transition-all cursor-hover flex items-center gap-2">
              <span>View Work</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
