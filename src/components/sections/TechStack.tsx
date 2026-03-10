'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { PC_SHAPES } from '@/lib/Status';
import { GlassCard, GradientOrbs, SectionHeader, GlassBadge, GlassDivider } from '@/components/ui/glass';
import { usePerformance } from '@/lib/PerformanceContext';

/**
 * Tech stack section with glass aesthetic.
 * Features categorized skills and animated ASCII art status display.
 */
export default function TechStack() {
  const { techStack, stat } = PORTFOLIO_DATA;
  const currentStatus = stat.status as keyof typeof PC_SHAPES;
  const { performanceLevel } = usePerformance();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const techCategories = [
    { title: 'Core', items: techStack.core, icon: 'terminal' },
    { title: 'Tools', items: techStack.tools, icon: 'build' },
    { title: 'AI', items: techStack.AI, icon: 'psychology' },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="about">
      {/* Background */}
      {performanceLevel !== 'low' && <GradientOrbs variant="subtle" />}

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <SectionHeader
            badgeNumber="03"
            badge="Stack"
            title="The"
            titleAccent="Engine"
            description="Technologies and tools I use to bring ideas to life. Always learning, always evolving."
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tech Categories */}
          <GlassCard variant="default" padding="lg" className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {techCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-2 mb-6 pb-3 border-b border-primary/20">
                    <span className="material-symbols-outlined text-primary text-lg">
                      {category.icon}
                    </span>
                    <h4 className="font-bold text-lg text-text-main">
                      {category.title}
                    </h4>
                  </div>

                  {/* Tech Items */}
                  <ul className="space-y-3">
                    {category.items.map((tech, i) => (
                      <motion.li
                        key={i}
                        variants={itemVariants}
                        className="group flex items-center gap-3 cursor-hover"
                      >
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(124,92,255,0.5)] transition-all duration-300"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="font-mono text-sm text-text-muted group-hover:text-text-main transition-colors duration-300">
                          {tech.name}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* ASCII Status Display */}
          <GlassCard 
            variant="glow" 
            padding="lg" 
            className="order-1 lg:order-2 flex flex-col items-center justify-center min-h-[400px]"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <GlassBadge variant="primary">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                System Status: {currentStatus}
              </GlassBadge>
            </motion.div>

            {/* ASCII Art */}
            <motion.pre
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="font-mono text-[8px] sm:text-[10px] md:text-xs leading-[1.1] text-primary/60 hover:text-primary whitespace-pre text-center select-none cursor-pointer transition-colors duration-500"
            >
              {PC_SHAPES[currentStatus]}
            </motion.pre>

            {/* Decorative lines */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center gap-4 text-text-muted/30"
            >
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/30" />
              <span className="font-mono text-xs">{'<system.online/>'}</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/30" />
            </motion.div>
          </GlassCard>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <GlassDivider />
      </div>
    </section>
  );
}
