'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Timeline from '@/components/info/Timeline';
import HexTechStack from '@/components/info/HexTechStack';
import ProjectReveal from '@/components/info/ProjectReveal';

/**
 * Info Section
 *
 * A tall scrollable section (300vh) containing detailed information:
 * 1. Timeline
 * 2. Tech Stack
 * 3. Projects
 *
 * Includes dynamic background color shifts and internal scroll snap points
 * for each sub-section to ensure content immersion.
 */
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
    [0, 0.33, 0.66, 1],
    [
      "rgba(10, 20, 30, 1)", // Dark Cyan/Black (Timeline)
      "rgba(20, 10, 30, 1)", // Dark Purple (Tech)
      "rgba(30, 10, 10, 1)", // Dark Red (Projects)
      "rgba(5, 20, 10, 1)"   // Dark Green (End)
    ]
  );

  const glowColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
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
      className="relative w-full min-h-[300vh] snap-start flex flex-col items-center overflow-hidden"
    >
      {/* Ambient Glow Background */}
      <motion.div
        style={{ background: glowColor }}
        className="absolute inset-0 pointer-events-none blur-3xl opacity-50 transition-colors duration-1000"
      />

      {/* Timeline Section - Sub-section snap point */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start">
        <Timeline />
      </div>

      {/* Tech Stack Section (Hexagonal Grid) - Sub-section snap point */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start">
        <HexTechStack />
      </div>

      {/* Portfolio Section - Sub-section snap point */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start">
        <ProjectReveal />
      </div>
    </motion.section>
  );
}
