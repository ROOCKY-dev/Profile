# Portfolio Redesign — Swiss/Bauhaus Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio from dark brutalist (lime-on-black) to a Swiss/Bauhaus aesthetic — black & white only, heavy borders, kinetic/typographic/smooth animations, "workshop running 24/7" feel.

**Architecture:** Rewrite all visual components in-place. Replace `globals.css` color system and animations entirely. Remove unused deps (Three.js, R3F) and components (CustomCursor, NoiseOverlay, PerformanceContext). Add new components: AboutStrip, WorkshopStatus, animation utilities. Keep data layer (portfolio-data.ts, project-data.ts) and routing intact.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lenis

---

## File Structure

```
src/
├── app/
│   ├── globals.css              ← REWRITE (new color system, animations, layout base)
│   ├── layout.tsx               ← MODIFY (new fonts, remove old providers/components)
│   ├── page.tsx                 ← MODIFY (new section lineup)
│   ├── not-found.tsx            ← REWRITE (Swiss 404)
│   ├── work/
│   │   ├── page.tsx             ← REWRITE (Swiss work archive)
│   │   └── [slug]/page.tsx      ← REWRITE (Swiss project detail)
│   ├── robots.ts                ← KEEP
│   └── sitemap.ts               ← KEEP
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           ← REWRITE
│   │   ├── Footer.tsx           ← REWRITE
│   │   └── SimpleFooter.tsx     ← DELETE (Footer used everywhere)
│   ├── sections/
│   │   ├── Hero.tsx             ← REWRITE
│   │   ├── Marquee.tsx          ← REWRITE
│   │   ├── SelectedProjects.tsx ← REWRITE
│   │   ├── AboutStrip.tsx       ← CREATE
│   │   ├── Services.tsx         ← CREATE (replaces ServiceMenu modal)
│   │   ├── Capabilities.tsx     ← DELETE
│   │   └── TechStack.tsx        ← DELETE
│   └── ui/
│       ├── WorkshopStatus.tsx   ← CREATE
│       ├── AnimatedText.tsx     ← CREATE (letter stagger, word slam)
│       ├── CountUp.tsx          ← CREATE (number count-up on scroll)
│       ├── ContactModal.tsx     ← REWRITE
│       ├── CustomCursor.tsx     ← DELETE
│       ├── NoiseOverlay.tsx     ← DELETE
│       ├── ServiceMenu.tsx      ← DELETE
│       └── ContactMe.tsx        ← DELETE
├── lib/
│   ├── animations.ts            ← CREATE (Framer Motion variants)
│   ├── portfolio-data.ts        ← MODIFY (add currentlyWorkingOn)
│   ├── project-data.ts          ← KEEP
│   ├── types.ts                 ← KEEP
│   ├── PerformanceContext.tsx   ← DELETE
│   ├── Status.ts               ← DELETE
│   └── sound.ts                ← DELETE
```

---

### Task 1: Clean Up — Remove Unused Dependencies and Files

**Files:**
- Delete: `src/components/ui/CustomCursor.tsx`
- Delete: `src/components/ui/NoiseOverlay.tsx`
- Delete: `src/components/ui/ContactMe.tsx`
- Delete: `src/components/ui/ServiceMenu.tsx`
- Delete: `src/components/sections/Capabilities.tsx`
- Delete: `src/components/sections/TechStack.tsx`
- Delete: `src/components/layout/SimpleFooter.tsx`
- Delete: `src/lib/PerformanceContext.tsx`
- Delete: `src/lib/Status.ts`
- Delete: `src/lib/sound.ts`
- Modify: `package.json`

- [ ] **Step 1: Remove 3D and unused npm packages**

```bash
npm uninstall @react-three/drei @react-three/fiber @react-three/postprocessing three maath postprocessing howler uuid
```

- [ ] **Step 2: Delete unused component and lib files**

```bash
rm src/components/ui/CustomCursor.tsx
rm src/components/ui/NoiseOverlay.tsx
rm src/components/ui/ContactMe.tsx
rm src/components/ui/ServiceMenu.tsx
rm src/components/sections/Capabilities.tsx
rm src/components/sections/TechStack.tsx
rm src/components/layout/SimpleFooter.tsx
rm src/lib/PerformanceContext.tsx
rm src/lib/Status.ts
rm src/lib/sound.ts
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused deps and old brutalist components"
```

---

### Task 2: New Global Styles — `globals.css`

**Files:**
- Rewrite: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css with new Swiss/Bauhaus design system**

```css
@import "tailwindcss";

:root {
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-gray-bg: #F0F0F0;
  --color-gray: #888888;
  --color-gray-lt: #CCCCCC;

  --font-sans: 'Inter', Arial, Helvetica, sans-serif;
  --font-mono: var(--font-mono);
}

@theme {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);

  --color-black: var(--color-black);
  --color-white: var(--color-white);
  --color-gray-bg: var(--color-gray-bg);
  --color-gray: var(--color-gray);
  --color-gray-lt: var(--color-gray-lt);

  --animate-marquee: marquee 30s linear infinite;
  --animate-blink: blink 1s step-end infinite;

  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
}

/* Base */
html {
  font-family: var(--font-sans);
  background: var(--color-white);
  color: var(--color-black);
}

body {
  cursor: auto;
  overflow-x: hidden;
}

/* Selection */
::selection {
  background-color: #000;
  color: #fff;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-gray-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--color-black);
}

/* Borders utility */
.border-rule {
  border-color: var(--color-black);
  border-style: solid;
}

/* Section watermark numbers */
.section-number {
  font-size: clamp(60px, 10vw, 120px);
  font-weight: 900;
  color: var(--color-gray-bg);
  line-height: 1;
  letter-spacing: -4px;
  user-select: none;
}

/* Label style used across sections */
.label-text {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--color-gray);
}

/* Blinking cursor for workshop feel */
.cursor-blink::after {
  content: '▌';
  animation: blink 1s step-end infinite;
  color: var(--color-black);
}
```

- [ ] **Step 2: Verify the file is saved correctly**

```bash
head -20 src/app/globals.css
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: replace globals.css with Swiss/Bauhaus design system"
```

---

### Task 3: Root Layout — New Fonts, Remove Old Providers

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite layout.tsx**

Replace the entire file. Key changes:
- Import `Inter` and `JetBrains_Mono` from `next/font/google` (replace Space_Grotesk)
- Remove `NoiseOverlay`, `CustomCursor`, `PerformanceProvider` imports
- Remove Material Symbols font link (use Lucide icons instead)
- Remove `dark` class from html, remove brutalist body classes
- Keep `Navbar`, `Analytics`, metadata

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Roocky | Developer Portfolio",
    template: "%s | Roocky",
  },
  description:
    "Portfolio of Ahmed Ghaithan — creative developer building web, games, and AI tools from Malaysia.",
  metadataBase: new URL("https://roocky.dev"),
  openGraph: {
    title: "Roocky | Developer Portfolio",
    description:
      "Portfolio of Ahmed Ghaithan — creative developer building web, games, and AI tools from Malaysia.",
    url: "https://roocky.dev",
    siteName: "Roockydev Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roocky | Developer Portfolio",
    description:
      "Portfolio of Ahmed Ghaithan — creative developer building web, games, and AI tools from Malaysia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Analytics />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} font-sans antialiased bg-white text-black overflow-x-hidden`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: update root layout — new fonts, remove brutalist providers"
```

---

### Task 4: Animation Utilities

**Files:**
- Create: `src/lib/animations.ts`

- [ ] **Step 1: Create reusable Framer Motion variants**

```ts
import { Variants } from "framer-motion";

// Word-by-word slam entrance (kinetic)
export const wordSlam: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const wordSlamChild: Variants = {
  hidden: {
    y: 80,
    opacity: 0,
    rotateX: -30,
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Letter-by-letter stagger (typographic)
export const letterStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export const letterStaggerChild: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Fade + slide up on scroll (smooth)
export const fadeSlideUp: Variants = {
  hidden: {
    y: 40,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Stagger children container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Border draw animation (width grows from 0)
export const borderDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/animations.ts
git commit -m "feat: add Framer Motion animation variants"
```

---

### Task 5: UI Components — WorkshopStatus, AnimatedText, CountUp

**Files:**
- Create: `src/components/ui/WorkshopStatus.tsx`
- Create: `src/components/ui/AnimatedText.tsx`
- Create: `src/components/ui/CountUp.tsx`

- [ ] **Step 1: Create WorkshopStatus pill component**

This is the blinking status indicator used in the navbar and about strip.

```tsx
// src/components/ui/WorkshopStatus.tsx
'use client';

import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

const STATUS_MAP: Record<string, string> = {
  AVAILABLE: 'AVAILABLE',
  STUDYING: 'STUDYING',
  WORKING: 'BUILDING',
  RESTING: 'OFFLINE',
};

export default function WorkshopStatus({ className = '' }: { className?: string }) {
  const raw = PORTFOLIO_DATA.stat.status;
  const label = STATUS_MAP[raw] ?? raw;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
      </span>
      <span className="text-[10px] font-bold tracking-[4px] uppercase">
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Create AnimatedText component**

Handles both word-by-word slam and letter-by-letter stagger.

```tsx
// src/components/ui/AnimatedText.tsx
'use client';

import { motion } from 'framer-motion';
import {
  wordSlam,
  wordSlamChild,
  letterStagger,
  letterStaggerChild,
} from '@/lib/animations';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  mode?: 'word' | 'letter';
  className?: string;
  once?: boolean;
}

export default function AnimatedText({
  text,
  as: Tag = 'h1',
  mode = 'word',
  className = '',
  once = true,
}: AnimatedTextProps) {
  const MotionTag = motion.create(Tag);

  if (mode === 'word') {
    const words = text.split(' ');
    return (
      <MotionTag
        className={className}
        variants={wordSlam}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordSlamChild}
            className="inline-block mr-[0.25em]"
            style={{ perspective: 400 }}
          >
            {word}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  const letters = text.split('');
  return (
    <MotionTag
      className={className}
      variants={letterStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {letters.map((char, i) => (
        <motion.span key={i} variants={letterStaggerChild} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </MotionTag>
  );
}
```

- [ ] **Step 3: Create CountUp component**

Animates a number from 0 to target on scroll.

```tsx
// src/components/ui/CountUp.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  target,
  suffix = '',
  duration = 1200,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {value}{suffix}
    </span>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/WorkshopStatus.tsx src/components/ui/AnimatedText.tsx src/components/ui/CountUp.tsx
git commit -m "feat: add WorkshopStatus, AnimatedText, and CountUp components"
```

---

### Task 6: Navbar

**Files:**
- Rewrite: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar with Swiss/Bauhaus style**

```tsx
// src/components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WorkshopStatus from '@/components/ui/WorkshopStatus';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-[60px] border-b-[3px] border-black transition-colors duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-[13px] font-black tracking-[4px] uppercase"
        >
          AG — ROOCKY.DEV
        </Link>
        <WorkshopStatus className="hidden md:inline-flex" />
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/work"
          className="text-[10px] font-bold tracking-[3px] uppercase text-gray hover:text-black transition-colors"
        >
          Work
        </Link>
        <a
          href="#about"
          className="text-[10px] font-bold tracking-[3px] uppercase text-gray hover:text-black transition-colors"
        >
          About
        </a>
        <a
          href="#services"
          className="text-[10px] font-bold tracking-[3px] uppercase text-gray hover:text-black transition-colors"
        >
          Services
        </a>
        <a
          href="#contact"
          className="text-[10px] font-bold tracking-[3px] uppercase bg-black text-white px-4 py-2 hover:bg-gray-bg hover:text-black transition-colors border-2 border-black"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: rewrite Navbar — Swiss/Bauhaus style with status pill"
```

---

### Task 7: Hero Section

**Files:**
- Rewrite: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Rewrite Hero with two-column grid, kinetic animations**

```tsx
// src/components/sections/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from '@/components/ui/AnimatedText';
import CountUp from '@/components/ui/CountUp';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { borderDraw } from '@/lib/animations';

export default function Hero() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section className="min-h-screen pt-[60px] grid grid-cols-1 lg:grid-cols-[1fr_380px] border-b-[3px] border-black">
      {/* Left */}
      <div className="flex flex-col justify-between p-8 md:p-12 lg:border-r-[3px] lg:border-black">
        <div className="label-text">Portfolio — No. 04</div>

        <div className="flex-1 flex flex-col justify-center py-12">
          <AnimatedText
            text="CREATIVE DEVELOPER."
            as="h1"
            mode="word"
            className="text-[clamp(48px,10vw,96px)] font-black uppercase leading-[0.88] tracking-[-4px]"
          />

          <motion.div
            className="h-[3px] bg-black my-8 origin-left"
            variants={borderDraw}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-[13px] text-gray leading-[1.8] md:border-r md:border-gray-lt md:pr-8">
              {PORTFOLIO_DATA.hero.description}
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/work"
                className="text-center text-[10px] font-bold tracking-[3px] uppercase bg-black text-white py-[13px] px-6 border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                View Work
              </Link>
              <a
                href="#contact"
                className="text-center text-[10px] font-bold tracking-[3px] uppercase bg-white text-black py-[13px] px-6 border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        <div className="label-text">{personal.email}</div>
      </div>

      {/* Right — Stats */}
      <div className="hidden lg:flex flex-col">
        <div className="flex-1 flex flex-col justify-end p-8 border-b-[3px] border-black">
          <CountUp target={2} suffix="+" className="text-[56px] font-black leading-none tracking-[-2px]" />
          <div className="label-text mt-2">Projects Shipped</div>
          <p className="text-[11px] text-gray mt-2 leading-[1.5]">
            Minecraft mods, web platforms, AI tools
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-end p-8 border-b-[3px] border-black">
          <CountUp target={1} suffix="+" className="text-[56px] font-black leading-none tracking-[-2px]" />
          <div className="label-text mt-2">Year Experience</div>
          <p className="text-[11px] text-gray mt-2 leading-[1.5]">
            Full-stack + game development
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-end p-8 bg-black text-white">
          <span className="text-[56px] font-black leading-none tracking-[-2px]">MY</span>
          <div className="label-text mt-2 !text-[#555]">Malaysia — Available</div>
          <p className="text-[11px] text-[#555] mt-2 leading-[1.5]">
            Remote-friendly, open to collab
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: rewrite Hero — two-column grid with kinetic animations"
```

---

### Task 8: Marquee

**Files:**
- Rewrite: `src/components/sections/Marquee.tsx`

- [ ] **Step 1: Rewrite Marquee as black bar with continuous scroll**

```tsx
// src/components/sections/Marquee.tsx
'use client';

import { motion } from 'framer-motion';
import { fadeSlideUp } from '@/lib/animations';

const ITEMS = [
  'WEB DEVELOPMENT',
  'GAME DEVELOPMENT',
  'AI TOOLS',
  'MINECRAFT MODS',
  'AVAILABLE FOR PROJECTS',
  'MALAYSIA BASED',
  'FULL STACK',
];

export default function Marquee() {
  const content = ITEMS.map((item) => `${item} —`).join(' ');

  return (
    <motion.div
      className="bg-black text-white py-4 overflow-hidden border-b-[3px] border-black"
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex whitespace-nowrap">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="animate-marquee flex-shrink-0 text-[10px] font-bold tracking-[4px] uppercase px-4"
          >
            {content}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Marquee.tsx
git commit -m "feat: rewrite Marquee — black bar with continuous scroll"
```

---

### Task 9: Selected Projects

**Files:**
- Rewrite: `src/components/sections/SelectedProjects.tsx`

- [ ] **Step 1: Rewrite SelectedProjects with bordered card grid**

```tsx
// src/components/sections/SelectedProjects.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/lib/project-data';
import { fadeSlideUp, staggerContainer } from '@/lib/animations';

export default function SelectedProjects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const projects = featured.length > 0 ? featured : PROJECTS.slice(0, 3);

  return (
    <section className="py-16 px-6 md:px-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="section-number">03</div>
          <div className="label-text mt-2">Selected Work</div>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-0"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project, i) => (
          <motion.div key={project.id} variants={fadeSlideUp}>
            <Link
              href={`/work/${project.id}`}
              className="group block border-[3px] border-black hover:bg-gray-bg transition-colors"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-black">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[40px] font-black leading-none tracking-[-2px] text-gray-lt">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="label-text">{project.year}</span>
                </div>
                <h3 className="text-[20px] font-black uppercase tracking-[-0.5px] mt-2">
                  {project.title}
                </h3>
                <div className="mt-2">
                  <span className="text-[9px] font-bold tracking-[3px] uppercase text-gray border border-black px-2 py-1">
                    {project.category}
                  </span>
                </div>
                <div className="mt-4 overflow-hidden h-0 group-hover:h-6 transition-all duration-300">
                  <span className="text-[10px] font-bold tracking-[3px] uppercase border-b-2 border-black">
                    View Project →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Link */}
      <div className="flex justify-end mt-8">
        <Link
          href="/work"
          className="text-[10px] font-bold tracking-[3px] uppercase border-b-[3px] border-black pb-1 hover:text-gray transition-colors"
        >
          View All Projects →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/SelectedProjects.tsx
git commit -m "feat: rewrite SelectedProjects — bordered card grid with numbers"
```

---

### Task 10: About Strip

**Files:**
- Create: `src/components/sections/AboutStrip.tsx`
- Modify: `src/lib/portfolio-data.ts`

- [ ] **Step 1: Add `currentlyWorkingOn` to portfolio data**

In `src/lib/portfolio-data.ts`, change the `stat` object:

```ts
// Old:
stat:{ status : 'WORKING' },

// New:
stat: {
  status: 'WORKING',
  currentlyWorkingOn: 'Redesigning the portfolio — Swiss/Bauhaus style',
},
```

- [ ] **Step 2: Create AboutStrip section**

```tsx
// src/components/sections/AboutStrip.tsx
'use client';

import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { fadeSlideUp } from '@/lib/animations';

export default function AboutStrip() {
  const { personal, stat } = PORTFOLIO_DATA;

  return (
    <motion.section
      id="about"
      className="grid grid-cols-1 md:grid-cols-2 border-y-[3px] border-black"
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Left — Bio */}
      <div className="p-8 md:p-12 md:border-r-[3px] md:border-black">
        <div className="label-text mb-6">About</div>
        <p className="text-[14px] leading-[1.8] text-gray max-w-md">
          {personal.name} — {personal.role}. Based in {personal.location}.
          Building digital experiences — games, web tools, and AI-driven
          applications. Cybersecurity student at UNITEN. Always shipping.
        </p>
      </div>

      {/* Right — Currently */}
      <div className="p-8 md:p-12">
        <div className="label-text mb-6">Currently</div>
        <div className="font-mono text-[14px] leading-[1.8]">
          <span>{stat.currentlyWorkingOn ?? 'Building something new'}</span>
          <span className="cursor-blink" />
        </div>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/portfolio-data.ts src/components/sections/AboutStrip.tsx
git commit -m "feat: add AboutStrip section with live workshop status"
```

---

### Task 11: Services Section (Inline, Not Modal)

**Files:**
- Create: `src/components/sections/Services.tsx`

- [ ] **Step 1: Create inline Services section**

```tsx
// src/components/sections/Services.tsx
'use client';

import { motion } from 'framer-motion';
import { fadeSlideUp, staggerContainer } from '@/lib/animations';

const SERVICES = [
  {
    name: 'Web Design',
    price: '$100',
    unit: '/ site',
    description:
      'Custom websites designed and built from scratch. React/Next.js, CMS, responsive, deployed.',
    cta: 'Start Project',
    available: true,
  },
  {
    name: 'Solutions',
    price: '$50',
    unit: '/ mo',
    description:
      'Hosting, server administration, security, updates, and ongoing maintenance.',
    cta: 'Book Meeting',
    available: true,
  },
  {
    name: 'Game Dev',
    price: '$75',
    unit: '/ hr',
    description:
      'Unity games and Minecraft mod development. Custom mechanics, UI/UX, performance tuning.',
    cta: 'Enquire',
    available: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 px-6 md:px-12">
      {/* Header */}
      <div className="mb-12">
        <div className="section-number">04</div>
        <div className="label-text mt-2">Services & Pricing</div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 border-[3px] border-black"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.name}
            variants={fadeSlideUp}
            className={`p-8 flex flex-col ${
              i < SERVICES.length - 1
                ? 'border-b-[3px] md:border-b-0 md:border-r-[3px] border-black'
                : ''
            } ${!service.available ? 'opacity-50' : ''}`}
          >
            <h3 className="text-[14px] font-black uppercase tracking-[2px] mb-6">
              {service.name}
            </h3>
            <div className="mb-6">
              <span className="text-[40px] font-black leading-none tracking-[-2px]">
                {service.price}
              </span>
              <span className="text-[11px] text-gray ml-1 tracking-[2px] uppercase">
                {service.unit}
              </span>
            </div>
            <p className="text-[12px] text-gray leading-[1.7] flex-1 mb-8">
              {service.description}
            </p>
            {service.available ? (
              <a
                href="mailto:letsbuild@roocky.dev"
                className="block text-center text-[10px] font-bold tracking-[3px] uppercase bg-black text-white py-3 border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                {service.cta} →
              </a>
            ) : (
              <span className="block text-center text-[10px] font-bold tracking-[3px] uppercase text-gray py-3 border-2 border-gray-lt">
                Currently Unavailable
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Services.tsx
git commit -m "feat: add inline Services section — 3-column bordered grid"
```

---

### Task 12: Footer

**Files:**
- Rewrite: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Rewrite Footer with black background, oversized email CTA**

```tsx
// src/components/layout/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { fadeSlideUp } from '@/lib/animations';

export default function Footer() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <motion.footer
      id="contact"
      className="bg-black text-white px-6 md:px-12 py-12 md:py-16"
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-12">
        {/* Left — Email CTA */}
        <div>
          <div className="text-[10px] font-bold tracking-[4px] uppercase text-[#555] mb-4">
            Let&apos;s build something
          </div>
          <a
            href={`mailto:${personal.email}`}
            className="group block"
          >
            <AnimatedText
              text={personal.email.toUpperCase()}
              as="span"
              mode="letter"
              className="text-[clamp(20px,4vw,32px)] font-black tracking-[-1px] border-b-2 border-white group-hover:border-gray transition-colors inline-flex flex-wrap"
            />
          </a>
        </div>

        {/* Right — Links */}
        <div className="flex flex-col gap-2 md:text-right">
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-[3px] uppercase hover:text-[#555] transition-colors"
          >
            GitHub
          </a>
          <a
            href={personal.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-[3px] uppercase hover:text-[#555] transition-colors"
          >
            Instagram
          </a>
          <a
            href={personal.socials.wa}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold tracking-[3px] uppercase hover:text-[#555] transition-colors"
          >
            WhatsApp
          </a>
          <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#555] mt-4">
            © {new Date().getFullYear()} {personal.name}
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: rewrite Footer — black bg, oversized email CTA"
```

---

### Task 13: Contact Modal Restyle

**Files:**
- Rewrite: `src/components/ui/ContactModal.tsx`

- [ ] **Step 1: Restyle ContactModal to black & white aesthetic**

```tsx
// src/components/ui/ContactModal.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { contact } = PORTFOLIO_DATA;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="w-full max-w-md border-[3px] border-black bg-white p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[16px] font-black uppercase tracking-[3px]">
                Get In Touch
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border-2 border-black text-[18px] font-black hover:bg-black hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-0">
              {contact.methods.map((method) => (
                <a
                  key={method.id}
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 border-b-2 border-black hover:bg-gray-bg px-2 -mx-2 transition-colors"
                >
                  <div>
                    <div className="label-text">{method.label}</div>
                    <div className="text-[13px] font-bold mt-1">
                      {method.value}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-[3px] uppercase">
                    →
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ContactModal.tsx
git commit -m "feat: restyle ContactModal — black & white aesthetic"
```

---

### Task 14: Home Page Assembly

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update home page with new section lineup**

```tsx
// src/app/page.tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble new home page — Swiss/Bauhaus sections"
```

---

### Task 15: Work Archive Page

**Files:**
- Rewrite: `src/app/work/page.tsx`

- [ ] **Step 1: Rewrite work archive with Swiss/Bauhaus style**

```tsx
// src/app/work/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/lib/project-data';
import Footer from '@/components/layout/Footer';
import { fadeSlideUp, staggerContainer } from '@/lib/animations';

export default function WorkPage() {
  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <main className="pt-[60px]">
      {/* Header */}
      <div className="px-6 md:px-12 py-12 border-b-[3px] border-black">
        <h1 className="text-[clamp(48px,10vw,96px)] font-black uppercase leading-[0.88] tracking-[-4px]">
          Work
        </h1>
      </div>

      {/* Filters */}
      <div className="sticky top-[60px] z-40 bg-white border-b-[3px] border-black px-6 md:px-12 py-4 flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-[9px] font-bold tracking-[3px] uppercase px-4 py-2 border-2 border-black transition-colors ${
              active === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-bg'
            }`}
          >
            {cat}
            <span className="ml-2 text-gray">
              {cat === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-0"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={active}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeSlideUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <Link
                  href={`/work/${project.id}`}
                  className="group block border-[3px] border-black hover:bg-gray-bg transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-black">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-[40px] font-black leading-none tracking-[-2px] text-gray-lt">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="label-text">{project.year}</span>
                    </div>
                    <h3 className="text-[20px] font-black uppercase tracking-[-0.5px] mt-2">
                      {project.title}
                    </h3>
                    <p className="text-[12px] text-gray leading-[1.7] mt-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] font-bold tracking-[2px] uppercase border border-black px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/work/page.tsx
git commit -m "feat: rewrite work archive — Swiss/Bauhaus filterable grid"
```

---

### Task 16: Project Detail Page

**Files:**
- Rewrite: `src/app/work/[slug]/page.tsx`

- [ ] **Step 1: Rewrite project detail page**

```tsx
// src/app/work/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/lib/project-data';
import Footer from '@/components/layout/Footer';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.id === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) notFound();

  const currentIndex = PROJECTS.findIndex((p) => p.id === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <main className="pt-[60px]">
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 py-4 border-b-[3px] border-black">
        <div className="label-text">
          <Link href="/work" className="hover:text-black transition-colors">Work</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{project.title}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[21/9] border-b-[3px] border-black overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title */}
      <div className="px-6 md:px-12 py-8 border-b-[3px] border-black">
        <h1 className="text-[clamp(36px,8vw,72px)] font-black uppercase leading-[0.9] tracking-[-3px]">
          {project.title}
        </h1>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b-[3px] border-black">
        {[
          { label: 'Role', value: project.role ?? 'Developer' },
          { label: 'Year', value: project.year },
          { label: 'Category', value: project.category },
          { label: 'Stack', value: project.stack?.join(', ') ?? '—' },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`p-6 ${i < 3 ? 'border-r-[3px] border-black' : ''} ${i < 2 ? 'border-b-[3px] md:border-b-0 border-black' : ''}`}
          >
            <div className="label-text mb-2">{item.label}</div>
            <div className="text-[13px] font-bold">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Tags */}
      {project.tags && (
        <div className="px-6 md:px-12 py-6 border-b-[3px] border-black flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold tracking-[2px] uppercase border-2 border-black px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] border-b-[3px] border-black">
        <div className="p-6 md:p-8 md:border-r-[3px] md:border-black md:sticky md:top-[60px] md:self-start">
          <div className="label-text">About</div>
        </div>
        <div className="p-6 md:p-8">
          <p className="text-[14px] leading-[1.8] text-gray max-w-2xl">
            {project.longDescription ?? project.description}
          </p>
        </div>
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 border-b-[3px] border-black">
          {project.gallery.map((img, i) => (
            <div
              key={i}
              className={`relative aspect-[4/3] overflow-hidden ${
                i < project.gallery!.length - 1 ? 'border-b-[3px] md:border-b-0 md:border-r-[3px] border-black' : ''
              }`}
            >
              <Image
                src={img}
                alt={`${project.title} gallery ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* External Link */}
      {project.link && (
        <div className="px-6 md:px-12 py-8 border-b-[3px] border-black">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] font-bold tracking-[3px] uppercase bg-black text-white px-8 py-4 border-2 border-black hover:bg-white hover:text-black transition-colors"
          >
            Visit Project →
          </a>
        </div>
      )}

      {/* Back */}
      <div className="px-6 md:px-12 py-6 border-b-[3px] border-black">
        <Link
          href="/work"
          className="text-[10px] font-bold tracking-[3px] uppercase border-b-2 border-black pb-1 hover:text-gray transition-colors"
        >
          ← All Projects
        </Link>
      </div>

      {/* Next Project */}
      {nextProject && nextProject.id !== project.id && (
        <Link
          href={`/work/${nextProject.id}`}
          className="group block border-b-[3px] border-black hover:bg-gray-bg transition-colors"
        >
          <div className="px-6 md:px-12 py-8 flex items-center justify-between">
            <div>
              <div className="label-text mb-2">Next Project</div>
              <h3 className="text-[24px] font-black uppercase tracking-[-1px]">
                {nextProject.title}
              </h3>
            </div>
            <span className="text-[24px] font-black group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </Link>
      )}

      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/work/[slug]/page.tsx
git commit -m "feat: rewrite project detail page — Swiss/Bauhaus style"
```

---

### Task 17: 404 Page

**Files:**
- Rewrite: `src/app/not-found.tsx`

- [ ] **Step 1: Rewrite 404 page — minimal, on brand**

```tsx
// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <span className="text-[clamp(120px,25vw,240px)] font-black leading-none tracking-[-8px]">
        404
      </span>
      <div className="label-text mt-4">Page Not Found</div>
      <Link
        href="/"
        className="mt-8 text-[10px] font-bold tracking-[3px] uppercase bg-black text-white px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-colors"
      >
        Back to Home →
      </Link>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: rewrite 404 page — Swiss/Bauhaus minimal"
```

---

### Task 18: Final Integration — Build & Verify

**Files:**
- All files from previous tasks

- [ ] **Step 1: Install Inter font if not already available**

Inter is loaded via `next/font/google` in layout.tsx — no npm install needed. Verify it's available:

```bash
grep -r "Inter" src/app/layout.tsx
```

Expected: shows the `Inter` import line.

- [ ] **Step 2: Run build to check for errors**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript or import errors.

- [ ] **Step 3: Fix any build errors**

If errors occur, address them. Common issues:
- Stale imports referencing deleted files — search for old imports and remove them
- TypeScript type mismatches — fix according to error messages

```bash
grep -r "PerformanceContext\|NoiseOverlay\|CustomCursor\|Capabilities\|TechStack\|SimpleFooter\|ServiceMenu\|Status\.ts\|sound\.ts" src/
```

Expected: no matches (all old references cleaned up).

- [ ] **Step 4: Run dev server and verify manually**

```bash
npm run dev
```

Check in browser:
- Homepage loads with all sections in correct order
- Navbar sticky with status pill
- Hero animates in (word slam, count up, border draw)
- Marquee scrolls continuously
- Project cards show with numbers, grayscale→color hover
- About strip shows with blinking cursor
- Services 3-column grid
- Footer black with email CTA
- `/work` page filters work
- `/work/portfolio-v3` detail page renders correctly
- `/nonexistent` shows 404

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Swiss/Bauhaus portfolio redesign"
```
