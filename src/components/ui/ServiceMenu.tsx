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
                tier="Web Development"
                icon="developer_mode_tv"
                title="Website Design"
                subtitle="Designing setting up Websites with scale for individuals or companies."
                price="100$ "
                unit="/ website"
                features={['React/Next.js Framework', 'CMS Integration', 'Responsive Implementation', 'Vercel Deployment SetUp' , 'VPS Deployment SetUp']}
                cta="Start Project"
                isPopular
              />
              {/* Tier 2 */}
              <ServiceCard
                tier="Solotions"
                icon="data_table"
                title="Web Hosting & server adminstarition."
                subtitle="Scalable libraries for scale-ups."
                price="50$"
                unit="/ month / website"
                features={['deployment and updates', 'Security and safety', 'Reach management', 'Usage Documentation', 'Internet Services SetUp' , 'Emergency Response']}
                cta="BOOK Meeting"
              />
              {/* Tier 3 */}
              <ServiceCard
                tier="Game Development"
                icon="videogame_asset"
                title="Game Develpment"
                subtitle="Using unity to make Puroused Games For Schools to Tech Student or individuals ."
                price="$75"
                unit="/ hour"
                features={['Unity', 'Mobile / DiskTop', 'Performance Tuning', 'UI / UX Design' , 'Creative Takes'] }
                cta="Book Consultation"
                isUnavailable
              />
            </div>
             <div className="mt-12 text-center">
                <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
                    Custom requirements? <a href="mailto:LetsBuild@roocky.dev" className="text-primary hover:underline hover:text-white transition-colors cursor-hover">Contact for bespoke quote</a>
                </p>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ServiceCardProps {
    cta: string;
    features: string[];
    icon: string;
    isPopular?: boolean;
    isUnavailable?: boolean;
    price: string;
    subtitle: string;
    tier: string;
    title: string;
    unit: string;
}

import clsx from 'clsx';

function getCardClassName(isPopular: boolean | undefined, isUnavailable: boolean | undefined) {
    return clsx(
        'group relative flex flex-col justify-between border p-8 transition-all duration-300',
        isUnavailable
            ? 'border-border-dark bg-surface/40 opacity-70 cursor-not-allowed'
            : [
                'cursor-hover hover:-translate-y-2 hover:border-primary hover:shadow-[0_0_20px_-5px_rgba(204,255,0,0.15)]',
                isPopular ? 'border-primary/50 bg-[#1a1d13]' : 'border-border-dark bg-surface',
            ],
    );
}

function getCtaClassName(isPopular: boolean | undefined, isUnavailable: boolean | undefined) {
    return clsx(
        'w-full py-4 text-center font-display text-sm font-bold uppercase tracking-wider transition-colors duration-300',
        isUnavailable
            ? 'border border-border-dark bg-transparent text-text-muted cursor-not-allowed'
            : isPopular
                ? 'bg-primary text-black hover:bg-white'
                : 'border border-primary text-white hover:bg-primary hover:text-black',
    );
}

function FeatureItem({feature, isUnavailable}: { feature: string; isUnavailable?: boolean }) {
    return (
        <li className="flex items-start gap-3">
      <span
          className={clsx('material-symbols-outlined text-[18px]', isUnavailable ? 'text-text-muted/50' : 'text-primary')}>
        {isUnavailable ? 'close' : 'check'}
      </span>
            <span>{feature}</span>
        </li>
    );
}

function ServiceCard({
                         tier,
                         icon,
                         title,
                         subtitle,
                         price,
                         unit,
                         features,
                         cta,
                         isPopular,
                         isUnavailable
                     }: ServiceCardProps) {
    const mailtoHref = 'mailto:letsbuild@roocky.dev';

    return (
        <div className={getCardClassName(isPopular, isUnavailable)}>
            {isPopular && !isUnavailable && (
                <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-lg">
                    Most Popular
                </div>
            )}

            <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
          <span
              className={clsx('font-mono text-xs font-bold tracking-widest uppercase', isUnavailable ? 'text-text-muted' : 'text-primary')}>
            [{tier}]
          </span>
                    <span
                        className={clsx('material-symbols-outlined text-text-muted transition-colors', !isUnavailable && 'group-hover:text-primary')}>
            {icon}
          </span>
                </div>
                <h2 className={clsx('mb-2 font-display text-3xl font-bold uppercase tracking-tighter', isUnavailable ? 'text-text-muted' : 'text-white')}>
                    {title}
                </h2>
                <p className="font-mono text-sm text-text-muted">{subtitle}</p>
            </div>

            <div
                className={clsx('mb-8 border-y border-dashed border-border-dark py-6 transition-colors', !isUnavailable && 'group-hover:border-primary/30')}>
                <div className="flex items-baseline gap-1">
          <span className={clsx('text-4xl font-bold', isUnavailable ? 'text-text-muted' : 'text-primary')}>
            {price}
          </span>
                    <span className="font-mono text-sm text-text-muted">{unit}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
          <span className={clsx('font-mono text-xs', isUnavailable ? 'text-red-500' : 'text-green-500')}>
            {isUnavailable ? 'UNAVAILABLE AT THE MOMENT' : 'AVAILABLE NOW'}
          </span>
                </div>
            </div>

            <ul className={clsx('mb-10 space-y-4 font-mono text-sm flex-grow', isUnavailable ? 'text-text-muted/60' : 'text-text-main')}>
                {features.map((feature, i) => (
                    <FeatureItem key={i} feature={feature} isUnavailable={isUnavailable}/>
                ))}
            </ul>

            {isUnavailable ? (
                <span className={getCtaClassName(isPopular, isUnavailable)}>Currently Unavailable</span>
            ) : (
                <a href={mailtoHref} className={getCtaClassName(isPopular, isUnavailable)}>
                    {cta}
                </a>
            )}
        </div>
    );
}
