'use client';

import Link from 'next/link';
import { PROJECTS, ProjectData } from '@/lib/project-data';

export default function SelectedProjects() {
  // Only show featured projects on the homepage
  const featured = PROJECTS.filter((p) => p.featured);
  // Fallback: if nothing is featured, show the first 3
  const displayProjects = featured.length > 0 ? featured : PROJECTS.slice(0, 3);

  return (
    <section className="border-b border-border-dark relative" id="work">
      <div className="px-6 py-20 border-b border-border-dark">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-primary text-xs mb-4 block">01 // WORK</span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">Selected<br/>Projects</h2>
          </div>
          <div className="font-mono text-text-muted text-right hidden md:block">
            SCROLL TO EXPLORE <br/> ↓
          </div>
        </div>
      </div>

      {displayProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      {/* View All Projects CTA */}
      <Link
        href="/work"
        className="group relative block w-full border-b border-border-dark overflow-hidden cursor-hover"
      >
        <div className="px-6 py-16 md:py-24 flex flex-col items-center justify-center gap-4 bg-surface/30 hover:bg-surface transition-colors duration-500">
          <span className="font-mono text-text-muted text-sm tracking-[0.2em] uppercase group-hover:text-white transition-colors">
            {PROJECTS.length} Projects in Archive
          </span>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white group-hover:text-primary transition-colors duration-300">
            VIEW ALL PROJECTS
          </h3>
          <div className="h-[2px] w-0 group-hover:w-48 bg-primary transition-all duration-700 ease-in-out" />
          <span className="material-symbols-outlined text-primary text-3xl mt-2 group-hover:translate-x-4 transition-transform duration-300">
            arrow_forward
          </span>
        </div>
      </Link>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <Link href={`/work/${project.id}`} className="group relative block w-full h-[80vh] border-b border-border-dark overflow-hidden cursor-hover">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${project.image}')` }}
        aria-label={project.title}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-background-dark/60 group-hover:bg-background-dark/20 transition-colors duration-500" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16">
        <div className="flex justify-between items-start">
          <span className="font-mono text-white/60 bg-black/30 px-3 py-1 backdrop-blur-sm border border-white/10">{project.year}</span>
          <span className="font-mono text-primary bg-black/80 px-3 py-1 border border-primary">{project.category}</span>
        </div>

        <div className="transform group-hover:-translate-y-4 transition-transform duration-500">
          <h3 className="text-6xl md:text-9xl font-bold text-white tracking-tighter mix-blend-overlay group-hover:mix-blend-normal transition-all duration-300">
            {project.title}
          </h3>
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-primary/80 border border-primary/30 px-2 py-1 bg-black/50 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="h-[1px] w-0 group-hover:w-full bg-primary mt-4 transition-all duration-700 ease-in-out" />
        </div>
      </div>
    </Link>
  );
}
