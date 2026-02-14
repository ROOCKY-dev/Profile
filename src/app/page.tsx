'use client';

import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BotStatus, FocusLevel } from '@/lib/types';
import LandingSection from '@/components/sections/LandingSection';
import InfoSection from '@/components/sections/InfoSection';
import GameSection from '@/components/sections/GameSection';
import DevTools from '@/components/DevTools';
import TerminalFooter from '@/components/info/TerminalFooter';
import RippleEffect from '@/components/ui/RippleEffect';
import LoadingScreen from '@/components/ui/LoadingScreen';

/**
 * Main Page Component
 *
 * Implements the core layout of the portfolio with three main sections:
 * 1. Landing Section - Initial view with status and orb visualizer.
 * 2. Info Section - Scrollable timeline, tech stack, and projects (300vh).
 * 3. Game Section - Interactive game canvas.
 *
 * Architecture:
 * - Uses client-side state for `status` and `focusLevel` which drives the visualizer.
 * - `DevTools` allows manual control over this state for demonstration purposes.
 * - Uses CSS Scroll Snap (`snap-start` in sections) to enforce distinct transitions.
 */
export default function Home() {
  // Global State: Controls the behavior of the 3D Orb and UI themes
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<BotStatus>('CODING');
  const [focusLevel, setFocusLevel] = useState<FocusLevel>('NORMAL');
  const [voiceLevel] = useState(0); // Placeholder for microphone input integration
  const [customColor, setCustomColor] = useState<string | undefined>(undefined);

  // Simulated Error Count (Could be hooked to real linter/test output later)
  const [errorCount] = useState(0);

  const containerRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-black text-white relative overflow-x-hidden"
    >
      {/* Initial Loading Overlay */}
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

      {/* Info Section (Middle) - Contains Timeline, Tech Stack, Projects */}
      <InfoSection />

      {/* Game Section (Bottom) - Interactive "Security Breach" Game */}
      <GameSection />

      {/* Debug/Control Tools - Floating UI */}
      <DevTools
        status={status}
        setStatus={setStatus}
        focusLevel={focusLevel}
        setFocusLevel={setFocusLevel}
        customColor={customColor}
        setCustomColor={setCustomColor}
      />

      {/* Footer / Modal Triggers */}
      <TerminalFooter />

      {/* Global Visual Effects */}
      <RippleEffect />
    </main>
  );
}
