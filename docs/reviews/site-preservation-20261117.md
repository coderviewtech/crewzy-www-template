# Site preservation and headline entrance — 17 November 2026

## Outcome

Reconciled this older local design preview with the newer published source,
retaining the approved design, chat, meetup and regional pricing work. Nothing
was committed, pushed, merged into a remote branch or deployed.

The comparison baseline is published-source commit
`182f287850258154741454ff653869ce8e16da95`, verified against remote branch
`codex/crewzy-light-compliance-redesign` and the clean
`crewzy-seo-20261117/crewzy-www` worktree. Read-only requests to all 21 published
pages on `https://crewzy.io` returned 200. A snapshot of the local work preceded
integration; existing uncommitted changes were preserved.

## Content and functionality restored

- Four product workflow pages covering small-business HR, document expiry,
  timesheets/invoicing and leave management.
- The practical guides hub and all four complete guides, their checklists,
  worked examples, tables, sources, breadcrumbs and related product links.
- Guide discovery in Resources, the main Resources submenu and footer; product
  workflow discovery in Platform and a Workflows footer group.
- Published page metadata, structured data, sitemap, search-verification
  configuration, favicon references and preview indexing safeguards.
- Consent-based analytics and privacy choices, including the published privacy
  and provider disclosures. The mobile cookie controls and chat launcher now
  occupy separate positions; the launcher hides while the consent panel is open.
- Published Node 24, ESLint flat configuration, hook definitions and release
  verification scripts. Existing QR dependencies and chat/meetup checks remain.

The pricing model and production geography proxy match the published source
byte for byte. UK £8/£6, India ₹149/₹119, US $10/$8 and euro-area €9/€7 monthly
versus annual monthly-equivalent rates remain unchanged, with the first ten
employees included. Local review continues on the development server so UK
pricing appears by default; `?previewMarket=IN` previews India. Production still
uses trusted Netlify geography and rejects browser-supplied market overrides.

## Visible content comparison

Compared published main-content blocks and link destinations with the combined
build for every published page. All published main-content link destinations
are present. Four workflow data sets, all guide content, company information,
pricing, analytics policy/runtime and legal policy data match the published
source exactly. The machine-readable comparison is in
`evidence/site-preservation-20261117/content-comparison.json`; counts are
diagnostic (duplicate blocks and grouping differ), not a claim of identical DOM.

Reviewed text differences are intentional:

- The homepage security question is now the previously approved shared FAQ,
  “How is customer data protected?”, with the fuller safeguards answer and the
  same Security & trust destination. The earlier generic link-only answer was
  replaced, not silently lost. “Explore the full platform” remains inside the
  expanded workspace caption.
- Older menu category labels were replaced by the approved menu hierarchy;
  their destinations remain available.
- Privacy retention/sharing and Netlify provider wording now also covers the
  chat's website enquiries. The original account, support, backup and expiry
  retention statements remain within the expanded paragraphs.
- The two labels the user explicitly removed—“People. Work. Compliance.
  Connected.” above the hero and the visible “Illustrative workspace” badge—
  remain removed. Accessible descriptions still identify sample product UI.

## Headline animation

The original headline and supporting copy are unchanged. A small client
component starts the entrance after the page load and font readiness, preventing
the entrance from finishing before it can be seen. CSS scales the heading from
1.16 on desktop/tablet and 1.08 on mobile to its native size over 1.8 seconds,
with a 150 ms initial delay. The effect replays on refresh. It has one animation
owner, remains fully opaque, and leaves no persistent transform. It is disabled
by the existing reduced-motion preference; without JavaScript the text remains
readable at native size.

Browser observations recorded scale 1.16 at entrance and `transform: none` after
completion on desktop, and scale 1.08 on mobile. At 320 and 390 px the enlarged
heading fits within the viewport. At 768 px the heading box scales past its
layout width but the actual centered text remains fully visible; screenshots
confirm no clipping. No document horizontal overflow was observed at 320, 390,
768 or 1280 px.

## Verification

- `npm run verify:static`: repository lint with zero warnings and TypeScript pass.
- Production webpack build with a synthetic analytics ID: pass, 35 generated
  routes including all workflow, guide and QR routes.
- Production HTTP link/anchor audit: 22 pages, 1,839 internal links, pass.
- Production SEO audit: all 18 marketing pages, metadata, canonicals, JSON-LD,
  sitemap, social image, favicon and indexing checks pass.
- Deploy-preview webpack build: pass. Preview SEO audit: 18 pages pass, including
  noindex headers/metadata. Preview link audit: 22 pages, 1,817 links pass (the
  production-only consent link accounts for the difference).
- A first SEO probe against `next dev` encountered Next's localhost social-image
  URL behavior. The actual deploy-preview production build passes the same
  unchanged canonical-image checks. No production assertion was weakened.
- `git diff --check` and syntax checks of the updated verification/menu/meetup
  test files pass. Full unit suites and coverage remain Jenkins-owned under the
  Crewzy standards; they were not run locally and no Jenkins pass is claimed.
- Desktop menu keyboard opening, Escape/focus return, Resources → Guides →
  complete guide → product workflow navigation, and guide section scrolling
  checked. The guide anchor settles 110 px below the viewport top.
- Mobile menu → meetup navigation, anonymous staff-control FAQ expansion,
  product-tour Finance and compliance Audit history tabs checked.
- Consent reject, reopen, accept and withdrawal/reload checked using a synthetic
  public analytics ID. The banner hides the chat launcher; mobile closed
  controls remain separate. Localhost never inserts a Google tracking script,
  including after acceptance, because the published canonical-origin guard
  remains in place.
- Chat blank-field validation and local submission failure checked using only
  synthetic details. Failure displays an honest message and a contact link;
  it does not falsely report success or unlock the chat. No external enquiry
  was sent.
- Both QR download routes return 200 with their expected media types. The PNG
  was decoded to exactly `https://crewzy.io/meet`.
- UK calculator: 15 employees → £40/month or £360/year. India: 15 employees →
  ₹745/month or ₹7,140/year. India mobile pricing has no horizontal overflow.
- About, Contact, Customers, Solutions, Resources, Guides and Privacy checked
  at 390 px: Inter headings and no horizontal document overflow.

Screenshots are in this chat's `crewzy-preservation` visualization folder:
`desktop-home.jpg`, `desktop-zoom-start.jpg`, `desktop-guides.jpg`,
`mobile-home.jpg`, `mobile-zoom-start.jpg`, `tablet-zoom-start.jpg` and
`mobile-consent.jpg`. Public response, content-comparison and mobile geometry
records are retained under `evidence/site-preservation-20261117`.

## Change Compliance Report — crewzy-www / preservation and entrance

- Reuse: Integrated the published implementation; reused existing route data,
  consent policy, shared SiteLink, fonts, pricing and product guide.
- No-assumptions: Compared remote source, live HTML, filesystem contents and
  rendered behavior. Differences and test limits are recorded above.
- Layering/OOP: Marketing content remains in shared data/server pages; browser
  animation and consent stay in client components. No backend layers changed.
- Config/overrides: Restored published build context, GA and verification
  configuration with `.env.example` documentation. No secrets added. Production
  country authority and development-only preview overrides remain unchanged.
- Tenancy/RBAC: No customer workspace queries, tenant guards or roles changed.
  Staff-control copy preserves the user's implementation confirmation; this
  website review does not independently certify backend access controls.
- Audit: No customer-data access paths changed. Source and UI review evidence
  are recorded here; backend access audit events are outside this change.
- Errors/logging: Existing consent origin guard and submission failure behavior
  retained. No broad error swallowing or new sensitive logging.
- Duplication: Guides, workflows, prices and FAQs use their existing shared data.
  The headline has a single animation owner.
- Unused code: Replaced the superseded ESLint config as in the published source;
  no unused component or runtime dependency introduced.
- Tests: Static/build/browser/read-only HTTP evidence above. Regression test
  sources and release audit inputs include the combined meetup/menu/SEO routes;
  Jenkins must prove the full suite before release.
- Workflow automation: Published release verification and hook definitions
  restored. No automation, external notification or deployment was triggered.
- Product value: The redesign now preserves the newer published content and
  privacy choices, with a visible refresh entrance and usable mobile controls.
- Cross-service impact: None to product APIs or payments. Netlify Forms remains
  the enquiry integration; production GA uses the existing consent boundary.
- Skill updated: Local review evidence records the implementation delta; shared
  skills outside this worktree were not modified.
- Residual risk / follow-ups: Before a separately authorized publication, run
  Jenkins/release gates, verify real enquiry capture and team delivery in the
  intended Netlify deployment, and verify deployed country/CDN pricing behavior.
  Local query previews do not prove live geolocation. No claim is made that a
  local marketing audit verifies every external system or backend control.
