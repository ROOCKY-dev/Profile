'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';

const projects = [
  {
    title: 'Planetary Claim',
    category: 'Game Dev',
    image: 'https://placehold.co/600x400/1a1a1a/cyan?text=Planetary+Claim',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'A space exploration strategy game built with Unity.'
  },
  {
    title: 'Alto Clef',
    category: 'System Tool',
    image: 'https://placehold.co/600x400/1a1a1a/purple?text=Alto+Clef',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'Advanced audio processing utility for audiophiles.'
  },
  {
    title: 'Neon Nexus',
    category: 'Web App',
    image: 'https://placehold.co/600x400/1a1a1a/pink?text=Neon+Nexus',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'Cyberpunk-themed social dashboard.'
  },
  {
    title: 'Void Walker',
    category: 'Modding',
    image: 'https://placehold.co/600x400/1a1a1a/green?text=Void+Walker',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'Content expansion mod for Minecraft.'
  },
];

export default function ProjectReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="min-h-[100vh] w-full py-20 px-8 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-4xl font-mono mb-16 text-center text-white"
      >
        Deployed Systems
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} isInView={isInView} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, isInView }: { project: any, index: number, isInView: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="w-full"
    >
      <TiltCard
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative group overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 hover:border-cyan-500/50 transition-colors aspect-video"
      >
        <div className="absolute inset-0 w-full h-full">
          {/* Static Background */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500 z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/80 z-0" />

          {/* Video Layer (Hidden by default, shown on hover) */}
          <video
            ref={videoRef}
            src={project.video}
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10 mix-blend-lighten"
          />
        </div>

        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 hover:opacity-100 transition-opacity z-20 pointer-events-none">
          <span className="text-cyan-400 text-xs font-mono mb-1">{project.category}</span>
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-zinc-400 text-sm line-clamp-2">{project.description}</p>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300 z-30">
           <MagneticButton className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
             <span className="sr-only">View</span>
             ↗
           </MagneticButton>
        </div>
      </TiltCard>
    </motion.div>
  );
}
