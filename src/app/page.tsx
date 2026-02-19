'use client';

import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BotStatus, FocusLevel } from '@/lib/types';
import LandingSection from '@/components/sections/LandingSection';
import InfoSection from '@/components/sections/InfoSection';
import GameSection from '@/components/sections/GameSection';
import DevTools from '@/components/DevTools';
import RippleEffect from '@/components/ui/RippleEffect';
import LoadingScreen from '@/components/ui/LoadingScreen';

/**
 * Main Page Component (Home)
 *
 * This is the root layout component for the single-page portfolio application.
 * It manages the global state (status, focus level, loading) and orchestrates
 * the rendering of the three main sections.
 *
 * Structure:
 * 1. **LoadingScreen**: Initial overlay that waits for assets or timeout.
 * 2. **LandingSection**: Topmost section with the status dashboard and 3D visualizer.
 * 3. **InfoSection**: Middle scrollable section containing detailed portfolio content.
 * 4. **GameSection**: Bottom section with the interactive game.
 *
 * Features:
 * - **Global State**: Manages `BotStatus` and `FocusLevel` which propagate down to child components
 *   to affect visuals (colors, animations).
 * - **DevTools**: A development helper (visible in UI) to manually toggle states.
 * - **RippleEffect**: A global background effect for click feedback.
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // --- Global State ---
  // Controls the theme and behavior of the visualizer and UI elements
  const [status, setStatus] = useState<BotStatus>('CODING');
  const [focusLevel, setFocusLevel] = useState<FocusLevel>('NORMAL');
  const [voiceLevel] = useState(0); // Placeholder for future microphone integration
  const [customColor, setCustomColor] = useState<string | undefined>(undefined);

  // Simulated Error Count (Can be hooked up to real linter/log data later)
  const [errorCount] = useState(0);

  const containerRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-black text-white relative overflow-x-hidden"
    >
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Landing Section (Top) - Orb is now embedded here */}
      <LandingSection
        status={status}
        focusLevel={focusLevel}
        errorCount={errorCount}
        voiceLevel={voiceLevel}
        customColor={customColor}
      />

      {/* Info Section (Middle) - Contains About, Timeline, Tech Stack, Projects */}
      <InfoSection />

      {/* Game Section (Bottom) - Interactive mini-game */}
      <GameSection />

      {/* Development Tools Overlay - Allows manual state testing */}
      <DevTools
        status={status}
        setStatus={setStatus}
        focusLevel={focusLevel}
        setFocusLevel={setFocusLevel}
        customColor={customColor}
        setCustomColor={setCustomColor}
      />

      {/* Global Visual Effects */}
      <RippleEffect />
    </main>
  );
}
