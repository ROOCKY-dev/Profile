"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { maskReveal } from "@/lib/animations";

export default function Capabilities() {
  const D = PORTFOLIO_DATA;
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [toolsKey, setToolsKey] = useState<string | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const leaveTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const tt = tooltipRef.current;
      if (!tt || !sectionRef.current) return;
      const maxX = sectionRef.current.clientWidth - tt.offsetWidth - 24;
      const x = Math.min(mouseRef.current.x + 20, maxX);
      const y = mouseRef.current.y + 20;
      tt.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  };

  const scheduleHide = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setToolsKey(null), 150);
  };
  const cancelHide = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  };

  const toolsActive = D.capabilities.find(c => c.key === toolsKey);

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMove}
      className="w-full min-h-[calc(100vh-64px)] flex flex-col border-b-2 border-black bg-white relative overflow-hidden"
    >
      {/* Container wrapper for consistent alignment */}
      <div className="w-full px-6 md:px-12 lg:px-20 border-b-2 border-black bg-white relative z-20">
        <div className="py-12 md:py-20 flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div 
            className="max-w-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={maskReveal}
          >
            <span className="label-text text-gray-400 tracking-[4px]">03 / Capabilities & Tools</span>
            <h2 className="font-heading text-[clamp(44px,8.5vw,110px)] leading-[0.82] tracking-[-0.04em] uppercase breathe-header mt-8 text-black font-black">
              What I do —<br/>and with what.
            </h2>
          </motion.div>
          <span className="label-text text-gray-300 mb-4 hidden lg:block uppercase tracking-[4px]">Hover phrase to reveal instruments</span>
        </div>
      </div>

      {/* Grid container with internal padding to match header */}
      <div className="flex-1 w-full px-6 md:px-12 lg:px-20 py-12 md:py-20 bg-gray-50/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-black">
          {D.capabilities.map((c) => {
            const isTileActive = activeKey === c.key;
            return (
              <div
                key={c.key}
                onMouseEnter={() => setActiveKey(c.key)}
                onMouseLeave={() => {
                  setActiveKey(null);
                  scheduleHide();
                }}
                className="relative aspect-square border-b-2 sm:border-b-0 sm:border-r-2 last:border-r-0 border-black bg-white cursor-default group"
              >
                <div className={`absolute inset-0 p-8 lg:p-10 flex flex-col justify-between transition-colors duration-300 ${isTileActive ? "bg-gray-50" : "bg-white"}`} >
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-black transition-all duration-300 z-20"
                    
                  />

                  <div className="flex justify-between items-start z-10">
                    <span className="font-heading text-3xl tracking-tighter opacity-10 font-black">{c.n}</span>
                    <span className="font-mono text-[9px] font-black tracking-widest uppercase text-gray-300">
                      {c.tools.length} TOOLS
                    </span>
                  </div>

                  <div className="z-10 py-6">
                    <div className="font-heading text-2xl md:text-[clamp(20px,2vw,28px)] leading-[1.1] tracking-tight uppercase text-black font-black">
                      <span className="text-gray-200 transition-colors group-hover:text-gray-300">{c.sentence[0]} </span>
                      <br />
                      <span className="relative inline-block">
                        <span
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            cancelHide();
                            setToolsKey(c.key);
                          }}
                          onMouseLeave={scheduleHide}
                          className={`relative z-10 transition-colors duration-200 cursor-help decoration-2 inline-block ${
                            toolsKey === c.key ? "text-white no-underline" : "text-black"
                          }`}
                        >
                          {c.sentence[1]}
                        </span>
                        <AnimatePresence>
                          {toolsKey === c.key && (
                            <motion.span 
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0 }}
                              transition={{ duration: 0.2, ease: "circOut" }}
                              className="absolute inset-x-[-8px] inset-y-[-2px] bg-black z-0 origin-left"
                            />
                          )}
                        </AnimatePresence>
                      </span>
                      <br />
                      <span className="text-gray-200 transition-colors group-hover:text-gray-300"> {c.sentence[2]}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center z-10 font-mono text-[9px] font-black tracking-[4px] uppercase text-gray-300 group-hover:text-black transition-colors">
                    <span>{c.verb}</span>
                    <span className={`transition-opacity duration-300 ${toolsKey === c.key ? "opacity-100" : "opacity-0"}`}>
                      READING_STACK...
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        ref={tooltipRef}
        className={`fixed left-0 top-0 pointer-events-none z-[100] bg-black text-white border-2 border-black shadow-[12px_12px_0_rgba(0,0,0,0.1)] p-6 min-w-[260px] transition-opacity duration-150 will-change-transform ${
          toolsActive ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {toolsActive && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-800">
              <span className="font-mono text-[11px] font-black tracking-[3px] uppercase">{toolsActive.key}</span>
              <span className="font-mono text-[10px] text-gray-600">{toolsActive.tools.length}</span>
            </div>
            <ul className="m-0 p-0 list-none space-y-3">
              {toolsActive.tools.map((t, idx) => (
                <li key={t} className="font-mono text-[12px] font-bold tracking-widest uppercase flex items-center gap-4">
                  <span className="text-gray-700 text-[10px] font-black">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-white">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
