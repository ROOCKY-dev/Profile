'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PROJECTS, ProjectData } from '@/lib/project-data';
import { GlassButton, GradientOrbs, SectionHeader, GlassBadge, GlassDivider } from '@/components/ui/glass';
import { usePerformance } from '@/lib/PerformanceContext';

/**
 * Selected projects showcase with immersive glass cards.
 * Features parallax hover effects and gradient overlays.
 */
export default function SelectedProjects() {
  const { performanceLevel } = usePerformance();
  
  // Only show featured projects on the homepage
  const featured = PROJECTS.filter((p) => p.featured);
  const displayProjects = featured.length > 0 ? featured : PROJECTS.slice(0, 3);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="work">
      {/* Background */}
      {performanceLevel !== 'low' && <GradientOrbs variant="section" />}

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-20">
          <SectionHeader
            badgeNumber="01"
            badge="Portfolio"
            title="Selected"
            titleAccent="Work"
            description="A curated collection of projects that showcase my skills and passion for building exceptional digital experiences."
          />
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center gap-2 text-text-muted font-mono text-sm"
          >
            <span>Scroll to explore</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="material-symbols-outlined text-primary"
            >
              arrow_downward
            </motion.span>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {displayProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              performanceLevel={performanceLevel}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/work">
            <GlassButton variant="primary" size="lg" className="min-w-[200px]">
              View All Projects
              <span className="material-symbols-outlined">arrow_forward</span>
            </GlassButton>
          </Link>
          <p className="font-mono text-xs text-text-muted/60 mt-4">
            {PROJECTS.length} projects in archive
          </p>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <GlassDivider />
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  performanceLevel: string;
}

function ProjectCard({ project, index, performanceLevel }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Link 
        href={`/work/${project.id}`} 
        className="group relative block w-full h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden cursor-hover"
      >
        {/* Background Image with parallax effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${project.image}')` }}
          whileHover={performanceLevel !== 'low' ? { scale: 1.08 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
        
        {/* Glass border effect */}
        <div className="absolute inset-0 border border-primary/10 group-hover:border-primary/30 rounded-2xl transition-colors duration-500" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
          {/* Top row - Year and Category */}
          <div className="flex justify-between items-start">
            <GlassBadge variant="default">
              {project.year}
            </GlassBadge>
            <GlassBadge variant="primary">
              {project.category}
            </GlassBadge>
          </div>

          {/* Bottom content */}
          <div className="transform group-hover:-translate-y-4 transition-transform duration-500">
            {/* Project Title */}
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-main tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>

            {/* Description - appears on hover */}
            <motion.p 
              className="font-mono text-sm text-text-muted max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-4"
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.tags.slice(0, 4).map((tag) => (
                  <span 
                    key={tag} 
                    className="font-mono text-xs text-primary/80 border border-primary/20 px-3 py-1 rounded-full bg-primary/5 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Progress line */}
            <motion.div 
              className="h-px bg-gradient-to-r from-primary via-secondary to-primary mt-6 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          {/* View project indicator */}
          <motion.div
            className="absolute right-8 md:right-12 bottom-8 md:bottom-12 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <div className="flex items-center gap-2 text-primary font-mono text-sm">
              <span>View Project</span>
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
