"use client";

import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import AboutStrip from "@/components/sections/AboutStrip";
import Capabilities from "@/components/sections/Capabilities";
import SelectedProjects from "@/components/sections/SelectedProjects";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="w-full bg-white min-h-screen scroll-smooth">
      <div className="snap-start h-[calc(100vh-64px)]"><Hero /></div>
      <div className="snap-start"><Marquee /></div>
      <div className="snap-start min-h-screen"><AboutStrip /></div>
      <div className="snap-start min-h-screen"><Capabilities /></div>
      <div className="snap-start min-h-screen bg-gray-50"><SelectedProjects /></div>
      <div className="snap-start min-h-screen"><Footer /></div>
    </main>
  );
}
