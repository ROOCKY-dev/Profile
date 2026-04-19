'use client';

import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import StatusPill from '@/components/ui/StatusPill';

function Typewriter({ text, speed = 28 }: { text: string; speed?: number }) {
  const [out, setOut] = useState('');
  useEffect(() => {
    setOut('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <span className="font-mono">{out}<span className="caret" aria-hidden="true" /></span>;
}

export default function AboutStrip() {
  const D = PORTFOLIO_DATA;
  const status = 'WORKING'; // Default status for now
  const s = D.status[status];

  return (
    <section id="about" className="border-b-2 border-ink relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] min-h-[360px]">
        {/* Left Side: Bio */}
        <div className="p-12 border-r-2 border-ink flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="label">02 / About</span>
              <span className="label cursor-pointer hover:text-ink transition-colors">Long form →</span>
            </div>
            <h2 className="reveal in font-serif text-[clamp(36px,5vw,72px)] tracking-[-0.03em] uppercase leading-[0.92] mt-6">
              A workshop<br/>that never closes.
            </h2>
            <p className="reveal in text-sm leading-[1.75] max-w-[540px] mt-5">
              Self-taught, curious, and stubborn about craft. I split my time between
              cybersecurity coursework at UNITEN and a rotating bench of side
              projects — Minecraft mods, web platforms, and AI-assisted tooling.
              I prefer shipping small, sharp things over shipping big, fuzzy ones.
            </p>
          </div>
          <div className="reveal in flex gap-2.5 mt-5.5 flex-wrap">
            {['Malaysia, MY', 'Cyber Sec @ UNITEN', 'Open for collab', 'Speaks EN / AR'].map(t => (
              <span key={t} className="badge inline-block px-2 py-1 border-[1.5px] border-ink font-mono text-[9px] tracking-[0.18em] uppercase bg-paper">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Status & Log */}
        <div className="p-12 bg-paper-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6.5">
              <span className="label">Currently</span>
              <StatusPill status={status} />
            </div>
            <div className="mt-6.5 font-mono text-sm leading-[1.7]">
              <div className="text-muted">$ cat /now</div>
              <div className="mt-2">
                <Typewriter text={s.now} />
              </div>
            </div>
          </div>
          
          <div className="mt-9 border-t-[1.5px] border-dashed border-ink pt-4.5">
            <div className="label mb-2.5">Workshop Log</div>
            <div className="font-mono text-[11.5px] leading-[1.8]">
              {D.log.map((l, i) => (
                <div key={i} className="grid grid-cols-[56px_1fr] gap-3" style={{ opacity: 1 - i * 0.1 }}>
                  <span className="text-muted">{l.t}</span>
                  <span>{l.e}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
