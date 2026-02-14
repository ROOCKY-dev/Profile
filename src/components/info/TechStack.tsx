'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Globe, Database, Server, Code, Layers, Terminal } from 'lucide-react';
import HoverTooltip from '@/components/ui/HoverTooltip';

const skills = [
  { icon: Code, name: 'React', level: 'Frontend', speed: 1.5, x: '10%', y: '10%' },
  { icon: Server, name: 'Node.js', level: 'Backend', speed: 0.5, x: '80%', y: '20%' },
  { icon: Database, name: 'PostgreSQL', level: 'Database', speed: 1.2, x: '30%', y: '40%' },
  { icon: Layers, name: 'Docker', level: 'DevOps', speed: 0.8, x: '70%', y: '60%' },
  { icon: Terminal, name: 'Bash', level: 'System', speed: 1.8, x: '15%', y: '80%' },
  { icon: Cpu, name: 'Rust', level: 'System', speed: 0.6, x: '60%', y: '90%' },
  { icon: Globe, name: 'Next.js', level: 'Fullstack', speed: 1.0, x: '40%', y: '50%' },
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="relative min-h-[100vh] w-full overflow-hidden flex flex-col items-center justify-center py-20">
      <h2 className="text-4xl font-mono text-center mb-8 z-10 relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Tech Arsenal
      </h2>
      <p className="text-zinc-500 text-center mb-16 z-10 relative max-w-lg">
        Hover to scan for details. Scroll to navigate layers.
      </p>

      <div className="absolute inset-0 w-full h-full">
        {skills.map((skill, index) => (
          <ParallaxSkill key={index} skill={skill} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function ParallaxSkill({ skill, scrollYProgress }: { skill: any, scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * skill.speed]);

  return (
    <motion.div
      style={{ y, left: skill.x, top: skill.y }}
      className="absolute"
    >
      <HoverTooltip
        tooltipContent={
          <div>
             <h4 className="font-bold text-cyan-300">{skill.name}</h4>
             <p className="text-xs text-zinc-400">{skill.level}</p>
          </div>
        }
      >
        <div className="p-4 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-colors shadow-lg cursor-pointer group">
          <skill.icon className="w-8 h-8 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
        </div>
      </HoverTooltip>
    </motion.div>
  );
}
