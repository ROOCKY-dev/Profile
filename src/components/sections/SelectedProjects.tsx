'use client';

import Link from 'next/link';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function SelectedProjects() {
  const featured = PORTFOLIO_DATA.projects.filter(p => p.featured).slice(0, 3);

  return (
    <section id="work" className="border-b-2 border-ink relative overflow-hidden">
      <div className="p-14 flex justify-between items-end">
        <div>
          <span className="label">04 / Selected Work</span>
          <h2 className="reveal in font-serif text-[clamp(36px,5vw,72px)] tracking-[-0.03em] uppercase leading-[0.92] mt-2.5">
            Experiments — <br/>and some products.
          </h2>
        </div>
        <Link href="/work" className="label hover:text-ink transition-colors pb-3.5">
          View all {PORTFOLIO_DATA.projects.length} projects →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t-2 border-ink">
        {featured.map((p, i) => (
          <Link 
            key={p.id} 
            href={`/work/${p.id}`}
            className="proj-card group relative block border-r-2 border-ink last:border-r-0 transition-all duration-300 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[10px_10px_0_var(--ink)] overflow-hidden"
          >
            <div className="cover aspect-[4/3] relative overflow-hidden bg-paper-2 border-b-2 border-ink">
              <div className="num absolute left-4.5 top-3.5 font-serif text-[clamp(80px,12vw,160px)] leading-[0.8] tracking-[-0.04em] text-ink/10 transition-colors group-hover:text-ink/20">
                {p.n}
              </div>
              <div className="chip absolute right-3.5 top-3.5">
                <span className="badge px-2 py-1 border-[1.5px] border-ink font-mono text-[9px] tracking-[0.18em] uppercase bg-paper">
                  {p.category}
                </span>
              </div>
              
              {/* Image with duotone hover effect */}
              <div className="absolute inset-0 transition-all duration-500 mix-blend-multiply opacity-0 group-hover:opacity-100 bg-ink" />
              <img 
                src={p.image} 
                alt={p.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              
              <div className="arrow absolute right-4.5 bottom-3.5 font-mono text-xs tracking-[0.2em] opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                VIEW CASE →
              </div>
            </div>

            <div className="p-7">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-3xl tracking-[-0.02em] uppercase leading-none">
                  {p.title}
                </h3>
                <span className="font-serif text-xl tracking-[-0.01em]">{p.year}</span>
              </div>
              <p className="text-sm leading-[1.6] text-muted line-clamp-2 mb-6">
                {p.description}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {(p.stack || []).slice(0, 3).map(s => (
                  <span key={s} className="font-mono text-[10px] tracking-wider text-ink/60 uppercase">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
