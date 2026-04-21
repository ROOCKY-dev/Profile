'use client';

import { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function Capabilities() {
  const D = PORTFOLIO_DATA;
  const [toolsKey, setToolsKey] = useState<string | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const leaveTimer = useRef<NodeJS.Timeout | null>(null);

  // Throttled cursor tracking for the tooltip
  const handleMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const tt = tooltipRef.current;
      if (!tt) return;
      const maxX = (sectionRef.current?.clientWidth || 9999) - tt.offsetWidth - 12;
      const x = Math.min(mouseRef.current.x + 16, maxX);
      const y = mouseRef.current.y + 16;
      tt.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  const scheduleHide = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setToolsKey(null), 80);
  };

  const cancelHide = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };

  const toolsActive = D.capabilities.find(c => c.key === toolsKey);

  return (
    <section 
      ref={sectionRef} 
      onMouseMove={handleMove}
      className="border-b-2 border-ink relative"
    >
      <div className="p-14 pb-7 flex justify-between items-end">
        <div>
          <span className="label">03 / Capabilities & Tools</span>
          <h2 className="reveal in font-serif text-[clamp(36px,5vw,72px)] tracking-[-0.03em] uppercase leading-[0.92] mt-2.5">
            What I do — and with what.
          </h2>
        </div>
        <span className="label mb-3.5">Hover tile · hover phrase</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t-2 border-ink">
        {D.capabilities.map((c, i) => (
          <div 
            key={c.key}
            onMouseEnter={() => { cancelHide(); setToolsKey(c.key); }}
            onMouseLeave={scheduleHide}
            className={`p-9 border-r-2 border-ink last:border-r-0 min-h-[340px] flex flex-col justify-between transition-colors duration-300 ${
              toolsKey === c.key ? 'bg-paper-2' : 'bg-paper'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="label text-ink">{c.n}</span>
              <span className="font-serif text-3xl tracking-[-0.02em] uppercase">{c.key}</span>
            </div>
            
            <div className="mt-8">
              <h3 className="font-serif text-2xl tracking-[-0.01em] uppercase leading-[1.1] mb-4">
                {c.verb}
              </h3>
              <p className="text-sm leading-[1.7] text-ink/80">
                {c.sentence.map((part, idx) => (
                  <span 
                    key={idx} 
                    className={idx === 1 ? 'udot font-medium text-ink' : ''}
                  >
                    {part}{' '}
                  </span>
                ))}
              </p>
            </div>

            <div className="mt-8 flex gap-1.5 flex-wrap">
              {c.tools.slice(0, 3).map(tool => (
                <span key={tool} className="font-mono text-[9px] tracking-wider text-muted uppercase">
                  {tool}
                </span>
              ))}
              {c.tools.length > 3 && <span className="font-mono text-[9px] tracking-wider text-muted">+{c.tools.length - 3}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip Reveal */}
      <div 
        ref={tooltipRef}
        className={`fixed top-0 left-0 z-50 pointer-events-none transition-opacity duration-200 ${
          toolsKey ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className="bg-ink text-paper p-4 border-2 border-paper shadow-xl min-w-[200px]">
          <div className="label text-paper/60 mb-3">Toolstack / {toolsKey}</div>
          <div className="flex flex-col gap-1.5">
            {toolsActive?.tools.map(tool => (
              <div key={tool} className="font-mono text-xs tracking-wide uppercase flex justify-between">
                <span>{tool}</span>
                <span className="text-paper/40">●</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
