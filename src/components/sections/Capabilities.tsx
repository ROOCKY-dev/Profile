"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/animations";

export default function Capabilities() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-24 md:py-40">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <span className="badge mb-8">02 // Capabilities</span>
          <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-tight uppercase text-[var(--text-primary)] max-w-2xl">
            Tools & <span className="text-[var(--text-secondary)]">Technique.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SITE.capabilities.map((cap, i) => (
            <motion.div
              key={cap.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setHoveredId(cap.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative glass-card p-10 overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-[var(--accent-glow-strong)] to-transparent opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  hoveredId === cap.id ? "opacity-100" : ""
                }`} 
              />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-16">
                  <span className="font-mono text-xs text-[var(--text-tertiary)]">{cap.number}</span>
                  <span className="font-mono text-[10px] tracking-widest text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    {cap.tools.length} TOOLS
                  </span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tight mb-6">
                  {cap.title}
                </h3>
                
                <p className="text-[var(--text-secondary)] leading-relaxed mb-12 flex-1">
                  {cap.description}
                </p>

                <div className="relative h-8 overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {hoveredId === cap.id ? (
                      <motion.div
                        key="tools"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-wrap gap-2"
                      >
                        {cap.tools.slice(0, 3).map(tool => (
                          <span key={tool} className="text-xs font-mono text-[var(--text-primary)]">
                            {tool}
                            <span className="text-[var(--text-tertiary)] mx-2">/</span>
                          </span>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="verb"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="label text-[var(--text-tertiary)]"
                      >
                        {cap.verb}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
