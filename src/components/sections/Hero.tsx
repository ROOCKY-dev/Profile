'use client';

import { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import Link from 'next/link';

function useClock(tz: string) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const s = d.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZone: tz, 
        hour12: false 
      });
      setTime(s);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

export default function Hero() {
  const D = PORTFOLIO_DATA;
  const roles = D.roles;
  const [roleIdx, setRoleIdx] = useState(0);
  const [slammed, setSlammed] = useState(false);
  const clock = useClock(D.personal.tz);

  useEffect(() => {
    // Two-frame commit for the animation
    requestAnimationFrame(() => requestAnimationFrame(() => setSlammed(true)));
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <section className="grid-bg border-b-2 border-ink relative">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] min-h-[82vh]">
        {/* Left Content */}
        <div className="relative p-9 flex flex-col justify-between border-r-2 border-ink">
          <div className="flex justify-between">
            <span className="label">Portfolio — {D.portfolio.issue}</span>
            <span className="label">MY / {clock} {D.personal.tzLabel}</span>
          </div>

          <div className="py-12">
            <div className="font-serif text-[clamp(56px,11vw,168px)] leading-[0.86] tracking-[-0.04em] uppercase">
              <div className={`slam-word ${slammed ? 'in' : ''}`}>
                <span>CREATIVE</span>
              </div>
              <div className="flex items-baseline gap-6 flex-wrap">
                <div className={`slam-word ${slammed ? 'in' : ''}`} style={{ transitionDelay: '120ms' }}>
                  <span>DEV —</span>
                </div>
                {/* Cycling Role */}
                <div className="role-stack font-serif">
                  <div className="role-items relative h-[1em]">
                    {roles.map((r, i) => (
                      <span 
                        key={r} 
                        className={`absolute left-0 top-0 transition-all duration-700 cubic-bezier(0.7,0,0.2,1) whitespace-nowrap ${
                          i === roleIdx ? 'opacity-100 translate-y-0 text-accent' : 'opacity-0 translate-y-[40%]'
                        }`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`slam-word ${slammed ? 'in' : ''}`} style={{ transitionDelay: '240ms' }}>
                <span>AT WORK.</span>
              </div>
            </div>
          </div>

          <div className="rule-h my-2 mb-5" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
            <div>
              <p className="text-sm leading-[1.75] text-ink max-w-[520px] m-0">
                {D.personal.name} — {D.personal.location}. Crafting immersive digital experiences;
                bridging the gap between imagination and reality. Minecraft mods, web
                platforms, AI pipelines. Quiet, obsessive, 24/7.
              </p>
              <div className="mt-4.5 flex gap-4 font-mono text-[11px] tracking-[0.18em] uppercase">
                <span className="label">{D.personal.email}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <Link href="/work" className="btn solid">
                <span>View Work</span><span>→</span>
              </Link>
              <Link href="#contact" className="btn">
                <span>Contact</span><span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Stats */}
        <div className="flex flex-col">
          {D.stats.map((stat, i) => (
            <div 
              key={i} 
              className={`p-6 flex-1 flex flex-col justify-between border-b-2 border-ink last:border-b-0 ${
                i === 2 ? 'bg-ink text-paper' : ''
              }`}
            >
              <span className="label">Stat / 0{i + 1}</span>
              <div>
                <div className="font-serif text-6xl leading-[0.8] tracking-[-0.04em]">
                  {stat.num}
                </div>
                <div className="label mt-2">{stat.label}</div>
                <div className={`font-mono text-[11px] mt-1 ${i === 2 ? 'text-muted-2' : 'text-muted'}`}>
                  {stat.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
