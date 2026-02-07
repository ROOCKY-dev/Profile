'use client';

import { useState, useEffect, useRef } from 'react';
import { BotStatus, LogEntry, STATUS_TEXT } from '@/lib/types';
import CoreVisualizer from '@/components/CoreVisualizer'; 
import CommandLog from '@/components/CommandLog';
import StatsPanel from '@/components/StatsPanel';
import ActionGrid from '@/components/ActionGrid';
import VoiceInput from '@/components/VoiceInput';
import ChatInterface from '@/components/ChatInterface'; 
import { motion } from 'framer-motion';

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', timestamp: '23:00:01', type: 'INFO', message: 'System initialization sequence started...' },
  { id: '2', timestamp: '23:00:02', type: 'SUCCESS', message: 'Core services online.' },
  { id: '3', timestamp: '23:00:03', type: 'INFO', message: 'Connecting to Neural Network...' },
  { id: '4', timestamp: '23:00:05', type: 'SUCCESS', message: 'Connected to ROOCKY-dev.' },
];

export default function Home() {
  const [status, setStatus] = useState<BotStatus>('IDLE');
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [stats, setStats] = useState({ cpu: 12, ram: 45, temp: 42 });
  const [isMuted, setIsMuted] = useState(false);
  const [voiceLevel, setVoiceLevel] = useState(0); 
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.max(5, Math.min(100, prev.cpu + (Math.random() * 10 - 5))),
        ram: Math.max(20, Math.min(90, prev.ram + (Math.random() * 4 - 2))),
        temp: Math.max(30, Math.min(85, prev.temp + (Math.random() * 2 - 1))),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = (actionId: string, customMessage?: string) => {
    const timestamp = new Date().toLocaleTimeString();
    
    // Add action log
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp,
      type: 'INFO',
      message: customMessage || `Executing command: ${actionId.toUpperCase()}`
    };
    setLogs(prev => [...prev, newLog]);

    if (actionId === 'shutdown') {
      setStatus('OFFLINE');
      setTimeout(() => alert('System Shutdown Initiated...'), 1000);
      return;
    }

    if (actionId === 'toggle_mute') {
      setIsMuted(!isMuted);
      setLogs(prev => [...prev, {
        id: Date.now().toString() + 'mute',
        timestamp,
        type: 'WARN',
        message: `Audio Output: ${!isMuted ? 'DISABLED' : 'ENABLED'}`
      }]);
      return;
    }

    setStatus('WORKING');
    setTimeout(() => {
      setStatus('THINKING');
      setTimeout(() => {
        setStatus('IDLE');
        setLogs(prev => [...prev, {
          id: Date.now().toString() + 'done',
          timestamp: new Date().toLocaleTimeString(),
          type: 'SUCCESS',
          message: `Task ${actionId.toUpperCase()} completed successfully.`
        }]);
      }, 2000);
    }, 1500);
  };

  const handleVoiceCommand = (text: string) => {
    setTranscript(text);
    handleAction('voice_cmd', `Voice Input: "${text}"`);
    if (text.toLowerCase().includes('shutdown')) handleAction('shutdown');
    if (text.toLowerCase().includes('status')) handleAction('status_check');
  };

  const handleChatMessage = (text: string) => {
    handleAction('chat_msg', `User Input: "${text}"`);
  };

  return (
    <main className="h-screen w-screen bg-black text-zinc-100 overflow-hidden relative font-sans select-none flex">
      
      {/* Global Grain/Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png')] z-50 mix-blend-overlay" />

      {/* LEFT COLUMN: Controls & Stats */}
      <div className="w-80 h-full bg-black/30 backdrop-blur-md border-r border-white/5 flex flex-col z-10 p-4 gap-4 transition-all hover:bg-black/50">
         <div>
            <h1 className="text-2xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              ROO<span className="font-light opacity-50">OS</span>
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 mt-1 uppercase tracking-widest">
               <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
               SYSTEM ONLINE
            </div>
         </div>

         <StatsPanel {...stats} />

         <div className="flex-1">
            <h3 className="uppercase tracking-widest text-zinc-500 text-[10px] mb-2 font-mono">Operations</h3>
            <ActionGrid onAction={handleAction} isMuted={isMuted} />
         </div>

         <div className="h-24 relative flex justify-center items-center bg-black/20 rounded-xl border border-white/5">
             <VoiceInput onCommand={handleVoiceCommand} onLevelChange={setVoiceLevel} />
         </div>
      </div>

      {/* CENTER AREA: Focused Visualizer */}
      <div className="flex-1 relative z-0 flex flex-col items-center justify-center">
         
         {/* The Tech Orb */}
         <div className="relative">
             <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
             <CoreVisualizer status={status} voiceLevel={voiceLevel} />
         </div>

         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: transcript ? 1 : 0 }}
            className="mt-8 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-cyan-400 font-mono text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)]"
         >
            &quot;{transcript}&quot;
         </motion.div>
         
         <div className="absolute bottom-8 text-center opacity-50 pointer-events-none">
            <h2 className="text-xl font-light tracking-[0.5em] text-white uppercase mb-2">
              {STATUS_TEXT[status]}
            </h2>
            <p className="text-zinc-500 text-xs font-mono">
              AWAITING INPUT_
            </p>
         </div>
      </div>

      {/* RIGHT COLUMN: Chat & Logs */}
      <div className="w-96 h-full bg-black/30 backdrop-blur-md border-l border-white/5 flex flex-col z-10 p-4 gap-4 transition-all hover:bg-black/50">
         <div className="flex-1 min-h-0">
            <ChatInterface onSendMessage={handleChatMessage} />
         </div>
         <div className="h-1/3 min-h-[200px]">
            <CommandLog logs={logs} />
         </div>
      </div>

    </main>
  );
}
