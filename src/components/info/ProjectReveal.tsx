'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { Project } from '@/lib/types';

export default function ProjectReveal() {
  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-glass-border pb-6 gap-4 mb-12">
            <div className="space-y-1">
                <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                    <span className="w-2 h-8 bg-accent-red block"></span>
                    DEPLOYMENT_LOGS
                </h3>
                <p className="text-text-muted text-sm font-code pl-5">Displaying active project nodes.</p>
            </div>
            <div className="flex gap-1 text-xs font-code text-text-muted bg-glass-surface p-1 rounded-lg border border-glass-border">
                <button className="px-4 py-2 hover:bg-white/10 hover:text-white rounded transition-colors text-white bg-white/5 border border-white/10">[ALL]</button>
                <button className="px-4 py-2 hover:bg-white/10 hover:text-white rounded transition-colors">[WEB3]</button>
                <button className="px-4 py-2 hover:bg-white/10 hover:text-white rounded transition-colors">[SAAS]</button>
                <button className="px-4 py-2 hover:bg-white/10 hover:text-white rounded transition-colors">[AI]</button>
            </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 perspective-1000 px-4 md:px-0">
            {PROJECTS.map((project, index) => (
                <TiltCard key={index} project={project} index={index} />
            ))}
        </div>

        <div className="w-full flex justify-center pt-16">
            <button className="flex flex-col items-center gap-3 text-text-muted hover:text-white transition-colors group cursor-help">
                <span className="font-code text-xs tracking-[0.2em] uppercase group-hover:text-accent-red transition-colors">Load_More_Data</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-text-muted to-transparent group-hover:via-accent-red transition-all"></div>
                <span className="material-symbols-outlined animate-bounce text-accent-red text-xl">expand_more</span>
            </button>
        </div>
    </div>
  );
}

function TiltCard({ project, index }: { project: Project, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        const glareX = ((x / rect.width) * 100);
        const glareY = ((y / rect.height) * 100);

        cardRef.current.style.setProperty('--rotateX', `${rotateX}deg`);
        cardRef.current.style.setProperty('--rotateY', `${rotateY}deg`);
        cardRef.current.style.setProperty('--glareX', `${glareX}%`);
        cardRef.current.style.setProperty('--glareY', `${glareY}%`);
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.setProperty('--rotateX', '0deg');
        cardRef.current.style.setProperty('--rotateY', '0deg');
        cardRef.current.style.setProperty('--glareX', '50%');
        cardRef.current.style.setProperty('--glareY', '50%');
    };

    // Use project.category to determine accent color
    const accentColor = project.category === 'Game Dev' ? 'text-primary' :
                        project.category === 'Infrastructure' ? 'text-accent-purple' :
                        project.category === 'Web App' ? 'text-accent-red' : 'text-white';

    const borderColor = project.category === 'Game Dev' ? 'group-hover:border-primary/50' :
                        project.category === 'Infrastructure' ? 'group-hover:border-accent-purple/50' :
                        project.category === 'Web App' ? 'group-hover:border-accent-red/50' : 'group-hover:border-white/50';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`
                group relative h-[420px] glass-panel rounded-xl overflow-hidden cursor-pointer tilt-card border border-glass-border
                ${borderColor} transition-all duration-300 transform-style-3d
            `}
            style={{
                // @ts-expect-error: Custom CSS variables
                '--rotateX': '0deg',
                '--rotateY': '0deg',
                '--glareX': '50%',
                '--glareY': '50%'
            }}
        >
            {/* Holo Glare */}
            <div
                className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                style={{
                    background: `linear-gradient(125deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0) 100%)`,
                    transform: `translateX(var(--glareX)) translateY(var(--glareY))` // Simplified glare movement logic
                }}
            />

            {/* Image/Video Container */}
            <div className="absolute top-0 left-0 w-full h-[65%] bg-void overflow-hidden border-b border-glass-border">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-0 mix-blend-luminosity group-hover:mix-blend-normal"
                />

                {/* Video Overlay */}
                <div className="absolute inset-0 w-full h-full bg-void video-overlay flex flex-col items-center justify-center overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    {/* Placeholder for video - in real app would use <video> */}
                    <div className="w-full h-full bg-[#111] flex items-center justify-center">
                        {project.video ? (
                            <video src={project.video} autoPlay loop muted className="w-full h-full object-cover opacity-60 mix-blend-screen" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black opacity-60 mix-blend-screen" />
                        )}
                    </div>
                    <Play size={48} className={`${accentColor} absolute z-20 animate-pulse drop-shadow-[0_0_15px_currentColor]`} />
                </div>

                {/* Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[20px] w-full animate-scanline pointer-events-none z-30 opacity-30"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 w-full h-[35%] p-6 flex flex-col justify-between bg-black/40 backdrop-blur-md tilt-content transform-style-3d translate-z-10">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h4 className={`text-2xl font-bold text-white group-hover:${accentColor} transition-colors font-display text-shadow-neon`}>
                            {project.title.toUpperCase().replace(' ', '_')}
                        </h4>
                        <ArrowUpRight className="text-white/20 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-sm text-text-muted line-clamp-2 font-body leading-relaxed group-hover:text-gray-300">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-code ${accentColor}`}>{project.category.toUpperCase()}</span>
                </div>
            </div>
        </motion.div>
    );
}
