'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePerformance } from '@/lib/PerformanceContext';

interface ServiceMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceMenu({ isOpen, onClose }: ServiceMenuProps) {
  const { performanceLevel } = usePerformance();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col bg-background-dark/95 backdrop-blur-md"
        >
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8 sticky top-0 z-50 border-b border-border-dark">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-primary text-2xl ${performanceLevel === 'high' ? 'animate-pulse-fast' : ''}`}>bolt</span>
              <span className="font-display font-bold text-xl tracking-tight text-white">THE OFFER</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Menu"
              className="group flex w-12 h-12 items-center justify-center border border-border-dark bg-surface text-white transition-colors hover:border-primary hover:bg-primary hover:text-black cursor-hover"
            >
              <span className="material-symbols-outlined text-3xl transition-transform duration-500 group-hover:rotate-90">close</span>
            </button>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto px-4 py-12 md:px-12 w-full max-w-7xl mx-auto">
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-12">
              {/* Tier 1 */}
              <ServiceCard
                tier="TIER_01"
                icon="rocket_launch"
                title="The Sprint"
                subtitle="Rapid prototyping for startups."
                price="$5k"
                unit="/ week"
                features={['React/Next.js Framework', 'CMS Integration', 'Responsive Implementation', 'Vercel Deployment Setup']}
                cta="Book Consultation"
              />
              {/* Tier 2 */}
              <ServiceCard
                tier="TIER_02"
                icon="deployed_code"
                title="System Arch"
                subtitle="Scalable libraries for scale-ups."
                price="$8k"
                unit="/ fixed"
                features={['Figma Tokenization', 'Storybook Component Lib', 'Accessibility Audit (WCAG)', 'Usage Documentation', 'Tailwind Configuration']}
                cta="Start Project"
                isPopular
              />
              {/* Tier 3 */}
              <ServiceCard
                tier="TIER_03"
                icon="palette"
                title="Creative Dev"
                subtitle="High-end interaction & motion."
                price="$150"
                unit="/ hour"
                features={['WebGL / Three.js Shaders', 'GSAP Motion Design', 'Performance Tuning', 'Awwwards Submission Prep']}
                cta="Book Consultation"
              />
            </div>
             <div className="mt-12 text-center">
                <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
                    Custom requirements? <a href="mailto:hello@roocky.dev" className="text-primary hover:underline hover:text-white transition-colors cursor-hover">Contact for bespoke quote</a>
                </p>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ServiceCardProps {
  tier: string;
  icon: string;
  title: string;
  subtitle: string;
  price: string;
  unit: string;
  features: string[];
  cta: string;
  isPopular?: boolean;
}

function ServiceCard({ tier, icon, title, subtitle, price, unit, features, cta, isPopular }: ServiceCardProps) {
  return (
    <div className={`group relative flex flex-col justify-between border ${isPopular ? 'border-primary/50 bg-[#1a1d13]' : 'border-border-dark bg-surface'} p-8 transition-transform hover:-translate-y-2 hover:border-primary hover:shadow-[0_0_20px_-5px_rgba(204,255,0,0.15)] cursor-hover`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-lg">
          Most Popular
        </div>
      )}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">[{tier}]</span>
          <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">{icon}</span>
        </div>
        <h2 className="mb-2 font-display text-3xl font-bold uppercase tracking-tighter text-white">{title}</h2>
        <p className="font-mono text-sm text-text-muted">{subtitle}</p>
      </div>

      <div className="mb-8 border-y border-dashed border-border-dark py-6 group-hover:border-primary/30 transition-colors">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-primary">{price}</span>
          <span className="font-mono text-sm text-text-muted">{unit}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
             <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
             <span className="font-mono text-xs text-green-500">AVAILABLE NOW</span>
        </div>
      </div>

      <ul className="mb-10 space-y-4 font-mono text-sm text-text-main flex-grow">
        {features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[18px]">check</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 text-center font-display text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${isPopular ? 'bg-primary text-black hover:bg-white' : 'border border-primary text-white hover:bg-primary hover:text-black'}`}>
        {cta}
      </button>
    </div>
  );
}
