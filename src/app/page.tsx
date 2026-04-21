'use client';

import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import SelectedProjects from '@/components/sections/SelectedProjects';
import AboutStrip from '@/components/sections/AboutStrip';
import Services from '@/components/sections/Services';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <Marquee />
      <SelectedProjects />
      <AboutStrip />
      <Services />
      <Footer />
    </main>
  );
}
