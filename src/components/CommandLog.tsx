'use client';

import { LogEntry } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CommandLogProps {
  logs: LogEntry[];
}

export default function CommandLog({ logs }: CommandLogProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="w-full h-full bg-black/60 backdrop-blur-md rounded-lg border border-white/10 p-4 font-mono text-xs overflow-hidden flex flex-col shadow-inner">
      <div className="text-zinc-500 uppercase tracking-widest text-[10px] mb-2 border-b border-white/5 pb-1 flex justify-between">
        <span>System Log</span>
        <span>LIVE</span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-1">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2"
            >
              <span className="text-zinc-600 select-none">[{log.timestamp}]</span>
              <span
                className={
                  log.type === 'ERROR'
                    ? 'text-red-500'
                    : log.type === 'WARN'
                    ? 'text-yellow-500'
                    : log.type === 'SUCCESS'
                    ? 'text-green-400'
                    : 'text-cyan-300'
                }
              >
                {log.type === 'INFO' ? '>' : log.type.charAt(0)}
              </span>
              <span className="text-zinc-300 break-words">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
