# Crewzy — light, connected-workspace preview

A Next.js redesign of the Crewzy landing page, prepared on the
`codex/crewzy-light-compliance-redesign` review branch. The existing secondary
routes and Netlify deployment configuration are retained. No paid template
source was downloaded or copied. The custom design takes the light, spacious
direction of [Cruip Simple](https://cruip.com/simple/) as a reference.

## Run

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3017
```

For a production-mode local preview:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 3017
```

Open http://127.0.0.1:3017 in a standalone browser tab. Font downloads require
network access at build time; Next.js serves the downloaded fonts locally.

## Interaction design

- GSAP + ScrollTrigger: entrance sequences, chart reveal and reading progress.
- The hero dashboard is real HTML at native size, with no continuous scaling,
  perspective or floating callouts. A short entrance clears its transforms.
  Daily chart values, bar heights and the total use one shared sample dataset.
- Platform sequence: a persistent category menu sits above six overlapping
  product cards. Each incoming card rises at native size while the previous
  card recedes to 92%, then 86%. Only two backplates remain visible. Reading
  holds keep the foreground UI still and fully opaque; the selected category
  changes after a card lands in either direction. Scrolling upward restores
  earlier cards. Category tracks fill as you scroll, and the menu and connected
  diagram navigate directly to settled chapters. There are no tour instructions,
  numerical counters or skip-tour controls.
  The tour pins only above 760px wide, at least 680px high, and when the entire
  frame fits below the header. Other layouts retain direct manual tabs;
  reduced-motion mode removes transitions as well as pinning.
- Compliance sequence: three full-width, content-height cards combine their
  explanation with the relevant oversight, renewal-review or audit-history data.
  The introduction scrolls away; the named chapter menu and complete card stage
  remain below the site header. Card height follows the content instead of
  expanding with the viewport; tighter vertical padding keeps both columns
  compact without reducing text sizes or changing the animation. The shared
  grid retains a stable stack height. Desktop chapter headings and descriptions
  use larger responsive type across the available column, with balanced heading
  wrapping; the product UI remains at native size. There are no numbered chapter badges, card
  numbers, tour counters or duplicate workspace headings. Earlier cards recede
  to 92%, then 86%; the foreground remains at native size. Scroll upward to
  reverse. Reading holds follow each landing, and category selection remains
  stable during partial transitions. The stage pins only in viewports at least
  680px high when all the content fits. Smaller layouts and enlarged text use
  direct chapter tabs without clipping the data. Chapter tabs support arrow
  keys, Home and End, and navigate to settled cards when scrolling is enabled.
- Short viewports, large text that prevents a safe fit, and reduced-motion
  mode use direct chapter selection without pinning. Touch scrolling is native.
- Scroll-linked zoom is retained on the team photo and recessed platform and
  compliance pages, not the active UI. Product sections alternate text and visuals left-to-right.
- Lenis: one scroll engine driven by the GSAP ticker, disposed alongside its
  listeners and ScrollTriggers on unmount or preference changes.
- Six module tabs support arrow keys, Home and End. Mobile navigation supports
  Escape; FAQ disclosures use native details/summary.
- No parent-frame access, injected host controls, analytics or form submission.

## Content and scope

The landing page is in `app/page.tsx`, its styling in `app/preview.module.css`,
and its animation lifecycle in `app/use-preview-motion.ts`. The compliance
page stack is in `app/compliance-workspace.tsx` with scoped styling and a small
chapter-timing model in `app/compliance-model.ts`. Shared palette
tokens are in `app/globals.css`.
The product-style hero interface is in `app/dashboard-preview.tsx`, with scoped
styling and a shared chart dataset in `app/dashboard-data.ts`.
The platform tour and its six product views are in `app/platform-tour.tsx`,
with scoped styling in `app/platform-tour.module.css` and independently
testable chapter timing in `app/platform-model.ts`. Its interaction direction
references the persistent category menu and overlapping sticky product panels
on [Razorpay](https://razorpay.com/#build-ai-native). Crewzy adds reversible
depth scaling with the preview's existing GSAP setup; this is a custom
adaptation, not copied template code or a claim about Razorpay's exact animations.

Product examples use fictional Northstar Studio records. Workspace names,
headings and benefit labels use stronger typography and contrast; all three
shared benefits remain visible on small screens. This is a marketing
preview, not the working HR application. Demo links open an email draft to
sales@crewzy.io. Sign-in and signup keep the existing product destination,
https://dev.crewzy.io, configurable with NEXT_PUBLIC_APP_ORIGIN.

Existing secondary routes were retained as reference content, not redesigned.
Compliance copy is based on the original site and makes no certification or
regulatory-compliance guarantee. Review all product claims before publication.

## Deployment and review status

This branch is for design review, not a production release. The existing
`netlify.toml` is unchanged: it builds with `npm run build`, publishes `.next`,
uses Node.js 20 and retains `NEXT_PUBLIC_APP_ORIGIN=https://dev.crewzy.io`.
Any branch-preview deployment depends on the repository's Netlify settings.
Do not merge into the production branch or replace crewzy.io until approved.

The preview deliberately retains `robots: { index: false, follow: false }` in
`app/layout.tsx`. Review that setting before a production release. The existing
robots and sitemap routes are retained; noindex is not access control.

## Validation

Run `npm run build`, `npx tsc --noEmit` and `npm audit` before handoff. Browser
interaction and visual testing remain a separate review step.
