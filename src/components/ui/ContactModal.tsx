'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

interface ContactModalProps {
  /**
   * Controls whether the modal is visible.
   */
  isOpen: boolean;
  /**
   * Callback function to close the modal.
   */
  onClose: () => void;
}

/**
 * A modal component that displays contact information and a download CV button.
 * Uses Framer Motion for entrance/exit animations.
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background-dark/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-surface border border-border-dark p-6 md:p-8 relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
             {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">Connect</p>
                <h2 className="text-3xl font-display font-bold uppercase tracking-tighter text-white">
                  Get in Touch
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="group flex w-10 h-10 items-center justify-center border border-border-dark bg-background-dark text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
              >
                <span className="material-symbols-outlined transition-transform duration-300 group-hover:rotate-90">close</span>
              </button>
            </div>

            {/* Contact Methods */}
            <div className="space-y-3 mb-8 relative z-10">
              {contact.methods.map((method) => (
                <a
                  key={method.id}
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-border-dark bg-background-dark/50 hover:bg-surface hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-surface border border-border-dark group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                    <span className="material-symbols-outlined text-[20px]">{method.icon}</span>
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-0.5 group-hover:text-primary transition-colors">{method.label}</p>
                    <p className="font-display font-bold text-base text-white group-hover:text-white transition-colors truncate">{method.value}</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all text-[20px]">arrow_outward</span>
                </a>
              ))}
            </div>

            {/* CV Button */}
            <div className="pt-6 border-t border-border-dark border-dashed relative z-10">
                <a
                  href={contact.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-black font-display font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                  <span className="material-symbols-outlined relative z-10">download</span>
                  <span className="relative z-10">Grab CV</span>
                </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
