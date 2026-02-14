'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const events = [
  { year: '2019', title: 'Start', description: 'Began coding journey in Yemen.', color: 'cyan' },
  { year: '2021', title: 'Expansion', description: 'Moved to Malaysia. Full Stack Development.', color: 'blue' },
  { year: '2023', title: 'Future', description: 'Focus on AI Systems and Architecture.', color: 'purple' },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-20 px-4">
      <h2 className="text-4xl font-mono text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        System Logs
      </h2>

      {/* Central Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 -translate-x-1/2">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="w-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 origin-top h-full"
        />
      </div>

      <div className="relative space-y-24">
        {events.map((event, index) => (
          <TimelineEvent key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineEvent({ event, index }: { event: any, index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between ${isLeft ? 'flex-row-reverse' : ''}`}>
      {/* Empty space for alignment */}
      <div className="w-5/12" />

      {/* Node */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-900 border-2 border-cyan-500 z-10 shadow-[0_0_10px_rgba(0,255,255,0.5)]" />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="w-5/12 p-6 bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan-500/50 transition-colors"
      >
        <span className="text-xs font-mono text-cyan-400 mb-2 block">{event.year}</span>
        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{event.description}</p>
      </motion.div>
    </div>
  );
}
