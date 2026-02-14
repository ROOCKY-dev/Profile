'use client';

import { useState, useEffect } from 'react';

export default function TerminalHero() {
  const [text, setText] = useState('');
  const fullText = "> Initializing System...\n> Loading User Profile: Ahmed...\n> Role: Backend / Systems Architect\n> Status: ONLINE";
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full text-left font-mono p-8">
      <div className="bg-black/80 p-6 rounded-lg border border-green-500/30 shadow-[0_0_20px_rgba(0,255,0,0.1)] w-full max-w-3xl">
        <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
           <div className="w-3 h-3 rounded-full bg-red-500"/>
           <div className="w-3 h-3 rounded-full bg-yellow-500"/>
           <div className="w-3 h-3 rounded-full bg-green-500"/>
        </div>
        <pre className="text-green-400 whitespace-pre-wrap text-lg md:text-xl leading-relaxed">
          {text}
          <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} inline-block w-2.5 h-5 bg-green-400 ml-1 align-middle`}/>
        </pre>
      </div>
    </div>
  );
}
