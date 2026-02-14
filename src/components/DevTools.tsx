'use client';

import { useState } from 'react';
import { BotStatus, FocusLevel } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X } from 'lucide-react';

interface DevToolsProps {
  status: BotStatus;
  setStatus: (status: BotStatus) => void;
  focusLevel: FocusLevel;
  setFocusLevel: (level: FocusLevel) => void;
  customColor: string | undefined;
  setCustomColor: (color: string | undefined) => void;
}

const STATUS_OPTIONS: BotStatus[] = ['CODING', 'BROWSING', 'DISCORD', 'GAMING', 'OFFLINE', 'CUSTOM'];
const FOCUS_OPTIONS: FocusLevel[] = ['CALM', 'NORMAL', 'HYPER_FOCUSED'];

export default function DevTools({
  status, setStatus,
  focusLevel, setFocusLevel,
  customColor, setCustomColor
}: DevToolsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 left-4 z-50 font-mono text-xs">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4 w-64 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
              <h3 className="text-zinc-400 uppercase tracking-widest">Dev Console</h3>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={14} />
              </button>
            </div>

            {/* Status Selector */}
            <div className="mb-4">
              <label className="block text-zinc-500 mb-2">Status Override</label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`px-2 py-1 rounded border text-left transition-colors ${
                      status === s
                        ? 'bg-white/10 border-cyan-500/50 text-cyan-400'
                        : 'border-white/5 text-zinc-500 hover:bg-white/5'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Focus Level Selector */}
            <div className="mb-4">
              <label className="block text-zinc-500 mb-2">Focus Level</label>
              <div className="flex flex-col gap-1">
                {FOCUS_OPTIONS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFocusLevel(f)}
                    className={`px-2 py-1 rounded border text-left transition-colors ${
                      focusLevel === f
                        ? 'bg-white/10 border-purple-500/50 text-purple-400'
                        : 'border-white/5 text-zinc-500 hover:bg-white/5'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Input */}
            {status === 'CUSTOM' && (
               <div className="mb-2">
                 <label className="block text-zinc-500 mb-2">Custom Hex Color</label>
                 <div className="flex gap-2">
                    <input
                      type="color"
                      value={customColor || '#ec4899'}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                    />
                    <input
                      type="text"
                      value={customColor || '#ec4899'}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded px-2 text-zinc-300 focus:outline-none focus:border-pink-500/50"
                    />
                 </div>
               </div>
            )}

            <div className="mt-4 pt-2 border-t border-white/10 text-[10px] text-zinc-600">
               API Simulation Mode Active
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-full hover:bg-white/10 hover:border-cyan-500/50 transition-all group"
      >
        <Settings size={20} className={`text-zinc-500 group-hover:text-cyan-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
    </div>
  );
}
