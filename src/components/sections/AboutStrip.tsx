'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { staggerContainer, slideFromLeft, slideFromRight, borderDrawVertical } from '@/lib/animations';

export default function AboutStrip() {
  const { personal, stat } = PORTFOLIO_DATA;

  return (
    <motion.section
      id="about"
      className="relative grid grid-cols-1 md:grid-cols-2 border-y-[3px] border-black"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Left — Bio */}
      <motion.div
        className="p-8 md:p-12"
        variants={slideFromLeft}
      >
        <div className="label-text mb-6">About</div>
        <p className="text-[14px] leading-[1.8] text-gray max-w-md">
          {personal.name} — {personal.role}. Based in {personal.location}.
          Building digital experiences — games, web tools, and AI-driven
          applications. Cybersecurity student at UNITEN. Always shipping.
        </p>
      </motion.div>

      {/* Animated vertical border — md+ only */}
      <motion.div
        className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 h-full w-[3px] bg-black origin-top"
        variants={borderDrawVertical}
      />

      {/* Right — Currently */}
      <motion.div
        className="p-8 md:p-12"
        variants={slideFromRight}
      >
        <div className="label-text mb-6">Currently</div>
        <div className="font-mono text-[14px] leading-[1.8]">
          <span>{stat.currentlyWorkingOn ?? 'Building something new'}</span>
          <span className="cursor-blink" />
        </div>
      </motion.div>
    </motion.section>
  );
}
