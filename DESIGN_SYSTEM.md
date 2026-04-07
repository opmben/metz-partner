# DESIGN_SYSTEM.md — Metz & Partner
# The single source of truth for all visual decisions.
# If it is not in here, ask before inventing it.

---

## Design Philosophy

**Industrial-Editorial meets Digital Luxury.**

Dark. High-contrast. Typographically dominant.
The aesthetic sits between *Wallpaper Magazine* and a Berlin tech studio.
Every element should feel intentional — placed, not dropped.

Primary emotion to evoke: **Confident trust.** The visitor should feel:
*"These people know exactly what they are doing."*

---

## Color Tokens

Define these in `globals.css` as `:root` variables.
Map them in `tailwind.config.ts` under `theme.extend.colors`.

```css
:root {
  /* Backgrounds */
  --bg:          #080808;   /* Main page background */
  --surface:     #111111;   /* Cards, panels, elevated elements */
  --surface-2:   #1a1a1a;   /* Hover states, pressed states */

  /* Accents */
  --accent:      #C8FF00;   /* Primary accent — Acid Green */
  --accent-warm: #FF6B35;   /* Secondary accent — Coral */
  --accent-dim:  rgba(200, 255, 0, 0.12);  /* For glow backgrounds */

  /* Text */
  --text:        #F0EDE8;   /* Primary text — warm off-white */
  --muted:       rgba(240, 237, 232, 0.45); /* Secondary text */
  --subtle:      rgba(240, 237, 232, 0.18); /* Decorative text, watermarks */

  /* Borders */
  --border:      rgba(240, 237, 232, 0.07);  /* Default borders */
  --border-hover: rgba(240, 237, 232, 0.14); /* Hovered borders */
  --border-accent: var(--accent);            /* Highlighted borders */
}
```

### Tailwind Mapping (`tailwind.config.ts`)
```typescript
colors: {
  bg:      'var(--bg)',
  surface: 'var(--surface)',
  's2':    'var(--surface-2)',
  accent:  'var(--accent)',
  warm:    'var(--accent-warm)',
  text:    'var(--text)',
  muted:   'var(--muted)',
  subtle:  'var(--subtle)',
  border:  'var(--border)',
}
```

### Color Usage Rules
- `--accent` on dark backgrounds only — never on light
- `--accent` for: CTAs, key word highlights, active states, stat symbols, top-border reveals
- `--accent-warm` for: secondary labels, alternate tag highlights, decorative elements
- Never mix both accents in the same component — pick one per context
- `--text` is not pure white — this is intentional. Pure white feels harsh.

---

## Typography

### Font Loading (`layout.tsx`)
```typescript
import { Instrument_Serif, DM_Sans } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ui',
})
```

Apply both variables to `<html>` tag.

### Type Scale
```
--font-display: var(--font-display), Georgia, serif
--font-ui:      var(--font-ui), system-ui, sans-serif
```

| Name | Font | Size | Weight | Style | Line-height | Letter-spacing |
|------|------|------|--------|-------|-------------|----------------|
| `display-hero` | Display | clamp(3.5rem, 7.5vw, 9rem) | 400 | italic | 0.93 | -0.03em |
| `display-section` | Display | clamp(2rem, 4vw, 4.5rem) | 400 | italic | 1.05 | -0.02em |
| `display-card` | Display | 1.6rem | 400 | italic | 1.2 | -0.01em |
| `display-stat` | Display | 2.8rem | 400 | italic | 1 | 0 |
| `display-manifesto` | Display | clamp(2.5rem, 5vw, 6rem) | 400 | italic | 1.1 | -0.02em |
| `body` | UI | 1rem | 300 | normal | 1.75 | 0 |
| `body-sm` | UI | 0.875rem | 300 | normal | 1.7 | 0 |
| `label` | UI | 0.7rem | 400 | normal | 1 | 0.14em | (uppercase) |
| `nav` | UI | 0.75rem | 400 | normal | 1 | 0.12em | (uppercase) |
| `button` | UI | 0.8rem | 500 | normal | 1 | 0.08em | (uppercase) |

### Typography Rules
- Display font: headlines, section titles, stat numbers, testimonial quotes, manifesto
- UI font: everything else — no exceptions
- Italic is a tool, not a decoration. Use for: display headlines, emphasized words, quotes
- Never bold (700+) in display font — size does the heavy lifting
- Color emphasis: use `--accent` on key words in headlines, not `<strong>` styling
- All-caps (`text-transform: uppercase`) only for: labels, nav links, button text, tags

---

## Animation System

### Framer Motion — Standard Variants

Define these in a shared `lib/animations.ts` file and import where needed.

```typescript
// lib/animations.ts

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
  }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const slideUpClip = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
}

export const staggerContainer = (staggerTime = 0.12) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerTime }
  }
})

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
}

export const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}
```

### ScrollReveal Pattern

```typescript
// components/shared/ScrollReveal.tsx
'use client'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp } from '@/lib/animations'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      variants={shouldReduce ? undefined : fadeUp}
      initial={shouldReduce ? undefined : 'hidden'}
      animate={shouldReduce ? undefined : (isInView ? 'visible' : 'hidden')}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Animation Rules
| Context | Variant | Delay Pattern |
|---------|---------|---------------|
| Page load (nav) | `fadeUp` | 0.2s, 0.4s, 0.6s |
| Hero headline lines | `slideUpClip` | 0.7s, 0.85s, 1.0s |
| Stats strip | `fadeUp` | 1.5s, 1.65s, 1.8s, 1.95s |
| Section content | `fadeUp` via ScrollReveal | 0s, 0.1s, 0.2s staggered |
| Cards in grid | `staggerContainer(0.1)` + `scaleIn` | On scroll into view |
| Service border top | `lineReveal` | On hover (no delay) |
| Number counters | count from 0 on inView | 1.2s duration, ease out |

---

## Component Specifications

### Navigation

```
Height: 80px (transparent) / 72px (scrolled + blurred)
Backdrop on scroll: backdrop-filter: blur(20px); background: rgba(8,8,8,0.85)
Transition: background 0.4s ease
Logo: Instrument Serif, 1.25rem, --text, no weight modification
Links: DM Sans, 0.75rem, uppercase, letter-spacing 0.12em, --muted → --text on hover
CTA: pill button, --accent bg, --bg text, 0.8rem, uppercase, letter-spacing 0.08em
```

### Buttons

**Primary (Pill)**
```css
background: var(--accent);
color: var(--bg);
font-family: var(--font-ui);
font-size: 0.8rem;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.08em;
padding: 0.9rem 2rem;
border-radius: 100px;
border: none;
cursor: pointer;
transition: transform 0.2s ease, box-shadow 0.3s ease;

&:hover {
  transform: scale(1.04) translateY(-2px);
  box-shadow: 0 20px 60px rgba(200, 255, 0, 0.2);
}
```

**Ghost**
```css
background: none;
border: none;
color: var(--muted);
font-family: var(--font-ui);
font-size: 0.8rem;
font-weight: 400;
letter-spacing: 0.06em;
cursor: pointer;
transition: color 0.2s ease;

&:hover { color: var(--text); }
```

Do not create any other button variants without design approval.

### Cards (Project Cards)

```
background: var(--surface)
border: none (the grid gap acts as the separator)
overflow: hidden
cursor: pointer
aspect-ratio: 16/10 (except featured card)

/* Image/background layer */
transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
&:hover image: scale(1.06)

/* Overlay gradient */
background: linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 50%)

/* Info layer */
position: absolute, bottom: 0
padding: 2rem
translateY(8px) at rest → translateY(0) on hover (0.4s ease)

/* Hover pill (center) */
"Ansehen →" pill, --accent bg, --bg text
opacity 0, scale 0.85 → opacity 1, scale 1 on hover (0.3s)
```

### Service Cards

```
background: var(--bg)
border: 1px solid var(--border) — on sides and bottom only
padding: 3rem 2.5rem
position: relative

/* Top accent line */
::before {
  content: ''
  position: absolute, top: 0, left: 0, right: 0
  height: 1px
  background: var(--accent)
  transform: scaleX(0), origin: left
  transition: transform 0.4s ease
}
&:hover::before { transform: scaleX(1) }
&:hover { background: var(--surface) }
```

### Process Rows

```
display: grid
grid-template-columns: 80px 1fr 1fr
gap: 3rem
padding: 2.5rem 0
border-bottom: 1px solid var(--border)

/* Number */
font-family: display, font-style: italic
font-size: 3.5rem
color: rgba(240,237,232,0.08)
transition: color 0.3s
&:hover number: color var(--accent)

/* Step name */
font-family: display, font-style: italic, 1.5rem

/* Step detail */
font-family: ui, 300, 0.875rem, --muted
```

### Form Fields

```
input, textarea, select:
  background: var(--surface)
  border: 1px solid var(--border)
  border-radius: 4px
  color: var(--text)
  font-family: var(--font-ui)
  font-size: 0.95rem
  font-weight: 300
  padding: 0.9rem 1.2rem
  transition: border-color 0.2s
  width: 100%

  &:focus:
    outline: none
    border-color: var(--accent)
    box-shadow: 0 0 0 3px rgba(200,255,0,0.1)

  &::placeholder:
    color: var(--muted)

label:
  font-size: 0.72rem
  font-weight: 400
  text-transform: uppercase
  letter-spacing: 0.1em
  color: var(--muted)
  margin-bottom: 0.4rem
  display: block

error message:
  font-size: 0.75rem
  color: #FF6B6B
  margin-top: 0.3rem
```

### Section Labels

Pattern used above every section title:
```
— Leistungen
```
Small dash + uppercase label.

```
font-size: 0.7rem
font-weight: 400
text-transform: uppercase
letter-spacing: 0.14em
color: var(--muted)
display: flex, align-items: center, gap: 0.75rem

::before {
  content: ''
  display: block
  width: 28px
  height: 1px
  background: var(--muted)
}
```

### Custom Cursor

Two layers. Only on desktop (`pointer` device).

```
Layer 1 — Dot:
  width: 8px, height: 8px
  border-radius: 50%
  background: var(--accent)
  position: fixed
  pointer-events: none
  z-index: 9999
  mix-blend-mode: exclusion
  transform: translate(-50%, -50%)
  transition: transform 0.1s, opacity 0.2s

Layer 2 — Ring:
  width: 32px, height: 32px
  border-radius: 50%
  border: 1px solid rgba(200, 255, 0, 0.35)
  position: fixed
  pointer-events: none
  z-index: 9998
  mix-blend-mode: exclusion
  transition: width 0.35s ease, height 0.35s ease, transform 0.08s linear

On hover over interactive elements:
  Ring: width/height expand to 56px, border-color intensifies
  Dot: opacity 0
```

Use `useCursorPosition` hook with `requestAnimationFrame` — not `mousemove` event directly in state.

---

## Layout System

### Container
```
max-width: 1400px
margin: 0 auto
padding: 0 1.5rem   (mobile)
padding: 0 3rem     (md+)
padding: 0 4rem     (xl+)
```

### Section Spacing
```
padding-top: 5rem      (mobile)
padding-top: 8rem      (md+)
padding-bottom: 5rem   (mobile)
padding-bottom: 8rem   (md+)
```

### Grid Patterns
- Stats strip: `grid-template-columns: repeat(4, 1fr)` — collapses to 2×2 on mobile
- Work grid: `grid-template-columns: 2fr 1fr` — stacks on mobile
- Services: `grid-template-columns: repeat(3, 1fr)` — collapses to 1 on mobile
- Process: `grid-template-columns: 80px 1fr 1fr` — collapses to single column on mobile

### Responsive Breakpoints (Tailwind defaults)
```
sm: 640px   (not commonly used in this project)
md: 768px   (tablet — layout changes)
lg: 1024px  (desktop)
xl: 1280px  (wide desktop)
2xl: 1536px (max — container caps at 1400px anyway)
```

---

## Background Decorative Elements

### Noise Texture
Applied as a pseudo-element on `<body>`:
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/noise.png');   /* or SVG data URI */
  opacity: 0.04;
  pointer-events: none;
  z-index: 999;
}
```
Generate a subtle noise PNG at 200×200px and place in `/public/noise.png`.

### Grid Lines (Hero only)
```css
background-image:
  linear-gradient(rgba(240,237,232,0.025) 1px, transparent 1px),
  linear-gradient(90deg, rgba(240,237,232,0.025) 1px, transparent 1px);
background-size: 80px 80px;
```

### Color Orbs (Hero only)
Three `<div>` elements, `position: absolute`, `border-radius: 50%`, `filter: blur(120px)`.
Animate with Framer Motion `animate` prop, infinite, no `useInView`.

```typescript
const orb1 = {
  animate: {
    x: [0, -60, 40, 0],
    y: [0, 40, -30, 0],
    scale: [1, 1.1, 0.95, 1],
  },
  transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
}
// orb2: 15s, orb3: 18s
```

Colors:
- Orb 1 (top right): `radial-gradient(circle, rgba(200,255,0,0.12), transparent 70%)`
- Orb 2 (bottom left): `radial-gradient(circle, rgba(255,107,53,0.09), transparent 70%)`
- Orb 3 (center): `radial-gradient(circle, rgba(120,80,255,0.07), transparent 70%)`

---

## What This System Prohibits

| Element | Reason |
|---------|--------|
| `box-shadow` for decoration | Flat aesthetic — depth via color only |
| Light/white backgrounds | Dark-only design |
| `border-radius > 8px` on cards | Keeps the industrial edge |
| Purple gradients on white | Cliché |
| Any font other than Instrument Serif + DM Sans | Brand consistency |
| Multiple accent colors in one component | Dilutes accent impact |
| CSS `animation` keyframes for complex motion | Use Framer Motion |
| `transition: all` | Too broad, causes performance issues |
| Carousels / sliders | Editorial grids only |
| Stock photography | Real project work or atmospheric gradients |
