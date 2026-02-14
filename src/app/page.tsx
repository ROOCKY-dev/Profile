'use client';

import { useState, useRef } from 'react';
import { BotStatus, FocusLevel } from '@/lib/types';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Simulated Error Count (controlled by DevTools indirectly or randomized)
  const [errorCount, setErrorCount] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Orb Animations
  const x = useTransform(scrollYProgress, [0, 0.4], ['0%', '40%']);
  const y = useTransform(scrollYProgress, [0, 0.4], ['0%', '40%']);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.25]);

  return (
    <main
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white relative"
    >

      {/* Global Orb Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        <motion.div style={{ x, y, scale }} className="relative">
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
