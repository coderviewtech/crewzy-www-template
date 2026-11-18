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

## Meetup page and product guide

`/meet`, the tour and public FAQs let visitors explore without sharing contact
details. **Ask about Crewzy** first collects a required name and email for a
product follow-up, then shows prepared answers from `app/product-guide/content.ts`.
The same answers appear in the home FAQs and data/security questions. Staff-access
controls reflect the owner's confirmation that the listed safeguards are implemented.

The chat POSTs an enquiry to Netlify Forms using `public/__forms.html`, the static
registration/target required by the current Next.js adapter. It sends name, email,
an enquiry-source category, the follow-up request wording and notice version.
No phone, transcript, question selections, URL queries or AI service is involved.
Submitting is a request for a product follow-up, not an ongoing marketing opt-in.
An in-memory flag avoids asking again during client-side navigation; a fresh page
load starts again. It is a lead flow, not authentication or a verified-email gate.

Hosting setup and production publication were completed and tested on **18 November 2026**:

- Form detection is enabled on the existing Crewzy Netlify project, and
  `crewzy-product-enquiry` is registered with honeypot protection.
- A confirmed, form-specific notification sends `Crewzy website enquiry` to
  `sales@crewzy.io`. The submitted `email` sets Reply-To. This configuration lives
  in Netlify and is not controlled by source code.
- The draft and the published `crewzy.io` homepage chat each saved a labelled
  test name/email, unlocked the prepared answers, and delivered the matching
  notification to the Zoho Sales folder. See the
  [setup report](docs/reviews/netlify-form-setup-20261118.md) and
  [production release report](docs/reviews/netlify-publication-20261118.md).

Keep dashboard/export permissions and enquiry review/deletion arrangements under
operational review. Provider spam filtering and client input checks do not verify
email ownership. The labelled synthetic test remains available for owner review.

`NEXT_PUBLIC_ENQUIRY_TIMEOUT_MS` is documented in `.env.example`. Errors preserve
fields and never unlock the chat. No POST retries happen automatically. A local
Next server does not process Netlify submissions: failure there is expected, not
a reason to show a fabricated success. Hosted delivery was verified on the draft
preview and on the published site.

See [Netlify's Next.js form integration](https://opennext.js.org/netlify/forms)
and [form notifications](https://docs.netlify.com/manage/forms/notifications/).

`/meet/qr.png` and `/meet/qr.svg` are generated during the build and point directly
to the canonical `crewzy.io/meet` page, now published and checked. Staff-access
evidence, recommended operational controls and validation
are recorded in `docs/reviews/meetup-guide-20261113.md`.

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
product destination, https://app.crewzy.io, configurable with
`NEXT_PUBLIC_APP_ORIGIN` in `app/site-config.ts`.

## Navigation, pages and shared identity

`app/site-shell.tsx` supplies the shared responsive header and footer across
marketing, guide and legal pages. Menu and
footer destinations live in `app/site-navigation.ts`; brand wording, portal
origin and contact destinations are centralised in `app/site-config.ts`.
The simple supporting caption is **People, work and compliance. Connected.**
The homepage headline and introduction now identify the HR, document, time and invoicing workflows.

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
company facts have been invented. Verified company details are centralised in
`app/company.ts`. Privacy, Terms, DPA and subprocessors pages are linked in the
footer and retain their existing noindex launch policy. A supplied
booking URL can replace the email-based demo flow centrally.

Compliance copy is based on the original site and makes no certification or
regulatory-compliance guarantee. Review all product claims before publication.

## Deployment and review status

Netlify serves `codex/crewzy-light-compliance-redesign` as the production branch
for crewzy.io. Pushing to it triggers deployment. `netlify.toml` builds with
`npm run build`, publishes `.next`, uses Node.js 24 and retains
`NEXT_PUBLIC_APP_ORIGIN=https://app.crewzy.io`. Do not push without approval.

## Search and link previews

`app/site-seo.ts` owns the canonical site URL, shared metadata helper and indexing
policy. Each public page defines its own title, description and canonical, with
matching Open Graph and Twitter metadata. The homepage uses the shared
`siteCaption` from `app/site-config.ts` as its share title and social-image
headline. The search title describes HR, compliance, time tracking and invoicing.
The homepage description starts with “HR and compliance software” to make the
compliance offering clear even in a shortened snippet. Google may choose text
from the page instead of using the meta description verbatim.
The legacy `siteKeywords` metadata is retained for compatibility; Google ignores
that tag. Search intent is implemented in visible content, headings, unique
titles and descriptions. `app/site-routes.ts` owns four focused workflow URLs
and the public marketing inventory. `app/feature-content.ts` supplies their
original content, workflow steps, buyer questions and product boundaries.
`app/platform/[feature]/page.tsx` pre-renders only those known URLs, with visible
breadcrumbs and matching BreadcrumbList structured data. Unknown slugs return 404.
The footer, platform overview and related-workflow links make the pages discoverable.

The blue search favicon uses the stable `/favicon.png` URL (96×96 PNG), declared
through `siteIcons` in the root metadata alongside the existing SVG. Its artwork
comes directly from `app/icon.svg`; regenerate with `node scripts/generate-favicon.mjs`
after changing the SVG. Google must recrawl the homepage and icon before its old
purple search-result icon can refresh; clearing a browser cache does not update
Google's stored result. See [Google favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search).

Only Netlify's `CONTEXT=production` builds allow indexing. Local builds, branch
deploys and deploy previews keep `noindex, nofollow`, even with
`NODE_ENV=production`. Robots.txt permits crawling so those tags can be read.
Only production advertises a sitemap, containing the seventeen public marketing
pages and no portal or noindex legal URLs. The sitemap and SEO/link audits share
the route inventory. Sitemap modification dates are omitted rather than invented
at every build. Preview responses also send `X-Robots-Tag: noindex, nofollow`,
including assets without an HTML head. Noindex is not access control.

Optional `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` public tokens are
documented in `.env.example`. Set only the bare token issued for this website,
not a whole meta tag. Missing or invalid values emit no ownership claim. The
existing Search Console DNS verification does not require another Google token.
Ownership metadata does not itself enable tracking. The measurement and search-platform plan is in
[`docs/reviews/seo-20261117.md`](docs/reviews/seo-20261117.md).

## Visitor analytics

The owner authorised the GA4/Bing release on 17 November 2026. The production
context in `netlify.toml` supplies public GA4 ID `G-SLHHQ68M3R` and the Bing
ownership token issued for crewzy.io. These are public identifiers, not credentials.
The GA4 account uses `coderview.io@gmail.com`, UK reporting time and GBP; its web
stream is **Crewzy marketing website**. Optional account data sharing, marketing
emails and enhanced measurement are off. No advertising account is linked.

`app/analytics-config.ts` validates `GA_MEASUREMENT_ID` and
`ANALYTICS_CONSENT_DAYS` (default 180, integer 1–365). Empty/invalid IDs and all
non-production contexts disable analytics. `AnalyticsConsent` offers equally
prominent accept/reject controls and persistent Cookie settings. The Google tag
loads only after acceptance on the canonical public origin and a known site path.
The local consent record is versioned and expires; withdrawing disables the tag,
clears only its prefixed cookies and reloads to remove the loaded library.

Only explicit page views are instrumented. Query strings, fragments, unknown paths
and referrer paths are excluded; no form values, employee records, user IDs,
advertising signals or successful-signup events are sent. SPA page changes are
deduplicated. Enhanced measurement is off to avoid duplicate automatic views and
form/link collection. Cookies are host-only with the `crewzy_marketing` prefix
and do not refresh their 180-day lifetime on each visit. The privacy and provider
pages disclose the integration. Visitors who reject or block analytics are absent
from GA4, so these reports are not a complete census of visitors.

The integration does not install a website chatbot or alter the authenticated
Crewzy assistant. The SEO release improves public content discovery by search
engines and AI search tools; inclusion in answers remains their decision.

Before any commit/push in this clone, run `pre-commit install`. The repository
hooks scan staged changes with gitleaks, lint at commit and check types at push.
Never bypass them. See the [publication report](docs/reviews/seo-publication-20261117.md).

After an approved deployment, confirm no `X-Robots-Tag: noindex` override is set
at the hosting layer. Submit `https://crewzy.io/sitemap.xml` in the verified
Google Search Console property and request homepage indexing. Google controls
recrawl timing and ranking; these changes do not guarantee search placement.
Social platforms may cache older previews; use their URL inspection/re-scrape
tools after publishing if an old card persists.

References: [Google meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags),
[Google noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing),
[Netlify deploy context](https://docs.netlify.com/build/configure-builds/environment-variables/).

## Validation

Use Node 24 and the locked dependencies (`npm ci`). `npm run verify:static` runs
Next core-web-vitals ESLint with zero warnings and TypeScript. ESLint now uses the
supported flat configuration and CLI; the incompatible legacy `next lint` command
has been removed. ESLint is pinned to 9.39.5. The lockfile resolves Next 16.3.4.

`npm run verify:ci` runs the full unit suite, builds production and deploy-preview
contexts, checks pre-rendered workflow/guide content and pricing variants, starts
bounded localhost servers, and audits SEO, links and native pricing HTTP routing.
The final build is a noindex preview. It does not publish or submit URLs. It includes
all 17 marketing routes and checks internal links across those and four legal pages.
Environment-gated artifact/HTTP tests skipped in the initial unit phase are run
in their appropriate later build/server phases. Existing Netlify-specific pricing
hosting behaviour still needs the normal post-deployment smoke check.

The owner explicitly authorised locked dependency installation, local tests/builds
and browser checks for this SEO release on 17 November 2026, overriding the skills'
CI-only runtime restriction for this task. This is not a standing waiver for other
Crewzy services. No Jenkins run or numeric changed-line coverage is claimed.

For an already-running server, use `node scripts/check-site-seo.mjs <origin> preview`
(or `production` for a production-context build) and
`node scripts/check-site-links.mjs <origin>`. Do not rebuild a running preview's
`.next` directory. Stop it first, rebuild, restart and reload the browser.

The four practical guides live in `app/guide-content.ts` and are statically rendered
under `/resources/guides/[guide]`, with a hub at `/resources/guides`. They include
visible checklists/tables, author/revision information, Article and breadcrumb
markup, and product links. Source references are official UK guidance. Examples are
illustrative; no customer or legal outcomes are invented. The date is an editorial
revision, not a fabricated publication date. Unknown guide slugs return 404.

See [UK keyword validation](docs/reviews/seo-uk-keywords-20261117.md),
[SEO audit and release checklist](docs/reviews/seo-20261117.md), and
[Change Compliance Report](docs/reviews/seo-change-compliance-20261117.md).

## App address switch — 22 October 2026

The owner confirmed that `https://app.crewzy.io` uses the separate production
application, which is being provisioned independently. The website's shared
app destination now uses that address for sign-in, signup and product CTAs;
both the code fallback and Netlify build environment agree. Local and preview
builds can still override `NEXT_PUBLIC_APP_ORIGIN`.

This is a source-only link change. It does not deploy the application, change
DNS, move development data, or alter cookies, OAuth or workspace routing.
Production infrastructure setup remains with the separate provisioning work.
The owner approved publishing these links to the existing Codex website branch.
Its push triggers Netlify; the separate production app still requires its own
release. Link tests pass, and this change does not deploy the application.


## Static regional pricing — 25 October 2026

`/pricing` now serves pre-rendered UK, India, US, euro-area and unknown-region
variants through the native Next proxy. Only Netlify's trusted country context
selects the market in production; headers, cookies, query parameters and direct
market URLs cannot select another region's currency. Missing or unsupported
geography shows the currency-neutral contact option. The application independently
controls purchasable prices from its stored billing country.

For local design review, use the existing development preview:

```sh
npm run dev -- --hostname localhost --port 3214 --webpack
```

Open `http://localhost:3214/pricing` for the UK default, or use
`/pricing?previewMarket=IN`, `previewMarket=US` or `previewMarket=EU` to review
another market. These overrides exist only in development. They do not change
production country detection or the application's billing-country controls.

Do not use a plain `npm start` server without hosting geography as the regional
pricing design preview: it intentionally renders the unknown-region “Confirm
pricing” / “Let’s talk” state. This can look as though prices were removed even
though every approved rate and calculator remains in the build. Use that mode
for production-artifact checks, and the development preview for visual review.

The Next/Netlify adapter caches separate market paths and preserves HTML/Flight
response variations. The old dynamic render and custom no-store edge wrapper are
removed. Every variant keeps `https://crewzy.io/pricing` as its canonical URL;
only the public page appears in the sitemap. Rates, the first-ten allowance,
calculator, colours and layout are unchanged.

The production build and all 82 unit/adapter/artifact/HTTP checks pass. To run the
integration checks, supply `CREWZY_PRICING_BUILD_DIR`,
`CREWZY_PRICING_TEST_ORIGIN` and `CREWZY_PRICING_EXPECTED_MARKET`; the HTTP origin
must already be running with known trusted geography. Local Next servers used
for native rewrite QA must bind with `--hostname localhost`, avoiding Next's
loopback-IP origin normalization. Do not rebuild a loaded preview's `.next`.
See `docs/reviews/static-regional-pricing-20261025.md` for the trust boundary,
platform evidence, test commands and deployment verification.

Native proxy URL normalization is skipped so an explicitly empty `_rsc` value
survives a regional rewrite on Netlify. Next's RSC request validation remains
enabled; the real-adapter and generated-config regressions check both settings.
