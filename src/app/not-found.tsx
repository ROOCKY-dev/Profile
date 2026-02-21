'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center relative w-full h-screen px-4 overflow-hidden bg-background-dark text-white">
      {/* Background Grid & Noise */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 hidden lg:block font-mono text-xs text-text-muted/50 tracking-widest rotate-90 origin-left">
        ERR::CONNECTION_REFUSED
      </div>
      <div className="absolute bottom-10 right-10 hidden lg:block font-mono text-xs text-text-muted/50 tracking-widest">
        SECTOR_VOID // 0x00404
      </div>

      {/* Central Glitch Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full">
        {/* Warning Badge */}
        <div className="mb-8 border border-primary/50 bg-primary/10 px-4 py-1 flex items-center gap-3 animate-pulse-fast">
          <span className="material-symbols-outlined text-primary text-sm">warning</span>
          <span className="text-primary font-mono text-xs tracking-widest uppercase">System Failure</span>
        </div>

        {/* Massive 404 Headline */}
        <h1
          className="glitch-text text-[120px] md:text-[200px] leading-[0.85] font-bold text-white tracking-tighter select-none mb-6"
          data-text="404"
        >
          404
        </h1>

        {/* Subtext */}
        <div className="space-y-2 mb-12">
          <p className="text-white text-xl md:text-2xl font-bold uppercase tracking-tight">
            Coordinate Lost.
          </p>
          <p className="text-text-muted font-mono text-sm md:text-base max-w-md mx-auto">
            The requested vector does not exist in this dimension. We suggest a manual reset.
          </p>
        </div>

        {/* Action Area */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Primary CTA */}
          <Link
            href="/"
            className="relative overflow-hidden group flex items-center justify-center h-14 px-8 bg-primary hover:bg-white text-background-dark font-bold tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] cursor-hover"
          >
            <span className="mr-3 material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span>Return to Base</span>
          </Link>

          {/* Secondary Link */}
          <button className="group flex items-center gap-2 text-text-muted hover:text-white transition-colors font-mono text-sm uppercase tracking-wide cursor-hover">
            <span>Report Bug</span>
            <span className="material-symbols-outlined text-sm group-hover:rotate-45 transition-transform">bug_report</span>
          </button>
        </div>

        {/* Technical Decorative Footer */}
        <div className="mt-20 pt-8 border-t border-border-dark w-full max-w-lg flex justify-between text-xs font-mono text-text-muted/40">
          <span>MEM_DUMP: 0xFF3A</span>
          <span>STACK: OVERFLOW</span>
          <span>TIME: NOW</span>
        </div>
      </div>

      {/* CRT Screen Overlay Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50 bg-gradient-to-b from-transparent via-transparent to-black/20"
        style={{ backgroundSize: '100% 4px', backgroundRepeat: 'repeat-y' }}
      />
    </main>
  );
}
