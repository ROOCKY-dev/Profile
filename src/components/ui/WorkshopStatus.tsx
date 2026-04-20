'use client';

import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function WorkshopStatus({ className = '' }: { className?: string }) {
  // Use 'WORKING' as the default key to match the new design's intent
  const statusKey = 'WORKING';
  const data = PORTFOLIO_DATA.status[statusKey];

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
      </span>
      <span className="text-[10px] font-bold tracking-[4px] uppercase">
        {data.label}
      </span>
    </div>
  );
}
