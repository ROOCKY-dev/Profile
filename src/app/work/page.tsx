"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/data";
import Footer from "@/components/layout/Footer";
import { fadeUp, stagger } from "@/lib/animations";

export default function WorkPage() {
  const [filter, setFilter] = useState("ALL");
  const categories = ["ALL", ...new Set(SITE.projects.map((p) => p.category))];
  const shown = filter === "ALL" ? SITE.projects : SITE.projects.filter((p) => p.category === filter);

  return (
    <main className="w-full bg-[var(--bg-primary)]">
      {/* Header */}
      <section className="relative pt-[120px] md:pt-[180px] pb-16 md:pb-24 border-b border-[var(--border-subtle)] overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent-glow)] to-transparent opacity-30 pointer-events-none" />
        
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="badge mb-8">Index // All Work</span>
            <h1 className="font-display text-[clamp(48px,10vw,120px)] font-bold uppercase tracking-tight leading-none text-[var(--text-primary)]">
              Work / <span className="text-[var(--text-secondary)]">{shown.length.toString().padStart(2, "0")}</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[72px] z-40 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all duration-300 ${
                filter === c
                  ? "bg-[var(--accent-primary)] text-[var(--bg-primary)]"
                  : "bg-white/[0.03] text-[var(--text-secondary)] hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-24">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((project, i) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="group"
              >
                <Link href={`/work/${project.id}`} className="block relative glass-card p-2 rounded-[2rem] h-full">
                  <div className="bg-[var(--bg-elevated)] rounded-[1.5rem] p-8 md:p-12 h-full flex flex-col relative overflow-hidden transition-all duration-700">
                    
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 100% 0%, ${project.gradient[1]}, transparent 60%)` }}
                    />
                    
                    <div className="flex justify-between items-start mb-24 relative z-10">
                      <span className="font-display text-5xl font-semibold opacity-10 group-hover:opacity-30 transition-opacity">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest text-[var(--text-tertiary)]">
                        {project.year}
                      </span>
                    </div>

                    <div className="relative z-10 mt-auto">
                      <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                        {project.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 max-w-md">
                        {project.description}
                      </p>
                      
                      <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
                        <span className="label text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors">
                          {project.category}
                        </span>
                        <span className="text-[var(--accent-primary)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                          →
                        </span>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
