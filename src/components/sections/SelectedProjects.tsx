'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/lib/project-data';
import { fadeSlideUp, staggerContainer } from '@/lib/animations';

export default function SelectedProjects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const projects = featured.length > 0 ? featured : PROJECTS.slice(0, 3);

  return (
    <section className="py-16 px-6 md:px-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="section-number">03</div>
          <div className="label-text mt-2">Selected Work</div>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-0"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project, i) => (
          <motion.div key={project.id} variants={fadeSlideUp}>
            <Link
              href={`/work/${project.id}`}
              className="group block border-[3px] border-black hover:bg-gray-bg transition-colors"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-black">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[40px] font-black leading-none tracking-[-2px] text-gray-lt">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="label-text">{project.year}</span>
                </div>
                <h3 className="text-[20px] font-black uppercase tracking-[-0.5px] mt-2">
                  {project.title}
                </h3>
                <div className="mt-2">
                  <span className="text-[9px] font-bold tracking-[3px] uppercase text-gray border border-black px-2 py-1">
                    {project.category}
                  </span>
                </div>
                <div className="mt-4 overflow-hidden h-0 group-hover:h-6 transition-all duration-300">
                  <span className="text-[10px] font-bold tracking-[3px] uppercase border-b-2 border-black">
                    View Project →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Link */}
      <div className="flex justify-end mt-8">
        <Link
          href="/work"
          className="text-[10px] font-bold tracking-[3px] uppercase border-b-[3px] border-black pb-1 hover:text-gray transition-colors"
        >
          View All Projects →
        </Link>
      </div>
    </section>
  );
}
