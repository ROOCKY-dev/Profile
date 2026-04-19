'use client';

import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function Services() {
  const D = PORTFOLIO_DATA;
  const services = D.services;

  return (
    <section id="services" className="border-b-2 border-ink relative overflow-hidden">
      <div className="p-14 flex justify-between items-end">
        <div>
          <span className="label">05 / Services</span>
          <h2 className="reveal in font-serif text-[clamp(36px,5vw,72px)] tracking-[-0.03em] uppercase leading-[0.92] mt-2.5">
            What I can build — <br/>for you.
          </h2>
        </div>
        <span className="label mb-3.5">Fixed rates · Fast shipping</span>
      </div>

      <div className="border-t-2 border-ink">
        {services.map((s, i) => (
          <div 
            key={s.n} 
            className="svc-row group flex flex-col md:grid md:grid-cols-[60px_1fr_1fr_140px_120px] items-center gap-6 p-11 border-b-2 border-ink last:border-b-0 transition-all duration-250 hover:bg-ink hover:text-paper cursor-default"
          >
            <span className="label group-hover:text-muted-2">{s.n}</span>
            <div>
              <h3 className="font-serif text-3xl tracking-[-0.02em] uppercase leading-none mb-2.5">
                {s.title}
              </h3>
              <p className="text-sm leading-[1.6] text-muted group-hover:text-muted-2 max-w-[400px]">
                {s.desc}
              </p>
            </div>
            
            <div className="md:col-start-4 text-center md:text-right">
              <div className="font-serif text-2xl tracking-[-0.01em]">{s.price}</div>
              <div className="label mt-1 group-hover:text-muted-2">Base rate</div>
            </div>

            <div className="md:col-start-5 text-center md:text-right">
              <div className="font-mono text-sm tracking-wider uppercase">{s.tt}</div>
              <div className="label mt-1 group-hover:text-muted-2">Turnaround</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Strip */}
      <div className="section-dark p-11 flex flex-col md:flex-row justify-between items-center gap-6 border-t-2 border-ink">
        <div className="font-serif text-[clamp(28px,4vw,48px)] tracking-[-0.02em] uppercase leading-tight text-center md:text-left">
          Don't see what you need?
        </div>
        <a 
          href={`mailto:${D.personal.email}`} 
          className="btn bg-paper text-ink border-paper hover:bg-transparent hover:text-paper"
        >
          <span>Start a project</span><span>→</span>
        </a>
      </div>
    </section>
  );
}
