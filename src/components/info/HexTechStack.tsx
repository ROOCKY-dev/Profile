'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TECH_STACK } from '@/lib/data';
import { TechCategory, TechItem } from '@/lib/types';

/**
 * HexTechStack
 *
 * Displays a technical toolkit in a hexagonal grid layout.
 * Supports filtering by category and interactive spotlight effects.
 */
export default function HexTechStack() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('ALL');
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Updates CSS variables for the mouse position to create a spotlight effect.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Organize for Honeycomb Layout (Desktop)
  // Rows: 4, 3, 4
  const rows = [
    TECH_STACK.slice(0, 4),
    TECH_STACK.slice(4, 7),
    TECH_STACK.slice(7, 11),
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-4">
      <h2 className="text-4xl md:text-5xl font-mono text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        {'< Technical Toolkit />'}
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-16 flex-wrap">
        {['ALL', 'LANGUAGES', 'GAME_ENGINES', 'SPECIALIZATIONS', 'INFRASTRUCTURE'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as TechCategory)}
            className={`
              px-6 py-2 rounded-full font-mono text-sm transition-all duration-300 border
              ${activeCategory === cat
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-zinc-900/50 border-white/10 text-zinc-500 hover:border-white/30 hover:text-zinc-300'}
            `}
          >
            {cat.replace('_', ' ').replace(/(\w)(\w*)/g, (g0,g1,g2) => g1 + g2.toLowerCase())}
          </button>
        ))}
      </div>

      {/* Hex Grid Container - Desktop (Honeycomb) */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="hidden md:flex flex-col items-center relative perspective-1000"
        style={{
          // @ts-expect-error custom property used for spotlight effect
          '--mouse-x': '0px',
          '--mouse-y': '0px',
        }}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-4"
            style={{
              marginTop: rowIndex === 0 ? 0 : '-35px', // Overlap rows vertically
              marginBottom: '0px'
            }}
          >
            {row.map((tech) => (
               <HexItem key={tech.name} tech={tech} activeCategory={activeCategory} />
            ))}
          </div>
        ))}
      </div>

      {/* Hex Grid Container - Mobile (Simple Grid) */}
      <div className="flex md:hidden flex-wrap justify-center gap-4">
         {TECH_STACK.map((tech) => (
            <HexItem key={tech.name} tech={tech} activeCategory={activeCategory} />
         ))}
      </div>

      {/* Global styles for hexagon clip path */}
      <style jsx global>{`
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
}

function HexItem({ tech, activeCategory }: { tech: TechItem, activeCategory: TechCategory }) {
  const isActive = activeCategory === 'ALL' || tech.category === activeCategory;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.9,
        filter: isActive ? 'grayscale(0%)' : 'grayscale(100%) blur(2px)'
      }}
      transition={{ duration: 0.4 }}
      className="relative group w-[180px] h-[200px] flex items-center justify-center"
    >
       {/* Hexagon Shape Wrapper */}
       <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-md clip-path-hexagon flex items-center justify-center transition-transform duration-300 group-hover:scale-105">

          {/* Spotlight Overlay (Global) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(6,182,212,0.15), transparent 40%)`
            }}
          />

          {/* Border Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-500" />

          {/* Content */}
          <div className="text-center z-10 p-4">
             <div className="text-3xl mb-2 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
               ⬡
             </div>
             <h3 className="text-lg font-bold text-white mb-1">{tech.name}</h3>
             <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{tech.level}</p>
          </div>

          {/* Detail Tooltip on Hover */}
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
             <p className="text-xs text-cyan-300 font-mono mb-1">{'>'} {tech.category.replace('_', ' ')}</p>
             <p className="text-sm text-zinc-300 text-center leading-tight">{tech.description}</p>
          </div>
       </div>

       {/* Hexagon Border SVG */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-zinc-700 group-hover:stroke-cyan-500/50 transition-colors duration-300" viewBox="0 0 100 100" preserveAspectRatio="none">
         <polygon points="50 0, 100 25, 100 75, 50 100, 0 75, 0 25" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" />
       </svg>
    </motion.div>
  );
}
