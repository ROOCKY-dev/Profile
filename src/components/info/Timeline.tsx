'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import DecryptText from '@/components/ui/DecryptText';

interface TimelineEventData {
  year: string;
  title: string;
  description: string;
  color: string;
  isEncrypted?: boolean;
}

const events: TimelineEventData[] = [
  {
    year: '2019',
    title: 'Initial Boot',
    description: 'Began coding journey in Yemen. Learned Python & C++ basics.',
    color: '#06b6d4' // Cyan
  },
  {
    year: '2021',
    title: 'System Migration',
    description: 'Relocated to Malaysia. Expanded stack to React, Next.js, and Node.',
    color: '#3b82f6' // Blue
  },
  {
    year: '2023',
    title: 'Core Upgrade',
    description: 'Focus shifted to High-Performance Systems, Game Dev (Unity), and Architecture.',
    color: '#8b5cf6' // Violet
  },
  {
    year: '2025',
    title: 'Future Protocol',
    description: 'Exploring AI Integration, Neural Networks, and Advanced Graphics Programming.',
    color: '#d946ef', // Fuchsia
    isEncrypted: true
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-32 px-4 md:px-8">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         {/* Background Grid for tech feel */}
         <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <h2 className="text-4xl md:text-5xl font-mono text-center mb-24 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tighter">
        {'< Execution Trace />'}
      </h2>

      <div className="relative">
        {/* Central Line Container */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[4px] md:-translate-x-1/2 h-full z-0 bg-white/5 rounded-full overflow-hidden">
           {/* Gradient Fill Line */}
           <motion.div
             className="w-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 origin-top"
             style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
           />
        </div>

        {/* Pulsing Data Packet (Leading the line) */}
        <motion.div
             className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white] z-10"
             style={{
               top: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
               opacity: useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0])
             }}
        />

        <div className="space-y-32 pb-32">
          {events.map((event, index) => (
            <TimelineEvent key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineEvent({ event, index }: { event: TimelineEventData, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: true });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>

      {/* Spacer for alignment on desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Connection Node */}
      <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-black border-2 border-cyan-500 rounded-full z-10 flex items-center justify-center -translate-x-1/2 md:translate-x-[-50%]">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"
        />
      </div>

      {/* Content Card */}
      <div className="pl-16 md:pl-0 w-full md:w-5/12">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50, rotateX: 90 }}
          animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="relative group perspective-1000"
        >
          {/* Card Background & Border */}
          <div className={`
             relative p-6 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden
             group-hover:border-[${event.color}]/50 transition-colors duration-500
          `}>
             {/* Glowing Corner Accent */}
             <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" />

             {/* Year Badge */}
             <span className="inline-block px-3 py-1 mb-3 text-xs font-mono font-bold rounded bg-zinc-800 text-zinc-300 border border-white/5">
                {event.year}
             </span>

             {/* Title with potential encryption */}
             <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
               {event.isEncrypted ? (
                 <DecryptText text={event.title} reveal={isInView} />
               ) : (
                 event.title
               )}
             </h3>

             {/* Description with reveal effect */}
             <motion.p
               initial={{ opacity: 0, height: 0 }}
               animate={isInView ? { opacity: 1, height: 'auto' } : {}}
               className="text-zinc-400 text-sm leading-relaxed"
             >
               {event.isEncrypted ? (
                  <DecryptText text={event.description} reveal={isInView} />
               ) : (
                  event.description
               )}
             </motion.p>

             {/* "Read More" Expanding Line (Visual Only) */}
             <motion.div
               initial={{ scaleX: 0 }}
               animate={isInView ? { scaleX: 1 } : {}}
               transition={{ delay: 0.5, duration: 0.8 }}
               className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-4"
             />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
