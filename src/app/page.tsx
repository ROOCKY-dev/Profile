'use client';

import { useState, useRef } from 'react';
import { BotStatus, FocusLevel } from '@/lib/types';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import LandingSection from '@/components/sections/LandingSection';
import InfoSection from '@/components/sections/InfoSection';
import GameSection from '@/components/sections/GameSection';
import DevTools from '@/components/DevTools';
import CoreVisualizer from '@/components/CoreVisualizer';

export default function Home() {
  const [status, setStatus] = useState<BotStatus>('CODING');
  const [focusLevel, setFocusLevel] = useState<FocusLevel>('NORMAL');
  const [voiceLevel, setVoiceLevel] = useState(0); 
  const [customColor, setCustomColor] = useState<string | undefined>(undefined);

  // Simulated Error Count
  const [errorCount, setErrorCount] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // UseSpring for smooth, physics-based transition
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Orb Animations
  // Transition happens between 0 (Top) and 0.2 (Just past Landing)
  // We want it to lock in the corner quickly so it doesn't float around weirdly

  // X: 0% (Center) -> 45% (Right Corner)
  const x = useTransform(smoothProgress, [0, 0.2], ['0%', '42%']);

  // Y: 0% (Center) -> 45% (Bottom Corner)
  const y = useTransform(smoothProgress, [0, 0.2], ['0%', '42%']);

  // Scale: 1 (Full) -> 0.15 (Mini)
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.15]);

  // Opacity for the "Mini-View" border
  const borderOpacity = useTransform(smoothProgress, [0.15, 0.2], [0, 1]);

  return (
    <main
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white relative"
    >

      {/* Global Orb Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        <motion.div style={{ x, y, scale }} className="relative flex items-center justify-center">

           {/* Mini-View Border (appears when docked) */}
           <motion.div
             style={{ opacity: borderOpacity }}
             className="absolute w-[450px] h-[450px] border border-cyan-500/30 rounded-full animate-pulse"
           />

           <CoreVisualizer
             status={status}
             voiceLevel={voiceLevel}
             customColor={customColor}
             focusLevel={focusLevel}
           />
        </motion.div>
      </div>

      {/* Landing Section (Top) */}
      <LandingSection
        status={status}
        focusLevel={focusLevel}
        errorCount={errorCount}
      />

      {/* Info Section (Middle) */}
      <InfoSection />

      {/* Game Section (Bottom) */}
      <GameSection />

      <DevTools
        status={status}
        setStatus={setStatus}
        focusLevel={focusLevel}
        setFocusLevel={setFocusLevel}
        customColor={customColor}
        setCustomColor={setCustomColor}
      />
    </main>
  );
}
