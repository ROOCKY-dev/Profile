'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PROJECTS, ProjectData } from '@/lib/project-data';
import SimpleFooter from '@/components/layout/SimpleFooter';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // Derive unique categories from the data
  const categories = useMemo(() => {
    const cats = Array.from(new Set(PROJECTS.map((p) => p.category)));
    return ['ALL', ...cats];
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'ALL') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-background-dark">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 md:px-12 border-b border-border-dark relative overflow-hidden">
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/"
              className="font-mono text-text-muted text-sm hover:text-primary transition-colors cursor-hover flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              HOME
            </Link>
            <span className="text-border-dark">/</span>
            <span className="font-mono text-primary text-sm">WORK</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase mb-4">
            ALL<br />
            <span className="text-primary">PROJECTS</span>
          </h1>
          <p className="font-mono text-text-muted text-sm max-w-lg">
            A complete archive of work — from Minecraft mods to full-stack web apps.
            Click any project to dive into the case study.
          </p>

          <div className="mt-8 font-mono text-xs text-text-muted">
            {PROJECTS.length} PROJECTS IN ARCHIVE
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[65px] z-30 bg-background-dark/95 backdrop-blur-sm border-b border-border-dark">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 cursor-hover ${
                activeFilter === cat
                  ? 'bg-primary text-background-dark border-primary'
                  : 'border-border-dark text-text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
              {cat === 'ALL' && (
                <span className="ml-2 opacity-60">({PROJECTS.length})</span>
              )}
              {cat !== 'ALL' && (
                <span className="ml-2 opacity-60">
                  ({PROJECTS.filter((p) => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filtered.map((project, index) => (
                <ProjectGridCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-6xl text-border-dark mb-4 block">
                folder_off
              </span>
              <p className="font-mono text-text-muted">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <SimpleFooter />
    </main>
  );
}

function ProjectGridCard({ project, index }: { project: ProjectData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/work/${project.id}`}
        className="group relative block border border-border-dark overflow-hidden cursor-hover hover:border-primary/50 transition-colors duration-500"
      >
        {/* Image */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url('${project.image}')` }}
          />
          <div className="absolute inset-0 bg-background-dark/50 group-hover:bg-background-dark/20 transition-colors duration-500" />

          {/* Year Badge */}
          <div className="absolute top-4 left-4 font-mono text-xs text-white/60 bg-black/40 px-3 py-1 backdrop-blur-sm border border-white/10">
            {project.year}
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4 font-mono text-xs text-primary bg-black/80 px-3 py-1 border border-primary/50">
            {project.category}
          </div>

          {/* Hover Arrow */}
          <div className="absolute bottom-4 right-4 h-12 w-12 flex items-center justify-center border border-white/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
            <span className="material-symbols-outlined text-white group-hover:text-background-dark text-xl group-hover:rotate-[-45deg] transition-all duration-300">
              arrow_forward
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 bg-surface/50 group-hover:bg-surface transition-colors duration-300">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase text-white group-hover:text-primary transition-colors duration-300 mb-2">
            {project.title}
          </h3>
          <p className="font-mono text-text-muted text-sm line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-text-muted border border-border-dark px-2 py-0.5 group-hover:border-primary/30 group-hover:text-primary/70 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="font-mono text-[10px] text-text-muted">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Accent Line */}
        <div className="h-[2px] w-0 group-hover:w-full bg-primary transition-all duration-700 ease-in-out" />
      </Link>
    </motion.div>
  );
}