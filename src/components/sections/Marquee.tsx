"use client";

import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export default function Marquee() {
  const D = PORTFOLIO_DATA;
  const items = D.marquee;
  const line = items.join('   /   ');

  return (
    <div className="bg-white border-t-2 border-b-2 border-black relative z-10">
      <div className="overflow-hidden py-8">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-[clamp(32px,4vw,56px)] font-heading font-black uppercase tracking-tighter pr-12 text-black">
            {line}   /   
          </span>
          <span className="text-[clamp(32px,4vw,56px)] font-heading font-black uppercase tracking-tighter pr-12 text-black">
            {line}   /   
          </span>
        </div>
      </div>
    </div>
  );
}
