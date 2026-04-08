# Metz & Partner — Agency Website

Website for Metz & Partner, a web design and development studio based in Koblenz, Germany. Built and maintained by Benedikt and Maximilian Metz.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS variables |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Fonts | Instrument Serif + DM Sans (via `next/font`) |
| Icons | Lucide React |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` in the project root:

```env
# Required for contact form email delivery
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Get a key at [resend.com](https://resend.com). Once you verify your sending domain (`metzundpartner.de`), update the `from` address in `app/api/contact/route.ts` from `onboarding@resend.dev` to `website@metzundpartner.de`.

Without `RESEND_API_KEY`, the contact form returns a graceful error directing users to the direct email address.

## Project Structure

```
app/
  page.tsx                  Homepage (all sections assembled)
  api/contact/route.ts      Contact form POST endpoint (Resend)
  projekte/
    page.tsx                All projects grid
    [slug]/page.tsx         Case study detail page
  impressum/page.tsx
  datenschutz/page.tsx

components/
  sections/                 One file per homepage section
    Hero.tsx
    ProblemSolution.tsx
    Projects.tsx
    Services.tsx
    Process.tsx
    Manifesto.tsx
    Contact.tsx
    ProjetteGrid.tsx        Used by /projekte page
  shared/
    Navigation.tsx (header-2.tsx)
    Footer.tsx
    ProjectCard.tsx
    ProjectCTA.tsx
    SectionLabel.tsx
    ScrollReveal.tsx
  ui/                       shadcn base components
  BorderGlow.tsx            React Bits cursor-glow card wrapper
  StarBorder.tsx            React Bits animated-border button

lib/
  data/projects.ts          Project data — update here when adding new work
  animations.ts             Shared Framer Motion variants

public/
  projekte/                 Project screenshots — add here, then set imageReady: true in projects.ts
  font2 tra 2.png           Logo image
```

## Adding a New Project

1. Add a screenshot to `public/projekte/your-project.jpg`
2. Add an entry to `lib/data/projects.ts` — set `imageReady: true`
3. Fill in `challenge`, `approach`, `clientContext`, and `additionalImages`
4. The project will appear on the homepage grid and at `/projekte/your-slug`

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint (must pass before commit)
npx tsc --noEmit # Type check
```

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.

Set `RESEND_API_KEY` in the Vercel project environment variables (Settings → Environment Variables).

## Legal

- **Impressum address**: Add the full street address to `app/impressum/page.tsx` before going live
- **Datenschutz**: Review before launch — currently reflects Resend, Calendly, and no analytics
- **Domain**: `metzundpartner.de` — update metadata in `app/layout.tsx` once confirmed
