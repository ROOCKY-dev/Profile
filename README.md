# ROOCKY-dev Profile

Personal portfolio website built with Next.js (App Router), React, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- Vercel Analytics

## Features

- Home page with Hero, Marquee, Services, and Selected Projects sections
- Project listing page with category filters (`/work`)
- Dynamic project detail pages (`/work/[slug]`)
- SEO metadata and Open Graph configuration
- Custom 404 page
- Centralized portfolio and project data in `src/lib`

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    work/
      page.tsx
      [slug]/page.tsx
  components/
    layout/
    sections/
    ui/
  lib/
    animations.ts
    portfolio-data.ts
    project-data.ts
    types.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Visit: `http://localhost:3000`

### Build for production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Data Updates

- Edit `src/lib/portfolio-data.ts` for personal info, hero text, services, and contact info.
- Edit `src/lib/project-data.ts` to add or update projects.

## License

Private repository. All rights reserved.
