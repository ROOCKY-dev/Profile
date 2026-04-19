'use client';

import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function Marquee() {
  const D = PORTFOLIO_DATA;
  const items = D.marquee;
  const line = items.join('   /   ');

  return (
    <div className="section-dark border-t-2 border-b-2 border-ink overflow-hidden">
      <div className="mq-wrap py-5.5">
        <div className="mq flex gap-[48px] whitespace-nowrap will-change-transform animate-marquee font-serif text-[clamp(28px,4.2vw,56px)] tracking-[-0.02em] uppercase leading-none">
          <span className="pr-[48px]">{line}   /   </span>
          <span className="pr-[48px]">{line}   /   </span>
        </div>
      </div>
    </div>
  );
}
