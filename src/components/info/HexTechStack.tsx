'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TECH_STACK } from '@/lib/data';
import { TechCategory, TechItem } from '@/lib/types';

/**
 * HexTechStack Component
 *
 * Displays technical skills in a responsive hexagonal grid.
 *
 * Features:
 * - Dynamic Honeycomb Layout: Automatically arranges items in a 4-3-4-3 pattern on desktop.
 * - Interactive Spotlight: Each hex card tracks mouse movement to create a localized glow effect.
 * - Category Filtering: Allows users to filter skills by type (Languages, Game Engines, etc.).
 * - Responsive Design: Falls back to a simple flex grid on mobile devices.
 */
export default function HexTechStack() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('ALL');

  // Filter tech stack based on active category
  const filteredTech = activeCategory === 'ALL'
    ? TECH_STACK
    : TECH_STACK.filter(t => t.category === activeCategory);

  /**
   * Generates rows for the honeycomb layout (Desktop).
   * Pattern: 4 items, then 3 items, repeating.
   * This ensures the "interlocking" look of the hexagons.
   */
  const generateRows = (items: TechItem[]) => {
    const rows: TechItem[][] = [];
    let i = 0;
    let patternIndex = 0;
    const pattern = [4, 3]; // Alternating row sizes

    while (i < items.length) {
      const size = pattern[patternIndex % pattern.length];
      rows.push(items.slice(i, i + size));
      i += size;
      patternIndex++;
    }
    return rows;
  };

  const rows = generateRows(filteredTech);

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
      <div className="hidden md:flex flex-col items-center relative perspective-1000">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-4"
            style={{
              marginTop: rowIndex === 0 ? 0 : '-35px', // Negative margin creates the vertical overlap
              marginBottom: '0px'
            }}
          >
            {row.map((tech) => (
               <HexItem key={tech.name} tech={tech} isActive={true} />
            ))}
          </div>
        ))}
      </div>

      {/* Hex Grid Container - Mobile (Simple Grid) */}
      <div className="flex md:hidden flex-wrap justify-center gap-4">
         {filteredTech.map((tech) => (
            <HexItem key={tech.name} tech={tech} isActive={true} />
         ))}
      </div>

      <style jsx global>{`
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
}

interface HexItemProps {
    tech: TechItem;
    isActive: boolean;
}

/**
 * HexItem Component
 *
 * Individual hexagon card representing a skill.
 * Handles its own mouse tracking for the spotlight effect.
 */
function HexItem({ tech, isActive }: HexItemProps) {

  /**
   * Updates CSS variables locally on the element to track mouse position
   * relative to the card itself.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

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
      onMouseMove={handleMouseMove}
      className="relative group w-[180px] h-[200px] flex items-center justify-center"
      style={{
          // Initialize CSS variables to center or 0
          // @ts-expect-error custom property
          '--mouse-x': '0px',
          '--mouse-y': '0px',
      }}
    >
       {/* Hexagon Shape Wrapper */}
       <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-md clip-path-hexagon flex items-center justify-center transition-transform duration-300 group-hover:scale-105">

          {/* Spotlight Overlay (Local to Card) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              // Uses local coordinates set by handleMouseMove
              background: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), rgba(6,182,212,0.2), transparent 100%)`
            }}
          />

          {/* Border Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-500" />

          {/* Content */}
          <div className="text-center z-10 p-4 pointer-events-none">
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
