'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  Mail, 
  Search, 
  Volume2, 
  VolumeX, 
  Terminal, 
  Power 
} from 'lucide-react';

interface ActionGridProps {
  onAction: (action: string) => void;
  isMuted: boolean;
}

const actions = [
  { id: 'briefing', label: 'Morning Briefing', icon: Zap },
  { id: 'email', label: 'Check Inbox', icon: Mail },
  { id: 'network', label: 'Scan Network', icon: Search },
  { id: 'terminal', label: 'Open Terminal', icon: Terminal },
];

export default function ActionGrid({ onAction, isMuted }: ActionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {actions.map((action) => (
        <motion.button
          key={action.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAction(action.id)}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all text-sm font-medium text-zinc-300"
        >
          <action.icon className="w-6 h-6 mb-2 text-cyan-400" />
          {action.label}
        </motion.button>
      ))}

      {/* Mute Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onAction('toggle_mute')}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-sm font-medium ${
          isMuted 
            ? 'bg-red-500/10 border-red-500/30 text-red-400' 
            : 'bg-green-500/10 border-green-500/30 text-green-400'
        }`}
      >
        {isMuted ? <VolumeX className="w-6 h-6 mb-2" /> : <Volume2 className="w-6 h-6 mb-2" />}
        {isMuted ? 'Muted' : 'Voice On'}
      </motion.button>

      {/* Shutdown (Mock) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onAction('shutdown')}
        className="flex flex-col items-center justify-center p-4 rounded-xl bg-red-900/10 border border-red-500/20 hover:bg-red-900/20 hover:border-red-500 text-red-400 font-medium text-sm"
      >
        <Power className="w-6 h-6 mb-2" />
        Shutdown
      </motion.button>
    </div>
  );
}
