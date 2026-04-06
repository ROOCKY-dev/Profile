'use client';

import { motion } from 'framer-motion';
import { fadeSlideUp } from '@/lib/animations';

const ITEMS = [
  'WEB DEVELOPMENT',
  'GAME DEVELOPMENT',
  'AI TOOLS',
  'MINECRAFT MODS',
  'AVAILABLE FOR PROJECTS',
  'MALAYSIA BASED',
  'FULL STACK',
];

export default function Marquee() {
  const content = ITEMS.map((item) => `${item} —`).join(' ');

  return (
    <motion.div
      className="bg-black text-white py-4 overflow-hidden border-b-[3px] border-black"
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex whitespace-nowrap">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="animate-marquee flex-shrink-0 text-[10px] font-bold tracking-[4px] uppercase px-4"
          >
            {content}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
