'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Capabilities from '@/components/sections/Capabilities';
import SelectedProjects from '@/components/sections/SelectedProjects';
import TechStack from '@/components/sections/TechStack';
import Footer from '@/components/layout/Footer';
import { usePerformance } from '@/lib/PerformanceContext';

export default function Home() {
  const { performanceLevel } = usePerformance();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Skip smooth scroll in low performance mode
    if (performanceLevel === 'low') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [performanceLevel]);

  return (
    <main className="relative w-full">
      <Hero />
      <Marquee />
      <SelectedProjects />
      <Capabilities />
      <TechStack />
      <Footer />
    </main>
  );
}
