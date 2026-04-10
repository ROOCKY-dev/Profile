'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { contact } = PORTFOLIO_DATA;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="w-full max-w-md border-[3px] border-black bg-white p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[16px] font-black uppercase tracking-[3px]">
                Get In Touch
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border-2 border-black text-[18px] font-black hover:bg-black hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-0">
              {contact.methods.map((method) => (
                <a
                  key={method.id}
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 border-b-2 border-black hover:bg-gray-bg px-2 -mx-2 transition-colors"
                >
                  <div>
                    <div className="label-text">{method.label}</div>
                    <div className="text-[13px] font-bold mt-1">
                      {method.value}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-[3px] uppercase">
                    →
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
