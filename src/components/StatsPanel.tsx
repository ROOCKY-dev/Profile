'use client';

import { motion } from 'framer-motion';

interface StatsPanelProps {
  cpu: number;
  ram: number;
  temp: number;
}

export default function StatsPanel({ cpu, ram, temp }: StatsPanelProps) {
  // Color logic for bars
  const getBarColor = (val: number) => {
    if (val > 80) return 'bg-red-500';
    if (val > 60) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-xs text-zinc-400 shadow-md">
      <h3 className="uppercase tracking-widest text-zinc-500 mb-3 border-b border-white/5 pb-1">
        System Monitor
      </h3>

      <div className="space-y-4">
        {/* CPU */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span>CPU Load</span>
            <span className={cpu > 80 ? 'text-red-400' : 'text-green-400'}>
              {cpu.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getBarColor(cpu)}`}
              initial={{ width: 0 }}
              animate={{ width: `${cpu}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* RAM */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span>RAM Usage</span>
            <span className={ram > 80 ? 'text-red-400' : 'text-green-400'}>
              {ram.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getBarColor(ram)}`}
              initial={{ width: 0 }}
              animate={{ width: `${ram}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Temp */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Core Temp</span>
            <span className={temp > 75 ? 'text-red-400' : 'text-cyan-400'}>
              {temp.toFixed(1)}°C
            </span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${temp > 75 ? 'bg-red-500' : 'bg-cyan-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${(temp / 100) * 100}%` }} // Simplified percentage of 100C max
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
