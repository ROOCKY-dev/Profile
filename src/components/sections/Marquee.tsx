"use client";

import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export default function Marquee() {
  const D = PORTFOLIO_DATA;
  const items = D.marquee;
  const line = items.join('   /   ');

  return (
    <div className="bg-gray-50 border-b-2 border-black">
      <div className="overflow-hidden py-6">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-[clamp(32px,5vw,64px)] font-black uppercase tracking-tighter pr-12">
            {line}   /   
          </span>
          <span className="text-[clamp(32px,5vw,64px)] font-black uppercase tracking-tighter pr-12">
            {line}   /   
          </span>
        </div>
      </div>
    </div>
  );
}
