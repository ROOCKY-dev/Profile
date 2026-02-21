'use client';

import { useEffect, useRef } from 'react';
import { usePerformance } from '@/lib/PerformanceContext';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const { performanceLevel } = usePerformance();

  useEffect(() => {
    if (performanceLevel === 'low') return;
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const handleMouseEnter = () => {
      cursor.classList.add('w-12', 'h-12', 'bg-transparent', 'border-primary');
      cursor.classList.remove('w-6', 'h-6');
      if (dot) {
        dot.classList.remove('bg-primary');
        dot.classList.add('bg-primary/50', 'w-2', 'h-2');
      }
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('w-12', 'h-12', 'bg-transparent', 'border-primary');
      cursor.classList.add('w-6', 'h-6');
      if (dot) {
        dot.classList.add('bg-primary');
        dot.classList.remove('bg-primary/50', 'w-2', 'h-2');
      }
    };

    document.addEventListener('mousemove', moveCursor);

    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cursor-hover');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Observer to attach listeners to dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const newInteractiveElements = document.querySelectorAll('a, button, .cursor-hover');
          newInteractiveElements.forEach((el) => {
            el.removeEventListener('mouseenter', handleMouseEnter); // Prevent duplicates
            el.removeEventListener('mouseleave', handleMouseLeave);
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [performanceLevel]);

  if (performanceLevel === 'low') return null;

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      className="fixed top-0 left-0 w-6 h-6 border border-primary rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference transition-all duration-100 ease-out"
    >
      <div ref={dotRef} className="w-1 h-1 bg-primary rounded-full transition-all duration-300" />
    </div>
  );
}
