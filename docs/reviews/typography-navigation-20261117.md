# Crewzy typography and scrolling — 17 November 2026

Local review candidate in `codex/meetup-product-guide` at
`http://127.0.0.1:3214/`. Nothing committed, pushed or published.

## Changes

- Inter is the shared, self-hosted variable font for pages, illustrations,
  navigation, chat launcher and chat panel. Removed the unused Nunito download.
  One font-family token replaces competing component defaults.
- Shared label/detail tokens are 12px and 13px at the default root size, expressed
  in rem. Raised the previous 9–11px declarations, including responsive captions,
  menu group titles, pricing notes, meetup/QR captions and chat supporting text.
  Chat field labels and subtitle are 13px; inputs remain 16px. Heading hierarchy,
  brand colours and the original hero wording remain intact.
- The 320px header uses tighter spacing so the demo label stays at 12px and
  the menu retains its 44px touch target.
- One shared Lenis instance replaces the two route-specific implementations.
  It uses the existing GSAP ticker: wheel settling is .85s and section navigation
  .7s. Touch scrolling stays native. It responds to reduced-motion preference
  changes during a visit, releasing the engine when motion is reduced.
- Shared SiteLink uses Next's prefetched client navigation for internal routes
  and native links for same-page fragments, external sites and downloads.
  The homepage retains its module/chapter-aware hash navigation; other pages use
  a shared fragment handler. CSS applies header clearance once.
- Route changes, browser history, scrolling keys and chat opening cancel stale
  inertia. Quick second section clicks reuse the existing cancellation/measurement
  helper. Nested menus and the chat panel retain independent native scrolling.

## Validation

- Production webpack build and its TypeScript phase pass. Standalone TypeScript
  check and `git diff --check` pass.
- Next core-web-vitals lint passes for 38 changed/new TypeScript files, with zero
  errors/warnings. Final scroll/chat helpers checked again after refinement.
  A broader 68-file scan identified one pre-existing React refs lint error in
  untouched `app/mailto-link.tsx:14`; no rules were suppressed. The inherited
  ESLint 10/legacy lint script still requires the sibling frontend's installed
  ESLint 9 runner with this site's Next configuration.
- HTTP checks pass: 984 links/anchors across 13 public pages, and metadata,
  canonical, indexing, sitemap and social-image checks for 9 marketing pages.
  The scripts emit only the inherited Node module-type warning.
- Browser audit at 390px across all 13 public pages found Inter as the body
  font, no rendered text declarations below 12px and no document horizontal
  overflow. This does not claim a comprehensive accessibility certification or
  measure embedded artwork's optical text size.
- Desktop, tablet and narrow-phone checks cover 1280×850, 768×1024, 390×844 and
  320×740. Chat subtitle/labels compute to 13px, helper text to 12px and inputs to
  16px. The desktop Finance deep link selects Finance after scrolling; a quick
  switch to Pricing reaches the page top. Pricing section links, meetup public
  FAQs from chat, browser back and a cross-page Security & trust link work.
  Security lands below the fixed header at approximately 116px.
  Final 320px check confirms the 12px demo label and menu inside the header
  (menu right edge 299px, header right edge 306px), without horizontal overflow.
  Wheel input activates the shared smooth engine; ArrowDown opens and focuses
  the desktop menu, and Escape closes it and restores trigger focus. All six
  desktop menu items compute to Inter 14px/500. Final console has no captured
  warnings or errors.
- Reduced-motion branches and native-touch options inspected in source. The
  available browser tools do not emulate preference changes or real touch
  hardware, so those paths are not claimed as device-tested.
- Added regression cases in `tests/anchor-navigation.test.mjs` for decoded
  fragments and rejection of other routes/origins/queries or malformed hashes.
  Existing cases cover quick interruption and preserving deliberate scroll locks.
  Syntax checked; unit execution/coverage remain for Jenkins per repository
  instructions. No local test-suite/coverage claim.

Screenshots: `crewzy-typography/desktop-chat.jpg`, `mobile-chat.jpg` and
`mobile-home.jpg` under this chat's visualizations directory.

## Change Compliance Report

- Reuse: Existing Inter, Lenis, GSAP, native scroll, Next Link and the measured
  target helper; no packages added. Existing common-module review found no
  marketing navigation replacement.
- No assumptions: Read installed Next navigation guidance and Lenis source/types;
  checked source and actual computed typography rather than visual estimates.
- Layering/OOP: One shared scroll provider, one link policy and a pure fragment
  resolver; homepage chapter navigation stays with its motion coordinator.
- Config/overrides: No new service/runtime settings. Type scale and motion timing
  are presentation constants. Reduced-motion preference overrides smoothing.
- Tenancy/RBAC/audit: No changes to authentication, staff permissions, customer
  records, administrative actions or data-access logging.
- Errors/logging: Existing honest local form-error behavior retained; no contact
  details logged and no form submission or external message sent during review.
- Duplication/unused code: Removed the duplicate Lenis clock, old window escape
  hatch, redundant scroll-style restoration and Nunito font import. Shared font
  and label definitions replace component-specific small sizes.
- Tests: Build/types, changed-file lint and HTTP checks pass; browser evidence and
  inherited lint limitation are recorded above. New regression source awaits CI.
- Workflow automation: No notifications, scheduled tasks or messaging changed.
- Product value: Readable small text, consistent page/chat typography, faster
  client routing and consistent section/wheel scrolling without touch hijacking.
- Cross-service impact: None; public site presentation/navigation only.
- Skill delta: Applied professional-web-craft and Crewzy standards. This local
  report records the implemented delta; no external shared skill file changed.
- Release follow-ups: Reconcile the newer published SEO/analytics source before
  any future release. Verify Netlify Forms delivery, the live meetup QR route and
  required CI under separate publication authorization. Existing dependency and
  toolchain follow-ups remain. Local review does not replace those release checks.

## Hero simplification and headline entrance

At the user's request, removed the top “People. Work. Compliance. Connected.”
eyebrow and the visible “Illustrative workspace” label. Removed their unused
CSS and the now-unused Layers import from the homepage. Existing accessible
sample-workspace identification remains with the dashboard component.

The main headline now has a single 1.4-second zoom-out entrance: scale 1.08 to 1
on desktop, 1.04 to 1 on mobile, with a small 10px upward settle. It stays fully
opaque and ends with no transform so text returns to native rendering. This
headline was removed from the GSAP hero selector, leaving CSS as its only motion
owner. The animation runs on page entry, does not loop or scrub during reading,
and only applies with `prefers-reduced-motion: no-preference`.

Change Compliance Report addendum: reused the existing headline and motion
conventions; no packages, service configuration, backend, tenancy, RBAC, audit,
logging, workflow or data changes. Removed obsolete presentation code rather
than retaining unused selectors. Production build/TypeScript, changed-file lint
(zero errors/warnings) and whitespace checks pass. Browser inspection confirms
both labels removed, initial desktop scale above 1, final transform `none`,
opacity 1 throughout and no overflow at 1280px or 320px. At 320px the animated
headline stays within x=12.8 to 307.2px. Reduced-motion CSS was inspected; browser
preference emulation is unavailable. No new tests for this reversible visual
change; previous CI/release limits still apply. Local preview refreshed; nothing
published. Screenshots: `crewzy-hero/desktop.jpg` and `crewzy-hero/mobile.jpg`
under the same visualizations root. This addendum records the local skill delta.
