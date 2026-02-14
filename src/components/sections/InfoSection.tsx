'use client';

export default function InfoSection() {
  return (
    <section className="h-screen w-full bg-zinc-800 snap-start text-white overflow-hidden relative flex flex-col items-center justify-center">
      <div className="text-center p-12">
         <h1 className="text-4xl font-mono text-zinc-500 mb-4">Info Module</h1>
         <p className="text-zinc-600 mb-8">Phase 4 Development Pending...</p>

         <div className="grid grid-cols-2 gap-4 text-left max-w-2xl mx-auto opacity-50 text-sm font-mono">
            <div className="p-4 border border-white/5 bg-black/20">
               <h3 className="text-cyan-500 mb-2">Structure</h3>
               <ul className="list-disc pl-4 space-y-1">
                 <li>Hero Section (Typewriter)</li>
                 <li>Timeline (XP Bar)</li>
                 <li>Skills (Parallax)</li>
                 <li>Portfolio (Scroll Reveal)</li>
               </ul>
            </div>
            <div className="p-4 border border-white/5 bg-black/20">
               <h3 className="text-purple-500 mb-2">Interactions</h3>
               <ul className="list-disc pl-4 space-y-1">
                 <li>Cursor-Triggered Tooltips</li>
                 <li>Holographic Tilt</li>
                 <li>Magnetic Buttons</li>
                 <li>Video Swap Preview</li>
               </ul>
            </div>
         </div>
      </div>
    </section>
  );
}
