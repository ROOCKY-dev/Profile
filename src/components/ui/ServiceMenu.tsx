'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { GlassCard, GlassButton, GlassBadge } from '@/components/ui/glass';
import { cn } from '@/lib/utils';

interface ServiceMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceMenu({ isOpen, onClose }: ServiceMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col bg-background-dark/95 backdrop-blur-xl overflow-y-auto"
        >
          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-primary/10 bg-background-dark/60 backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <span className="material-symbols-outlined text-primary">storefront</span>
                </div>
                <span className="font-bold text-xl text-text-main">Services</span>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close Menu"
                className="w-12 h-12 flex items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-text-muted hover:text-primary hover:border-primary/50 transition-colors cursor-hover"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </motion.button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 px-6 py-12 md:px-12 w-full max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
            >
              <ServiceCard
                tier="Web Development"
                icon="developer_mode_tv"
                title="Website Design"
                subtitle="Designing and setting up websites with scale for individuals or companies."
                price="$100"
                unit="/ website"
                features={['React/Next.js Framework', 'CMS Integration', 'Responsive Implementation', 'Vercel Deployment SetUp', 'VPS Deployment SetUp']}
                cta="Start Project"
                isPopular
              />
              <ServiceCard
                tier="Solutions"
                icon="dns"
                title="Web Hosting & Admin"
                subtitle="Scalable server solutions for growing businesses."
                price="$50"
                unit="/ month"
                features={['Deployment & Updates', 'Security & Safety', 'Reach Management', 'Usage Documentation', 'Internet Services SetUp', 'Emergency Response']}
                cta="Book Meeting"
              />
              <ServiceCard
                tier="Game Development"
                icon="videogame_asset"
                title="Game Development"
                subtitle="Using Unity to create purposeful games for education or individuals."
                price="$75"
                unit="/ hour"
                features={['Unity Engine', 'Mobile / Desktop', 'Performance Tuning', 'UI / UX Design', 'Creative Takes']}
                cta="Book Consultation"
                isUnavailable
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className="font-mono text-xs text-text-muted">
                Custom requirements?{' '}
                <a 
                  href="mailto:LetsBuild@roocky.dev" 
                  className="text-primary hover:text-secondary transition-colors cursor-hover underline underline-offset-4"
                >
                  Contact for bespoke quote
                </a>
              </p>
            </motion.div>
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
    <GlassCard
      variant={isUnavailable ? 'default' : 'hover'}
      padding="lg"
      className={cn(
        'relative flex flex-col justify-between min-h-[500px]',
        isUnavailable && 'opacity-60',
        isPopular && 'border-primary/30 shadow-[0_0_40px_rgba(124,92,255,0.1)]'
      )}
    >
      {/* Popular badge */}
      {isPopular && !isUnavailable && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <GlassBadge variant="primary">Most Popular</GlassBadge>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className={cn(
            'font-mono text-xs font-bold tracking-widest uppercase',
            isUnavailable ? 'text-text-muted' : 'text-primary'
          )}>
            [{tier}]
          </span>
          <span className={cn(
            'material-symbols-outlined text-2xl',
            isUnavailable ? 'text-text-muted/50' : 'text-text-muted'
          )}>
            {icon}
          </span>
        </div>

        {/* Title */}
        <h2 className={cn(
          'text-2xl font-bold mb-2',
          isUnavailable ? 'text-text-muted' : 'text-text-main'
        )}>
          {title}
        </h2>
        <p className="font-mono text-sm text-text-muted mb-6">{subtitle}</p>

        {/* Price */}
        <div className="py-6 border-y border-primary/10 mb-6">
          <div className="flex items-baseline gap-1">
            <span className={cn(
              'text-4xl font-bold',
              isUnavailable ? 'text-text-muted' : 'gradient-text-static'
            )}>
              {price}
            </span>
            <span className="font-mono text-sm text-text-muted">{unit}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className={cn(
              'w-2 h-2 rounded-full',
              isUnavailable ? 'bg-red-500/50' : 'bg-green-400 animate-pulse'
            )} />
            <span className={cn(
              'font-mono text-xs',
              isUnavailable ? 'text-red-400/60' : 'text-green-400/80'
            )}>
              {isUnavailable ? 'UNAVAILABLE' : 'AVAILABLE NOW'}
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 font-mono text-sm">
              <span className={cn(
                'material-symbols-outlined text-base mt-0.5',
                isUnavailable ? 'text-text-muted/40' : 'text-primary'
              )}>
                {isUnavailable ? 'close' : 'check'}
              </span>
              <span className={isUnavailable ? 'text-text-muted/50' : 'text-text-muted'}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      {isUnavailable ? (
        <div className="w-full py-4 text-center font-mono text-sm text-text-muted/50 border border-primary/10 rounded-lg">
          Currently Unavailable
        </div>
      ) : (
        <a href={mailtoHref}>
          <GlassButton 
            variant={isPopular ? 'primary' : 'outline'} 
            className="w-full justify-center"
          >
            {cta}
          </GlassButton>
        </a>
      )}
    </GlassCard>
  );
}
