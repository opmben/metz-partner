# PRD.md — Product Requirements Document
# Metz & Partner — Agency Website
# Version 1.1 — Updated with real agency data

---

## Agency Context (Read Before Everything Else)

**Who:** Benedikt Metz (UI/UX Design, Graphic Design background, Law background) and Maximilian Metz (Marketing & Sales, Marketing + Finance background). Both 22, based in Koblenz.

**Stage:** Gründungsphase. Under 5 projects completed. No testimonials yet. No measurable results data. Visual screenshots exist as portfolio references.

**Service offered:** Website design & development only. No branding packages, no SEO retainers, no ongoing maintenance contracts at this stage.

**Geography:** Rheinland-Pfalz, Mosel valley, Koblenz region.

**Pricing:** Under 1.000€ entry level. This is the reality. The website must be honest about positioning — exceptional quality and personal attention at an accessible price point, not "premium agency" language implying 5-figure budgets.

**What makes this real:** Every client works directly with Benedikt and Maximilian. Not an account manager. Not a junior. The founders themselves.

---

## Product Vision

A website that wins the trust of regional businesses who need a new web presence but are skeptical of agencies — because they have been burned before, or because they assume agencies are too expensive, too slow, or too impersonal.

Every design decision serves one of two goals:
1. **Demonstrate craft** — show that Benedikt and Maximilian build things that look genuinely world-class
2. **Reduce friction to contact** — make reaching out feel easy, safe, and worth their time

The website does not describe what Metz & Partner does. It *shows* it.

**Important constraint:** No fabricated social proof. No invented testimonials. No inflated statistics. The site must be credible to a skeptical buyer — which means honesty is a strategic asset, not a limitation.

---

## Target Audience

**Primary:** Small and medium businesses in Rheinland-Pfalz / Koblenz region with an outdated or non-existent web presence. Sectors: Handwerk, Gastronomie, Kanzleien, Praxen, lokaler Einzelhandel, Dienstleister. Budget range: 500–2.000€. They judge by eye, not by spec sheet.

**Secondary:** Regional startups and younger businesses who want a first professional web presence without paying agency-city prices.

**Psychology of the regional buyer:**
- Skeptical of agencies — assume they are expensive, slow, and communicate badly
- Respond strongly to local trust signals: regional presence, direct contact, personal names and faces
- Judge quality immediately and instinctively — if the website looks better than anything they have seen locally, they will reach out
- Their biggest fear: paying for something generic that does not represent their business
- Their decision trigger: "These are two young people from Koblenz who clearly know what they are doing — and I can just call them."

---

## Primary KPI

**One metric:** Number of direct contact form submissions + Calendly call bookings per month.

Secondary: Time on site (target: >90 seconds average), Projects page views per visit.

**Honest baseline:** In Gründungsphase, even 2–3 qualified leads per month from the website is a meaningful result. Do not over-engineer for scale that does not exist yet.

---

## Homepage — Section-by-Section Requirements

---

### Section 1: Navigation

**Layout:** Fixed top bar. Transparent on load. Blurred dark background after 80px scroll.

**Left:** Logo — "Metz & Partner" in Instrument Serif, not bold, not italic.

**Center:** Links — Projekte · Leistungen · Prozess · Kontakt
- Font: DM Sans, 0.75rem, uppercase, letter-spacing 0.12em
- Color: `--muted` at rest, `--text` on hover
- No underlines. No bold on active.

**Right:** Single CTA button — "Projekt anfragen"
- Style: Acid green pill button, dark text
- Behavior: Smooth scroll to #contact section

**Animation:** Fade up on load, staggered: Logo (0.2s) → Links (0.4s) → CTA (0.6s)

---

### Section 2: Hero

**Goal:** Create an emotional reaction in under 3 seconds. Signal: young, sharp, local, personal.

**Layout:** Full viewport height (100vh). Content anchored bottom-left. Background: animated orbs + noise texture + faint grid.

**Badge (top of content):**
```
● Webdesign · Koblenz & Region
```
Small pill, bordered, muted text, pulsing green dot.

**Headline (Instrument Serif, display size):**
```
Websites, die
Unternehmen wachsen
lassen.
```
"wachsen" in italic + accent green. Three lines, each clips up from overflow hidden container.

**Subline (DM Sans Light, max-width 380px):**
```
Wir sind Benedikt und Maximilian — zwei Gründer aus Koblenz,
die Websites bauen, die nicht nur gut aussehen,
sondern echte Ergebnisse liefern.
```
This is intentional. Naming the founders in the subline immediately establishes the personal, local trust signal that is the core USP. It differentiates from faceless agencies.

**Two CTAs (bottom right, paired with subline):**
- Primary: "Unsere Arbeiten" → smooth scroll to #projects
- Ghost: "Gespräch anfragen →" → smooth scroll to #contact

**Background elements (decorative, non-distracting):**
- Three large blurred color orbs: Acid green (top right), Coral (bottom left), Purple (center — very faint)
- Faint grid: 80px, rgba(255,255,255,0.025)
- Background marquee text: "Design · Entwicklung · Ergebnisse" — diagonal, 0.05 opacity, looping

**Scroll indicator:** Animated vertical line + "Scroll" label, bottom center, fades in at 1.8s

---

### Section 3: Founder Bar (replaces generic CredibilityBar)

**Goal:** Immediately after the hero, establish who these people are. This is the trust-builder for an agency with no testimonials and few projects. Personal credibility replaces statistical credibility.

**Layout:** Two-column founder cards, side by side, full-width, separated by a vertical border line.

**Left card — Benedikt Metz:**
```
Benedikt Metz
Head of UI/UX Design

Hintergrund in Grafikdesign und Recht.
Zuständig für alles, was man sieht —
und dafür, dass es rechtlich stimmt.
```

**Right card — Maximilian Metz:**
```
Maximilian Metz
Head of Marketing & Sales

Hintergrund in Marketing und Finanzen.
Zuständig für Strategie, Wirkung
und dafür, dass Ihre Website konvertiert.
```

**Below both cards — one honest statement, centered:**
```
Wenn Sie uns anfragen, sprechen Sie mit uns.
Nicht mit einem Account Manager. Nicht mit einem Junior.
Mit den Menschen, die Ihre Website bauen.
```
This copy directly addresses the #1 skepticism regional buyers have about agencies.

**Design:** Each card has a subtle top accent line in `--accent`. Names in Instrument Serif Italic. Role in DM Sans uppercase small. Body in DM Sans 300. No profile photos until real ones are available — use a minimal typographic treatment instead.

**Note:** Do NOT add a client logo strip or fabricated stats here. The founders ARE the credibility signal at this stage.

---

### Section 4: Problem / Solution

**Goal:** Mirror the client's pain, then position Metz & Partner as the obvious solution. This section does the most psychological heavy lifting.

**Layout:** Two-column. Left: problem statement. Right: solution statement.

**Left column — The Problem (muted, smaller):**
```
Die meisten Unternehmenswebsites in der Region sind
veraltet, langsam, und generisch.
Sie kosten Geld — und bringen keins.
```

**Right column — The Solution (larger, brighter):**
```
Wir bauen Websites, die für Sie arbeiten.
Nicht als Visitenkarte. Als Ihr bester Mitarbeiter.
```

**Below:** Three honest proof points in a horizontal row.
These must NOT contain fabricated numbers. Use capability claims, not fake metrics:
```
[ Persönlich & direkt ]      [ Gebaut für Geschwindigkeit ]    [ Fertig in Wochen ]
[ Sie sprechen immer mit     ]  [ Pagespeed 90+, SEO-ready,  ]    [ Nicht in Monaten. ]
[ Benedikt oder Maximilian. ]  [ mobiloptimiert — von Haus   ]    [ Klarer Zeitplan,  ]
[                            ]  [ aus.                        ]    [ von Tag 1.        ]
```
Each with a small accent-colored top border that animates in on scroll.

**Copy note:** "Persönlich & direkt" is the strongest of the three for this audience and should be visually emphasized — it is the point no Frankfurt or Düsseldorf agency can make.

---

### Section 5: Projects (Ausgewählte Arbeiten)

### Section 5: Projects (Ausgewählte Arbeiten)

**Goal:** The primary trust-builder. Show the quality of the work directly. At this stage there are no measurable results — the screenshots must speak for themselves.

**Section label:** "Ausgewählte Arbeiten"
**Section title:** "Arbeit, die für sich selbst spricht." (Instrument Serif Italic)

**Layout:** Asymmetric grid.
- Large card (left, 2/3 width, tall): Featured project
- Two smaller cards (right column, stacked): Secondary projects

**Each card contains:**
- Full-bleed background using real project screenshot via `next/image`
- Category tag (e.g. "Handwerk · Website") in accent green, uppercase, small
- Project name in Instrument Serif Italic
- On hover: image scales 1.06, overlay darkens, "Ansehen →" pill appears center
- On hover: card info slides up 8px

**Featured card:** Show the best visual work. Do NOT add a fake result metric.
If a real result becomes available later (e.g. "Kunde berichtet von deutlich mehr Anfragen"), add it then.

**Bottom:** "Alle Projekte ansehen →" ghost link to `/projekte`

**Important — Minimum content to go live:** At least 2 real project screenshots are required before this section is built. If only 1 exists, use a single full-width card. Do not use placeholder gradients as fake projects — empty slots are worse than fewer slots.

**Data source:** `/lib/data/projects.ts`
```typescript
interface Project {
  slug: string
  name: string
  category: string          // e.g. "Handwerk"
  serviceType: string       // e.g. "Website"
  coverImage: string        // path to real screenshot in /public/projekte/
  featured: boolean
  shortDescription: string  // 1 sentence, shown on card hover
  // result and resultLabel intentionally omitted until real data exists
}
```

---

### Section 6: Services (Leistungen)

**Goal:** Be honest about what is offered. Do not list services that are not currently delivered. Scope creep on the website causes scope creep with clients.

**Section label:** "Leistungen"
**Section title:** "Was wir für Sie bauen." (Instrument Serif Italic)

**Layout:** 3-column grid (2 columns on tablet, 1 on mobile)

**Three services only — reflects actual current offering:**
```
01 — Webdesign & Entwicklung
     Maßgeschneiderte Websites in Next.js.
     Blitzschnell, mobiloptimiert, SEO-ready —
     und so gestaltet, dass man sie nicht vergisst.

02 — UX-Strategie & Konzeption
     Bevor der erste Pixel gesetzt wird, denken wir
     durch, wie Ihre Website konvertiert.
     Struktur, Nutzerführung, Inhalte — alles geplant.

03 — Launch & Übergabe
     Wir schalten Ihre Website live, weisen Sie ein,
     und stehen danach für Fragen bereit.
     Kein Support-Ticket. Eine direkte Nachricht.
```

**Note:** Do NOT list Branding, SEO-Pakete, or monatliche Betreuung as services at this stage. If asked about these by a client, handle it personally — but the website should not promise what is not consistently delivered.

**Card behavior:**
- At rest: dark background, top border transparent
- On hover: background shifts to --surface-2, top border animates in with accent color (scaleX from 0 to 1)
- Number: very faint, large, Instrument Serif — decorative, not functional

---

### Section 7: Process (Prozess)

**Goal:** Remove the fear of the unknown. The fact that no documented process currently exists is a problem — this section forces the process to be defined before the website is built. Do not ship this section with vague copy.

**Section label:** "Prozess"
**Section title:** "Kein Rätselraten. Kein Warten." (Instrument Serif Italic)

**Layout:** Horizontal numbered list. Each item spans full width with a bottom border.

**Four steps — kept realistic for a 2-person early-stage team:**
```
01   Erstes Gespräch           kostenlos · 30 Minuten
     Calendly-Call oder        Wir lernen Ihr Unternehmen kennen,
     Telefonat                 stellen Fragen, hören zu.
                               Kein Pitch. Kein Druck.

02   Konzept & Angebot         3–5 Tage
     Struktur, Seitenaufbau,   Sie erhalten ein konkretes Konzept
     grober Designansatz       und ein festes Angebot. Keine versteckten Kosten.

03   Design & Entwicklung      2–4 Wochen
     Wir bauen Ihre Website.   Zwei Feedback-Runden inklusive.
     Sie bleiben informiert.   Benedikt und Maximilian direkt erreichbar.

04   Launch & Übergabe         1–2 Tage
     Live-Schaltung,           Ihre Website ist online.
     Einweisung, Übergabe      Sie wissen, wie Sie sie selbst pflegen können.
```

**Interaction:** On hover per row, the large faint number shifts from opacity 0.08 to accent green.

**Note on timeline:** These timelines are achievable for a 2-person team. Do not promise 1-week delivery unless it has been consistently delivered. Unmet timeline promises destroy early-stage reputation.

---

### Section 8: Manifesto

**Goal:** Emotional peak before the final CTA. No functional role — its job is to make the brand memorable.

**Layout:** Full-width, centered, generous padding above and below.

**Text (Instrument Serif, display size, centered):**
```
Ihre Website ist oft der erste Eindruck.
Manchmal der einzige.
Wir sorgen dafür, dass er zählt.
```
"erste Eindruck" in italic + accent green.

**Below text:** Single CTA — "Jetzt Projekt anfragen →" (Primary button, large)

**Background:** Subtle acid green radial glow, blurred, centered. Very faint — opacity 0.06 max.

**Note:** The previous version used "Vertriebsmaschine" language. This has been replaced with a more honest, human message that fits the actual stage and audience better. Regional Handwerk clients do not respond to startup-speak.

---

### Section 9: Contact (Kontakt)

**Goal:** Convert. Remove every possible barrier between the visitor and reaching out.

**Section label:** "Kontakt"
**Section title:** "Erzählen Sie uns von Ihrem Projekt."

**Layout:** Two-column. Left: context + Calendly. Right: form.

**Left column:**
```
Kein langes Hin und Her.
Kein unverbindliches Angebot von der Stange.

Buchen Sie direkt einen kostenlosen
30-Minuten-Call mit Benedikt oder Maximilian —
oder schreiben Sie uns.

Wir antworten innerhalb von 24 Stunden.

📞 Kostenlosen Call buchen →   [Calendly Button]
📧 hallo@metzundpartner.de
```

Calendly button: accent green pill, links to Calendly booking page.
This is the highest-intent CTA on the page — a booked call is a qualified lead.

**Right column — Form fields:**
```
Ihr Name *
Ihr Unternehmen (optional)
E-Mail-Adresse *
Kurze Projektbeschreibung * (textarea — 3 rows)

[ Nachricht senden → ]
```

**Form deliberately simplified vs. previous version:**
- No phone field (reduces friction)
- No budget dropdown (premature for sub-1.000€ positioning — it may scare off the right clients)
- No long textarea label — keep it inviting, not like a form to fill out

**Form behavior:**
- React Hook Form + Zod validation
- Inline error messages only — no alert dialogs
- Submit: optimistic loading state on button, then success message fades in
- Success message: "Danke — wir melden uns innerhalb von 24 Stunden bei Ihnen."
- No redirect. No page reload.

**DSGVO:** Checkbox required — "Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zur Kontaktaufnahme zu. *"

---

### Section 10: Footer

**Layout:** Simple two-row. Top: logo + tagline. Bottom: links + copyright.

**Tagline:** "Webdesign aus Koblenz. Für die Region."
(More specific and honest than generic "Digitale Präsenzen, die wachsen.")

**Links:** Projekte · Leistungen · Kontakt · Datenschutz · Impressum

**Copyright:** © 2025 Metz & Partner, Koblenz. Alle Rechte vorbehalten.

**No social media links** — profiles do not yet exist. Add when active and high quality. An empty Instagram profile linked from the agency website does more damage than no link.

---

## Subpages

### /projekte — All Projects

Grid of all project cards (same ProjectCard component as homepage).
No filter bar at this stage — with under 5 projects, filtering is unnecessary and makes the portfolio look sparse.
Add filtering when 8+ projects exist.

### /projekte/[slug] — Single Project Case Study

Structure:
1. Full-bleed hero screenshot (real image required — no placeholder)
2. Project overview: Kunde, Branche, Jahr, Leistung
3. Aufgabe: What did the client need?
4. Umsetzung: What was built and why?
5. Screenshots: 2–3 images showing the result
6. Next project → link
7. CTA: "Ähnliches Projekt? Sprechen wir." → smooth scroll to #contact

**SEO note:** Target long-tail searches like "Webdesign Koblenz", "Website Handwerksbetrieb Rheinland-Pfalz", "Günstiger Webdesigner Mosel" — these are achievable for a local agency with 0 domain authority.

### /impressum + /datenschutz

Standard German legal pages. Use a lawyer-reviewed template.
Benedikt's law background is an asset here — these must be correct.

---

## Build Order (Recommended)

One session per phase in Claude Code. Start each session by reading CLAUDE.md.

```
Phase 1 — Foundation (1 session)
  1. Next.js 14 setup: TypeScript strict, Tailwind, Framer Motion, shadcn init
  2. globals.css: all CSS variables, font imports, base reset, noise texture
  3. tailwind.config.ts: map CSS variables to Tailwind color tokens
  4. layout.tsx: Instrument Serif + DM Sans via next/font, metadata, CustomCursor
  5. Navigation.tsx: transparent → blur on scroll, responsive, animations

Phase 2 — Hero & Founder Bar (1 session — validate before continuing)
  6. Hero.tsx: full cinematic hero with orbs, grid, marquee, headline animation
  7. FounderBar.tsx: two founder cards + positioning statement
  → STOP. Review in browser at this point. If the visual bar is not set correctly,
    fix it before building the remaining 8 sections on a broken foundation.

Phase 3 — Core Content (1–2 sessions)
  8. ProblemSolution.tsx
  9. Projects.tsx + ProjectCard.tsx (requires real screenshots in /public/projekte/)
  10. Services.tsx
  11. Process.tsx

Phase 4 — Conversion & Close (1 session)
  12. Manifesto.tsx
  13. Contact.tsx: form (React Hook Form + Zod) + Calendly embed
  14. Footer.tsx

Phase 5 — Subpages (1 session)
  15. /projekte page
  16. /projekte/[slug] case study template
  17. /impressum, /datenschutz (static content pages)

Phase 6 — Polish & Performance (1 session)
  18. Scroll reveal audit: every section animates correctly
  19. Mobile audit: 375px, 768px, 1440px — every section
  20. Lighthouse mobile ≥ 90 — fix any issues
  21. prefers-reduced-motion: all animations have static fallback
  22. Final copy review: all German, no placeholders, no fabricated numbers
  23. DSGVO checklist complete
```

**Gate between Phase 2 and Phase 3:** Do not continue until the hero looks genuinely world-class in the browser. This is non-negotiable — everything else is built on top of that first impression.

---

## Copy Tone of Voice

**Audience:** Regional business owners — Handwerksmeister, Praxisinhaber, Gastronomen, kleine Kanzleien. They are practical, skeptical of hype, and respond to directness.

**Voice:** Direct, warm, confident without arrogance. Speaks like a trusted person from the region, not like a startup pitch deck.

**Not:**
- "Wir sind Ihre Partner für digitale Transformation"
- "Mit uns heben Sie Ihre Online-Präsenz auf das nächste Level"
- "Qualität, die überzeugt" (what does this even mean?)
- Anything with "synergetisch", "ganzheitlich", "maßgeschneidert" used generically
- Stats or results that cannot be verified

**Yes:**
- Sentences that name a specific fear: "Sie haben keine Zeit für eine kaputte Website."
- Sentences that name a specific person: "Benedikt und Maximilian bauen Ihre Website."
- Honest claims: "Wir sind jung, direkt, und liefern — das ist unser Versprechen."
- Local anchoring: "Aus Koblenz. Für die Region."

**Three tests for every headline:**
1. Does it address a real pain or desire of a regional business owner?
2. Can it be said out loud without sounding like a brochure?
3. Does it say something only Metz & Partner can say — or could any agency use it?

---

## DSGVO / Legal Checklist

- [ ] Impressum: vollständig, Benedikt oder Maximilian als Verantwortliche named
- [ ] Datenschutzerklärung: covers contact form data handling, Calendly, Plausible
- [ ] Contact form: DSGVO checkbox required before submit
- [ ] Calendly embed: Calendly has its own DSGVO implications — mention in Datenschutzerklärung
- [ ] Google Fonts: loaded via next/font only — no external Google request on page load
- [ ] Analytics: use Plausible.io (EU-hosted, no cookies, no consent banner needed) — NOT Google Analytics
- [ ] Cookie banner: NOT needed if only Plausible is used (no cookies set)
- [ ] Form submissions: decide before launch — email forwarding via Resend/Nodemailer, or a backend? Document the choice.
- [ ] Images: all project screenshots must have client permission to be shown publicly
