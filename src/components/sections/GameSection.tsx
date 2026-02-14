'use client';

import GameCanvas from '../game/GameCanvas';

/**
 * Game Section
 *
 * The final section of the website, containing the interactive game canvas.
 * Uses `snap-start` to lock the view when the user scrolls here.
 */
export default function GameSection() {
  return (
    // Main Game Section - Snaps to start to ensure immersion
    <section id="game-section" className="h-screen w-full flex items-center justify-center bg-zinc-900 snap-start text-white relative">
      <div className="text-center w-full px-4">
         <h1 className="text-4xl font-mono text-zinc-500 mb-8 tracking-[0.5em] uppercase">Security Breach</h1>
         <div className="relative">
            <GameCanvas />
         </div>
         <p className="text-zinc-600 mt-4 font-mono text-xs">
           Status: Phase 3 Integration Complete
         </p>
      </div>
    </section>
  );
}
