# 🚀 Creative Spark Portfolio

A modern, immersive developer portfolio built with **Next.js 16**, **React 19**, **Three.js**, and **Framer Motion**. Featuring a sleek dark UI with noise overlays, custom cursors, smooth scrolling, and 3D visual effects.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.182-black?logo=three.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Features

- **Hero Section** — Bold landing with animated roles and a terminal-style aesthetic
- **Marquee Banner** — Scrolling highlights (experience, projects, availability)
- **Capabilities Showcase** — Game Mechanics, Infrastructure, UI/UX with Material Symbols icons
- **Selected Projects Grid** — Filterable project cards with dynamic detail pages (`/work/[slug]`)
- **Tech Stack Display** — Categorized skills (Languages, Game Engines, Infrastructure, Specializations)
- **Custom 404 Page** — Glitch-style "Coordinate Lost" error page
- **3D Effects** — Powered by `@react-three/fiber` and `@react-three/drei` with post-processing
- **Smooth Scrolling** — Lenis-based buttery smooth scroll experience
- **Custom Cursor** — Interactive cursor that responds to hoverable elements
- **Noise Overlay** — Subtle film-grain texture for visual depth
- **Framer Motion Animations** — Page transitions and scroll-triggered animations
- **Sound Effects** — Howler.js integration for UI interactions

## 🛠 Tech Stack

| Category       | Technologies                                              |
|----------------|-----------------------------------------------------------|
| **Framework**  | Next.js 16 (App Router)                                   |
| **UI**         | React 19, Tailwind CSS 4, Framer Motion 12                |
| **3D / WebGL** | Three.js, React Three Fiber, React Three Drei, R3F Postprocessing |
| **Fonts**      | Space Grotesk (display), JetBrains Mono (monospace)       |
| **Audio**      | Howler.js                                                 |
| **Scrolling**  | Lenis                                                     |
| **Utilities**  | clsx, tailwind-merge, uuid, lucide-react, maath           |
| **Language**   | TypeScript 5                                              |

## 📁 Project Structure
```

src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, global UI)
│   ├── page.tsx            # Home page (Hero → Marquee → Capabilities → Projects → Tech → Footer)
│   ├── not-found.tsx       # Custom 404 page
│   ├── globals.css         # Global styles
│   └── work/
│       └── [slug]/         # Dynamic project detail pages
│           └── page.tsx
├── components/
│   ├── layout/             # Navbar, Footer, SimpleFooter
│   ├── sections/           # Hero, Marquee, Capabilities, SelectedProjects, TechStack
│   └── ui/                 # CustomCursor, NoiseOverlay, ServiceMenu
└── lib/ # Color maps, game constants
├── portfolio-data.ts   # Portfolio data models & structured content
├── sound.ts            # Sound utilities
└── types.ts            # TypeScript type definitions
```
## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (ships with Node.js)

### Installation
```
bash
# Clone the repository
git clone <repository-url>
cd Profile

# Install dependencies
npm install
```
### Development
```
bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Production Build
```
bash
npm run build
npm start
```
### Linting
```
bash
npm run lint
```
## 🌐 Routes

| Route              | Description                     |
|--------------------|---------------------------------|
| `/`                | Home — full portfolio experience |
| `/work/[slug]`     | Individual project case study    |
| `/*` (catch-all)   | Custom 404 page                 |

## 📝 Configuration

- **Remote Images** — Unsplash is allowed via `next.config.ts` remote patterns
- **Fonts** — Loaded via `next/font/google` (Space Grotesk + JetBrains Mono)
- **Tailwind** — Configured with PostCSS via `@tailwindcss/postcss`

## 📄 License

This project is private and not licensed for redistribution.
