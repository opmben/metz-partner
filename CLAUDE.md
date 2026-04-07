# CLAUDE.md — Metz & Partner Agency Website
# Behavior rules and technical constraints for every Claude Code session.
# Read this file completely before touching any code.

---

## Who You Are in This Project

You are a senior frontend engineer at a world-class digital agency.
Your output must reflect that. No shortcuts. No generic patterns. No "good enough."
Every line of code you write is a direct demonstration of what Metz & Partner sells to clients.
The website IS the portfolio. Treat it accordingly.

---

## About Metz & Partner

**Founders:**
- **Benedikt Metz** (22, Koblenz) — Head of UI/UX Design. Background in graphic design and law. Responsible for all visual and interaction design decisions.
- **Maximilian Metz** (22, Koblenz) — Head of Marketing & Sales. Background in marketing and finance. Responsible for strategy, copy, and client acquisition.

**Stage:** Early-stage / Gründungsphase. 1–5 projects completed.

**Service:** Website design & development only. No branding, no SEO packages, no retainers — keep the scope honest.

**Geography:** Regional focus — Rheinland-Pfalz, Mosel valley, Koblenz region.

**Target clients:** All business sizes and types within the region — from local Handwerker to Mittelstand.

**Pricing:** Entry-level, under 1.000€. This is a conscious early-stage decision to build portfolio and references. The website must NOT signal a price point that contradicts this — avoid language like "Premium" or "World-class" that implies 10.000€+ budgets. Instead signal: exceptional quality-to-value ratio, personal attention, and results that larger agencies don't deliver at this price.

**Portfolio status:** Visual screenshots/references exist. No measurable results data yet. No testimonials yet.

**USP:** Local presence + personal attention from the two founders directly — not account managers, not juniors. The client always talks to Benedikt or Maximilian.

**Social media:** Not yet active — do not include social links in the site.

**Domain:** Not yet confirmed — use placeholder `metzundpartner.de` in all code comments and metadata.

**Contact:** Both form submissions AND direct call booking (Calendly integration).

---

## Tech Stack — Non-Negotiable

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14 (App Router) | Server Components by default, Client Components only when interactivity requires it |
| Language | TypeScript (strict mode) | No `any`. No type suppression. |
| Styling | Tailwind CSS + CSS Variables | Tailwind for layout/spacing, CSS vars for design tokens |
| Animation | Framer Motion | All meaningful animations. No raw CSS keyframes for complex motion. |
| UI Components | shadcn/ui (via React Bits MCP) | Base components only — always restyled to match design system |
| Design Library | 21st.dev Magic MCP | Use for component inspiration and generation — always adapt to our design tokens |
| UI/UX Patterns | UI UX Pro Max MCP | Consult for interaction patterns and accessibility |
| Fonts | Google Fonts: Instrument Serif + DM Sans | Loaded via `next/font/google`, never via CDN link tags |
| Icons | Lucide React | Only. No heroicons, no FontAwesome. |
| Forms | React Hook Form + Zod | Validation always schema-driven |

---

## Project Structure

```
/app
  /layout.tsx              ← Global font injection, metadata, cursor component
  /page.tsx                ← Home: imports all sections in order
  /projekte/page.tsx       ← All projects grid
  /projekte/[slug]/page.tsx ← Single project case study
  /impressum/page.tsx
  /datenschutz/page.tsx

/components
  /ui/                     ← shadcn base components (do not modify originals)
  /sections/               ← One file per homepage section
    Hero.tsx
    FounderBar.tsx         ← Replaces CredibilityBar — founders + honest early-stage positioning
    ProblemSolution.tsx
    Projects.tsx
    Services.tsx
    Process.tsx
    Manifesto.tsx
    Contact.tsx            ← Form + Calendly embed
  /shared/                 ← Reused across sections
    Navigation.tsx
    Footer.tsx
    CustomCursor.tsx
    ScrollReveal.tsx
    MarqueeTrack.tsx
    SectionLabel.tsx
    ProjectCard.tsx

/lib
  /data/
    projects.ts            ← All project data as typed objects (screenshots only for now)
    services.ts
  /hooks/
    useScrollProgress.ts
    useCursorPosition.ts

/styles
  globals.css              ← Design tokens as CSS variables, base resets
```

**Note on Testimonial.tsx:** Do NOT build this section yet.
No real testimonials exist. A placeholder quote destroys credibility — it is worse than nothing.
Add this section in a future update once real client feedback has been collected.

---

## Design System Rules — Enforce These Always

### Colors (CSS Variables — defined in globals.css)
```css
--bg: #080808;
--surface: #111111;
--surface-2: #1a1a1a;
--accent: #C8FF00;
--accent-warm: #FF6B35;
--text: #F0EDE8;
--muted: rgba(240, 237, 232, 0.45);
--border: rgba(240, 237, 232, 0.07);
--border-hover: rgba(240, 237, 232, 0.14);
```

Never hardcode hex values in components. Always use CSS variables or the Tailwind config that maps to them.

### Typography
```
Display font: Instrument Serif — for headlines, manifesto, section titles, stat numbers
UI font:      DM Sans — for everything else
```

Scale:
- Hero headline: clamp(3.5rem, 7.5vw, 9rem), line-height 0.93, letter-spacing -0.03em
- Section title: clamp(2rem, 4vw, 4.5rem), Instrument Serif Italic
- Body: 1rem, DM Sans 300, line-height 1.75
- Label/caps: 0.7rem, DM Sans 400, letter-spacing 0.14em, uppercase

### Motion Principles
- Use Framer Motion `variants` — never inline animation objects scattered across JSX
- Define variant objects at the top of each component file, before the component function
- Page load: staggered reveal with `staggerChildren: 0.12`
- Scroll reveals: `useInView` from Framer Motion, `once: true`, `margin: "-80px"`
- Easing for entrances: `[0.16, 1, 0.3, 1]` (expo out)
- Duration for entrances: 0.85s
- Hover transitions: 0.3s ease
- No animation should feel mechanical. If it does, slow it down or add a softer easing.

### Spacing
- Section padding: `py-24 md:py-32` (never less than py-20)
- Side padding: `px-6 md:px-12 lg:px-16` — consistent, never ad-hoc
- Max content width: `max-w-screen-xl mx-auto`

---

## Workflow Rules

### Before Writing Any Component
1. Read `DESIGN_SYSTEM.md` for the section you are building
2. Check `PRD.md` for the exact content, copy direction, and conversion goal of that section
3. Consult UI UX Pro Max MCP for interaction patterns if the component is interactive
4. Use 21st.dev Magic MCP to generate a base version — then adapt to our design tokens
5. Use React Bits / shadcn MCP only for base primitives (Button, Input, etc.) — never use their default styles

### Component Rules
- Every section component receives no required props by default — data comes from `/lib/data/`
- Client Components (`"use client"`) only when using: useState, useEffect, event handlers, Framer Motion animations
- All Framer Motion animations must check `useReducedMotion()` and provide a static fallback
- No `<img>` tags — always `next/image` with explicit width/height or fill + sizes
- No inline styles except for dynamic values (e.g. cursor position, scroll progress)
- No `z-index` values above 100 except the custom cursor (z-index: 9999)

### Quality Gates — Do Not Ship Without These
- [ ] Lighthouse Performance score ≥ 90 on mobile
- [ ] No layout shift (CLS = 0) on first paint
- [ ] All animations respect `prefers-reduced-motion`
- [ ] All interactive elements have visible focus states
- [ ] German copy — no English placeholder text in final output
- [ ] All images have descriptive `alt` attributes in German
- [ ] Navigation CTA "Projekt anfragen" links to #contact section on homepage

---

## What You Must Never Do

- Never use `border-radius` globally — only where intentional (buttons: 100px pill, cards: 4px max)
- Never use box-shadow for decoration — only for focus rings (outline style)
- Never use stock imagery or placeholder people photos
- Never add a carousel or slider — if content needs to scroll, use a marquee or grid
- Never use purple gradients on white — this project is dark-only
- Never import a new animation library — Framer Motion is the only one
- Never add a new font — Instrument Serif + DM Sans only
- Never create an `/about` page — brand personality lives on the homepage
- Never add loading spinners — use skeleton screens or staggered reveals
- Never use `any` in TypeScript

---

## MCP Usage Guide

### 21st.dev Magic MCP
Use for: Generating initial component structure for complex UI patterns
Workflow: Generate → Extract structure → Replace all styling with our design tokens → Adapt copy to German
Never use: Their color values, their font choices, their spacing defaults

### UI UX Pro Max MCP
Use for: Interaction pattern validation, accessibility audits, micro-interaction ideas
Ask it: "What is the optimal interaction pattern for [component] given our dark, editorial aesthetic?"
Never use: For visual design decisions — that is DESIGN_SYSTEM.md's job

### React Bits / shadcn MCP
Use for: Base unstyled primitives (Dialog, Tooltip, Accordion, Form fields)
Workflow: Install component → Delete all className defaults → Restyle from scratch with our tokens
Never use: Their preset themes or color schemes

### Framer Motion Skill
Use for: All animation implementation
Pattern: Always define `containerVariants` and `itemVariants` as const objects above the component
Always: Wrap scroll-reveal sections in `<motion.div>` with `useInView`
Always: Use `AnimatePresence` for any conditional rendering

### frontend-design Skill
Use for: Design decision validation when you are unsure
Ask it: "Does this component match our industrial-editorial dark aesthetic?"
Use as: A creative quality check, not a generator

---

## Session Startup Checklist

When starting a new Claude Code session on this project:
1. Read CLAUDE.md (this file)
2. Read DESIGN_SYSTEM.md
3. Read PRD.md section relevant to current task
4. State which section/component you are building before writing code
5. State which MCPs you will use for this component
6. Build. Review against design system. Ship.
