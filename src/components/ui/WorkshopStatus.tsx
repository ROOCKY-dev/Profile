'use client';

import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

const STATUS_MAP: Record<string, string> = {
  AVAILABLE: 'AVAILABLE',
  STUDYING: 'STUDYING',
  WORKING: 'BUILDING',
  RESTING: 'OFFLINE',
};

export default function WorkshopStatus({ className = '' }: { className?: string }) {
  const raw = PORTFOLIO_DATA.stat.status;
  const label = STATUS_MAP[raw] ?? raw;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
      </span>
      <span className="text-[10px] font-bold tracking-[4px] uppercase">
        {label}
      </span>
    </div>
  );
}
