'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { GlassCard, GradientOrbs, GlassBadge } from '@/components/ui/glass';
import { usePerformance } from '@/lib/PerformanceContext';

/**
 * Premium glass-styled footer with animated CTA section.
 */
export default function Footer() {
  const { personal, contact } = PORTFOLIO_DATA;
  const email = personal.email;
  const [localPart, domainPart] = email.split('@');
  const { performanceLevel } = usePerformance();

  const socialLinks = [
    { label: 'Instagram', url: personal.socials.instagram, icon: 'photo_camera' },
    { label: 'GitHub', url: personal.socials.github, icon: 'code' },
    { label: 'WhatsApp', url: personal.socials.wa, icon: 'chat' },
  ];

  return (
    <footer className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      {performanceLevel !== 'low' && <GradientOrbs variant="hero" />}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(124, 92, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <GlassBadge variant="primary" className="mb-6">
            Available for projects
          </GlassBadge>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            {"Let's Build"}
            <span className="gradient-text-static ml-3">Together</span>
          </h2>
          <p className="font-mono text-text-muted text-sm md:text-base max-w-xl">
            Have a project in mind? {"I'd"} love to hear about it. {"Let's"} create something amazing.
          </p>
        </motion.div>

        {/* Email CTA - Main attraction */}
        <motion.a
          href={`mailto:${email}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="group block mb-16 md:mb-24 cursor-hover"
        >
          <GlassCard 
            variant="hover" 
            padding="lg" 
            className="relative overflow-hidden py-12 md:py-20"
          >
            {/* Animated background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Email display */}
            <div className="relative z-10 flex flex-col">
              <motion.span
                className="text-[6vw] md:text-[5vw] font-bold text-text-main/80 leading-tight tracking-tight group-hover:text-text-main transition-colors duration-500"
                whileHover={{ x: 10 }}
              >
                {localPart.toUpperCase()}
              </motion.span>
              <motion.span
                className="text-[8vw] md:text-[7vw] font-bold gradient-text-static leading-none tracking-tight"
                whileHover={{ x: 20 }}
              >
                @{domainPart.toUpperCase()}
              </motion.span>
            </div>

            {/* Arrow indicator */}
            <motion.div 
              className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"
              initial={{ x: -20 }}
              whileHover={{ x: 0 }}
            >
              <span className="material-symbols-outlined text-4xl md:text-5xl text-primary">
                arrow_outward
              </span>
            </motion.div>

            {/* Progress line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
          </GlassCard>
        </motion.a>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-8 border-t border-primary/10"
        >
          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/10 bg-white/[0.02] hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-hover"
              >
                <span className="material-symbols-outlined text-lg text-text-muted group-hover:text-primary transition-colors">
                  {social.icon}
                </span>
                <span className="font-mono text-sm text-text-muted group-hover:text-text-main transition-colors">
                  {social.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-right">
            <p className="font-mono text-xs text-text-muted/60 mb-1">
              &copy; {new Date().getFullYear()} ROOCKYdev
            </p>
            <p className="font-mono text-xs text-text-muted/40">
              Crafted with precision
            </p>
          </div>
        </motion.div>

        {/* Final decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-3 text-text-muted/20">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/20" />
            <span className="material-symbols-outlined text-primary/40">bolt</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/20" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
