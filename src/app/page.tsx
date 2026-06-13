"use client";

import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import AboutStrip from "@/components/sections/AboutStrip";
import Capabilities from "@/components/sections/Capabilities";
import SelectedProjects from "@/components/sections/SelectedProjects";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Marquee />
      <AboutStrip />
      <Capabilities />
      <SelectedProjects />
      <Footer />
    </main>
  );
}
