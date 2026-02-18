'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Cpu, Coffee } from 'lucide-react';
import { ABOUT_ME, timelineEvents } from '@/lib/data';
import DecryptText from '@/components/ui/DecryptText';
import { TimelineEventData } from '@/lib/types';

export default function BioTimelineBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px", once: true });

  return (
    <div ref={containerRef} className="max-w-[1200px] w-full mx-auto relative z-10 h-full flex flex-col py-20 px-6">

        {/* Header */}
        <div className="mb-12 md:mb-16 border-l-4 border-primary pl-6 py-2 bg-gradient-to-r from-primary/5 to-transparent">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                02 BIO & TIMELINE
            </h2>
            <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                <p className="font-code text-text-muted text-sm md:text-base tracking-wide uppercase">
                    &gt; Syncing_Neuro_Link... <span className="text-primary font-bold">Connected</span>
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 h-full relative">

            {/* Left Column: Bio Terminal */}
            <div className="lg:col-span-5 flex flex-col h-full sticky top-32 self-start z-20">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="glass-panel rounded-lg overflow-hidden flex flex-col h-auto min-h-[480px] border border-glass-border shadow-[0_0_40px_rgba(0,0,0,0.5)] relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-4 w-full animate-scanline pointer-events-none opacity-30"></div>

                    {/* Terminal Header */}
                    <div className="h-10 bg-[#0A0A12] border-b border-white/5 flex items-center px-4 justify-between select-none">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-110"></div>
                        </div>
                        <div className="text-[10px] font-code text-text-muted opacity-60 flex items-center gap-1">
                            <Terminal size={12} /> bash — bio.sh
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-6 font-code text-sm md:text-[15px] leading-relaxed text-text-primary flex-1 overflow-y-auto font-medium">
                        <div className="space-y-5">
                            <div className="flex items-center gap-2">
                                <span className="text-accent-purple">root@nebula</span><span className="text-text-muted">:</span><span className="text-primary">~</span><span className="text-text-muted">$</span>
                                <span className="typing-text">./init_bio_sequence.sh</span>
                            </div>
                            <div className="pl-4 border-l border-white/10 space-y-2">
                                <p className="text-primary/80 text-xs uppercase tracking-widest mb-1">[System Message]</p>
                                <p className="text-text-muted">Loading character profile...</p>
                                <p className="text-green-400">&gt; Subject Identified: Ahmed [Dev_Class_S]</p>
                            </div>

                            <div className="mt-4 text-gray-300">
                                <p className="mb-4">
                                    <span className="text-primary">&gt;</span> <span dangerouslySetInnerHTML={{ __html: ABOUT_ME.description }} />
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-accent-purple">root@nebula</span><span className="text-text-muted">:</span><span className="text-primary">~</span><span className="text-text-muted">$</span>
                                    <span>check_status --verbose</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                    <div className="bg-white/5 p-2 rounded border border-white/5">
                                        <p className="text-xs text-text-muted mb-1 flex items-center gap-1"><Cpu size={10} /> CURRENT_QUEST</p>
                                        <p className="text-primary text-xs">Freelance Available</p>
                                    </div>
                                    <div className="bg-white/5 p-2 rounded border border-white/5">
                                        <p className="text-xs text-text-muted mb-1 flex items-center gap-1"><Coffee size={10} /> MANA_POOL</p>
                                        <p className="text-green-400 text-xs">Coffee: 85%</p>
                                    </div>
                                </div>
                                <p className="mt-4 animate-blink text-primary">█</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Timeline */}
            <div className="lg:col-span-7 pl-0 lg:pl-8 relative flex flex-col gap-12">
                {/* Vertical Line */}
                <div className="absolute left-6 md:left-[3.2rem] top-4 bottom-0 w-[2px] bg-[#333] z-0">
                    <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-primary via-primary to-[#333] shadow-[0_0_15px_rgba(0,240,255,0.6)]"></div>
                    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-4 h-1 bg-primary blur-[2px]"></div>
                </div>

                {timelineEvents.map((event, index) => (
                    <TimelineCard key={index} event={event} index={index} />
                ))}
            </div>
        </div>
    </div>
  );
}

function TimelineCard({ event, index }: { event: TimelineEventData, index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-10% 0px", once: true });

    // Determine styles based on index/type to match design variety
    // Design has different colors/icons per card type.
    // I'll map them based on index for variety or event.color.

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group pl-20 md:pl-24"
        >
            {/* Timeline Node */}
            <div className={`
                absolute left-3 md:left-[2.2rem] top-0 h-8 w-8 rounded-full border border-primary bg-void z-10
                shadow-[0_0_20px_rgba(0,240,255,0.6)] group-hover:scale-125 transition-all duration-300 flex items-center justify-center
            `}>
                <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,240,255,1)] animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border border-primary opacity-0 group-hover:animate-ping"></div>
            </div>

            {/* Horizontal Connector */}
            <div className="absolute left-[2.8rem] top-4 w-12 h-[1px] bg-primary/50 hidden md:block"></div>

            {/* Content Card */}
            <div className={`
                glass-panel p-6 rounded-xl transition-all duration-300
                group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]
                group-hover:-translate-y-1 relative overflow-hidden
            `}>
                {/* XP / Level Badge (Design Element) */}
                <div className="absolute top-0 right-0 p-3 flex flex-col items-end gap-1">
                    <span className="text-[10px] text-primary font-code opacity-70">LVL. {99 - index * 10}</span>
                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary shadow-[0_0_5px_rgba(0,240,255,0.8)]" style={{ width: `${90 - index * 15}%` }}></div>
                    </div>
                </div>

                <span className="inline-block py-1 px-2 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-code mb-3">
                    {event.year}
                </span>

                <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
                    {event.title}
                </h3>

                {/* Assuming Description might have role inside, or just text */}
                <p className="text-text-muted text-sm leading-relaxed mb-5 border-l-2 border-primary/20 pl-4 font-body">
                    {event.isEncrypted ? <DecryptText text={event.description} reveal={isInView} /> : event.description}
                </p>

                {/* Tags (Design Element) */}
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-code text-text-muted uppercase">
                        <span>Core Skills</span>
                        <span>XP Gained</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {['Systems', 'Strategy', 'Dev'].map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-void border border-white/10 rounded text-xs text-gray-300 hover:border-primary hover:text-primary transition-colors cursor-help" title={`Mastery: ${90 - i*10}%`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
