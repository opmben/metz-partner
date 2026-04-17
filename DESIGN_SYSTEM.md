# DESIGN_SYSTEM.md — Metz & Partner Creative Principles

This document defines the creative direction and design principles for Metz & Partner.

It is intentionally principle-led rather than pixel-prescriptive.

---

## 1. Brand Aesthetic

Metz & Partner should feel like a design-led studio that operates at a genuinely higher level than anything a regional client has seen before.

**Reference points:** ReactBits, Resend, Unseen.co, Oryzo.ai

The visual territory is:
- cinematic
- luminous
- deep
- fluid
- premium without fake luxury
- controlled but alive

The defining material is **glass**.
Not glass as a decorative layer — glass as the primary organizational language.
Every meaningful content surface is a glass panel floating over a living atmospheric background.

The feeling should be: *expensive light passing through deep material.*

---

## 2. The Two-Layer System

The site is built on two distinct visual layers that must be kept in tension at all times:

### Layer 1 — The Atmosphere (background)
A living, fluid, organic animated background.
It provides all the warmth and color in the system.
Palette: **warm spectrum — amber, copper, gold, deep ochre** over near-black.
This is what makes the glass glow.

### Layer 2 — The Glass (foreground)
All content lives in glass panels floating over the atmosphere.
Glass is translucent, luminous, with light-catching edges.
Glass does not have its own strong color — it reflects and refracts the atmosphere beneath.

**The tension between these two layers is the design.**
Never collapse them into one flat surface.
Never let the background overpower the foreground content.

---

## 3. Glass Material Specification

### Luminous Glass — The Primary Surface

Glass panels should feel like they catch light from within.

Key qualities:
- translucent dark base (atmosphere shows through, softened)
- `backdrop-filter: blur(20px–40px)` — the heavier the content, the more blur
- luminous top edge: a bright 1px highlight line at the top of each card/panel
- soft outer glow: a faint warm-white ambient shadow
- border: barely-there white/silver, brightens on hover or focus

The glass should feel **luminous**, not milky.
There is a difference: milky glass is flat and opaque.
Luminous glass appears to have its own inner light.

### Border Radius
- Cards and panels: **16–24px**
- Buttons: **100px pill** (fully rounded) or **14–16px** for contained contexts
- No sharp corners anywhere on the page

### Do not use
- pure opaque dark cards as the primary surface language
- flat matte panels with no depth
- glass that looks like a blurred screenshot instead of a material

---

## 4. Color System

The color system has shifted from accent-color-driven to atmosphere-driven.

### Philosophy
Color comes from the background atmosphere, not from UI tokens.
The glass surfaces are near-neutral — they let the atmosphere breathe through.
CTAs use luminosity and glow, not flat color.

### New Token Direction

```css
/* Base */
--bg:               #0a0a0a;   /* Near black — the void behind everything */
--surface:          rgba(255, 255, 255, 0.05);   /* Glass base */
--surface-2:        rgba(255, 255, 255, 0.08);   /* Glass elevated */
--surface-solid:    #0f0f0f;   /* Solid panels where glass is not used */

/* Glass borders */
--glass-border:        rgba(255, 255, 255, 0.10);
--glass-border-hover:  rgba(255, 255, 255, 0.22);
--glass-highlight:     rgba(255, 255, 255, 0.28);  /* Top-edge catchlight */
--glass-glow:          rgba(255, 255, 255, 0.06);  /* Ambient outer glow */

/* Text */
--text:     #FFFFFF;
--muted:    rgba(255, 255, 255, 0.55);
--subtle:   rgba(255, 255, 255, 0.25);

/* Warm atmosphere palette (for shader/background use) */
--warm-amber:  #D4830A;
--warm-copper: #C67C3B;
--warm-gold:   #B8860B;
--warm-dim:    rgba(184, 134, 11, 0.12);  /* For glow contexts */

/* Legacy */
--accent: #C8FF00;   /* Kept for rare high-contrast moments only — not primary */
```

### Token Rules
- `--text` is pure white — appropriate only on dark glass
- Glass token values should be treated as starting points, not locked values
- The warm palette tokens are for the background shader — not for foreground UI
- `--accent` (#C8FF00) should be used sparingly if at all — the new system is luminosity-first

### CTA / Button Color
Primary buttons use **Luminous Glass with Glow**, not a flat color fill.

```css
/* Primary button */
background: rgba(255, 255, 255, 0.08);
border: 1px solid rgba(255, 255, 255, 0.20);
box-shadow:
  0 0 40px rgba(255, 255, 255, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.18);

&:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow:
    0 0 60px rgba(255, 255, 255, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}
```

---

## 5. Typography

### Current System
- **Display:** Instrument Serif — loaded via `next/font/google`, variable `--font-display`
- **UI:** DM Sans — loaded via `next/font/google`, variable `--font-ui`

### Font Principles
The tension between Instrument Serif (editorial, warm, italic) and DM Sans (clean, geometric, neutral) is a strong pairing. Keep it unless a clearly better direction emerges.

For the warm glass aesthetic:
- Instrument Serif Italic is perfect for cinematic display moments against warm atmospheric backgrounds
- DM Sans provides clean legibility for UI elements on glass surfaces

**Future consideration:** Geist (Vercel's font) is a strong UI upgrade candidate — cleaner and more product-grade than DM Sans. Worth evaluating when the site is in a stable state.

### Type Scale (current — from globals.css)

| Class | Size | Line-height | Letter-spacing |
|-------|------|-------------|----------------|
| `.display-hero` | clamp(3.5rem, 7.5vw, 9rem) | 0.93 | -0.03em |
| `.display-section` | clamp(2rem, 4vw, 4.5rem) | 1.1 | -0.02em |
| `.display-manifesto` | clamp(2rem, 4vw, 4rem) | 1.2 | -0.02em |
| `.display-card` | 1.35rem | 1.2 | -0.01em |

All display classes: `font-family: var(--font-display)`, `font-weight: 400`, `font-style: italic`

Body: `font-family: var(--font-ui)`, `font-weight: 300`, `line-height: 1.75`

Labels: `0.7rem`, `font-weight: 400`, `text-transform: uppercase`, `letter-spacing: 0.14em`

### Typography Rules on Glass
- White text on glass: use `--text` (#FFFFFF) for headlines, `--muted` for secondary
- Avoid semi-transparent text on very blurred glass — it reads as muddy
- Display-size headings can bleed outside the glass panel onto the background for dramatic effect

---

## 6. Composition Principles

### Card-First, Surface-Led

All meaningful content should live inside intentional glass containers.
The background atmosphere is not a surface for content — it is the environment.

**Default composition model:**
1. Background atmosphere (animated, full-page)
2. Glass panels floating above it
3. Content organized within the panels

### Section Rhythm
Each major section has its own atmospheric moment.
Not every section uses the same background state.
Different shader configurations, different warmth levels, different densities create rhythm.

Section transitions use the **glass panels themselves as the visual separator**.
No hard dividers. No explicit `<hr>` lines. The panels frame the content and white space separates the sections.

### Asymmetry and Tension
Layouts should feel deliberate but not mathematically tidy.
- Not every card is the same size
- Not every row is evenly divided
- Featured content earns more visual space
- Grid rhythm over grid symmetry

### Mobile
Mobile-first is a hard requirement.
Glass effects, blur, and animation must be tested on real devices — not just devtools.
Reduce blur radius on mobile (performance), but preserve the glass material feeling.
Mobile layouts should feel like a **different composition**, not a collapsed desktop.

---

## 7. Animation System

### Philosophy
Strong but controlled.
Each section earns one strong animation moment.
Not everything moves at once — motion has hierarchy.

### Primary Pattern: Pin & Scrub
Pin sections with GSAP ScrollTrigger.
Elements animate based on scroll progress (scrub).
This creates the cinematic feeling of the page as a film sequence.

Use Framer Motion for:
- entrance animations (fade, slide, clip)
- hover states
- micro-interactions
- page-level stagger reveals

Use GSAP for:
- scroll-triggered scrub animations
- complex timeline sequences
- pinned sections with progress-based animation

### Scroll Animation Principles
- Parallax depth: glass panels at different scroll speeds creates 3D separation from background
- Progressive reveal: content emerges as you scroll, not all at once
- Clip-path reveals: elements emerge from behind a clip boundary
- Entrance easing: `[0.16, 1, 0.3, 1]` (expo out) for all entrances
- Entrance duration: 0.85s standard

### Reduced Motion
Every animation must check `useReducedMotion()` and fall back to a static state.
This is not optional.

---

## 8. Portfolio Presentation

Screenshots are evidence, not decoration.

### Browser Frame Mockups
Real project work should be presented inside a **stylized browser frame**.
The frame itself is a glass panel with:
- a minimal browser chrome (dots, URL bar as glass element)
- rounded corners (16–20px)
- inner glow at the top edge
- the screenshot inside, full-bleed within the frame

This creates immediate context (this is a website), adds depth (frame within frame), and makes even one screenshot feel premium and intentional.

**Do not:**
- use raw screenshots floating without context
- use generic laptop/device mockup images from stock
- shrink screenshots to thumbnail size where the work isn't visible

---

## 9. Navigation

### Pill Nav — Glassmorphism Upgrade
Keep the existing pill-shrink-on-scroll concept.
Upgrade the material to match the new glass system:

**Unscrolled:** Fully transparent, no background.
Hero atmosphere visible behind nav items.
Logo and links float directly over the atmosphere.

**Scrolled:** Glass pill with:
- `background: rgba(255, 255, 255, 0.06)`
- `backdrop-filter: blur(20px)`
- `border: 1px solid rgba(255, 255, 255, 0.12)`
- subtle luminous top edge
- `max-width: 896px`, centered, with padding-top

The nav should feel like it **belongs** to the glass system, not like a separate UI element.

---

## 10. Footer

The footer is a strong visual close — not a dead administrative list.

**Approach:** Full glassmorphism treatment. Final atmospheric moment.
Large display headline. Clear last CTA. Clean legal links.
The footer should make the visitor feel like they just finished watching something great and have one clear action left.

---

## 11. Explicit No-Gos

### Critical
- flat, non-glass cards used as the primary surface language
- Acid Green (#C8FF00) used as the dominant visual identity color
- custom cursor (removed — adds gimmick energy without enough payoff)
- stock imagery
- fake proof, invented stats, made-up testimonials
- too much text / not enough visual evidence of real work
- generic SaaS feature grids
- agency bullshit copy
- sharp corners on cards or panels
- placeholder gradients used as fake portfolio entries

### Strong Avoid
- glass effects that look like blurred screenshots instead of a material
- backgrounds that overpower foreground content (the glass must always win)
- warm palette colors used in foreground UI (they belong to the atmosphere)
- motion everywhere with no hierarchy (hierarchy in movement, not saturation)
- mobile layouts that are only compressed desktop
- hard section transitions (the glass panels create natural rhythm)
- browser mockup without real work inside

### Contextual Avoid
- too many blur layers on mobile (performance)
- excessive pin & scrub animations that feel like scroll-jail
- glass panels with so much opacity they cease to be glass
- warm tones so saturated they feel orange-heavy rather than luxurious

---

## 12. Freedom Clause

These principles are binding.
Specific layouts are not.

A new direction is valid if it:
- keeps the two-layer system (atmosphere + glass)
- respects verified business truth
- increases distinctiveness
- improves visual proof
- keeps the offer commercially readable
- feels more like Metz & Partner at a higher level, not a safer one

---

## 13. Implementation Appendix

**Source of truth for implementation values.**
Principles take precedence if they conflict with specific values.

### CSS Variables (to be updated in `app/globals.css`)

```css
/* Base */
--bg:            #0a0a0a;
--surface-solid: #0f0f0f;

/* Glass surfaces */
--glass:          rgba(255, 255, 255, 0.05);
--glass-2:        rgba(255, 255, 255, 0.08);
--glass-border:   rgba(255, 255, 255, 0.10);
--glass-border-hover: rgba(255, 255, 255, 0.22);
--glass-highlight: rgba(255, 255, 255, 0.28);
--glass-glow:     rgba(255, 255, 255, 0.06);

/* Text */
--text:    #FFFFFF;
--muted:   rgba(255, 255, 255, 0.55);
--subtle:  rgba(255, 255, 255, 0.25);
--border:  rgba(255, 255, 255, 0.10);
--border-hover: rgba(255, 255, 255, 0.22);

/* Warm atmosphere (background / shader use only) */
--warm-amber:  #D4830A;
--warm-copper: #C67C3B;
--warm-gold:   #B8860B;
--warm-dim:    rgba(184, 134, 11, 0.12);

/* Legacy accent — use sparingly */
--accent: #C8FF00;
```

### Font Variables

```
--font-display: Instrument Serif (injected by next/font as --font-display)
--font-ui:      DM Sans (injected by next/font as --font-ui)
```

Tailwind aliases: `font-display`, `font-ui`

### Container (`.container-site`)

```
max-width: 1400px, margin: auto
padding: 1.5rem (mobile) / 3rem (md+) / 4rem (lg+)
```

### Framer Motion Standards

```typescript
ease: [0.16, 1, 0.3, 1]   // expo out — all entrances
entrance duration: 0.85s
hover: 0.2–0.3s
useInView: { once: true, margin: '-80px' }
staggerChildren: 0.10–0.12
// Always: check useReducedMotion() and skip if true
```

### Glass Mixin (reference pattern)

```css
/* Luminous glass panel */
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(24px);
-webkit-backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.10);
border-radius: 20px;
box-shadow:
  0 0 0 1px rgba(255, 255, 255, 0.05),
  0 8px 32px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.15);  /* top-edge highlight */
```

### Hero Background

Hero uses **ColorBends** (`components/shared/ColorBendsBackground.tsx`).
Colors should be updated to warm spectrum: amber, copper, gold tones over near-black.
Do not replace with CSS orbs or static gradients.

### Navigation

Sticky pill nav: transparent at load → glass pill after 80px scroll.
`marginTop: -72px` on Hero section so atmosphere fills behind the transparent nav.
Height: 72px → 56px on scroll.
