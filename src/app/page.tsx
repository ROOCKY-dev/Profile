'use client';

import { useState } from 'react';
import { BotStatus, FocusLevel } from '@/lib/types';
import LandingSection from '@/components/sections/LandingSection';
import InfoSection from '@/components/sections/InfoSection';
import GameSection from '@/components/sections/GameSection';
import DevTools from '@/components/DevTools';

export default function Home() {
  const [status, setStatus] = useState<BotStatus>('CODING');
  const [focusLevel, setFocusLevel] = useState<FocusLevel>('NORMAL');
  const [voiceLevel, setVoiceLevel] = useState(0); 
  const [customColor, setCustomColor] = useState<string | undefined>(undefined);

  return (
    <main className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white">
      {/* Landing Section (Top) */}
      <LandingSection
        status={status}
        voiceLevel={voiceLevel}
        customColor={customColor}
      />

      {/* Game Section (Middle) */}
      <GameSection />

      {/* Info Section (Bottom) */}
      <InfoSection />

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
