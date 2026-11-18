# Tour navigation and mobile reading — 18 November 2026

## Requested result

Removed the duplicate six-link module navigation beneath the hero workspace.
The workspace illustration and its platform caption/link remain. Existing main
menu, connected-workspace diagram and product tour destinations are unchanged.

Both the six-module tour and three-stage compliance tour now share `TourTabs`:
a measured selection surface moves between labels, fine-pointer hover adds a
brand-colour wash and small icon lift, and focus/press states remain visible.
Completed module progress bars no longer look like additional selected tabs.
Inter, the existing colours and all nine chapters' content are retained.

## Mobile correction

Previously the platform scroll sequence required a width of at least 761px.
Both tours also refused to pin a card taller than the available screen. At
390×844 the platform stage measured about 1,224px and compliance about 949px,
so scrolling could not advance the hidden tabs.

At widths up to 760px both tours now use complete cards in normal document flow.
Their horizontally scrollable tab rows stick below the main menu. A shared
native-scroll observer selects the chapter at the reading line, in either
direction, and keeps its tab visible. Tapping a tab scrolls to the actual card
with header/rail clearance. All visible mobile cards are accessible and not
inert; no content is squeezed into a viewport-sized pin or discarded.

Desktop retains the existing GSAP card sequence and size-based fallback. The
mobile observer and desktop pins are mutually exclusive and clean up on resize.
Existing module deep links also resolve to the correct mobile card. Reduced
motion preserves ordinary document reading and instant tab navigation, with
the marker/hover transitions disabled.

Browser QA also exposed a keyboard issue: the page's native-scroll cancellation
listener cancelled navigation started by a tab's handled Home/End key. It now
respects `defaultPrevented`, so the control owns that action while unhandled
native scrolling keys still interrupt inertia.

## Evidence

- Repository lint and TypeScript checks pass.
- Deploy-preview webpack build passes with all 35 generated routes.
- Read-only built-site audits pass: 22 pages and 1,811 internal links/anchors;
  18 marketing pages pass canonical, metadata, structured-data, favicon,
  sitemap, social-image and preview-indexing checks. The six-link reduction
  from the previous preview is exactly the requested duplicate row removal.
- At 390×844, native scrolling selected People → Recruitment → Time & projects
  and reversed to Recruitment. Tapping Finance landed its card at approximately
  164px; scrolling onward selected Compliance.
- Compliance tap navigation landed Renewal review at approximately 164px;
  forward scrolling selected Audit history and reverse scrolling selected
  Renewal review. Both mobile rails held at 84px beneath the site menu.
- Reloading `/#module-finance` selected Finance and restored the card at 164px.
- At 320×740 all nine mobile cards are visible and non-inert; document width
  equals the viewport with no horizontal page overflow.
- Resizing from phone to 1280×900 restored desktop pin mode, with only the
  active desktop panel accessible. Click, ArrowRight and End were exercised.
  After the keyboard fix, End on Document oversight finished on Audit history
  (panel around 222px, rail around 100px) with focus on its selected tab.
- Desktop hover was observed on Recruitment, with the computed brand-tint
  background. The moving selection indicator measured the selected tab.
- `git diff --check` and regression-test syntax checks pass. Regression sources
  cover reading-line selection in both directions, unequal card heights,
  keyboard wrapping and cancellation of handled versus native scroll keys.
  Full unit execution/coverage remain Jenkins-owned and are not claimed here.
- Reduced-motion behavior was inspected in source; OS preference switching and
  physical-phone touch testing were not performed in this browser tool.

Screenshots are under this chat's `crewzy-tours-20261118` visualization folder,
including desktop tabs/compliance and mobile finance/compliance. A pre-edit
snapshot was retained in the system temporary directory. No new packages,
external messages, form submissions, commits, pushes or deployments occurred.

## Change Compliance Report — crewzy-www / tour navigation

- Reuse: Existing GSAP/Lenis, chapter content, anchor helpers, icons and colour
  tokens reused. Shared Common was searched; it has no browser tab/scroll UI.
  Both tours now share one tab component and one mobile scroll implementation.
- No-assumptions: Reproduced viewport/fit conditions and verified rendered card
  heights, selected states, hidden/inert attributes and keyboard completion.
- Layering/OOP: Presentation, shared control, pure selection policy and DOM
  scroll lifecycle remain separate; no backend/API code changed.
- Config/overrides: No new runtime configuration. Breakpoints, sticky clearance
  and motion styling are presentation constants; existing motion preference and
  site colour/font variables apply.
- Tenancy/RBAC: Not applicable to these public illustrative product tours;
  customer access controls and claims are unchanged.
- Audit: No customer-data operations; local verification evidence recorded here.
- Errors/logging: No broad exception handling or sensitive logging introduced.
- Duplication: Removed duplicated tab keyboard handlers and styling, and the
  unwanted workspace link row. Shared mobile behavior covers both sections.
- Unused code: Removed the duplicate row's imports/styles and superseded tab
  refs/classes. No animation library was added.
- Tests: Browser/build/static/HTTP evidence above; new regression sources await
  Jenkins. No coverage percentage or remote CI pass is claimed.
- Workflow automation: No external automation or notification change.
- Product value: Clear selection feedback and complete, readable mobile tours
  with scroll and tap navigation working together.
- Cross-service impact: None. Pricing, chat, QR, guides and backend integrations
  retain their existing contracts.
- Skill updated: This local review records the delta; shared external skill
  files were not changed.
- Residual risk / follow-ups: Physical-device touch and OS reduced-motion smoke
  checks remain appropriate before release, together with the existing Jenkins
  and hosted enquiry-delivery prerequisites. Nothing was published.
