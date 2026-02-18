'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal, X, ChevronUp, LucideIcon } from 'lucide-react';
import GameCanvas from '@/components/game/GameCanvas';

/**
 * Game Section (Footer)
 *
 * Implements "Initiate Contact" screen with Gravity Well game,
 * magnetic social buttons, and a terminal drawer.
 */
export default function GameSection() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <section id="game-section" className="relative h-screen w-full flex flex-col bg-void snap-start overflow-hidden">

        {/* Emerald Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,rgba(3,3,8,0)_70%)] opacity-60"></div>
        <div className="absolute inset-0 pointer-events-none z-0 bg-[size:40px_40px] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)] opacity-40"></div>

        <div className="relative z-10 flex flex-col flex-grow min-h-screen">

            {/* Header */}
            <header className="pt-20 pb-10 text-center relative">
                <div className="inline-flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-emerald-500 text-xs font-bold tracking-widest uppercase">Systems Nominal</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    INITIATE CONTACT
                </h2>
                <p className="text-slate-400 font-body max-w-md mx-auto text-sm md:text-base">
                    Interact to disturb the gravity field. Click to repulse debris.
                    <br/>Establish a link via the terminal below.
                </p>
            </header>

            {/* Gravity Well Game Area */}
            <div className="relative flex-grow flex flex-col items-center justify-center w-full min-h-[400px]">
                {/* Interactive Canvas Container */}
                <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden group cursor-crosshair border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
                    {/* Visual Cue for Gravity Well */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="w-[200px] h-[200px] rounded-full border border-emerald-500/20 bg-emerald-500/5 blur-3xl animate-pulse"></div>
                    </div>

                    {/* The Actual Game Canvas */}
                    <GameCanvas />

                    {/* Center Gravity Point Hint */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/20 rounded-full flex items-center justify-center pointer-events-none group-hover:scale-150 transition-transform duration-300">
                        <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                    </div>

                    <div className="absolute bottom-4 right-6 text-[10px] font-code text-white/30 pointer-events-none uppercase tracking-widest">
                        Physics Engine: Active
                    </div>
                </div>

                {/* Magnetic Social Links Bar */}
                <div className="mt-12 flex items-center justify-center gap-6 md:gap-12 relative z-20">
                    <MagneticButton icon={Github} label="GitHub" href="https://github.com" />
                    <MagneticButton icon={Linkedin} label="LinkedIn" href="https://linkedin.com" />
                    <MagneticButton icon={Mail} label="Email" href="mailto:contact@example.com" />
                </div>
            </div>

            {/* Footer Bottom Bar */}
            <footer className="w-full py-6 px-6 border-t border-white/10 flex items-center justify-between mt-auto bg-void/80 backdrop-blur-md relative z-30">
                <div className="text-xs text-slate-500 font-code">
                    NEBULA OS v2.4.1 // READY
                </div>

                {/* Terminal Toggle Button */}
                <button
                    onClick={() => setIsTerminalOpen(true)}
                    className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer"
                >
                    <span className="text-emerald-500 font-code font-bold text-sm">&gt;_</span>
                    <span className="text-xs font-display font-medium text-slate-300 group-hover:text-white tracking-wide uppercase">Terminal</span>
                    <ChevronUp size={14} className="text-slate-500 group-hover:text-emerald-500 transition-colors" />
                </button>

                <div className="text-xs text-slate-500 font-code text-right hidden md:block">
                    COORD: 34.0522° N, 118.2437° W
                </div>
            </footer>
        </div>

        {/* Terminal Drawer */}
        <AnimatePresence>
            {isTerminalOpen && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-x-0 bottom-0 h-[50vh] z-50 glass-panel border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-t-2xl flex flex-col bg-[#050505]/95 backdrop-blur-xl"
                >
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/40 rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" onClick={() => setIsTerminalOpen(false)}></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="ml-3 text-xs font-code text-slate-400 flex items-center gap-1">
                                <Terminal size={12} /> visitor@nebula:~
                            </span>
                        </div>
                        <button onClick={() => setIsTerminalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Terminal Content */}
                    <div className="flex-grow p-6 font-code text-sm overflow-y-auto">
                        <div className="space-y-2 text-slate-300">
                            <div className="text-emerald-500 mb-4">
                                Welcome to Nebula OS v2.4.1.<br/>
                                Type &apos;help&apos; to see available commands.
                            </div>

                            <div className="flex gap-2 opacity-60">
                                <span className="text-emerald-500">➜</span>
                                <span className="text-purple-400">~</span>
                                <span>whoami</span>
                            </div>
                            <div className="pl-6 mb-2 text-slate-400">
                                guest_user_001
                            </div>

                            <div className="flex gap-2 items-center">
                                <span className="text-emerald-500">➜</span>
                                <span className="text-purple-400">~</span>
                                <div className="flex-grow flex items-center">
                                    <span>contact</span><span className="inline-block w-2.5 h-5 bg-emerald-500 ml-1 animate-blink"></span>
                                </div>
                            </div>

                            <div className="pl-6 mt-2 space-y-1 text-slate-300 animate-fadeIn">
                                <div className="grid grid-cols-[100px_1fr] gap-4">
                                    <span className="text-slate-500">Email:</span>
                                    <a href="mailto:ahmed@nebula.dev" className="text-emerald-400 hover:underline">ahmed@nebula.dev</a>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-4">
                                    <span className="text-slate-500">Twitter:</span>
                                    <a href="#" className="text-emerald-400 hover:underline">@roocky_dev</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </section>
  );
}

function MagneticButton({ icon: Icon, label, href }: { icon: LucideIcon, label: string, href: string }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.3; // Magnetic pull strength
        const y = (clientY - (top + height / 2)) * 0.3;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="group relative flex items-center justify-center w-16 h-16 rounded-2xl glass-panel text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
            <Icon size={24} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-code text-emerald-500 uppercase tracking-widest whitespace-nowrap">
                {label}
            </span>
        </motion.a>
    );
}
