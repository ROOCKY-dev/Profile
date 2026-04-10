'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/lib/project-data';
import Footer from '@/components/layout/Footer';
import { fadeSlideUp, staggerContainer } from '@/lib/animations';

export default function WorkPage() {
  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <main className="pt-[60px]">
      {/* Header */}
      <div className="px-6 md:px-12 py-12 border-b-[3px] border-black">
        <h1 className="text-[clamp(48px,10vw,96px)] font-black uppercase leading-[0.88] tracking-[-4px]">
          Work
        </h1>
      </div>

      {/* Filters */}
      <div className="sticky top-[60px] z-40 bg-white border-b-[3px] border-black px-6 md:px-12 py-4 flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-[9px] font-bold tracking-[3px] uppercase px-4 py-2 border-2 border-black transition-colors ${
              active === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-bg'
            }`}
          >
            {cat}
            <span className="ml-2 text-gray">
              {cat === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-0"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={active}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <Link
                  href={`/work/${project.id}`}
                  className="group block border-[3px] border-black hover:bg-gray-bg transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-black">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-[40px] font-black leading-none tracking-[-2px] text-gray-lt">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="label-text">{project.year}</span>
                    </div>
                    <h3 className="text-[20px] font-black uppercase tracking-[-0.5px] mt-2">
                      {project.title}
                    </h3>
                    <p className="text-[12px] text-gray leading-[1.7] mt-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] font-bold tracking-[2px] uppercase border border-black px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
