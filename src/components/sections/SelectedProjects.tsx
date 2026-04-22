"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/lib/portfolio-data";
import { maskReveal, staggerContainer } from "@/lib/animations";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div 
      variants={maskReveal} 
      className="group border-2 border-black"
    >
      <Link href={`/work/${project.id}`} className="block overflow-hidden bg-white">
        <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-black bg-gray-50">
          {/* Cover Decor */}
          <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <span className="font-serif text-6xl text-black/5 leading-none tracking-tighter group-hover:text-black/10 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[10px] font-black tracking-widest uppercase bg-black text-white px-3 py-1.5 border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,0.1)]">
                {project.category}
              </span>
            </div>
            
            <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]">
              <div className="bg-white p-6 border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-fit">
                <span className="font-black text-lg uppercase tracking-tight leading-none block">{project.tagline}</span>
              </div>
            </div>
          </div>

          <Image
            src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80`}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-[0.22, 1, 0.36, 1]"
          />
          
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
        </div>

        <div className="p-10 transition-all duration-500 group-hover:bg-black group-hover:text-white">
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter transition-transform duration-500 group-hover:translate-x-2">
              {project.title}
            </h3>
            <span className="label-text text-gray-300 group-hover:text-gray-500 transition-colors">
              {project.year}
            </span>
          </div>
          
          <p className="text-[15px] leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors max-w-xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-10">
            {project.tags?.slice(0, 4).map((tag) => (
              <span 
                key={tag} 
                className="font-mono text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 border-2 border-gray-100 group-hover:border-gray-800 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SelectedProjects() {
  const featured = PORTFOLIO_DATA.projects.filter((p) => p.featured);

  return (
    <section id="work" className="border-b-2 border-black bg-gray-50 relative overflow-hidden">
      <div className="w-full">
        <div className="p-6 md:p-12 lg:p-20 border-b-2 border-black flex flex-col md:flex-row md:items-end justify-between gap-12 bg-white relative z-10">
          <motion.div 
            className="max-w-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={maskReveal}
          >
            <span className="label-text text-gray-500">04 / Selected Work</span>
            <h2 className="font-serif text-[clamp(44px,8.5vw,110px)] leading-[0.88] tracking-[-0.04em] uppercase breathe-header mt-8">
              Things on<br/>the bench.
            </h2>
          </motion.div>
          <Link 
            href="/work" 
            className="btn btn-outline h-[50px] px-10 hover:bg-black hover:text-white"
          >
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((project, i) => (
            <div key={project.id} className={`p-6 md:p-12 lg:p-20 border-b-2 last:border-b-0 border-black ${i % 2 === 0 ? "lg:border-r-2" : ""}`}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
