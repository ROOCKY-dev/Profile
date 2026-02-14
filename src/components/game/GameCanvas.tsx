'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import DecryptText from '@/components/ui/DecryptText';
import { useToast } from '@/components/ui/ToastSystem';

interface Particle {
  id: string;
  x: number;
  y: number;
  type: 'DATA' | 'GLITCH';
  size: number;
  speed: number;
  label?: string; // e.g. "React", "Next.js"
}

const DATA_LABELS = [
  'React', 'Next.js', 'Typescript', 'Node.js',
  'Postgres', 'Docker', 'AWS', 'GraphQL',
  'Tailwind', 'Three.js'
];

type GameState = 'IDLE' | 'PLAYING' | 'GAME_OVER' | 'GAME_WON';

export default function GameCanvas() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [collectedData, setCollectedData] = useState<string[]>([]);

  // Refs for loop state
  const gameStateRef = useRef<GameState>('IDLE');
  const scoreRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const playerPosRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  const loopRef = useRef<() => void>(null!);

  // Sync state to refs
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (gameStateRef.current === 'IDLE' || gameStateRef.current === 'GAME_OVER' || gameStateRef.current === 'GAME_WON') {
         return;
    }

    // Win Condition
    if (scoreRef.current >= 500) {
        setGameState('GAME_WON');
        gameStateRef.current = 'GAME_WON';
        return;
    }

    // Clear Screen with Fade
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const { x: px, y: py } = playerPosRef.current;

    // Draw Player
    ctx.beginPath();
    ctx.arc(px, py, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#06b6d4';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Spawn Particles
    if (Math.random() < 0.05) {
        const isGlitch = Math.random() > 0.7;
        const label = !isGlitch ? DATA_LABELS[Math.floor(Math.random() * DATA_LABELS.length)] : undefined;

        particlesRef.current.push({
            id: crypto.randomUUID(),
            x: Math.random() * canvas.width,
            y: -30,
            type: isGlitch ? 'GLITCH' : 'DATA',
            size: isGlitch ? 20 : 16,
            speed: isGlitch ? 3 + (scoreRef.current / 500) : 2 + (scoreRef.current / 1000),
            label
        });
    }

    // Update & Draw Particles
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.y += p.speed;

        if (p.type === 'DATA') {
            ctx.fillStyle = '#22c55e';
            ctx.font = '14px monospace';
            ctx.fillText(p.label || '{}', p.x, p.y);
        } else {
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(p.x, p.y, p.size, p.size);
        }

        // Collision
        const dx = px - p.x;
        const dy = py - p.y;
        const distance = Math.sqrt(dx*dx + dy*dy);

        if (distance < 30) {
            if (p.type === 'DATA') {
                setScore(prev => prev + 100);
                if (p.label) setCollectedData(prev => [...prev.slice(-4), p.label!]);
                particlesRef.current.splice(i, 1);
            } else {
                setGameState('GAME_OVER');
                gameStateRef.current = 'GAME_OVER';
            }
        } else if (p.y > canvas.height) {
            particlesRef.current.splice(i, 1);
        }
    }

    requestRef.current = requestAnimationFrame(() => loopRef.current());
  }, []);

  // Update ref
  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  const startGame = useCallback(() => {
    setScore(0);
    setCollectedData([]);
    setGameState('PLAYING');
    gameStateRef.current = 'PLAYING';
    particlesRef.current = [];
    scoreRef.current = 0;

    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(loop);
  }, [loop]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize Handling
    const resize = () => {
        if (canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
    };
    window.addEventListener('resize', resize);
    resize();

    // Mouse Handling
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        playerPosRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    // Touch Handling
    const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault(); // Prevent scrolling
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        playerPosRef.current = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchstart', handleTouchMove, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
        cancelAnimationFrame(requestRef.current);
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('touchstart', handleTouchMove);
        canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[350px] md:h-[500px] bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-2xl group cursor-none">

        <canvas
            ref={canvasRef}
            className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png')] bg-opacity-5"
        />

        {/* HUD */}
        {gameState === 'PLAYING' && (
            <>
                <div className="absolute top-4 left-4 font-mono text-cyan-400 text-lg font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] pointer-events-none">
                    SCORE: {score} / 500
                </div>

                <div className="absolute top-4 right-4 flex flex-col items-end space-y-1 pointer-events-none">
                    {collectedData.map((d, i) => (
                        <div key={i} className="text-green-400 font-mono text-xs animate-pulse">
                            + RECOVERED: {d.toUpperCase()}
                        </div>
                    ))}
                </div>
            </>
        )}

        {/* Start Screen */}
        {gameState === 'IDLE' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20 cursor-auto">
                <h2 className="text-4xl font-bold text-white mb-2 tracking-tighter">SYSTEM RESTORE</h2>
                <p className="text-zinc-400 mb-8 max-w-md text-center text-sm">
                    The system memory is fragmented. Guide the <span className="text-cyan-400 font-bold">Recovery Agent</span> to collect <span className="text-green-400">5 Valid Data Packets</span>.
                    <br/><br/>
                    <span className="text-red-500 font-bold">WARNING:</span> Avoid corrupted sectors (Red Blocks).
                </p>
                <button
                    onClick={startGame}
                    className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95"
                >
                    INITIALIZE SEQUENCE
                </button>
            </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'GAME_OVER' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/90 backdrop-blur-sm z-30 cursor-auto">
                <h2 className="text-5xl font-bold text-white mb-2 tracking-tighter drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">CRITICAL ERROR</h2>
                <div className="text-red-300 font-mono mb-8 animate-pulse">System Halted. Data Corruption Detected.</div>

                <div className="text-xl mb-8 font-mono bg-black/40 px-6 py-4 rounded border border-red-500/30">
                    Recovered Data: <span className="text-white font-bold">{score} BYTES</span>
                </div>

                <button
                    onClick={startGame}
                    className="px-8 py-3 bg-white text-red-900 font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
                >
                    RETRY RESTORE
                </button>
            </div>
        )}

        {/* Win Screen */}
        {gameState === 'GAME_WON' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-950/95 backdrop-blur-md z-30 cursor-auto">
                <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">ACCESS GRANTED</h2>
                <div className="text-green-300 font-mono mb-8 animate-pulse">System Integrity Restored. Encrypted Channel Open.</div>

                <div className="mb-8 font-mono bg-black/60 px-8 py-6 rounded-xl border border-green-500/50 text-center relative overflow-hidden group/card">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-scan" />

                    <p className="text-xs text-zinc-500 mb-2 uppercase tracking-widest">Direct Line Connection</p>
                    <div className="text-2xl text-white font-bold mb-1">
                        <DecryptText text="ahmed@dev-systems.io" reveal={true} />
                    </div>
                    <div className="text-sm text-zinc-400">
                        Discord: <span className="text-white">Ahmed#0001</span>
                    </div>

                    <button
                       className="mt-6 text-xs text-green-400 hover:text-green-300 underline underline-offset-4"
                       onClick={() => {
                          navigator.clipboard.writeText('ahmed@dev-systems.io');
                          toast('Copied to clipboard!', 'success');
                       }}
                    >
                        [COPY SECURE LINK]
                    </button>
                </div>

                <button
                    onClick={startGame}
                    className="px-8 py-3 bg-zinc-800 text-zinc-400 font-bold rounded-full hover:bg-zinc-700 transition-colors border border-white/10"
                >
                    REPLAY SIMULATION
                </button>
            </div>
        )}

    </div>
  );
}
