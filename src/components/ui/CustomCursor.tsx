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

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth cursor animation
    const animate = () => {
      const ease = 0.15;
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;
      
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };
    animate();

    const handleMouseEnter = () => {
      cursor.classList.add('scale-150', 'border-primary', 'bg-primary/10');
      cursor.classList.remove('border-primary/50');
      if (dot) {
        dot.classList.add('scale-0');
      }
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('scale-150', 'border-primary', 'bg-primary/10');
      cursor.classList.add('border-primary/50');
      if (dot) {
        dot.classList.remove('scale-0');
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
            el.removeEventListener('mouseenter', handleMouseEnter);
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
      className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-all duration-200 ease-out backdrop-blur-sm"
    >
      <div 
        ref={dotRef} 
        className="w-1.5 h-1.5 bg-primary rounded-full transition-transform duration-200"
      />
    </div>
  );
}
