'use client';

import Link from 'next/link';
import { PORTFOLIO_DATA, Project } from '@/lib/portfolio-data';

export default function SelectedProjects() {
  const { projects } = PORTFOLIO_DATA;

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

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
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
          <div className="h-[1px] w-0 group-hover:w-full bg-primary mt-4 transition-all duration-700 ease-in-out" />
        </div>
      </div>
    </Link>
  );
}
