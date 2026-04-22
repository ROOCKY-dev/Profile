"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import Footer from "@/components/layout/Footer";
import { maskReveal, staggerContainer } from "@/lib/animations";

export default function WorkPage() {
  const D = PORTFOLIO_DATA;
  const [filter, setFilter] = useState('ALL');

  const cats = ['ALL', ...new Set(D.projects.map(p => p.category))];
  const shown = filter === 'ALL' ? D.projects : D.projects.filter(p => p.category === filter);

  return (
    <main className="min-h-screen bg-white pt-[60px]">
      {/* Header */}
      <section className="border-b-2 border-black grid-bg px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <motion.div 
          className="w-full"
          initial="hidden"
          animate="visible"
          variants={maskReveal}
        >
          <span className="label-text text-gray-400">Index // All Work</span>
          <h1 className="font-serif text-[clamp(64px,14vw,200px)] uppercase leading-[0.82] tracking-[-0.05em] mt-8 breathe-header">
            Work / <span className="text-gray-100">{shown.length.toString().padStart(2, '0')}</span>
          </h1>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="sticky top-[60px] z-40 bg-white/80 backdrop-blur-md border-b-2 border-black">
        <div className="w-full px-6 md:px-12 lg:px-20 py-5 flex flex-wrap gap-3">
          {cats.map(c => (
            <button 
              key={c} 
              onClick={() => setFilter(c)} 
              className={`font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-5 py-2 border-2 border-black transition-all ${
                filter === c ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-gray-50">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={filter}
        >
          <AnimatePresence mode="popLayout">
            {shown.map((project, i) => (
              <motion.div
                key={project.id}
                variants={maskReveal}
                layout
                className="group border-2 border-black bg-white"
              >
                <Link href={`/work/${project.id}`}>
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-16">
                      <span className="font-serif text-7xl text-gray-100 group-hover:text-black/5 transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="label-text text-gray-400 group-hover:text-black transition-colors">{project.year}</span>
                    </div>

                    <h3 className="font-serif text-[44px] md:text-[52px] uppercase tracking-tighter mb-6 leading-none transition-transform duration-500 group-hover:translate-x-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-[16px] leading-relaxed text-gray-500 max-w-md mb-12">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-10 border-t-2 border-dashed border-gray-100">
                      <span className="label-text text-gray-300 group-hover:text-black transition-colors">{project.category}</span>
                      <span className="font-mono text-[11px] font-black tracking-widest group-hover:translate-x-1 transition-transform">EXPLORE CASE →</span>
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
