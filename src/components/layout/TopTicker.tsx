'use client';

import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function TopTicker() {
  const items = PORTFOLIO_DATA.ticker;
  const line = items.join('   ●   ');

  return (
    <div className="border-b-2 border-ink py-2 font-mono text-[10.5px] tracking-[0.22em] uppercase bg-paper overflow-hidden relative z-30">
      <div className="overflow-hidden">
        <div className="flex gap-[48px] whitespace-nowrap will-change-transform animate-marquee-slow">
          <span className="pr-[48px]">{line}   ●   </span>
          <span className="pr-[48px]">{line}   ●   </span>
        </div>
      </div>
    </div>
  );
}
