"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { useClock } from "@/hooks/use-animations";
import { staggerContainer, maskReveal, roleAnimation } from "@/lib/animations";

export default function Hero() {
  const D = PORTFOLIO_DATA;
  const roles = D.roles;
  const [roleIdx, setRoleIdx] = useState(0);
  const clock = useClock(D.personal.tz);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] border-b-2 border-black grid-bg overflow-hidden flex flex-col">
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-[1fr_400px]">
        {/* Left Side */}
        <div className="p-6 md:p-12 lg:p-20 pt-[84px] lg:pt-[100px] border-r-0 lg:border-r-2 border-black flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <span className="label-text text-gray-400">Portfolio // {D.portfolio.issue}</span>
            <span className="label-text text-right text-gray-400">
              {D.personal.location} / {clock || "--:--:--"} {D.personal.tzLabel}
            </span>
          </div>

          <motion.div 
            className="flex-1 flex flex-col justify-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-heading text-[clamp(56px,14vw,180px)] leading-[0.82] tracking-[-0.05em] uppercase breathe-header text-black font-black">
              <motion.div variants={maskReveal}>Creative</motion.div>
              <div className="flex items-baseline gap-4 md:gap-10 flex-wrap">
                <motion.div variants={maskReveal}>Dev —</motion.div>
                <div className="relative h-[0.9em] overflow-hidden min-w-[8ch]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roles[roleIdx]}
                      variants={roleAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-0 text-gray-300"
                    >
                      {roles[roleIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
              <motion.div variants={maskReveal}>At Work.</motion.div>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] items-end gap-8 md:gap-16">
            <motion.div 
              className="max-w-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={maskReveal}
            >
              <p className="text-[14px] md:text-[15px] leading-relaxed text-gray-600">
                {D.personal.name} — Kuala Lumpur. Crafting immersive digital experiences;
                bridging the gap between imagination and reality. Minecraft mods, web
                platforms, AI pipelines. Quiet, obsessive, 24/7.
              </p>
              <div className="mt-6 font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-black border-b-2 border-black inline-block pb-1">
                {D.personal.email}
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={maskReveal}
            >
              <a href="#work" className="btn btn-black w-full h-[52px]">
                <span>View Work</span>
                <span>→</span>
              </a>
              <a href="#contact" className="btn btn-outline w-full h-[52px]">
                <span>Contact</span>
                <span>→</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Side Stats */}
        <div className="hidden lg:flex flex-col border-t-2 lg:border-t-0 border-black h-full">
          {D.stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={maskReveal}
              transition={{ delay: i * 0.1 }}
              className={`p-10 lg:p-12 flex-1 flex flex-col justify-between border-b-2 last:border-b-0 border-black ${
                i === 2 ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <span className={`label-text ${i === 2 ? "text-gray-600" : "text-gray-400"}`}>
                Stat // 0{i + 1}
              </span>
              <div>
                <div className="text-7xl md:text-8xl font-heading tracking-tighter leading-none mb-3 font-black">
                  {stat.num}
                </div>
                <div className="label-text mt-4 block text-xs tracking-[4px]">
                  {stat.label}
                </div>
                <p className={`font-mono text-[10px] mt-2 tracking-widest ${i === 2 ? "text-gray-500" : "text-gray-400"}`}>
                  {stat.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
