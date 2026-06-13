"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/data";
import { useClock } from "@/hooks/use-clock";
import { fadeUp, stagger, roleSwap } from "@/lib/animations";

export default function Hero() {
  const D = SITE;
  const roles = D.roles;
  const [roleIdx, setRoleIdx] = useState(0);
  const clock = useClock(D.personal.tz);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % roles.length),
      2800
    );
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col">
      {/* Background Glow Blobs */}
      <div className="hero-glow top-[-200px] left-1/2 -translate-x-1/2" />
      <div
        className="absolute w-[500px] h-[400px] rounded-full filter blur-[100px] opacity-[0.08] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #818cf8, transparent)",
          bottom: "-100px",
          right: "-100px",
        }}
      />

      {/* Dot Grid Overlay */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-[120px] md:pt-[160px] flex flex-col justify-between pb-12 md:pb-20">
        {/* Top Row: Meta */}
        <motion.div
          className="flex justify-between items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="label">Portfolio // 2026</span>
          <span className="label text-right">
            {D.personal.location} / {clock || "--:--:--"} {D.personal.tzLabel}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          className="flex-1 flex flex-col justify-center py-12 md:py-20"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-display text-[clamp(48px,12vw,160px)] leading-[0.92] tracking-[-0.04em] uppercase font-semibold">
            <motion.div variants={fadeUp}>
              <span className="text-[var(--text-primary)]">Creative</span>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="flex items-baseline gap-4 md:gap-8 flex-wrap"
            >
              <span className="text-[var(--text-primary)]">Dev —</span>
              <div className="relative h-[0.9em] overflow-visible min-w-[12ch]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIdx]}
                    variants={roleSwap}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      duration: 0.5,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="absolute left-0 top-0 text-[var(--accent-primary)] glow-text"
                  >
                    {roles[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <span className="text-[var(--text-primary)]">At Work</span>
              <span className="text-[var(--accent-primary)]">.</span>
            </motion.div>
          </h1>
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] items-end gap-12 md:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {/* Description */}
          <motion.div variants={fadeUp} className="max-w-xl">
            <p className="text-[15px] md:text-base leading-relaxed text-[var(--text-secondary)]">
              {D.personal.name} — Kuala Lumpur. {D.personal.heroParagraph}
            </p>
            <a
              href={`mailto:${D.personal.email}`}
              className="inline-block mt-6 label text-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors duration-300 border-b border-[var(--border-accent)] pb-1"
            >
              {D.personal.email}
            </a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <a href="#work" className="btn-primary w-full justify-between">
              <span>View Work</span>
              <span>→</span>
            </a>
            <a href="#contact" className="btn-ghost w-full justify-between">
              <span>Contact</span>
              <span>→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none z-10" />
    </section>
  );
}
