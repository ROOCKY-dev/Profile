'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from '@/components/ui/AnimatedText';
import CountUp from '@/components/ui/CountUp';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import {
  borderDraw,
  borderDrawVertical,
  fadeSlideUp,
  statPop,
  staggerContainerSlow,
} from '@/lib/animations';

export default function Hero() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section className="grid-bg min-h-screen pt-[60px] grid grid-cols-1 lg:grid-cols-[1fr_380px] border-b-[3px] border-black">
      {/* Left */}
      <div className="relative flex flex-col justify-between p-8 md:p-12">
        {/* Animated vertical border replacing the static lg:border-r */}
        <motion.div
          className="hidden lg:block absolute right-0 top-0 w-[3px] bg-black origin-top"
          style={{ height: '100%' }}
          variants={borderDrawVertical}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        <div className="label-text">Portfolio — No. 04</div>

        <div className="flex-1 flex flex-col justify-center py-12">
          <AnimatedText
            text="CREATIVE DEVELOPER."
            as="h1"
            mode="word"
            className="text-[clamp(48px,10vw,96px)] font-black uppercase leading-[0.88] tracking-[-4px]"
          />

          <motion.div
            className="h-[3px] bg-black my-8 origin-left"
            variants={borderDraw}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={fadeSlideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[13px] text-gray leading-[1.8] md:border-r md:border-gray-lt md:pr-8">
              {PORTFOLIO_DATA.hero.description}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/work"
                className="text-center text-[10px] font-bold tracking-[3px] uppercase bg-black text-white py-[13px] px-6 border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                View Work
              </Link>
              <a
                href="#contact"
                className="text-center text-[10px] font-bold tracking-[3px] uppercase bg-white text-black py-[13px] px-6 border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>

        <div className="label-text">{personal.email}</div>
      </div>

      {/* Right — Stats */}
      <motion.div
        className="hidden lg:flex flex-col"
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="flex-1 flex flex-col justify-end p-8 border-b-[3px] border-black"
          variants={statPop}
        >
          <CountUp target={2} suffix="+" className="text-[56px] font-black leading-none tracking-[-2px]" />
          <div className="label-text mt-2">Projects Shipped</div>
          <p className="text-[11px] text-gray mt-2 leading-[1.5]">
            Minecraft mods, web platforms, AI tools
          </p>
        </motion.div>
        <motion.div
          className="flex-1 flex flex-col justify-end p-8 border-b-[3px] border-black"
          variants={statPop}
        >
          <CountUp target={1} suffix="+" className="text-[56px] font-black leading-none tracking-[-2px]" />
          <div className="label-text mt-2">Year Experience</div>
          <p className="text-[11px] text-gray mt-2 leading-[1.5]">
            Full-stack + game development
          </p>
        </motion.div>
        <motion.div
          className="flex-1 flex flex-col justify-end p-8 bg-black text-white"
          variants={statPop}
        >
          <span className="text-[56px] font-black leading-none tracking-[-2px]">MY</span>
          <div className="label-text mt-2 !text-[#555]">Malaysia — Available</div>
          <p className="text-[11px] text-[#555] mt-2 leading-[1.5]">
            Remote-friendly, open to collab
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
