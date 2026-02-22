'use client';

import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Capabilities from '@/components/sections/Capabilities';
import SelectedProjects from '@/components/sections/SelectedProjects';
import TechStack from '@/components/sections/TechStack';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <Marquee />
      <Capabilities />
      <TechStack />
      <SelectedProjects />
      <Footer />
    </main>
  );
}
