'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Mail, Phone, Instagram } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { useToast } from '@/components/ui/ToastSystem';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { toast } = useToast();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast(`${label} copied to clipboard`, 'success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Glossy Header Effect */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Connect with Me</h2>
              <p className="text-zinc-400 text-sm">Let&apos;s build something amazing together.</p>
            </div>

            <div className="space-y-4 relative z-10">
              {/* GitHub */}
              <a
                href="https://github.com/ROOCKY-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-zinc-800 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-700 rounded-lg group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    <Github size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">GitHub</div>
                    <div className="text-white font-mono text-sm">ROOCKY-dev</div>
                  </div>
                </div>
              </a>

              {/* Email */}
              <button
                onClick={() => handleCopy('ahmedghithan.official.email@gmail.com', 'Email')}
                className="w-full flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-zinc-800 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-700 rounded-lg group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Email</div>
                    <div className="text-white font-mono text-sm break-all">ahmedghithan.official.email@gmail.com</div>
                  </div>
                </div>
              </button>

              {/* Phone */}
              <button
                onClick={() => handleCopy('+60 123456789', 'Phone Number')}
                className="w-full flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-zinc-800 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-700 rounded-lg group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    <Phone size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Phone</div>
                    <div className="text-white font-mono text-sm">+60 123456789</div>
                  </div>
                </div>
              </button>

              {/* Socials */}
              <a
                href="https://instagram.com/roocky_dev" // Assuming link, modify if needed
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-zinc-800 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-700 rounded-lg group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    <Instagram size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Social Media</div>
                    <div className="text-white font-mono text-sm">@roocky_dev</div>
                  </div>
                </div>
              </a>
            </div>

             <div className="mt-8 text-center">
                <MagneticButton
                   onClick={onClose}
                   className="px-8 py-2 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-colors"
                >
                   Close
                </MagneticButton>
             </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
