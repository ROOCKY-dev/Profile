# Portfolio Redesign — Swiss/Bauhaus "Workshop Running 24/7"

## Overview

Complete visual redesign of Ahmed Ghaithan's portfolio site. Moving from the current dark brutalist aesthetic (lime green on black, glitch effects, noise textures) to a Swiss/Bauhaus style — black and white only, grid-based, heavy typography, thick ruled borders. The site should feel like a workshop that never stops running: kinetic, typographic, and smooth animations layered throughout.

## Visual Identity

### Color Palette
| Token     | Value     | Usage                            |
|-----------|-----------|----------------------------------|
| `black`   | `#000000` | Headings, borders, primary fills |
| `white`   | `#FFFFFF` | Page background, inverse text    |
| `gray-bg` | `#F0F0F0` | Secondary background surfaces    |
| `gray`    | `#888888` | Body text, secondary labels      |
| `gray-lt` | `#CCCCCC` | Subtle dividers, muted text      |

No accent color. Contrast and structure carry the design.

### Typography
- **Headings:** Arial/Helvetica or Inter — weight 900, uppercase, tight letter-spacing (-3px to -5px on large sizes)
- **Body:** Same family — weight 400–500, normal case, generous line-height (1.6–1.8)
- **Labels/Tags:** weight 700, uppercase, wide letter-spacing (3–5px), size 9–11px
- **Mono (optional):** JetBrains Mono for code snippets or status text only

### Layout Rules
- Thick black borders (2–3px) as section dividers — no shadows, no rounded corners, no gradients
- Strict grid alignment — columns separated by ruled borders
- Generous whitespace inside bordered sections
- Section numbers (01, 02, 03…) as large muted watermarks

### Animation System

Three animation layers, all using Framer Motion:

1. **Kinetic (entrances):** Hero heading slams in word-by-word. Numbers count up on scroll. Borders draw themselves (width animates from 0).
2. **Typographic (character-level):** Section titles stagger in letter-by-letter. Marquee text uses split-character animation on load.
3. **Smooth (scroll-triggered):** Cards and content blocks fade + slide up on viewport entry. Page transitions via Framer Motion layout animations.
4. **Continuous (always running):** Marquee always scrolling. Status indicator pulses/blinks. Subtle hover state transitions on interactive elements.

Performance: Keep Lenis smooth scroll. Drop Three.js/R3F (not needed). No noise overlay.

## Pages

### Home Page (`/`)

#### 1. Navbar (sticky)
- Left: Logo text "AG — ROOCKY.DEV" (weight 900, uppercase)
- Right: Links — Work, About, Services, Contact
- Contact link is inverted (black bg, white text)
- Status pill next to logo or in nav: "BUILDING" / "AVAILABLE" / "STUDYING" with blinking dot
- Thick bottom border (3px black)
- On scroll: slight background blur or solid white fill

#### 2. Hero (full viewport)
- Two-column grid: large left content area + right stats panel, separated by thick vertical border
- Left side:
  - Small top label: "PORTFOLIO — NO. 04"
  - Giant heading (96px+): "CREATIVE / DEV / ELOPER." — animates in word by word with kinetic slam
  - Horizontal ruled line (3px)
  - Below rule: two columns — short description on left, two CTA buttons stacked on right ("VIEW WORK" solid black, "CONTACT ME" outlined)
  - Email in muted text at bottom
- Right side:
  - Three stacked stat blocks divided by thick horizontal borders
  - Each block: large number (56px, weight 900), uppercase label, one-line description
  - Bottom stat block inverted (black bg, white text) for visual punch
- Entry animation: heading words slam in sequentially, stats count up, border draws itself left to right

#### 3. Marquee
- Full-width black bar
- White uppercase text scrolling continuously
- Content: "WEB DEVELOPMENT — GAME DEVELOPMENT — AI TOOLS — MINECRAFT MODS — AVAILABLE FOR PROJECTS — MALAYSIA BASED"
- Text staggers in on first viewport entry

#### 4. Selected Projects
- Section header: large muted "03" number watermark + "SELECTED WORK" label
- Grid of project cards (2 columns on desktop, 1 on mobile)
- Each card:
  - Thick border on all sides
  - Top: project image/placeholder (grayscale by default, full color on hover)
  - Bottom: bold number (01, 02), project title (weight 900, uppercase), category tag, year
  - Hover: image color shift, slight scale, "VIEW PROJECT →" text slides in
- "VIEW ALL PROJECTS →" link below grid, right-aligned, underlined with thick border-bottom
- Cards fade + slide up on scroll

#### 5. About Strip
- Two-column layout with thick vertical border divider
- Left column: "ABOUT" section label + 2–3 sentence bio in body text
- Right column: "CURRENTLY" header + live status block
  - Shows what Ahmed is currently working on
  - Blinking cursor at end of text (workshop feel)
  - Pulls from `PORTFOLIO_DATA.stat.status`
- Subtle slide-in animation on scroll

#### 6. Services
- Section header: large muted "04" watermark + "SERVICES & PRICING" label
- Three-column grid, thick black borders between columns
- Each column: service name (weight 900), large price number, short description, "GET STARTED →" link
- Same data as current ServiceMenu but displayed inline, not as a modal

#### 7. Footer
- Full-width black background
- Left: "LET'S BUILD SOMETHING" small label above oversized email address (weight 900, 28px+, white, underlined)
- Right: social links stacked (GitHub, Instagram, WhatsApp), copyright at bottom
- Email hover: letters shift/stagger (typographic animation)

### Work Page (`/work`)

- Page header: giant "WORK" title, full-width, thick bottom border
- Filter row: category buttons (same as current but restyled — black/white, bordered)
- Project grid: same card style as homepage but full-width listing
- Each card: bordered, number-labeled, grayscale → color on hover
- Staggered fade-in animation on filter change

### Project Detail Page (`/work/[slug]`)

- Breadcrumb nav at top
- Hero: full-width project image, bordered
- Metadata grid below: Role, Timeline, Category, Stack — in bordered columns
- Content section: two columns — sticky "ABOUT" label left, prose right
- Technology list as bordered inline tags
- Gallery: 3-column image grid, bordered
- External link CTA: solid black button
- Next project teaser at bottom

### 404 Page

- Centered "404" in massive type (200px+)
- "PAGE NOT FOUND" below in label style
- "BACK TO HOME →" link
- Minimal, on brand

## Data Architecture

No changes to data structure. Reuse existing:
- `portfolio-data.ts` — personal info, capabilities, tech stack, status
- `project-data.ts` — project entries

Minor additions:
- Add a `currentlyWorkingOn` field to `PORTFOLIO_DATA.stat` for the About strip's live status text

## Components to Create/Modify

### Delete (no longer needed)
- `CustomCursor.tsx` — no custom cursor in this design
- `NoiseOverlay.tsx` — no film grain
- `Status.ts` — ASCII art monitor, replaced by simple status pill

### Modify heavily (essentially rewrite)
- `Navbar.tsx` — new layout, status pill, thick border style
- `Hero.tsx` — completely new two-column grid layout with kinetic animations
- `Marquee.tsx` — restyle to black bar, add letter stagger
- `SelectedProjects.tsx` — new bordered card grid with number labels
- `Footer.tsx` — new black background email CTA layout
- `ServiceMenu.tsx` — convert from modal overlay to inline section
- `globals.css` — replace entire color system, remove all brutalist styles, new animation keyframes

### Create new
- `AboutStrip.tsx` — two-column about section with live status
- `WorkshopStatus.tsx` — small status pill component (blinking dot + text) used in nav and about strip
- Animation utilities — reusable Framer Motion variants for slam-in, letter stagger, fade-slide, count-up

### Keep (restyle only)
- `ContactModal.tsx` — restyle to match B&W aesthetic
- Work page (`/work/page.tsx`) — same logic, new visual treatment
- Project detail page (`/work/[slug]/page.tsx`) — same structure, new styles

## Performance

- Remove Three.js, React Three Fiber, @react-three/drei, @react-three/postprocessing, maath from dependencies
- Remove PerformanceContext — not needed without heavy 3D
- Keep Framer Motion and Lenis
- Target: Lighthouse performance 95+, no layout shift from animations

## Responsive Behavior

- Mobile: single column everywhere, hero stats stack below heading, services stack vertically
- Tablet: 2-column project grid, hero keeps 2-column layout at reduced type sizes
- Desktop: full grid layouts as described above
- Breakpoints: 640px (mobile), 1024px (tablet), 1280px (desktop)

## SEO & Metadata

- Keep existing Next.js Metadata API setup
- Update Open Graph images to match new black/white aesthetic
- Keep sitemap.ts and robots.ts as-is
