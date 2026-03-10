'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { GlassCard, GlassButton, GlassBadge } from '@/components/ui/glass';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Glass-styled contact modal with premium animations.
 */
export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { contact } = PORTFOLIO_DATA;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <motion.div 
            className="absolute inset-0 bg-background-dark/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            <GlassCard variant="glow" padding="lg" className="relative overflow-visible">
              {/* Decorative gradient orb */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/20 rounded-full blur-[40px] pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <GlassBadge variant="primary" className="mb-3">
                    Connect
                  </GlassBadge>
                  <h2 className="text-2xl md:text-3xl font-bold text-text-main">
                    Get in <span className="gradient-text-static">Touch</span>
                  </h2>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close modal"
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-primary/20 bg-primary/5 text-text-muted hover:text-primary hover:border-primary/50 transition-colors cursor-hover"
                >
                  <span className="material-symbols-outlined">close</span>
                </motion.button>
              </div>

              {/* Contact Methods */}
              <div className="space-y-3 mb-8 relative z-10">
                {contact.methods.map((method, index) => (
                  <motion.a
                    key={method.id}
                    href={method.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-primary/10 bg-white/[0.02] hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group cursor-hover"
                  >
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <span className="material-symbols-outlined text-lg text-primary group-hover:text-white transition-colors">
                        {method.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] text-text-muted/60 uppercase tracking-wider mb-0.5">
                        {method.label}
                      </p>
                      <p className="font-medium text-text-main truncate group-hover:text-primary transition-colors">
                        {method.value}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-text-muted/40 group-hover:text-primary group-hover:translate-x-1 transition-all">
                      arrow_outward
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Download CV Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6 border-t border-primary/10 relative z-10"
              >
                <a href={contact.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <GlassButton variant="primary" className="w-full justify-center">
                    <span className="material-symbols-outlined">download</span>
                    Download CV
                  </GlassButton>
                </a>
              </motion.div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
