'use client';

import { Code, Terminal, Server, Globe, Layers, Box, Gamepad2, LucideIcon } from 'lucide-react';
import { TECH_STACK } from '@/lib/data';

// Map tech names to icons and positions
const TECH_MAP: Record<string, { icon: LucideIcon, color: string, pos: string, delay: string }> = {
  'Java': { icon: Server, color: '#f89820', pos: 'top-[15%] left-[10%]', delay: 'animate-float-delayed' },
  'Python': { icon: Terminal, color: '#306998', pos: 'top-[25%] right-[20%]', delay: 'animate-float' },
  'JavaScript': { icon: Code, color: '#f7df1e', pos: 'bottom-[30%] left-[20%]', delay: 'animate-float-fast' },
  'Unity': { icon: Layers, color: '#ffffff', pos: 'top-[50%] left-[45%]', delay: 'animate-float' },
  'Linux': { icon: Terminal, color: '#fbc02d', pos: 'bottom-[15%] right-[10%]', delay: 'animate-float-delayed' },
  'UI/UX': { icon: Globe, color: '#ec4899', pos: 'top-[10%] right-[40%]', delay: 'animate-float-fast' },
  'Unreal': { icon: Gamepad2, color: '#0e1128', pos: 'bottom-[20%] right-[35%]', delay: 'animate-float' },
  'Minecraft': { icon: Box, color: '#4ade80', pos: 'top-[35%] left-[30%]', delay: 'animate-float-delayed' },
};

export default function TechCloud() {

  // Filter only key tech items to display in the cloud
  const cloudItems = TECH_STACK.filter(t => TECH_MAP[t.name]);

  return (
    <div className="relative w-full h-[600px] flex flex-col items-center justify-center my-20">

        {/* Section Header */}
        <div className="text-center mb-12 relative z-20">
             <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-accent-red/30 bg-accent-red/10 text-accent-red text-xs font-code tracking-widest mb-4">
                <span className="material-symbols-outlined text-sm">hub</span> SYSTEM_MODULE_03
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,42,109,0.3)]">
                TECH_ARSENAL
            </h2>
            <p className="text-text-muted font-code text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-4">
                &gt; Accessing skill database... <br/>
                &gt; Rendering holographic project interfaces. <span className="animate-pulse text-accent-red">_</span>
            </p>
        </div>

        {/* Cloud Container */}
        <div className="relative w-full h-[500px] max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-red/5 to-transparent blur-3xl pointer-events-none"></div>

            {cloudItems.map((item) => {
                const config = TECH_MAP[item.name];
                const Icon = config.icon;

                return (
                    <div key={item.name} className={`absolute ${config.pos} ${config.delay} z-10 pointer-events-auto`}>
                        <div className="group relative cursor-help">
                            {/* Icon Box */}
                            <div className={`
                                bg-glass-surface p-4 rounded-xl border border-glass-border
                                hover:border-white transition-colors shadow-lg
                                group-hover:shadow-[0_0_30px_${config.color}40]
                            `}>
                                <Icon size={48} color={config.color} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Minecraft Tooltip */}
                            <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 minecraft-tooltip p-3 z-50 bg-[#101015] border-2 border-[#555] shadow-xl text-left">
                                <h4 className="font-bold text-sm mb-1 drop-shadow-md" style={{ color: config.color }}>{item.name}</h4>
                                <p className="text-[10px] text-[#AAAAAA] italic font-serif mb-2">&quot;{item.description}&quot;</p>

                                <div className="text-[10px] font-code text-white space-y-1">
                                    <div className="flex justify-between"><span>Proficiency</span> <span>{item.level}</span></div>
                                    <div className="w-full h-1 bg-[#333] mt-1 relative overflow-hidden">
                                        <div className="h-full absolute top-0 left-0" style={{ width: '85%', backgroundColor: config.color, boxShadow: `0 0 5px ${config.color}` }}></div>
                                    </div>
                                    <div className="flex justify-between text-[#55FF55] mt-1"><span>Category</span> <span>{item.category}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
}
