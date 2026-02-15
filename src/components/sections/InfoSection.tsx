'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Timeline from '@/components/info/Timeline';
import HexTechStack from '@/components/info/HexTechStack';
import ProjectReveal from '@/components/info/ProjectReveal';

/**
 * InfoSection Component
 *
 * A multi-part vertical scroll section containing detailed portfolio information.
 *
 * Sub-sections:
 * 1. About Me: Introduction and bio.
 * 2. Timeline: Chronological history.
 * 3. Tech Stack: Hexagonal grid of skills.
 * 4. Projects: Featured work.
 *
 * Features:
 * - Dynamic background color shifting based on scroll position.
 * - CSS Scroll Snapping for immersive section transitions.
 * - Motion effects for entrance animations.
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
                   <span className="text-cyan-400">👨‍💻</span> About Me
                </h3>
                <p className="text-zinc-300 leading-relaxed mb-8 text-left text-lg">
                   I am a driven Computer Science student at Universiti Tenaga Nasional (UNITEN) with a passion for building complex, scalable systems and immersive digital experiences. Originally from Yemen and currently based in Malaysia, I operate under the alias <span className="text-cyan-400 font-mono">Roocky dev</span>, where I bridge the gap between technical logic and creative game design.
                   <br/><br/>
                   My work is defined by an AI-first approach, whether I&apos;m optimizing server environments or conceptualizing next-gen mechanics. I thrive at the intersection of low-level programming and high-level user experience.
                </p>

                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-purple-400">🎯</span> Current Focus
                </h3>
                <p className="text-zinc-300 leading-relaxed text-left text-lg">
                   I am currently deep-diving into Discrete Structures and Computer Organization while expanding my portfolio in game development. My goal is to transition into the European or Chinese tech landscapes for the 2026-2027 academic year, bringing a global perspective to software engineering.
                </p>

                 {/* Decorative Quote */}
                 <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="font-mono text-sm text-zinc-500 italic">
                      &quot;Turning complex problems into elegant code and boring games into technical masterpieces.&quot;
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
