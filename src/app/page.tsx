'use client';

import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import SelectedProjects from '@/components/sections/SelectedProjects';
import AboutStrip from '@/components/sections/AboutStrip';
import Capabilities from '@/components/sections/Capabilities';
import Services from '@/components/sections/Services';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative w-full bg-paper">
      <Hero />
      <Marquee />
      <AboutStrip />
      <Capabilities />
      <SelectedProjects />
      <Services />
      <Footer />
    </main>
  );
}
