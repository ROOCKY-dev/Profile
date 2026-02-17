'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Timeline from '@/components/info/Timeline';
import HexTechStack from '@/components/info/HexTechStack';
import ProjectReveal from '@/components/info/ProjectReveal';
import { ABOUT_ME } from '@/lib/data';

/**
 * Info Section
 *
 * A tall scrollable section (300vh) containing detailed information:
 * 1. About Me (New)
 * 2. Timeline
 * 3. Tech Stack
 * 4. Projects
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
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [
      "rgba(10, 20, 30, 1)", // Dark Cyan/Black (About)
      "rgba(10, 20, 30, 1)", // Dark Cyan/Black (Timeline)
      "rgba(20, 10, 30, 1)", // Dark Purple (Tech)
      "rgba(30, 10, 10, 1)", // Dark Red (Projects)
      "rgba(5, 20, 10, 1)"   // Dark Green (End)
    ]
  );

  const glowColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [
      "rgba(0, 100, 255, 0.1)", // Blue Glow
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

      {/* About Me Section - Sub-section snap point */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start">
        <div className="max-w-4xl px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-mono mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {'< System Identity />'}
            </h2>

            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />

                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-cyan-400">{ABOUT_ME.icon}</span> {ABOUT_ME.title}
                </h3>
                <p
                    className="text-zinc-300 leading-relaxed mb-8 text-left text-lg"
                    dangerouslySetInnerHTML={{ __html: ABOUT_ME.description }}
                />

                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-purple-400">{ABOUT_ME.currentFocusIcon}</span> {ABOUT_ME.currentFocusTitle}
                </h3>
                <p className="text-zinc-300 leading-relaxed text-left text-lg">
                   {ABOUT_ME.currentFocusDescription}
                </p>

                 {/* Decorative Quote */}
                 <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="font-mono text-sm text-zinc-500 italic">
                      {ABOUT_ME.quote}
                    </p>
                 </div>
            </div>
        </div>
      </div>

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
