'use client';

import { useState, useRef } from 'react';
import { BotStatus, FocusLevel } from '@/lib/types';
import LandingSection from '@/components/sections/LandingSection';
import InfoSection from '@/components/sections/InfoSection';
import GameSection from '@/components/sections/GameSection';
import DevTools from '@/components/DevTools';
import TerminalFooter from '@/components/info/TerminalFooter';
import RippleEffect from '@/components/ui/RippleEffect';

export default function Home() {
  const [status, setStatus] = useState<BotStatus>('CODING');
  const [focusLevel, setFocusLevel] = useState<FocusLevel>('NORMAL');
  const [voiceLevel] = useState(0);
  const [customColor, setCustomColor] = useState<string | undefined>(undefined);

  // Simulated Error Count
  const [errorCount] = useState(0);

  const containerRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-black text-white relative overflow-x-hidden"
    >

      {/* Landing Section (Top) - Orb is now embedded here */}
      <LandingSection
        status={status}
        focusLevel={focusLevel}
        errorCount={errorCount}
        voiceLevel={voiceLevel}
        customColor={customColor}
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

      <TerminalFooter />
      <RippleEffect />
    </main>
  );
}
