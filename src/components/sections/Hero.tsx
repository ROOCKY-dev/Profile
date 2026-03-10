'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactModal from '@/components/ui/ContactModal';
import Link from 'next/link';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { usePerformance } from '@/lib/PerformanceContext';
import { GlassButton, GradientOrbs, GlassBadge } from '@/components/ui/glass';

/**
 * Hero section component with premium glassmorphism design.
 * Features animated gradient orbs, glass buttons, and smooth reveal animations.
 */
export default function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { hero, personal, stat } = PORTFOLIO_DATA;
  const { performanceLevel } = usePerformance();

  // Animation variants for staggered text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-28 pb-16 overflow-hidden">
      {/* Animated gradient orbs background */}
      {performanceLevel !== 'low' && <GradientOrbs variant="hero" />}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124, 92, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 92, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[1400px] mx-auto w-full"
      >
        {/* Top badges */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-8">
          <GlassBadge variant="primary">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {stat.status}
          </GlassBadge>
          <GlassBadge variant="default">
            {personal.location}
          </GlassBadge>
        </motion.div>

        {/* Hero subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-primary/80 text-sm tracking-[0.3em] uppercase mb-6"
        >
          {hero.subtitle}
        </motion.p>

        {/* Main title with gradient and animation */}
        <div className="mb-12">
          {hero.title.map((word, index) => (
            <motion.h1
              key={index}
              variants={titleVariants}
              className={`
                text-[12vw] md:text-[10vw] lg:text-[9vw] 
                leading-[0.9] font-bold tracking-tighter uppercase
                ${index === 1 
                  ? 'gradient-text-static ml-[5vw] md:ml-[10vw]' 
                  : index === 2 
                    ? 'text-right text-text-main/90' 
                    : 'text-text-main'
                }
              `}
            >
              <motion.span
                className="inline-block cursor-hover"
                whileHover={{ 
                  scale: 1.02,
                  textShadow: '0 0 40px rgba(124, 92, 255, 0.5)',
                }}
                transition={{ duration: 0.3 }}
              >
                {word}
              </motion.span>
            </motion.h1>
          ))}
        </div>

        {/* Description and CTA section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 mt-16">
          {/* Description with glass border */}
          <motion.div variants={itemVariants} className="max-w-md">
            <div className="relative pl-6 border-l-2 border-primary/40">
              <div className="absolute left-0 top-0 w-2 h-2 bg-primary rounded-full -translate-x-[5px]" />
              <p className="font-mono text-text-muted text-base md:text-lg leading-relaxed">
                {hero.description}
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <GlassButton
              variant="primary"
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="min-w-[180px]"
            >
              <span className="material-symbols-outlined text-xl">mail</span>
              Contact Me
            </GlassButton>
            
            <Link href="/work">
              <GlassButton
                variant="outline"
                size="lg"
                className="min-w-[180px]"
              >
                View Work
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </GlassButton>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-text-muted/60 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border border-primary/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
