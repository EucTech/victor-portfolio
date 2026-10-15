# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Personal brand website for **Victor Chiemerie**, a realtor based in Kigali, Rwanda.
It is a marketing and credibility site, not a property portal. The goal is to make a
visitor feel confident that Victor understands both the emotional and financial weight
of a property decision.

Source of truth for content and structure: `docs/WEBSITE-CONTENT-DOCUMENT.pdf`.

## Commands

This project uses **pnpm**. Do not use npm or yarn.

```bash
pnpm install       # install dependencies
pnpm dev           # local dev server at http://localhost:3000
pnpm build         # production build — run before declaring work finished
pnpm start         # serve the production build
pnpm lint          # eslint
```

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript, strict mode
- Tailwind CSS v4 — configured in CSS via `@theme`, there is no `tailwind.config.js`
- shadcn-style components, hand-rolled in `src/components/ui`, built on Radix primitives
- lucide-react for icons, embla-carousel-react for the testimonial carousel
- motion (`motion/react`) for all animation, lenis for smooth scrolling
- three + @react-three/fiber for the 3D photo ring in the home hero
  (`src/components/home/hero-ring.tsx`, loaded client-side only and paused off screen)
- Shared motion primitives live in `src/components/motion/` (SplitText, Magnetic, Tilt,
  ParallaxImage, Cursor, SmoothScroll, IntroCurtain). Every one respects reduced motion.

## Architecture

```
src/
  app/          route segments (App Router); each folder = a page
  components/   ui/ holds primitives; the rest are site-specific sections
  data/         ALL editable content lives here as typed TypeScript
  lib/          utils (cn, formatPrice, slugify, formatDate)
```

**The data layer is the point.** Properties, testimonials, insights, FAQs,
neighborhoods, services and site config are plain typed TS files in `src/data/`.
Adding a listing means adding an object to `properties.ts` — no component changes.
When adding features, keep content out of components and put it in `src/data/`.

## Design rules

Non-negotiable, the client asked for these specifically:

- **White backgrounds.** White is the canvas. Do not introduce dark page sections
  beyond the deliberate accents already present (final CTA band, footer).
- **Black is primary**, used for text, buttons and the footer.
- **Gold (`--color-gold`, #c0a062) is secondary** — for thin rules, uppercase eyebrow
  labels, hover states and small accents. Gold never carries body text; it fails
  contrast on white at small sizes.
- Serif display font (Cormorant) for headings, sans (Inter) for everything else.
- Generous whitespace. Sections use large vertical padding. Resist tightening it.

Design tokens live in `src/app/globals.css` under `@theme`. Change colours there,
not in component classes.

## Images

No real photography exists yet. The `<Media>` component in `src/components/ui/media.tsx`
renders a branded placeholder whenever `src` is empty, so every page renders cleanly.

When real photos arrive: drop them in `public/images/...` and set the path in the
relevant `src/data/*.ts` file. Nothing else needs to change. Always use `<Media>` or
`next/image` — never a bare `<img>`, image weight is the main performance risk on
this site.

## Content status

Much of the written content is **placeholder or draft** and is marked as such inline:

- `testimonials.ts` — every quote is a placeholder. Never publish invented reviews.
- `faqs.ts` — answers are drafts and must be verified against current Rwandan
  practice. Legal and financing answers need professional review.
- `insights.ts` — article bodies are outlines to be rewritten in Victor's voice.
- `neighborhoods.ts` — descriptions and price guides are drafts.
- `properties.ts` holds two real listings (Kiyovu villa for sale at $2.3M, furnished
  two bedroom in Nyarutarama for rent at $2,500/month) with real photos. Bedroom and
  bathroom counts, features and descriptions are drafts written from the photos and
  must be confirmed by Victor.

Do not remove the DRAFT/PLACEHOLDER markers when editing around them, and do not
present placeholder content as final.

## Still outstanding

- Photography (hero, portrait, headshot, property galleries)
- Office street address — `site.ts` `address.line1` is empty, needed for the map
- The contact form opens the visitor's own email app (mailto) addressed to `site.email`.
  It sends nothing itself. `src/app/api/contact/route.ts` is an unused stub kept for a
  future email service such as Resend. The newsletter form has no backend.
- Privacy policy page — the site collects names, emails and phone numbers, so
  Rwanda's data protection law (No. 058/2021) is relevant. Needs qualified review.
- Domain and analytics not configured; `site.url` is a placeholder.

## Conventions

- Server Components by default. Add `"use client"` only where interactivity requires
  it (header menu, filters, carousel, forms, scroll reveal).
- Every page exports `metadata`. New pages must too, and should be added to
  `src/app/sitemap.ts`.
- Prices render through `formatPrice()` — do not hardcode currency symbols.
- Phone, email and WhatsApp always come from `src/data/site.ts`, never inline.
- Use the `cn()` helper for conditional classes.

## Copy rules

- No en dashes or em dashes in any visible text. Use commas, colons or brackets.
- No sparkle or "AI" style icons or decoration.

## Hidden sections

Neighborhoods and Insights are switched off for now, not deleted. Their routes live in
`src/app/_neighborhoods` and `src/app/_insights` (Next.js ignores `_` folders). To bring
one back: rename the folder without the underscore, then uncomment its nav entries in
`src/data/site.ts`, its sitemap entries in `src/app/sitemap.ts` and its home section in
`src/app/page.tsx`. The footer newsletter form was removed; `newsletter-form.tsx` is unused.
