"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/animations";

export default function SelectedProjects() {
  const featured = SITE.projects.filter(p => "featured" in p && p.featured);

  return (
    <section id="work" className="relative border-b border-[var(--border-subtle)] py-24 md:py-40 bg-[var(--bg-primary)]">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="badge mb-8">03 // Selected Work</span>
            <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-tight uppercase text-[var(--text-primary)]">
              Things on <br/>
              <span className="text-[var(--text-secondary)]">the bench.</span>
            </h2>
          </motion.div>
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link href="/work" className="btn-ghost">
              View All Work
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15 }}
            >
              <Link 
                href={`/work/${project.id}`}
                className="group block relative glass-card p-2 rounded-[2rem] overflow-hidden"
              >
                {/* Inner Core */}
                <div className="bg-[var(--bg-elevated)] rounded-[1.5rem] p-8 md:p-12 h-full flex flex-col relative overflow-hidden transition-all duration-700">
                  
                  {/* Decorative Background for project */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 100% 0%, ${project.gradient[1]}, transparent 50%)`
                    }}
                  />
                  
                  <div className="flex justify-between items-start mb-32 relative z-10">
                    <span className="font-display text-5xl md:text-7xl font-semibold opacity-10 group-hover:opacity-20 transition-opacity">
                      {project.number}
                    </span>
                    <span className="badge border-[var(--border-accent)] bg-[var(--accent-glow)] text-[var(--accent-primary)]">
                      {project.category}
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="font-display text-3xl md:text-5xl uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-8 max-w-md">
                      {project.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="label px-3 py-1.5 rounded-full bg-white/[0.03]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
