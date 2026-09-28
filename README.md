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

The original centred hero and three benefit highlights are retained, without
the small hero badge. The primary action reads “Forever free for up to 10
employees” and links to the existing signup destination. The
editorial refinement layer in `app/editorial.module.css` strengthens text contrast
and varies the rhythm of the lower sections. Product text stays native HTML.
Entrances use small, one-time movements without fading readable content; the
platform and compliance stacks remain reversible with shorter scrub catch-up.
Reduced-motion fallbacks remain in place. Anchor links use the existing CSS
scroll margin without a duplicate Lenis offset. The illustrative team photograph
and its generation provenance are documented in `ASSETS.md`. Published template
code and the reasoning behind these refinements are recorded in
`DESIGN-RESEARCH.md`.

Marketing sections share `SectionHeading` and `section-heading.module.css`:
13px uppercase labels with a short accent rule, 48px maximum responsive
headings at weight 650, 17px body copy, and consistent 18px text spacing.
Mobile uses 12px labels, 34px headings and 16px body copy. All marketing sections,
including compliance, use shared navy/cobalt tokens. Product UI typography is
independent. Platform explanatory copy sits immediately below its heading.

Compliance carries the same cobalt selected tabs, chapter icons and heading
accents, with crisp white product surfaces against a pale blue canvas. Green
and amber are reserved for success and attention states inside the product UI;
they do not establish a separate section theme. The page's secondary
headlines use brand colour or deep ink instead of faded grey. This treatment
does not change the hero layout, chapter copy, timing or pinning behaviour.
The standalone compliance disclaimer has been removed from the section as
requested; the FAQ still explains the scope of the compliance tools.

- GSAP + ScrollTrigger: entrance sequences, chart reveal and reading progress.
- Connected-workspace diagram: the central Crewzy identity and Connected
  status remain stationary. The six outer cards expand outward and zoom to
  native size as the section enters; scrolling back reverses the motion.
  Connector geometry expands with the cards. The mobile displacement is
  gentler, and reduced-motion mode shows the fully expanded static diagram.
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
  On taller screens the section introduction stays with the slideshow, keeping
  the heading visible instead of leaving a large empty area under a top-aligned
  stage. Shorter screens pin just the cards. The next section follows with 32px
  separation (24px on mobile), replacing the old 110px/70px tour margin.
- Compliance sequence: three full-width, content-height cards combine their
  explanation with the relevant oversight, renewal-review or audit-history data.
  The introduction stays with the cards when the combined content fits; on
  shorter screens it scrolls away and only the chapter menu and card stage
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

Product examples use fictional records in the branded Crewzy HQ demo workspace.
The shared `preview-identity.ts` supplies the workspace and role-based account
labels (Workspace admin / People Operations) without invented account initials.
Workspace names,
headings and benefit labels use stronger typography and contrast; all three
shared benefits remain visible on small screens. This is a marketing
preview, not the working HR application. Demo links go to `/contact#demo`,
where a clearly labelled email action opens a draft to sales@crewzy.io. There
is no booking calendar or form backend. Sign-in and signup keep the existing
product destination, https://dev.crewzy.io, configurable with
`NEXT_PUBLIC_APP_ORIGIN` in `app/site-config.ts`.

## Navigation, pages and shared identity

`app/site-shell.tsx` supplies the same responsive header and footer on all six
pages: Home, Platform, Solutions, Customers, Resources and Contact. Menu and
footer destinations live in `app/site-navigation.ts`; brand wording, portal
origin and contact destinations are centralised in `app/site-config.ts`.
The simple supporting caption is **People, work and compliance. Connected.**
The approved homepage headline is unchanged.

The Platform overview gives each module an addressable detail card. Module
links into the homepage select the corresponding card and settled scroll
chapter, including on direct arrival, history navigation and the mobile tab
fallback. Selection is restored after ScrollTrigger refreshes so visible and
accessible panels agree. Existing Solutions, Customers and Resources copy is
retained, with the shared blue typography and navigation treatment.

Home anchors share one handler for same-page clicks, direct arrivals and hash
history. Before scrolling, `app/anchor-navigation.ts` remeasures Lenis after
GSAP pin spacers have expanded the document. This avoids cross-page AI/FAQ
links being clamped to the old page height. Section CSS is the single source
of header clearance; no extra root padding or numeric Lenis offset is added.
Initial hashes wait for fonts and window load; a new link cancels an unfinished
programmatic scroll so rapid selections cannot continue toward an old target.
The link audit checks routes and IDs; actual landing positions are verified
separately in the browser, including cross-page and mobile navigation.

All five secondary pages use `app/content-typography.module.css` for the
approved Solutions text hierarchy: 400 body, 500 supporting links and labels,
and 600 headings and primary actions. Shared roles cover hero and section
headings, cards, notes, audience tiles and steps, with consistent line-height
and navy/blue emphasis. Page-specific layouts and responsive card sizes stay
in their own stylesheets. The homepage, wordmark, navigation and product UI
keep their approved treatments.

The footer includes product, audience, resource and contact links. Customer
content remains explicitly early-access; no customer quotes, certifications,
registered address or company number have been invented. Public Privacy and
Terms URLs returned 404 during this review, so legal links are omitted until
approved pages are supplied. Add those before a production release. A supplied
booking URL can replace the email-based demo flow centrally.

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

Run `npm run build`, `npx tsc --noEmit` and `node --test tests/*.test.mjs`.
With the local preview running, `node scripts/check-site-links.mjs` checks
all internal routes and anchors on the six public pages. Pass a preview URL
as the first argument to audit a different origin. Browser interaction and visual testing
remain a separate review step. Do not rebuild `.next` while checking a loaded
production preview; restart the server and reload after each build.
