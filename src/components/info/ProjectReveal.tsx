'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from '@/components/ui/TiltCard';
import { playHoverSound } from '@/lib/sound';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { Project } from '@/lib/types';

/**
 * Project Reveal Component
 *
 * Displays a grid of project cards with tilt effects and video previews on hover.
 */
export default function ProjectReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="min-h-screen w-full py-32 px-4 md:px-8 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-mono mb-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
      >
        {'< Deployed Systems />'}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full auto-rows-[300px] grid-flow-dense">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} isInView={isInView} />
        ))}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverSound();
    if (videoRef.current && project.video) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked or promise rejected if unmounted quickly
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && project.video) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group ${project.className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TiltCard className="w-full h-full relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl group-hover:border-cyan-500/50 transition-colors duration-500">

        {/* Image Layer */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110 blur-sm' : 'scale-100'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
        </div>

        {/* Video Layer (Optional) */}
        {project.video && (
           <video
             ref={videoRef}
             src={project.video}
             loop
             muted
             playsInline
             className={`absolute inset-0 w-full h-full object-cover mix-blend-overlay transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
           />
        )}

        {/* Content Layer */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className={`transform transition-all duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-4'}`}>
             <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded">
                  {project.category}
                </span>
                <div className="h-[1px] flex-1 bg-white/20" />
             </div>

             <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{project.title}</h3>

             <p className={`text-zinc-300 text-sm leading-relaxed transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
               {project.description}
             </p>
          </div>
        </div>

        {/* Holographic Glare */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ transform: 'translateZ(20px)' }}
        />

      </TiltCard>
    </motion.div>
  );
}
