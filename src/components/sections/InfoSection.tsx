'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AboutMe from '@/components/info/AboutMe';

export default function InfoSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic Background Colors - subtle overlays
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgba(0, 0, 0, 0)", // Transparent
      "rgba(10, 20, 30, 0.4)", // Slight Cyan
      "rgba(20, 10, 30, 0.4)" // Slight Purple
    ]
  );

  return (
    <motion.section
      ref={containerRef}
      id="info-section"
      style={{ backgroundColor }}
      className="relative w-full min-h-screen flex flex-col items-center overflow-hidden snap-start"
    >
      {/* Ambient Glow Background - Subtle */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent" />

      {/* Main Content */}
      <div className="w-full relative z-10 pt-16 md:pt-20">
        <AboutMe />
      </div>

    </motion.section>
  );
}
