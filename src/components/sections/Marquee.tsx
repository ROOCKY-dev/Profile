import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function Marquee() {
  const { marquee } = PORTFOLIO_DATA;

  return (
    <div className="border-b border-border-dark bg-background-dark py-6 overflow-hidden relative group cursor-hover select-none">
      {/* Gradients to fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background-dark to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background-dark to-transparent z-10" />

      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        <MarqueeItem marquee={marquee} />
        <MarqueeItem marquee={marquee} />
      </div>
    </div>
  );
}

function MarqueeItem({ marquee }: { marquee: string[] }) {
  return (
    <div className="flex items-center gap-16 px-8">
      {marquee.map((item, i) => (
        <div key={i} className="flex items-center gap-16">
          <span className="text-4xl font-bold text-text-muted hover:text-primary transition-colors whitespace-nowrap">
            {item}
          </span>
          <span className="text-2xl text-border-dark font-mono">{"///"}</span>
        </div>
      ))}
    </div>
  );
}
