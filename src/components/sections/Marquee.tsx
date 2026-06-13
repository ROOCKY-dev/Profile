"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/data";

export default function Marquee() {
  const line = SITE.marquee.join("  ✦  ");

  return (
    <div className="relative z-10 bg-transparent border-y border-[var(--border-subtle)] overflow-hidden py-8">
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508] z-10 pointer-events-none" />
      
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-[clamp(28px,3vw,48px)] font-display font-semibold uppercase tracking-tight pr-12 text-[var(--text-tertiary)]">
          {line}  ✦  
        </span>
        <span className="text-[clamp(28px,3vw,48px)] font-display font-semibold uppercase tracking-tight pr-12 text-[var(--text-tertiary)]">
          {line}  ✦  
        </span>
        <span className="text-[clamp(28px,3vw,48px)] font-display font-semibold uppercase tracking-tight pr-12 text-[var(--text-tertiary)]">
          {line}  ✦  
        </span>
      </div>
    </div>
  );
}
