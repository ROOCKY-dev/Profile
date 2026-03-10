'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { GlassCard, GradientOrbs, SectionHeader, IconContainer, GlassDivider } from '@/components/ui/glass';
import { usePerformance } from '@/lib/PerformanceContext';

/**
 * Capabilities/services section with premium glass card grid.
 * Features hover animations, gradient orbs, and staggered reveals.
 */
export default function Capabilities() {
  const { capabilities } = PORTFOLIO_DATA;
  const { performanceLevel } = usePerformance();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="capabilities">
      {/* Background orbs */}
      {performanceLevel !== 'low' && <GradientOrbs variant="section" />}

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <SectionHeader
            badgeNumber="02"
            badge="Services"
            title="What I"
            titleAccent="Build"
            description="Specialized skills honed through real-world projects and continuous learning. From game mechanics to AI-powered solutions."
          />
        </div>

        {/* Capabilities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {capabilities.map((capability, i) => (
            <motion.div key={i} variants={cardVariants}>
              <GlassCard
                variant="hover"
                padding="lg"
                className="h-full min-h-[320px] flex flex-col justify-between group"
              >
                {/* Icon */}
                <div className="mb-8">
                  <IconContainer
                    size="lg"
                    variant="default"
                    className="group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500"
                  >
                    <span className="material-symbols-outlined text-2xl text-text-muted group-hover:text-primary transition-colors duration-500">
                      {capability.icon}
                    </span>
                  </IconContainer>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold mb-3 text-text-main group-hover:text-primary transition-colors duration-300">
                    {capability.title}
                  </h3>
                  <p className="font-mono text-sm text-text-muted leading-relaxed">
                    {capability.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <motion.div 
                  className="mt-6 h-px bg-gradient-to-r from-primary/50 to-secondary/30 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-4 text-text-muted/40">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <span className="material-symbols-outlined text-sm animate-pulse">
              code
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <GlassDivider />
      </div>
    </section>
  );
}
