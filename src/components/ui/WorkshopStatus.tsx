"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export function StatusPill({ status }: { status: string }) {
  const label = PORTFOLIO_DATA.status[status as keyof typeof PORTFOLIO_DATA.status]?.label || status;
  
  const statusColors: Record<string, string> = {
    WORKING: "bg-yellow-400",
    AVAILABLE: "bg-green-500",
    STUDYING: "bg-blue-500",
    RESTING: "bg-gray-400",
  };

  return (
    <div className="flex items-center gap-2 border-2 border-black rounded-full px-3 py-1 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
      <div className={`status-dot ${statusColors[status] || "bg-black"}`} />
      <span className="font-mono text-[9px] font-bold tracking-[2px] uppercase">
        {label}
      </span>
    </div>
  );
}

export function Typewriter({ text, speed = 24 }: { text: string, speed?: number }) {
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

  return (
    <span className="relative">
      {out}
      <span className="animate-blink inline-block w-[3px] h-[1em] bg-black align-middle ml-1" aria-hidden="true" />
    </span>
  );
}
