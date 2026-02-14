'use client';

import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function TiltCard({
  children,
  className
}: {
  children: React.ReactNode,
  className?: string
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const x = useSpring(position.x, { stiffness: 100, damping: 20 });
  const y = useSpring(position.y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(y, [-1, 1], [-10, 10]);
  const rotateY = useTransform(x, [-1, 1], [10, -10]);

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}
