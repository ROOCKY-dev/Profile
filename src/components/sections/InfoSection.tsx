'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Timeline from '@/components/info/Timeline';
import HexTechStack from '@/components/info/HexTechStack';
import ProjectReveal from '@/components/info/ProjectReveal';
import { ABOUT_ME } from '@/lib/data';
import { INFO_SECTION_BG_COLORS, INFO_SECTION_GLOW_COLORS } from '@/lib/constants';

/**
 * Info Section
 *
 * A multi-screen scrollable section (min-h-[400vh]) containing detailed information about the portfolio owner.
 *
 * Structure:
 * 1. **About Me**: Personal introduction and current focus.
 * 2. **Timeline**: Chronological history of education and projects.
 * 3. **Tech Stack**: Hexagonal grid displaying technical skills.
 * 4. **Projects**: Showcase of key projects with video reveal.
 *
 * Features:
 * - **Dynamic Background**: The background color and ambient glow shift smoothly as the user scrolls,
 *   driven by Framer Motion's `useTransform` and the scroll progress.
 * - **Scroll Snap**: Uses CSS scroll snapping to ensure each sub-section occupies the full viewport.
 */
export default function InfoSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress within this section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (0 to 1) to specific background colors defined in constants
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    INFO_SECTION_BG_COLORS
  );

  // Map scroll progress to ambient glow colors
  const glowColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    INFO_SECTION_GLOW_COLORS
  );

  return (
    <motion.section
      ref={containerRef}
      id="info-section"
      style={{ backgroundColor }}
      className="relative w-full min-h-[400vh] snap-start flex flex-col items-center overflow-hidden"
    >
      {/* Ambient Glow Background - Shifts color based on scroll position */}
      <motion.div
        style={{ background: glowColor }}
        className="absolute inset-0 pointer-events-none blur-3xl opacity-50 transition-colors duration-1000"
      />

      {/* --- Sub-Section 1: About Me --- */}
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

      {/* --- Sub-Section 2: Timeline --- */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start">
        <Timeline />
      </div>

      {/* --- Sub-Section 3: Tech Stack (Hexagonal Grid) --- */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start">
        <HexTechStack />
      </div>

      {/* --- Sub-Section 4: Projects Portfolio --- */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start">
        <ProjectReveal />
      </div>
    </motion.section>
  );
}
