'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import Footer from '@/components/layout/Footer';

export default function WorkPage() {
  const D = PORTFOLIO_DATA;
  const [filter, setFilter] = useState('ALL');

  const cats = ['ALL', ...Array.from(new Set(D.projects.map(p => p.category)))];
  const shown = filter === 'ALL' ? D.projects : D.projects.filter(p => p.category === filter);

  return (
    <div className="bg-paper min-h-screen">
      {/* Giant Page Header */}
      <section className="border-b-2 border-ink">
        <div className="grid-bg p-14 pt-24">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-11">
            <div>
              <span className="label">Index / All Work</span>
              <h1 className="reveal in font-serif text-[clamp(80px,18vw,260px)] tracking-[-0.05em] uppercase leading-[0.82] mt-3.5">
                Work / <span className="text-accent">{shown.length.toString().padStart(2, '0')}</span>
              </h1>
            </div>
            <div className="text-right mb-5">
              <div className="label mb-2.5">Filter by discipline</div>
              <div className="flex gap-1.5 justify-end flex-wrap max-w-[400px]">
                {cats.map(c => (
                  <button 
                    key={c} 
                    onClick={() => setFilter(c)} 
                    className={`badge px-3 py-1.5 border-[1.5px] border-ink font-mono text-[9px] tracking-[0.18em] uppercase transition-colors ${
                      filter === c ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink/5'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table Header */}
      <section className="border-b-2 border-ink">
        <div className="hidden md:grid grid-cols-[60px_1.3fr_1fr_140px_120px_30px] gap-4 px-10 py-3.5 bg-ink text-paper font-mono text-[10px] tracking-[0.22em] uppercase">
          <span>N°</span>
          <span>Title</span>
          <span>Discipline</span>
          <span>Year</span>
          <span>Stack</span>
          <span></span>
        </div>

        {shown.map((p, i) => (
          <Link 
            key={p.id} 
            href={`/work/${p.id}`}
            className="group grid grid-cols-1 md:grid-cols-[60px_1.3fr_1fr_140px_120px_30px] gap-4 px-10 py-5.5 border-b-2 border-ink last:border-b-0 hover:bg-paper-2 transition-colors items-center"
          >
            <span className="label text-ink text-xs">{p.n}</span>
            <div>
              <div className="font-serif text-[26px] tracking-[-0.02em] uppercase leading-none mb-1 group-hover:text-accent transition-colors">
                {p.title}
              </div>
              <div className="font-mono text-[11px] text-muted tracking-[0.12em] uppercase">
                {p.tagline}
              </div>
            </div>
            <span className="label text-ink text-xs">{p.category}</span>
            <span className="font-serif text-[22px] tracking-[-0.01em]">{p.year}</span>
            <div className="flex gap-1 flex-wrap">
              {(p.stack || []).slice(0, 2).map(s => (
                <span key={s} className="badge px-1.5 py-0.5 border-[1.5px] border-ink font-mono text-[8px] tracking-[0.18em] uppercase bg-paper">
                  {s}
                </span>
              ))}
            </div>
            <span className="font-mono text-sm group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        ))}
      </section>

      {/* Footer Strip */}
      <section className="section-dark p-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-serif text-[clamp(28px,4vw,48px)] tracking-[-0.02em] uppercase text-center md:text-left">
          Don't see what you need?
        </div>
        <Link 
          href="/#contact" 
          className="btn bg-paper text-ink border-paper hover:bg-transparent hover:text-paper"
        >
          <span>Start a project</span><span>→</span>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
