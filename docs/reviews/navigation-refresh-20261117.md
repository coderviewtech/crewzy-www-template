# Crewzy navigation and visual refresh — 17 November 2026

Local review candidate in `codex/meetup-product-guide`. No commit, push,
publication, purchase or external message. The current local server runs at
`http://127.0.0.1:3214/`.

## Result

- Platform, Solutions and Resources now open full-width menus with a featured
  overview, two labelled subsection columns, descriptive icons/links and a
  footer shortcut. On mobile they become scrollable main-menu accordions.
  Menu content reuses the existing navigation data instead of duplicating it.
- The homepage has a brand eyebrow, stronger display type, an inline benefit
  row and a pale-blue showcase around the sample workspace. The showcase adds
  six working product-module shortcuts and explicitly labels illustrative data.
- The connected diagram sits on a defined pale surface. Hover or keyboard focus
  emphasizes the matching connection and sends one finite pulse along it.
  Product-tour tabs have a segmented surface with a raised selected state.
- The closing call to action is cobalt with white text, a quiet circular motif,
  a white primary button and visible white keyboard-focus outlines.
- Motion coordinates hero elements, the product frame, menu opening, staggered
  links and featured connector illustrations. Text remains opaque. The existing
  GSAP/Lenis stack, native touch scrolling and reduced-motion guards are reused.

The original headline, supporting paragraph, colours, typography family, product
illustrations, prepared answers, required chat name/email fields, anonymous
public FAQs, QR destination and owner-confirmed staff-control wording remain.
No customer data or backend permission changes were made.

## Interaction details

Desktop hover/click and keyboard activation open menus. ArrowDown moves focus
into the opened menu; Escape closes it and returns focus. Only one menu opens
at a time, outside clicks close it, and hidden links leave the focus order.
A keyboard-focused menu link remains reachable when the pointer leaves.
The mobile main navigation is independently scrollable, and chat temporarily
hides while navigation is expanded so it cannot cover a subsection link.

The closing card uses `overflow: clip`: browser checks found that `hidden`
allowed keyboard focus to scroll text internally behind its decoration. This
was corrected and verified with scrollTop zero and unclipped headings.

## Validation

- Production webpack build and Next TypeScript check pass.
- Standalone `npx tsc --noEmit` and `git diff --check` pass.
- Next core-web-vitals lint passes for all 25 changed/new TypeScript files;
  final TypeScript adjustments were linted again with zero errors/warnings.
  Uses the sibling frontend's installed ESLint 9 runner with this site's Next
  configuration, because the inherited ESLint 10/legacy lint script is
  incompatible. No rules were suppressed or gates weakened.
- HTTP audit: 984 internal links/anchors across 13 pages pass. Metadata,
  canonical, sitemap, social-image and production-indexing checks pass for
  9 marketing pages. Scripts emit an inherited Node module-type warning only.
- Browser checks at 1280×850, 1100×800, 768×1024, 390×844 and 320×740: no document
  horizontal overflow in checked views; menu content and typography wrap; the
  menu's own scroll region exposes lower subsections.
- Checked mouse open, switching among all three menus, outside close, keyboard
  ArrowDown, Escape/focus restoration, mobile accordion opening, Finance deep
  link selecting the correct product tab, home navigation, connector focus and
  its animation, closing-card keyboard layout and chat reopening after menu
  close. Name/email remain required. Final browser console has no captured
  warnings/errors.
- Reduced-motion CSS and GSAP media-query paths inspected; available browser
  tools do not emulate preference changes. No comprehensive accessibility or
  performance certification is claimed.
- Added `tests/menu-hierarchy.test.mjs` for rendered navigation destinations,
  subsection labels and distinct initially closed disclosure panels. Syntax
  checked. It uses the existing `CREWZY_MEETUP_BUILD_DIR` artifact-test setting.
  Execution/coverage remain for Jenkins under repository instructions; no
  local unit-suite or numerical coverage result is claimed.

Screenshots are saved in:
`/Users/mano/.codex/visualizations/2026/11/13/01a1d5a0-c171-7c70-a766-d9c097e8582b/crewzy-redesign/`
(`desktop-home.jpg`, `desktop-menu.jpg`, `desktop-connections.jpg`,
`mobile-home.jpg`, `mobile-menu.jpg`). The prior pass's screenshots remain in
`crewzy-refinement/` for comparison. Reference rationale and motion timings are
recorded in `DESIGN-RESEARCH.md`.

## Change Compliance Report — crewzy-www / menus and visual refresh

- Reuse: Existing navigation data, product dashboard, module icons, brand and
  section components, native links, GSAP/Lenis and CSS reused. Common searched;
  no reusable marketing-navigation component was found there.
- No-assumptions: Inspected repo instructions, frontend pack, installed Next
  guide, source destinations, CSS/motion ownership and real browser renders.
- Layering/OOP: Presentation-only; shared SiteMenuPanel and ProductShowcase
  components isolate layout from navigation data and the motion coordinator.
- Config/overrides: No runtime variable or service configuration added. CSS
  layout dimensions and finite animation timings remain presentation constants.
- Tenancy/RBAC: Not applicable to public marketing layout; no customer-data
  access, authentication or permission changes.
- Audit: No data-access or administrative action introduced.
- Errors/logging: Chat's existing honest local error path retained. No contact
  details logged, no automatic submission or background message introduced.
- Duplication: Removed duplicate menu-column link definitions; shared one menu
  renderer and reused icon/module data for the product shortcuts.
- Unused code: Removed superseded dropdown CSS and hero-product caption styles.
  Changed TypeScript lint passes with no unused findings.
- Tests: Build/types/lint/HTTP/browser checks pass as detailed above. New rendered
  menu regression source awaits Jenkins; no coverage or test_gate claim.
- Workflow automation: No notifications, scheduled tasks or messaging changed.
- Product value: More visible hierarchy, easier subsection discovery, useful
  module shortcuts, clearer focus/selection and mobile navigation.
- Cross-service impact: No backend, API, schema, common-vendor or app changes.
- Skill updated: Reused professional-web-craft. This report and DESIGN-RESEARCH
  record the implemented/missing delta inside the authorised worktree; no edit
  to the external shared frontend skill.
- Residual risk / follow-ups: This worktree still predates the separate published
  SEO/analytics release. Reconcile that source before release instead of replacing
  it wholesale. Verify Netlify Forms enquiry processing/notifications, the live
  `/meet` QR destination and required CI at a separately authorised release.
  Inherited dependency/toolchain follow-ups remain; no packages were added here.

## Main-menu typography follow-up

Browser inspection at the user's 693px viewport confirmed the inconsistency:
Platform/Solutions/Resources used Inter 16px/600 with 24px leading, while the
same-level Pricing/About Crewzy/Contact links used Inter 14px/500 with 21px
leading. The responsive rule now covers both link and disclosure controls.
All six main items share 16px/600, 24px leading and 52px rows below 1051px;
desktop retains the consistent 14px/500, 21px leading.

Change Compliance Report addendum: reused the existing shared selector and
font; verified computed browser styles before and after; changed only CSS.
No new config, data access, audit, logging, service contract, automation,
duplication, unused code or runtime dependency. Production build/types and
`git diff --check` pass. Browser checks at 693px, 390px and 1280px confirm one
main-menu type style per breakpoint and no mobile horizontal overflow. No
new unit tests for this reversible CSS adjustment; previous CI limits and
release follow-ups still apply. This local record carries the skill delta.
Screenshot: `crewzy-redesign/menu-typography.jpg` alongside the other previews.
The preview was refreshed and left open; nothing published.
