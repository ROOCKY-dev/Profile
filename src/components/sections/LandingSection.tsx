'use client';

import { BotStatus, FocusLevel } from '@/lib/types';
import CoreVisualizer from '@/components/CoreVisualizer';
import DecryptText from '@/components/ui/DecryptText';

interface LandingSectionProps {
  status: BotStatus;
  focusLevel: FocusLevel;
  errorCount: number;
  voiceLevel?: number;
  customColor?: string;
}

export default function LandingSection({ status, focusLevel, errorCount, voiceLevel, customColor }: LandingSectionProps) {

  const scrollToSection = (id: string) => {
     const element = document.getElementById(id);
     if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
     }
  };

  return (
    <section className="h-screen w-full flex items-center justify-between relative bg-black snap-start overflow-hidden">
      {/* Left Column: Status */}
      <div className="w-1/4 h-full border-r border-white/5 p-8 flex flex-col justify-center bg-black/30 backdrop-blur-sm z-10 pointer-events-auto">
        <h2 className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-4">Current Status</h2>

        {/* Main Status */}
        <div className="mb-8">
            <div className="text-5xl font-bold text-white tracking-tighter mb-2 min-h-[48px]">
               <DecryptText key={status} text={status} reveal={true} />
            </div>
            <div className={`text-xs font-mono px-2 py-1 inline-block rounded ${
                status === 'OFFLINE' ? 'bg-zinc-800 text-zinc-400' : 'bg-cyan-900/30 text-cyan-400 border border-cyan-500/30'
            }`}>
              {status === 'CODING' ? 'VS Code Active' :
               status === 'BROWSING' ? 'Chrome Active' :
               status === 'DISCORD' ? 'Discord Active' :
               status === 'GAMING' ? 'Steam Active' :
               status === 'CUSTOM' ? 'User Defined' : 'System Offline'}
            </div>
        </div>

        {/* Focus Level */}
        <div className="mb-6">
            <h3 className="text-zinc-500 text-xs font-mono mb-2">Focus Level</h3>
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                    focusLevel === 'HYPER_FOCUSED' ? 'bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]' :
                    focusLevel === 'NORMAL' ? 'bg-green-500' : 'bg-blue-400'
                }`} />
                <span className="text-white font-light tracking-wide">{focusLevel.replace('_', ' ')}</span>
            </div>
        </div>

        {/* Error Count (Only relevant if CODING) */}
        {status === 'CODING' && (
            <div className="mb-6">
                <h3 className="text-zinc-500 text-xs font-mono mb-2">Active Errors</h3>
                <div className="text-2xl font-mono text-red-400">
                    {errorCount} <span className="text-xs text-red-500/50">ERR</span>
                </div>
            </div>
        )}

      </div>

      {/* Center: Orb Visualizer */}
      <div className="flex-1 h-full flex items-center justify-center relative">
          {/* Background Grid/Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

          <div className="w-[400px] h-[400px] relative z-10 group">
             {/* Hover Effect on Orb Container */}
             <div className="absolute inset-0 bg-cyan-500/5 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

             <CoreVisualizer
                status={status}
                voiceLevel={voiceLevel}
                customColor={customColor}
                focusLevel={focusLevel}
             />
          </div>
      </div>

      {/* Right Column: Nav */}
      <div className="w-1/4 h-full border-l border-white/5 p-8 flex flex-col justify-center items-end bg-black/30 backdrop-blur-sm z-10 pointer-events-auto">
         <h2 className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-6">Modules</h2>
         <div className="flex flex-col gap-6">
             <button
                onClick={() => scrollToSection('info-section')}
                className="group flex items-center gap-4 text-right transition-all hover:translate-x-[-10px]"
             >
                 <span className="text-2xl font-light text-zinc-300 group-hover:text-cyan-400 transition-colors">
                   Projects
                 </span>
                 <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-cyan-400 transition-colors" />
             </button>

             <button
                onClick={() => scrollToSection('info-section')}
                className="group flex items-center gap-4 text-right transition-all hover:translate-x-[-10px]"
             >
                 <span className="text-2xl font-light text-zinc-300 group-hover:text-cyan-400 transition-colors">
                   About
                 </span>
                 <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-cyan-400 transition-colors" />
             </button>

             <button
                onClick={() => scrollToSection('game-section')}
                className="group flex items-center gap-4 text-right transition-all hover:translate-x-[-10px]"
             >
                 <span className="text-2xl font-light text-zinc-300 group-hover:text-cyan-400 transition-colors">
                   Play Game
                 </span>
                 <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-cyan-400 transition-colors" />
             </button>
         </div>
      </div>
    </section>
  );
}
