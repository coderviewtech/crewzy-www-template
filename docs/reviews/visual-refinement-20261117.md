# Crewzy visual refinement — 17 November 2026

Local candidate in `codex/meetup-product-guide`. No commit, push, deployment or
external message. The owner approved visual improvements while retaining the
current style and colours, and requested a local review before publication.

## Result

The centred homepage is more compact, bringing the product preview forward.
Previously unattached CSS-module overrides are now attached to the hero,
description and actions. Responsive type and three compact mobile benefit
cards preserve the same content. Cobalt, navy, white and pale module surfaces,
the original headline, supporting paragraph and product illustrations remain.

The connected workspace is an isolated component. Its existing SVG geometry and
GSAP reveal are retained, with CSS stroke emphasis responding to pointer and
keyboard focus. Icon strokes, focus rings, navigation contrast, button feedback,
chat entrance/answer transitions and the meetup overview/QR presentation are
refined without adding packages. Text stays opaque during entrances.

Desktop pointer clicks now keep hover-open navigation open; keyboard/touch still
toggle it. Hover opening is limited to the desktop navigation breakpoint.
Mobile primary and menu controls have 44px minimum heights. The shared HomeLink
uses a native same-page hash on the homepage so its scroll coordinator runs;
other pages use Next Link. This fixes a scroll-to-top regression caught during
browser review, without suppressing lint rules.

Prepared-answer content, the name/email lead gate, public anonymous browsing,
QR destination and the owner-confirmed staff-access wording remain intact.
No security-control implementation or independent audit is claimed by this
visual work.

## Verification

- Production webpack build passes, including Next's TypeScript check.
- Standalone `npx tsc --noEmit` passes.
- Next core-web-vitals lint: all 23 changed/new TypeScript files pass with zero
  errors and warnings. The final shared-navigation adjustment is checked again.
  The existing site's ESLint 10/legacy script incompatibility requires using
  the installed sibling frontend's ESLint 9 runner with this site's Next config;
  no rules are disabled or changed.
- Rendered HTTP checks pass: 965 local links/anchors across 13 pages and metadata,
  canonical, sitemap, social image and indexing checks for 9 marketing pages.
- Browser review at 1280×800, 768×1024, 390×844 and 320×740: no document horizontal
  overflow in inspected views; readable headline/CTA/card wrapping and mobile
  header targets. Product tabs still select the relevant panel.
- Desktop click-open, Escape-close/focus return; mobile navigation expansion and
  close; connector focus emphasis; required-name validation; local submission
  failure preserving entered synthetic details; chat close/focus restoration;
  anonymous staff-control FAQ and loaded QR; home navigation from the meetup
  page and from a scrolled homepage are checked.
- Final homepage browser console has no captured errors/warnings.
- Reduced-motion CSS and GSAP guards inspected. Runtime preference switching
  was not emulated by available browser capabilities; this is not a full
  accessibility or performance audit.
- Unit/coverage execution remains Jenkins-only under the repository standards.
  No local unit suite or numerical changed-line coverage is claimed. These
  visual/state changes were checked in the actual browser rather than adding
  source-text assertions that mirror their implementation.

Screenshots:
`/Users/mano/.codex/visualizations/2026/11/13/01a1d5a0-c171-7c70-a766-d9c097e8582b/crewzy-refinement/desktop.jpg`
and `mobile.jpg` in the same directory. Local preview:
`http://127.0.0.1:3214/`; meetup/QR: `http://127.0.0.1:3214/meet`.

## Release follow-ups

This worktree predates the separate published SEO/analytics release. Integrate
these visual and meetup/chat changes with that release before publishing;
do not replace the newer production source wholesale. The localhost server
is not Netlify Forms: it deliberately rejects an unprocessed submission rather
than displaying a false success. Actual form detection, enquiry delivery and
notifications still require deployment-specific verification. The QR points
to `https://crewzy.io/meet`, whose published route must be verified at release.
The inherited dependency/toolchain issues recorded in the meetup report are
unchanged; this visual pass adds no dependencies or security remediation.

## Change Compliance Report — crewzy-www / visual refinement

- Reuse: Existing design tokens, shared header/footer, Lucide, GSAP/Lenis,
  platform tour, native dialog and prepared-answer/QR components reused.
- No-assumptions: Inspected current JSX, CSS module bindings, motion hook,
  installed Next guide, lead submission handler and final rendered pages.
- Layering/OOP: Presentation-only changes; ConnectedWorkspace isolated from
  Home; no routers, repositories or backend access changed.
- Config/overrides: No runtime configuration or environment variable added.
  Design dimensions/durations remain presentation constants/CSS values.
- Tenancy/RBAC: Not applicable to this public marketing UI; no customer-data
  permission or authentication changes.
- Audit: No customer-data access or administrative action introduced.
- Errors/logging: Existing honest submission failure retained; no contact
  details logged, no automatic POST retry, no fabricated success state.
- Duplication: Extracted connected diagram and reused HomeLink; no new animation
  engine or duplicate product/FAQ data.
- Unused code: Removed provisional styling for unused legacy dashboard classes;
  attached the previously ineffective hero module classes.
- Tests: Build, types, lint, rendered audits and browser scenarios above pass.
  Jenkins suite/coverage remain unverified; no local test_gate claim.
- Workflow automation: No jobs, notifications or messaging changed.
- Product value: Visitors see the product sooner; mobile controls, menus,
  connector relationships and chat states are clearer.
- Cross-service impact: No API, schema, common-vendor or service-contract changes.
- Skill updated: Reused professional-web-craft; implemented/missing delta is
  recorded here and in DESIGN-RESEARCH.md. The external shared frontend skill
  was not edited; this task's record remains inside its writable repository.
- Residual risk / follow-ups: Reconcile latest published SEO/analytics source,
  validate Netlify lead delivery and live QR route at a separately authorised
  release, and run required CI. Nothing published by this task.
