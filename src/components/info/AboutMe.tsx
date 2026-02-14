'use client';

import { motion } from 'framer-motion';

export default function AboutMe() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20 text-zinc-300 font-sans">

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Ahmed Husam Ghaithan <span className="text-cyan-400 block text-2xl md:text-3xl mt-2 font-mono">(ROOCKY dev)</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base text-zinc-400 font-mono">
          <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">Computer Science Student</span>
          <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">Game Developer</span>
          <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">Systems Architect</span>
          <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">Gamer</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-16">

        {/* About Me */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">👨‍💻</span> About Me
          </h2>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm leading-relaxed space-y-4">
            <p>
              I am a driven <strong className="text-white">Computer Science student</strong> at <strong className="text-white">Universiti Tenaga Nasional (UNITEN)</strong> with a passion for building complex, scalable systems and immersive digital experiences. Originally from Yemen and currently based in Malaysia, I operate under the alias <strong className="text-cyan-400">Roocky dev</strong>, where I bridge the gap between technical logic and creative game design.
            </p>
            <p>
              My work is defined by an <strong className="text-white">AI-first approach</strong>, whether I&apos;m optimizing server environments or conceptualizing next-gen mechanics. I thrive at the intersection of low-level programming and high-level user experience.
            </p>
          </div>
        </motion.section>

        {/* Technical Toolkit */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🛠</span> Technical Toolkit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { category: 'Languages', items: ['C++', 'Java', 'Python', 'JavaScript'] },
              { category: 'Game Engines', items: ['Unity', 'Unreal Engine'] },
              { category: 'Specializations', items: ['UI/UX Design', 'Game Mechanics', 'AI Integration'] },
              { category: 'Infrastructure', items: ['Linux Server Admin (Ubuntu)', 'Minecraft Server Architecture (Fabric/Paper/Forge)'] }
            ].map((tool, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">{tool.category}</h3>
                <ul className="space-y-2">
                  {tool.items.map((item, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          id="projects-section"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🕹</span> Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Planetary Claim */}
            <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 hover:border-cyan-500/30 transition-all">
               <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">🌌 Planetary Claim</h3>
               <p className="text-zinc-500 text-sm font-mono mb-4">MMO-RTS | Unity | AI-First</p>
               <p className="text-sm leading-relaxed">
                 An ambitious MMO-RTS project leveraging an AI-first development philosophy. Creates a massive, persistent strategic environment based on the core foundations of <em>Rusted Warfare</em>.
               </p>
            </div>

            {/* Minecraft Ecosystems */}
            <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 hover:border-green-500/30 transition-all">
               <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">🏗 Minecraft Ecosystems</h3>
               <p className="text-zinc-500 text-sm font-mono mb-4">Server Architecture | Modding | Automation</p>
               <ul className="space-y-2 text-sm list-disc pl-4 marker:text-green-500">
                 <li><strong className="text-zinc-300">Head Developer & Admin:</strong> Managing high-performance servers, developing custom mods (KubeJS, Polymer), and designing unique gameplay loops.</li>
                 <li><strong className="text-zinc-300">Alto Clef Fork:</strong> A specialized automation tool designed for efficient resource gathering and navigation.</li>
               </ul>
            </div>

            {/* Problem Marketplace */}
            <div className="lg:col-span-2 group bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all">
               <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">💡 Problem Marketplace</h3>
               <p className="text-zinc-500 text-sm font-mono mb-4">Web App Concept</p>
               <p className="text-sm leading-relaxed">
                 A conceptual web application designed to connect users facing specific technical hurdles with developers looking for their next challenge. Platform built to turn real-world frustrations into innovative software solutions.
               </p>
            </div>

          </div>
        </motion.section>

        {/* Current Focus */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🎯</span> Current Focus
          </h2>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
             <p className="leading-relaxed mb-6">
               I am currently deep-diving into <strong className="text-white">Discrete Structures</strong> and <strong className="text-white">Computer Organization</strong> while expanding my portfolio in game development. My goal is to transition into the European or Chinese tech landscapes for the 2026-2027 academic year, bringing a global perspective to software engineering.
             </p>
             <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-zinc-400">
               &quot;Turning complex problems into elegant code and boring games into technical masterpieces.&quot;
             </blockquote>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
