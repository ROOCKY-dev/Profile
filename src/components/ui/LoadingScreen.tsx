'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [text, setText] = useState('');
  const fullText = "> Initializing System...\n> Loading User Profile: Ahmed...\n> Role: Backend / Systems Architect\n> Status: ONLINE";
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1000); // 1 second delay after typing finishes
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono p-4 sm:p-8"
    >
      <div className="bg-black/90 p-6 rounded-lg border border-green-500/30 shadow-[0_0_20px_rgba(0,255,0,0.1)] w-full max-w-3xl relative overflow-hidden">
        {/* Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]"/>

        <div className="flex gap-2 mb-4 border-b border-white/10 pb-2 relative z-20">
           <div className="w-3 h-3 rounded-full bg-red-500"/>
           <div className="w-3 h-3 rounded-full bg-yellow-500"/>
           <div className="w-3 h-3 rounded-full bg-green-500"/>
        </div>
        <pre className="text-green-400 whitespace-pre-wrap text-lg md:text-xl leading-relaxed relative z-20">
          {text}
          <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} inline-block w-2.5 h-5 bg-green-400 ml-1 align-middle`}/>
        </pre>
      </div>
    </motion.div>
  );
}
