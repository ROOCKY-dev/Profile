'use client';

import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

interface StatusPillProps {
  status: 'WORKING' | 'AVAILABLE' | 'STUDYING' | 'RESTING';
}

export default function StatusPill({ status }: StatusPillProps) {
  const s = status.toLowerCase();
  const data = PORTFOLIO_DATA.status[status];

  return (
    <span className="pill inline-flex items-center gap-2 px-2.5 py-1.5 border-[1.5px] border-ink font-mono text-[10px] tracking-[0.18em] uppercase bg-paper relative z-10">
      <span className={`dot w-2 h-2 rounded-full bg-ink animate-[pulse_1.4s_ease-in-out_infinite] ${s}`} />
      {data.label}
    </span>
  );
}
