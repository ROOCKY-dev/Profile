'use client';

import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({
  children,
  className,
  onMouseMove,
  onMouseLeave,
  ...props
}: TiltCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);
    setPosition({ x, y });

    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseLeaveInternal = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: 0, y: 0 });
    if (onMouseLeave) onMouseLeave(e);
  };

  const x = useSpring(position.x, { stiffness: 100, damping: 20 });
  const y = useSpring(position.y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(y, [-1, 1], [-10, 10]);
  const rotateY = useTransform(x, [-1, 1], [10, -10]);

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveInternal}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
