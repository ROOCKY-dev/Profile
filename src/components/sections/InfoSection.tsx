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
 * 1. Timeline (Experience)
 * 2. Tech Stack (Skills)
 * 3. Projects (Portfolio)
 *
 * This section uses Framer Motion's `useScroll` and `useTransform` to create
 * a dynamic background color shift that corresponds to the user's scroll progress.
 * As the user scrolls through different sub-sections, the background adapts to match
 * the theme of the content (e.g., Blue/Purple for Timeline, Purple/Pink for Tech).
 */
export default function InfoSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress relative to this specific section container
  // Offset "start start" means when the top of the container hits the top of the viewport
  // "end end" means when the bottom of the container hits the bottom of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  /**
   * Dynamic Background Color Interpolation
   * Maps scroll progress (0 to 1) to specific RGBA colors.
   *
   * - 0.00 - 0.33: Timeline Phase (Blue/Cyan/Dark)
   * - 0.33 - 0.66: Tech Stack Phase (Dark Purple)
   * - 0.66 - 1.00: Projects Phase (Dark Red/Green)
   */
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      "rgba(10, 20, 30, 1)", // Start: Dark Cyan/Black
      "rgba(20, 10, 30, 1)", // Mid 1: Dark Purple
      "rgba(30, 10, 10, 1)", // Mid 2: Dark Red
      "rgba(5, 20, 10, 1)"   // End: Dark Green
    ]
  );

  /**
   * Dynamic Ambient Glow Color
   * Creates a matching ambient light effect behind the content.
   */
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
      {/* Ambient Glow Background Layer */}
      <motion.div
        style={{ background: glowColor }}
        className="absolute inset-0 pointer-events-none blur-3xl opacity-50 transition-colors duration-1000"
      />

      {/* Timeline Sub-section - Snaps to viewport */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start">
        <Timeline />
      </div>

      {/* Tech Stack Sub-section - Snaps to viewport */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start">
        <HexTechStack />
      </div>

      {/* Portfolio Sub-section - Snaps to viewport */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start">
        <ProjectReveal />
      </div>
    </motion.section>
  );
}
