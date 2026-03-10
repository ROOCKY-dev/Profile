'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { GlassDivider } from '@/components/ui/glass';

/**
 * Animated marquee section with glassmorphism styling.
 * Displays scrolling text with hover pause functionality.
 */
export default function Marquee() {
  const { marquee } = PORTFOLIO_DATA;

  return (
    <div className="relative py-1">
      {/* Top divider */}
      <GlassDivider />
      
      {/* Marquee container */}
      <div className="relative py-8 overflow-hidden group cursor-hover select-none bg-gradient-to-r from-transparent via-primary/[0.02] to-transparent">
        {/* Edge fade gradients */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background-dark to-transparent z-10 pointer-events-none" />

        {/* Animated marquee track */}
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, '-50%'] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
          style={{ willChange: 'transform' }}
        >
          <MarqueeTrack items={marquee} />
          <MarqueeTrack items={marquee} />
        </motion.div>

        {/* Subtle glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
      
      {/* Bottom divider */}
      <GlassDivider />
    </div>
  );
}

function MarqueeTrack({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-12 px-6">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-12">
          <motion.span 
            className="text-3xl md:text-4xl font-bold text-text-muted/60 hover:text-primary transition-colors duration-300 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            {item}
          </motion.span>
          <span className="text-primary/30 font-mono text-lg">
            {"//"}
          </span>
        </div>
      ))}
    </div>
  );
}
