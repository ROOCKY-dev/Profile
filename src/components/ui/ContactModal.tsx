'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Linkedin, Github } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl shadow-cyan-500/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
                <h2 className="text-xl font-semibold text-white">Contact Me</h2>
                <button
                  onClick={onClose}
                  className="text-zinc-400 hover:text-white transition-colors p-1 hover:bg-zinc-800 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Have a question or want to work together? Feel free to reach out through any of the channels below.
                </p>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 group">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-300">Email</h3>
                      <p className="text-sm text-zinc-500 font-mono">ahmed@example.com</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 group">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-300">Phone</h3>
                      <p className="text-sm text-zinc-500 font-mono">+60 12-345 6789</p>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                        <Linkedin size={18} />
                      </div>
                      <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">LinkedIn</span>
                    </a>

                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700/50 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                        <Github size={18} />
                      </div>
                      <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>

            {/* Footer Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
