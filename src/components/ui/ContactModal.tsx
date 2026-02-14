'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Github, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState('');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl pointer-events-auto relative overflow-hidden">

              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-mono font-bold text-white">
                  <span className="text-cyan-400">{'>'}</span> Contact_Me
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">

                {/* Email */}
                <div
                  onClick={() => handleCopy('ahmed@example.com', 'email')}
                  className="group relative p-4 bg-black/40 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors cursor-pointer flex items-center gap-4"
                >
                  <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 font-mono uppercase">Email</p>
                    <p className="text-zinc-300 group-hover:text-white transition-colors">ahmed@example.com</p>
                  </div>
                  {copied === 'email' && (
                    <span className="text-xs text-green-400 font-mono animate-pulse">COPIED</span>
                  )}
                </div>

                {/* Phone */}
                <div
                  onClick={() => handleCopy('+60 12-345 6789', 'phone')}
                  className="group relative p-4 bg-black/40 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors cursor-pointer flex items-center gap-4"
                >
                  <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:text-purple-300 transition-colors">
                    <Phone size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 font-mono uppercase">Phone</p>
                    <p className="text-zinc-300 group-hover:text-white transition-colors">+60 12-345 6789</p>
                  </div>
                  {copied === 'phone' && (
                    <span className="text-xs text-green-400 font-mono animate-pulse">COPIED</span>
                  )}
                </div>

                {/* Socials */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <a
                    href="#"
                    target="_blank"
                    className="p-4 bg-black/40 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all flex flex-col items-center gap-2 group"
                  >
                    <Github className="text-zinc-400 group-hover:text-white transition-colors" />
                    <span className="text-xs text-zinc-500 font-mono group-hover:text-zinc-300">GitHub</span>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    className="p-4 bg-black/40 rounded-xl border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all flex flex-col items-center gap-2 group"
                  >
                    <Linkedin className="text-zinc-400 group-hover:text-blue-400 transition-colors" />
                    <span className="text-xs text-zinc-500 font-mono group-hover:text-zinc-300">LinkedIn</span>
                  </a>
                </div>

              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-xs text-zinc-600 font-mono">
                  Available for freelance & full-time opportunities.
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
