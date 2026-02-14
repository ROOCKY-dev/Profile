'use client';

import { BotStatus } from '@/lib/types';
import CoreVisualizer from '../CoreVisualizer';

interface LandingSectionProps {
  status: BotStatus;
  voiceLevel: number;
  customColor?: string;
}

export default function LandingSection({ status, voiceLevel, customColor }: LandingSectionProps) {
  return (
    <section className="h-screen w-full flex items-center justify-between relative bg-black snap-start overflow-hidden">
      {/* Left Column: Status */}
      <div className="w-1/4 h-full border-r border-white/5 p-8 flex flex-col justify-center bg-black/30 backdrop-blur-sm z-10">
        <h2 className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-2">System Status</h2>
        <div className="text-4xl font-bold text-white tracking-tighter">{status}</div>
        <div className="mt-2 text-xs font-mono text-zinc-400">
          Waiting for API integration...
        </div>
      </div>

      {/* Center: Orb */}
      <div className="flex-1 h-full flex items-center justify-center relative">
          {/* Background Grid/Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

          <CoreVisualizer status={status} voiceLevel={voiceLevel} customColor={customColor} />
      </div>

      {/* Right Column: Nav */}
      <div className="w-1/4 h-full border-l border-white/5 p-8 flex flex-col justify-center items-end bg-black/30 backdrop-blur-sm z-10">
         <h2 className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-6">Modules</h2>
         <div className="flex flex-col gap-6">
             {['Projects', 'About', 'Contact'].map((item) => (
               <button
                 key={item}
                 className="group flex items-center gap-4 text-right transition-all hover:translate-x-[-10px]"
               >
                 <span className="text-2xl font-light text-zinc-300 group-hover:text-cyan-400 transition-colors">
                   {item}
                 </span>
                 <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-cyan-400 transition-colors" />
               </button>
             ))}
         </div>
      </div>
    </section>
  );
}
