'use client';

import GameCanvas from '../game/GameCanvas';

export default function GameSection() {
  return (
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
