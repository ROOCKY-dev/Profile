'use client';

import { motion } from 'framer-motion';
import { BotStatus, STATUS_COLORS } from '@/lib/types';
import clsx from 'clsx';

interface CoreOrbProps {
  status: BotStatus;
}

const variants = {
  IDLE: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  THINKING: {
    rotate: [0, 360],
    scale: [1, 1.2, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
  WORKING: {
    scale: [1, 0.9, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  ALERT: {
    scale: [1, 1.2, 0.9, 1.1, 1],
    x: [0, -2, 2, -2, 0],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 0.2,
      repeat: Infinity,
      ease: 'anticipate',
    },
  },
  OFFLINE: {
    scale: 0.9,
    opacity: 0.3,
  },
};

export default function CoreOrb({ status }: CoreOrbProps) {
  const colorClass = STATUS_COLORS[status];

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* Outer Glow Ring */}
      <motion.div
        className={clsx(
          'absolute inset-0 rounded-full blur-2xl opacity-20',
          colorClass
        )}
        animate={variants[status]}
      />
      
      {/* Inner Core */}
      <motion.div
        className={clsx(
          'w-32 h-32 rounded-full shadow-2xl bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md border border-white/10 flex items-center justify-center',
          colorClass
        )}
        animate={variants[status]}
      >
        <div className="w-16 h-16 rounded-full bg-white/10 blur-sm" />
      </motion.div>

      {/* Grid Pattern Behind (Optional) */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
    </div>
  );
}
