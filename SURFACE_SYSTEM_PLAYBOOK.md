# SURFACE_SYSTEM_PLAYBOOK.md — Metz & Partner

This file translates the creative direction into a practical implementation playbook.

Use it when building or refactoring:
- cards
- panels
- browser frames
- nav shells
- buttons
- contact shells
- proof containers

This document is intentionally more operational than `DESIGN_SYSTEM.md`.
It should help Claude build a coherent glass system without turning the project into a rigid UI kit.

---

## 1. Purpose

The goal is not to add "glass effects" randomly.
The goal is to build a **coherent surface family** that gives the website a recognizable material identity.

The site should feel:
- card-first
- surface-led
- luminous
- premium
- controlled
- tactile

It should not feel:
- flat
- template-based
- made from unrelated UI snippets
- like a collection of different glass experiments

---

## 2. Source Of Truth

Use the docs in this order:

1. `PRD.md`
   - business truth
   - conversion priorities
   - homepage narrative default

2. `DESIGN_SYSTEM.md`
   - aesthetic principles
   - atmosphere and glass logic
   - surface archetypes and token direction

3. `SURFACE_SYSTEM_PLAYBOOK.md`
   - practical execution rules
   - naming
   - implementation hierarchy
   - reuse strategy

4. `CLAUDE.md`
   - repository behavior
   - implementation guardrails
   - review criteria

---

## 3. Implementation Strategy

When Claude needs a new card, panel, or button, do not invent the full styling from scratch.

Default order:
1. choose the nearest existing surface archetype
2. map it to a reusable class or utility family
3. adjust only intensity, scale, or hierarchy
4. create a new variant only if the existing family genuinely cannot carry the use case

The system should scale by **variant**, not by one-off component styling.

---

## 4. Recommended Build Layers

### Layer A: Tokens in `app/globals.css`

Keep the real material values as CSS variables.
These are the stable primitives:
- fills
- border strengths
- highlight strengths
- shadow depths
- blur levels
- radius levels

Why:
- easier to tune the whole site later
- keeps the material language unified
- avoids random rgba and blur values across components

### Layer B: Reusable utility classes in `app/globals.css`

Build a small class family for the recurring surface logic.

Recommended direction:
- `.surface-hero`
- `.surface-primary`
- `.surface-secondary`
- `.surface-muted`
- `.surface-floating`
- `.panel-browser`
- `.panel-proof`
- `.panel-feature`
- `.panel-process`
- `.button-glass-primary`
- `.button-glass-secondary`
- `.button-ghost-glass`
- `.button-pill-micro`

These classes should carry the material behavior.
Section-specific components can then compose layout and content on top of them.

### Layer C: Component-level composition in TSX

Components should decide:
- size
- layout
- content hierarchy
- image placement
- motion sequence

Components should not repeatedly redefine:
- blur values
- border formulas
- glow recipes
- highlight behavior
- button material logic

If a component contains a large hand-written glass recipe, the system is probably being bypassed.

---

## 5. Surface Class Responsibilities

### `.surface-hero`
Use for:
- hero shell
- featured proof frame
- dominant showcase container

Should provide:
- strongest blur
- strongest top-edge highlight
- deepest elevation
- largest radius
- generous inner padding

Should not become:
- an all-purpose wrapper used everywhere

### `.surface-primary`
Use for:
- major section containers
- proof cards
- service panels
- contact shells
- large process containers

Should provide:
- the default premium glass feel of the site
- clear edge definition
- stable readable contrast

### `.surface-secondary`
Use for:
- nested informational cards
- supporting copy panels
- supporting stat or metadata modules

Should provide:
- a quieter version of the main surface
- obvious family resemblance to `.surface-primary`

### `.surface-muted`
Use for:
- low-priority support UI
- footer panels
- subdued supporting structure

Should provide:
- quiet structure without flattening the interface

### `.surface-floating`
Use for:
- pills
- chips
- compact nav controls
- small floating labels

Should provide:
- denser material feel
- clear edge and hover state at small size

---

## 6. Button System

Buttons should feel like part of the same optical material system as the panels around them.
They should not look pasted on top.

### `.button-glass-primary`
Use for:
- main hero CTA
- main contact CTA
- single dominant action in a section

Characteristics:
- pill or near-pill
- denser glass than surrounding surfaces
- stronger top-edge sheen
- stronger hover lift and glow
- readable contrast without flat neon fill

### `.button-glass-secondary`
Use for:
- secondary actions
- alternate navigation path
- "view work" or "learn more" style CTAs

Characteristics:
- same family as primary
- quieter glow
- still premium and tactile

### `.button-ghost-glass`
Use for:
- utility controls
- less prominent actions
- actions inside dense cards

Characteristics:
- lighter fill
- visible border and highlight
- should remain clearly interactive

### `.button-pill-micro`
Use for:
- filters
- nav items
- tags with interaction
- compact toggles

Characteristics:
- dense floating-glass feel
- very rounded
- no generic SaaS-chip styling

### Button No-Gos
- flat filled CTA rectangles
- hard-edged default buttons
- tiny default pills with weak states
- buttons whose glow is unrelated to the surrounding surface system
- buttons that look louder than the actual hierarchy demands

---

## 7. Browser And Proof Panel Rules

Proof is where the system either becomes persuasive or collapses into decoration.

### `.panel-browser`
Use for:
- screenshots
- project previews
- process visuals
- UI evidence

Rules:
- the screenshot belongs inside the frame, not beneath it
- the frame should feel intentional, not novelty-browser chrome
- browser treatment should increase perceived quality, not add gimmick
- screenshots should usually be large enough to carry persuasion visually

### `.panel-proof`
Use for:
- selected work cards
- standout project moments
- featured evidence panels

Rules:
- proof panels should usually be larger than explanatory cards
- image gets first hierarchy
- text supports the evidence
- avoid equal-sized repeated proof cards unless the section clearly benefits from a grid

### Proof No-Gos
- tiny screenshots
- screenshots used as decorative postage stamps
- proof hidden beneath long copy
- panels where the chrome is more noticeable than the work

---

## 8. Process And Service Panels

These are the two areas most likely to become generic if not controlled.

### `.panel-feature`
Use for:
- service framing
- differentiation blocks
- what-you-get surfaces

Rules:
- avoid repeated generic feature-grid rhythm
- some asymmetry is good
- cards should feel curated, not auto-generated
- text must stay concise

### `.panel-process`
Use for:
- process stages
- workflow explanation
- collaboration steps

Rules:
- prefer fewer, bigger, more persuasive stages
- avoid weak "step 1 / step 2 / step 3 / step 4" mini-cards unless the concept truly benefits from it
- process should feel like reduced risk and clear guidance, not corporate admin

### Process No-Gos
- four equal cards with icons and two lines each
- process written like internal operations documentation
- visual hierarchy identical to service cards

---

## 9. Navigation And Footer

These should also belong to the surface family.

### Navigation
Recommended direction:
- a contained glass nav shell
- floating pill-like nav items or compact surface controls
- stronger polish than a default startup navbar

Avoid:
- a plain transparent row of links
- a basic sticky header with generic CTA button attached

### Footer
Recommended direction:
- low-profile but intentional surface treatment
- can be quieter than hero and proof
- should still feel designed, framed, and integrated into the system

Avoid:
- dead legalistic footer block
- flat slab footer with default columns

---

## 10. Motion Behavior For Surfaces

Motion should reinforce material and hierarchy.

Recommended uses:
- subtle rise and highlight increase on hover
- slight panel reveal with opacity, blur settling, or clip-based entry
- restrained parallax depth between atmosphere and foreground surface

Avoid:
- wobble or over-elastic panel motion
- unrelated hover behaviors across different card families
- excessive glow pulsing

The material should feel alive, not noisy.

---

## 11. Mobile Rules

The surface system must survive on mobile.

Mobile requirements:
- reduce blur if performance demands it
- keep edge highlights and surface definition intact
- preserve hierarchy between hero, primary, secondary, and floating surfaces
- avoid stacking too many equally styled cards without rhythm
- allow larger proof moments to stay visually important

Mobile should not become:
- just desktop surfaces squashed into one column
- a wall of identical rounded glass rectangles

---

## 12. Review Questions

Before shipping any UI work that depends on the surface system, check:

- Do the cards feel like one family or like multiple unrelated styles?
- Do the buttons feel born from the same material system as the panels?
- Is proof visually stronger than explanation?
- Are screenshots properly framed and large enough to matter?
- Does the process section avoid generic explainer-card energy?
- Does the page still feel controlled on mobile?
- Has the interface stayed premium without becoming game-like or overdesigned?

If several answers are "no", the implementation is not ready.

---

## 13. Practical Default For Future Tasks

If a future Claude task involves homepage or section work, default to this implementation approach:

1. establish or reuse the atmosphere background
2. choose the section's dominant surface archetype
3. build the main panel first
4. place proof or key content inside that panel
5. derive supporting cards from the same surface family
6. apply button family variants last
7. tune motion after hierarchy and material are already correct

This order matters.
If Claude starts with decorative details or random effects before surface hierarchy is solved, the result usually gets worse.
