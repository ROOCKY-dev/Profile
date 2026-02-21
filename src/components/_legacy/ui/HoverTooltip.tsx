'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HoverTooltip({
  children,
  tooltipContent
}: {
  children: React.ReactNode,
  tooltipContent: React.ReactNode
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'fixed',
              left: mousePos.x + 15,
              top: mousePos.y + 15,
              zIndex: 9999,
              pointerEvents: 'none'
            }}
            className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg text-xs text-white shadow-xl min-w-[200px]"
          >
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
