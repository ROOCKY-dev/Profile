"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { StatusPill, Typewriter } from "../ui/WorkshopStatus";
import { maskReveal } from "@/lib/animations";

export default function AboutStrip() {
  const D = PORTFOLIO_DATA;
  const status = D.stat.status;
  const s = D.status[status as keyof typeof D.status];

  return (
    <section id="about" className="border-b-2 border-black min-h-[calc(100vh-64px)] flex flex-col justify-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] flex-1">
        {/* Left Side */}
        <motion.div 
          className="p-6 md:p-12 lg:p-20 lg:border-r-2 border-black flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={maskReveal}
        >
          <div className="mb-12">
            <span className="label-text text-gray-400 block mb-2">02 / About</span>
            <span className="label-text cursor-pointer hover:text-black transition-colors underline underline-offset-4">Full Bio →</span>
          </div>

          <h2 className="font-heading text-[clamp(44px,8.5vw,100px)] leading-[0.88] tracking-[-0.05em] uppercase breathe-header mb-12 font-black text-black">
            A workshop<br/>that never closes.
          </h2>

          <p className="text-[16px] md:text-[18px] leading-relaxed text-gray-600 max-w-2xl mb-12">
            Self-taught, curious, and stubborn about craft. I split my time between
            cybersecurity coursework at UNITEN and a rotating bench of side
            projects — Minecraft mods, web platforms, and AI-assisted tooling.
            I prefer shipping small, sharp things over shipping big, fuzzy ones.
          </p>

          <div className="flex flex-wrap gap-3">
            {['Malaysia, MY', 'Cyber Sec @ UNITEN', 'Open for collab', 'Speaks EN / AR'].map((tag) => (
              <span 
                key={tag} 
                className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 border-2 border-black bg-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div 
          className="p-6 md:p-12 lg:p-20 bg-gray-50 flex flex-col justify-between overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={maskReveal}
        >
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-16">
              <span className="label-text text-gray-400">Current State</span>
              <StatusPill status={status} />
            </div>

            <div className="font-mono">
              <div className="text-[11px] text-gray-400 mb-6 tracking-widest uppercase">$ tail -f workshop.log</div>
              <div className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-black max-w-lg uppercase">
                <Typewriter text={s.now} />
              </div>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t-2 border-dashed border-gray-200">
            <div className="label-text mb-8 text-gray-300">Activity Log</div>
            <div className="space-y-4">
              {D.log.map((log, i) => (
                <div 
                  key={i} 
                  className="grid grid-cols-[80px_1fr] gap-6 font-mono text-[11px] md:text-[12px]" 
                  style={{ opacity: 1 - i * 0.12 }}
                >
                  <span className="text-gray-400 font-bold">{log.t}</span>
                  <span className="text-gray-800 font-bold uppercase tracking-wider">{log.e}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
