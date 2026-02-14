'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TerminalHero from '@/components/info/TerminalHero';
import Timeline from '@/components/info/Timeline';
import TechStack from '@/components/info/TechStack';
import ProjectReveal from '@/components/info/ProjectReveal';
import TerminalFooter from '@/components/info/TerminalFooter';

export default function InfoSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamic Background Colors
  // 0-25%: Hero (Blue/Cyan)
  // 25-50%: Timeline (Blue/Purple)
  // 50-75%: Tech (Purple/Pink)
  // 75-100%: Projects (Red/Pink)

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(10, 10, 15, 1)", // Dark Blue/Black
      "rgba(10, 20, 30, 1)", // Dark Cyan/Black
      "rgba(20, 10, 30, 1)", // Dark Purple
      "rgba(30, 10, 10, 1)", // Dark Red
      "rgba(5, 20, 10, 1)"   // Dark Green (Footer/End)
    ]
  );

  const glowColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(0, 255, 255, 0.1)", // Cyan Glow
      "rgba(0, 100, 255, 0.1)", // Blue Glow
      "rgba(200, 0, 255, 0.1)", // Purple Glow
      "rgba(255, 0, 100, 0.1)", // Red/Pink Glow
      "rgba(0, 255, 100, 0.1)"  // Green Glow
    ]
  );

  return (
    <motion.section
      ref={containerRef}
      id="info-section"
      style={{ backgroundColor }}
      className="relative w-full min-h-[400vh] snap-start flex flex-col items-center overflow-hidden"
    >
      {/* Ambient Glow Background */}
      <motion.div
        style={{ background: glowColor }}
        className="absolute inset-0 pointer-events-none blur-3xl opacity-50 transition-colors duration-1000"
      />

      {/* Hero Section (Typewriter) */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10">
        <TerminalHero />
      </div>

      {/* Timeline Section */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10">
        <Timeline />
      </div>

      {/* Tech Stack Section */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10">
        <TechStack />
      </div>

      {/* Portfolio Section */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10">
        <ProjectReveal />
      </div>

      <TerminalFooter />
    </motion.section>
  );
}
