'use client';

import { useRef } from 'react';
import BioTimelineBlock from '@/components/info/BioTimelineBlock';
import TechCloud from '@/components/info/TechCloud';
import ProjectReveal from '@/components/info/ProjectReveal';

/**
 * Info Section
 *
 * Contains detailed information split into two main visual blocks:
 * 1. Bio & Timeline (Screen 1 Design)
 * 2. Tech Stack & Projects (Screen 2 Design)
 */
export default function InfoSection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      id="info-section"
      className="relative w-full min-h-[200vh] bg-void flex flex-col items-center overflow-hidden"
    >
      {/* Background Noise Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')] opacity-30 pointer-events-none fixed"></div>

      {/* Screen 1: Bio & Timeline */}
      <div className="w-full min-h-screen flex items-center justify-center relative z-10 snap-start bg-gradient-to-b from-void via-void to-[#050510]">
         <BioTimelineBlock />
      </div>

      {/* Screen 2: Tech & Projects */}
      <div className="w-full min-h-screen flex flex-col items-center justify-center relative z-10 snap-start bg-[#030308]">
         {/* Tech Cloud at the top */}
         <TechCloud />

         {/* Projects Grid below */}
         <ProjectReveal />
      </div>

    </section>
  );
}
