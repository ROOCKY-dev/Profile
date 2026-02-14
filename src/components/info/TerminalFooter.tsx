'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export default function TerminalFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['> Connected to terminal.', '> Type "help" for commands.']);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = '';

    switch (cmd) {
      case 'help':
        response = '> Available commands: email, social, clear, exit';
        break;
      case 'email':
        response = '> Contact: dev@example.com (Copied to clipboard)';
        navigator.clipboard.writeText('dev@example.com');
        break;
      case 'social':
        response = '> GitHub: @dev / Twitter: @dev';
        break;
      case 'clear':
        setOutput([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        setInput('');
        return;
      default:
        response = `> Unknown command: ${cmd}`;
    }

    setOutput([...output, `> ${input}`, response]);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <MagneticButton
          onClick={() => setIsOpen(!isOpen)}
          className="bg-zinc-900 border border-green-500/50 text-green-500 p-3 rounded-full hover:bg-green-500/10 transition-colors shadow-[0_0_15px_rgba(0,255,0,0.2)]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Terminal className="w-6 h-6" />}
        </MagneticButton>
      </div>

      {/* Terminal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 h-64 bg-black/90 backdrop-blur-xl border-t border-green-500/30 z-40 shadow-2xl p-6 font-mono text-sm"
          >
            <div className="max-w-4xl mx-auto h-full flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-2 mb-4 text-green-400 custom-scrollbar">
                {output.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>

              <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-white/10 pt-4">
                <span className="text-green-500">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none placeholder-zinc-600"
                  placeholder="Enter command..."
                  autoFocus
                />
                <button type="submit" className="text-green-500 hover:text-green-400">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
