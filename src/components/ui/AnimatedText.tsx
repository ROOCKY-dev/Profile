'use client';

import { motion } from 'framer-motion';
import {
  wordSlam,
  wordSlamChild,
  letterStagger,
  letterStaggerChild,
} from '@/lib/animations';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  mode?: 'word' | 'letter';
  className?: string;
  once?: boolean;
}

export default function AnimatedText({
  text,
  as: Tag = 'h1',
  mode = 'word',
  className = '',
  once = true,
}: AnimatedTextProps) {
  const MotionTag = motion.create(Tag);

  if (mode === 'word') {
    const words = text.split(' ');
    return (
      <MotionTag
        className={className}
        variants={wordSlam}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordSlamChild}
            className="inline-block mr-[0.25em]"
            style={{ perspective: 400 }}
          >
            {word}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  const letters = text.split('');
  return (
    <MotionTag
      className={className}
      variants={letterStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {letters.map((char, i) => (
        <motion.span key={i} variants={letterStaggerChild} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </MotionTag>
  );
}
