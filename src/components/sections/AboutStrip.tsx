"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { SITE } from "@/lib/data";

export default function AboutStrip() {
  return (
    <section id="about" className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[var(--bg-glass)] to-transparent pointer-events-none" />
      
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-20">
          
          {/* Left: Bio */}
          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeUp} className="mb-12">
              <span className="badge">01 // Identity</span>
            </motion.div>

            <motion.h2 
              variants={fadeUp}
              className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-tight uppercase mb-10 text-[var(--text-primary)]"
            >
              A workshop<br />
              <span className="text-[var(--text-secondary)]">that never</span><br />
              <span className="text-[var(--accent-primary)] glow-text">closes.</span>
            </motion.h2>

            <motion.p 
              variants={fadeUp}
              className="text-lg leading-relaxed text-[var(--text-secondary)] max-w-xl mb-12"
            >
              {SITE.personal.bio}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {SITE.tags.map((tag) => (
                <span key={tag} className="label px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-white/[0.02]">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Activity Log */}
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="glass-card-elevated p-8 md:p-12 h-full flex flex-col">
              <div className="flex items-center justify-between mb-12">
                <span className="label">Activity / Syslog</span>
                <div className="flex items-center gap-2">
                  <div className="status-dot bg-amber-400" />
                  <span className="label text-amber-400">Recording</span>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                {SITE.log.map((entry, i) => (
                  <div 
                    key={i} 
                    className="flex gap-6 items-start font-mono text-sm group"
                    style={{ opacity: 1 - i * 0.15 }}
                  >
                    <span className="text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors">
                      {entry.time}
                    </span>
                    <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {entry.event}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-[var(--border-subtle)]">
                <div className="font-mono text-xs text-[var(--accent-primary)] opacity-80">
                  <span className="animate-pulse">_</span> system standing by
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
