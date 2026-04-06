'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { fadeSlideUp } from '@/lib/animations';

export default function AboutStrip() {
  const { personal, stat } = PORTFOLIO_DATA;

  return (
    <motion.section
      id="about"
      className="grid grid-cols-1 md:grid-cols-2 border-y-[3px] border-black"
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Left — Bio */}
      <div className="p-8 md:p-12 md:border-r-[3px] md:border-black">
        <div className="label-text mb-6">About</div>
        <p className="text-[14px] leading-[1.8] text-gray max-w-md">
          {personal.name} — {personal.role}. Based in {personal.location}.
          Building digital experiences — games, web tools, and AI-driven
          applications. Cybersecurity student at UNITEN. Always shipping.
        </p>
      </div>

      {/* Right — Currently */}
      <div className="p-8 md:p-12">
        <div className="label-text mb-6">Currently</div>
        <div className="font-mono text-[14px] leading-[1.8]">
          <span>{stat.currentlyWorkingOn ?? 'Building something new'}</span>
          <span className="cursor-blink" />
        </div>
      </div>
    </motion.section>
  );
}
