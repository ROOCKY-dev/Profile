'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  onSendMessage: (text: string) => void;
}

export default function ChatInterface({ onSendMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: 'RooOS Online. How can I assist you today?', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMsg]);
    onSendMessage(input);
    setInput('');

    // Simulate Bot Thinking/Reply (Mock for now)
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: `Processing: "${userMsg.text}"... (Simulation)`,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="p-3 border-b border-white/5 bg-white/5 flex items-center gap-2">
        <Bot className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Secure Channel</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-zinc-700' : 'bg-cyan-900/50'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-300" /> : <Bot className="w-4 h-4 text-cyan-400" />}
            </div>
            
            <div className={`max-w-[80%] p-3 rounded-lg border ${
              msg.role === 'user' 
                ? 'bg-zinc-800/50 border-zinc-700 text-zinc-100' 
                : 'bg-cyan-950/30 border-cyan-900/50 text-cyan-100'
            }`}>
              <p>{msg.text}</p>
              <span className="text-[10px] opacity-50 mt-1 block">{msg.timestamp}</span>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type command..."
            className="flex-1 bg-black/50 border border-zinc-800 rounded px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors text-white placeholder-zinc-600 font-mono"
          />
          <button
            onClick={handleSend}
            className="bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/50 text-cyan-400 p-2 rounded transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
