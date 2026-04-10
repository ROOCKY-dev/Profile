'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingShapes() {
  const { scrollYProgress } = useScroll();

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large circle — top right */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute -top-20 -right-20 w-[300px] h-[300px] border-[2px] border-black/[0.04] rounded-full"
      />

      {/* Small filled square — left side */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[30%] -left-6 w-12 h-12 bg-black/[0.03] animate-float-slow"
      />

      {/* Medium circle outline — right */}
      <motion.div
        style={{ y: y3, rotate: rotate2 }}
        className="absolute top-[55%] -right-10 w-[180px] h-[180px] border-[2px] border-black/[0.04] rounded-full"
      />

      {/* Cross/plus — left lower */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[70%] left-[5%] animate-float-medium"
      >
        <div className="relative w-8 h-8">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/[0.05] -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-black/[0.05] -translate-x-1/2" />
        </div>
      </motion.div>

      {/* Tiny square — center right */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[40%] right-[10%] w-4 h-4 border-[2px] border-black/[0.04] animate-spin-very-slow"
      />

      {/* Large rectangle outline — bottom left */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[85%] left-[8%] w-[100px] h-[60px] border-[2px] border-black/[0.03]"
      />
    </div>
  );
}
