# Victor Chiemerie — Real Estate Website

Personal brand website for Victor Chiemerie, realtor in Kigali, Rwanda.
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

Other commands:

```bash
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # eslint
```

## Editing content — no components required

All editable content is in `src/data/`. These are plain TypeScript files with
types, so your editor will tell you if a field is missing.

| File | What it controls |
|---|---|
| `site.ts` | Name, phone, email, WhatsApp, address, socials, nav |
| `properties.ts` | Property listings |
| `neighborhoods.ts` | Neighborhood guide pages |
| `insights.ts` | Articles |
| `testimonials.ts` | Client quotes |
| `faqs.ts` | FAQ questions and answers |
| `services.ts` | Services, the four "why work with Victor" cards, process steps |

### Adding a property

Copy an existing block in `src/data/properties.ts`, change the values, and give it
a unique `slug`. The listing page, detail page, sitemap entry and structured data
are generated automatically.

Set `featured: true` to show it on the home page (first six featured are used).

### Adding photos

1. Put image files in `public/images/properties/`
2. Reference them in the data file:
   ```ts
   images: ["/images/properties/hillside-1.jpg", "/images/properties/hillside-2.jpg"]
   ```

Any empty image renders a branded placeholder instead, so the site always looks
finished. The first image in the array is the cover.

**Compress images before adding them.** Photography is the main thing that will
slow this site down. Aim for under 300KB per image, roughly 2000px wide.

## Before launch

- [ ] Replace all placeholder testimonials with real client quotes
- [ ] Review every FAQ answer for accuracy; get legal and financing answers checked
- [ ] Rewrite the draft articles in `insights.ts`
- [ ] Add real property listings and photography
- [ ] Fill in `site.ts`: office address, Instagram URL, YouTube URL
- [ ] Set `site.url` to the real domain
- [ ] Connect the contact form to an email provider (see below)
- [ ] Connect the newsletter form to a provider (Brevo, Mailchimp)
- [ ] Add `public/og-default.png` (1200×630) for social sharing
- [ ] Have the privacy policy reviewed — Rwanda's Law No. 058/2021 applies
- [ ] Submit the sitemap in Google Search Console

## Contact form

`src/app/api/contact/route.ts` currently validates and logs submissions but does
not send email. To make it live with [Resend](https://resend.com):

```bash
pnpm add resend
```

```
# .env.local
RESEND_API_KEY=re_xxxxx
```

Then replace the `console.log` in the route with a send call to `site.email`.

## SEO

Already handled:

- Per-page titles, descriptions and canonical URLs via `pageMeta()` in `src/lib/seo.ts`
- Open Graph and Twitter card tags
- JSON-LD structured data: `RealEstateAgent`, `Person`, `RealEstateListing`,
  `FAQPage`, `Article`, `ItemList` and `BreadcrumbList`
- `sitemap.xml` and `robots.txt` generated from the data files
- Semantic headings, one `<h1>` per page, alt text on all images
- Static generation for every page

The FAQ schema is what makes FAQ answers eligible for rich results in Google.
Neighborhood pages target searches like "houses in Nyarutarama", which is where
most local search volume sits.

## Deployment

Push to GitHub and import the repo at [vercel.com](https://vercel.com). The default
settings work; Vercel detects Next.js automatically. Set the custom domain in the
project settings.

## Notes

- Design tokens (colours, fonts) are in `src/app/globals.css` under `@theme`.
  There is no `tailwind.config.js` — Tailwind v4 is configured in CSS.
- Gold is an accent colour only. It fails contrast requirements for body text on white.
- See `CLAUDE.md` for conventions if you use Claude Code on this project.
