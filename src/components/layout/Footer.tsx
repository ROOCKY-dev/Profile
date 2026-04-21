'use client';

import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function Footer() {
  const D = PORTFOLIO_DATA;
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="section-dark border-t-2 border-ink p-14 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center mb-11">
          <span className="label text-muted-2">06 / Contact</span>
          <span className="label text-muted-2">Kuala Lumpur / {year}</span>
        </div>

        <div className="py-14">
          <a 
            href={`mailto:${D.personal.email}`}
            className="giant-email group block font-serif text-[clamp(44px,9vw,128px)] leading-[0.88] tracking-[-0.04em] uppercase transition-colors hover:text-accent"
          >
            {D.personal.email.split('').map((char, i) => (
              <span 
                key={i} 
                className={`inline-block transition-transform duration-300 cubic-bezier(0.2,0.8,0.2,1) ${
                  i % 2 === 0 ? 'group-hover:translate-y-[-6px]' : 'group-hover:translate-y-[6px]'
                }`}
              >
                {char}
              </span>
            ))}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-11 border-t-2 border-paper pt-11 mt-11">
          {D.contact.methods.map(method => (
            <div key={method.id}>
              <div className="label text-muted-2 mb-3.5">{method.label}</div>
              <a 
                href={method.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-serif text-2xl tracking-[-0.01em] uppercase hover:text-accent transition-colors block mb-2"
              >
                {method.value}
              </a>
              <div className="font-mono text-[10px] tracking-wider text-muted-2">
                {method.id === 'email' ? 'Direct response' : 'Social link'}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t-[1.5px] border-dashed border-paper pt-9 mt-14">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-2">
            © {year} {D.personal.name} — ALL RIGHTS RESERVED
          </div>
          <div className="flex gap-6 font-mono text-[11px] tracking-[0.22em] uppercase">
            <span className="text-muted-2">Portfolio No. 04</span>
            <span className="text-muted-2">v4.0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
