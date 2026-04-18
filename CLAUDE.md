# CLAUDE.md — Metz & Partner Implementation Guardrails

This document defines how Claude Code should operate in this repository.

It is not a product brief and not a design screenplay.

---

## 1. Purpose of This File

Claude should work with high ambition, strong taste, and commercial awareness.

The goal is to produce work that feels:
- distinctive
- image-led
- premium
- strategically sharp
- visually convincing
- honest

Claude should be strongly guided, but not boxed into safe, generic, or pre-scripted solutions.

Premium here means precision, clarity, judgment, and control.
It does not mean ornamental excess, empty luxury language, or artificial exclusivity.

---

## 2. Source-of-Truth Hierarchy

Use the documents in this order:

1. `PRD.md`
   - verified business truth
   - audience context
   - website goals
   - honesty constraints

2. `DESIGN_SYSTEM.md`
   - visual principles
   - composition direction
   - motion, imagery, and aesthetic expectations
   - explicit no-gos

3. `CLAUDE.md`
   - implementation guardrails
   - technical rules
   - review standards

If these files appear to conflict:
- preserve verified truth from `PRD.md`
- preserve the broader creative principles from `DESIGN_SYSTEM.md`
- do not reintroduce rigid section scripts or fixed UI recipes

---

## 3. Hard Constraints Only

Only these categories should be treated as truly hard constraints:

### Current technical baseline
Core baseline:
- Next.js 16+ (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS
- Framer Motion (preferred for all animation)
- React Hook Form + Zod
- Lenis (smooth scroll)
- Resend (contact form backend — `/api/contact` route exists)

Extended — present in repo, use when justified:
- GSAP + @gsap/react (acceptable for complex scroll-trigger / Pin & Scrub sequences; Framer Motion preferred otherwise)
- Three.js + React Three Fiber (in use for hero background via ColorBends shader)
- Radix UI primitives (accordion, etc.)

Treat the repository itself as the source of truth if this baseline drifts.

This baseline is descriptive, not a creative or architectural cage.

The stack may evolve when stronger creative, interaction, or implementation outcomes justify it.

### Truth and integrity
- No fake testimonials
- No fake results
- No fake client scale
- No fake trust markers
- No invented maturity signals

### Repository / implementation integrity
- Prefer TypeScript
- Avoid `any`
- Keep code maintainable and production-grade
- Read relevant files before changing them
- Respect existing repo conventions where they still make sense

### Real product constraints
- Contact paths must remain real
- Any public claims must remain supportable
- Visual ambition must not come at the cost of obvious dishonesty

---

## 4. Creative Expectations

Claude is expected to:
- choose stronger solutions over safer generic ones
- prioritize quality over low-effort standard output
- avoid templated SaaS aesthetics
- avoid library-default UI unless significantly transformed
- favor visual proof over explanatory bulk text
- propose better structure when the current structure is weak
- think like a top-tier brand and conversion designer, not just a component assembler
- preserve business readability even when the work becomes visually ambitious
- default to glass surfaces and contained panel composition as the primary organizational language
- use cards, panels, browser frames, and glass surfaces to frame and elevate content
- prefer a clear homepage narrative hierarchy over a collection of equally weighted sections
- default to the flow: relevance → proof → differentiation → offer → risk reduction → conversion

Claude may:
- invent new section structures
- replace generic homepage patterns
- use stronger visual hierarchy
- make the site feel more valuable and more ambitious than previous documentation allowed
- use glass, depth, motion, layered composition, and selective spatial effects where they improve the result
- treat the existing implementation as context, not authority
- improve, replace, or discard inherited structure when it weakens the result

---

## 5. Content Rules

### Language
- German is the default website language
- Small English terms are acceptable where brand-appropriate
- Do not become dogmatic if a better wording requires slight flexibility

### Copy quality
- No empty agency phrases
- No filler text
- No "innovation / tailored solutions / digital excellence" nonsense unless it says something real
- No self-important manifesto writing without strategic value
- No meaning-free premium language

### Preferred copy behavior
- shorter
- sharper
- more self-aware
- more visual and commercial
- less explainy
- less padded

### Homepage offer section rule
The homepage services section should not be implemented as a multi-service overview.

Default execution:
- frame it as `Was Sie bekommen`
- sell one focused public offer
- use internal modules rather than equal-weight service cards

If the section reads like a feature grid or a multi-service list, the implementation is wrong.

---

## 6. Implementation Rules

Claude should avoid:
- generic SaaS feature grids
- standard startup navbars
- default shadcn-looking UI
- overused icon lists
- text-first sections where visuals should carry the persuasion
- weak screenshot treatment (raw floated images — use browser frames)
- layouts that feel flat, junior, or obviously templated
- sections that dissolve into loose headline/text/media stacks without a strong containing glass surface
- mixing too many unrelated card and panel styles in one page
- custom cursor (removed — adds gimmick energy without payoff)
- flat non-glass cards as the primary surface language
- hard section transitions (glass panels create natural rhythm)

Claude should prefer:
- strong composition
- visual hierarchy
- image-led persuasion
- original section logic
- real project presentation in browser-frame glass mockups
- thoughtful motion
- high-quality responsive behavior, especially on mobile
- a coherent family of glass panels, luminous cards, and framed surfaces
- the documented surface archetypes and button families before inventing one-off container logic
- GSAP Pin & Scrub for scroll-based cinematic moments
- Framer Motion for entrance animations, hover states, micro-interactions

If forced to choose, prefer:
- stronger design over easier assembly
- better composition over more components
- real proof over longer explanation

If strong real imagery is limited, prefer fewer, larger, more intentional proof moments over filler sections, generic decoration, or compensatory text.

---

## 7. Motion Rules

### Primary patterns
- **Framer Motion** — entrance animations, hover states, micro-interactions, stagger reveals
- **GSAP + ScrollTrigger** — Pin & Scrub sequences, complex timelines, scroll-progress scrub
- Always check `useReducedMotion()` — all animations must have a static fallback

### Framer Motion standards
```typescript
ease: [0.16, 1, 0.3, 1]   // expo out — all entrances
entrance duration: 0.85s
hover: 0.2–0.3s
useInView: { once: true, margin: '-80px' }
staggerChildren: 0.10–0.12
```

### Motion hierarchy
Each section earns one strong animation moment.
Not everything moves at once.
Motion should feel cinematic and controlled, not scattered.

---

## 8. Surface System Execution

Default to the documented surface system before inventing a new one.

Execution rules:
- reuse the same glass family across hero, proof, services, process, contact, nav, and footer surfaces
- keep button styling inside the same material logic as the surrounding panels
- do not mix unrelated glass recipes on the same page unless there is a clear hierarchy reason
- if a section needs a new container treatment, derive it from an existing surface archetype first
- treat browser frames, proof panels, and CTA shells as part of one controlled surface language
- prefer card-first and surface-led composition over free-floating text stacks
- when a control looks like a generic SaaS button or chip, the implementation is wrong
- when a card could belong to any random UI kit, the implementation is wrong

---

## 9. Review Checklist

Before considering work good enough, check:

- Does it feel visually distinctive rather than generic?
- Does it avoid obvious template or component-library energy?
- Is it image-led enough?
- Is there enough real visual proof?
- Is the copy tight, meaningful, and commercially useful?
- Does it feel expensive without lying?
- Is the offer still clear and commercially readable within seconds?
- Does it avoid junior, cheap, or AI-slop output?
- Does the mobile version feel intentionally designed, not merely stacked?
- Are motion and surfaces helping the brand rather than creating chaos?
- Do glass surfaces have luminous top-edge highlights and proper blur?
- Does the two-layer system (atmosphere + glass) hold throughout?
- Do cards, panels, and buttons clearly belong to the same surface family?
- Does the UI avoid generic SaaS chip and button energy?

If the answer to several of these is "no", the work is not ready.

---

## 10. Autonomy Level

**High autonomy is the default.**

Claude may freely decide:
- token usage (which color, which spacing)
- layout composition and hierarchy
- motion approach within a section
- copy structure and phrasing
- component structure

Claude should briefly surface the decision first (not ask for approval) when:
- proposing to add or remove a whole section
- shifting the overall color or font direction
- fundamentally restructuring an existing key section (hero, contact, projects)

**On WhyUs:**
The WhyUs section exists in the codebase but its purpose and quality are unclear.
Claude may audit it, propose a redesign, propose a merge with another section, or propose removing it.
Flag the recommendation but do not wait for permission to have an opinion.

---

## 11. What This File Must Not Become

This file must not drift back into:
- product truth duplication from `PRD.md`
- a visual specification document
- a list of mandatory tools
- a session ritual script
- a component cookbook
- a market-positioning cage

If it starts dictating exact sections, exact copy, or exact visual recipes, it is doing the wrong job.
