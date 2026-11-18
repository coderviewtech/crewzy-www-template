# Change Compliance Report — crewzy-www / workspace surfaces and colour cues

Local-only follow-up to the owner's comparison with crewzy.io. No commit, push,
deployment, external message or form submission was performed.

## Result

- Removed the tinted surround/border/shadow from the hero dashboard stage;
  its interior and shared workspace header surfaces are now near-white
  `#fdfefe`. The dashboard content and internal separators remain.
- Removed the connected-workspace section's tinted box and radial background.
  Its nodes, coloured connectors and existing animation remain on white.
- Module icons, connector colours and scrolling underline fills share palette
  tokens. Selected/hovered labels use a darker mix to preserve text contrast.
- Compliance has one full-width line, coloured green for oversight, amber for
  renewal review and blue for audit history. Removed its extra tab underline
  and baseline; moved the progress strip inside the mobile sticky navigation.
  Desktop retains continuous scroll progress; mobile/fallback shows the current
  chapter's progress. Its outer workspace canvas is white.
- Crewzy AI uses a white frame, purple top/question accents and a separated
  header. Existing readable copy, source caption, illustrative notice and
  finite entrance animation remain.
- Tablet QA found the pinned compliance element's margins were included in an
  incorrect inline width. An outer wrapper now owns width/margins, so GSAP pins
  a margin-free child.

## Evidence

- `npm run verify:static` passes: lint without warnings and TypeScript.
- Final `CONTEXT=deploy-preview npm run build -- --webpack` passes, generating
  all 35 routes. `git diff --check` passes.
- At 1280×1000, all six module underline fills exactly match their icon RGB
  values. Native scrolling selected Recruitment (purple), then Time & projects
  (amber), whose fill advanced from 0.012 to 0.452 as scrolling continued.
- Compliance selected Renewal review on click with an amber line (progress
  about 0.375), then Audit history on native scroll with a blue line (about
  0.720). Its duplicate pseudo underline is `display:none` and navigation bottom
  border is zero. The outer canvas computes to white.
- Hero surround, connection section and AI frame compute to white. Dashboard
  interior computes to RGB 253/254/254. The connection radial pseudo-element
  is absent. Desktop and mobile screenshots reviewed for readable content.
- At 390×844, native module scrolling changes purple Recruitment to amber Time
  & projects. Compliance tap navigation selects amber Renewal review, with its
  panel around 164px and sticky navigation at 84px. The progress strip is visible.
- At 320×740, all mobile compliance cards remain visible/non-inert, tabs retain
  48px height and document width equals 320px. Width also matches viewport at
  390px and 1280px.
- At 820×1180, the tablet alignment issue was reproduced (panel right edge
  842px), then fixed (left 22px, right 798px, width 776px). These margins remain
  correct after clicking Renewal review while pinned.
- Calculated selected/hovered text contrast against white ranges from 5.43:1
  to 8.25:1. Module icon/line colours are preserved separately.

Screenshots are in this chat's `crewzy-colour-restoration` visualization folder:
workspace, connections, module-colours, compliance, AI and mobile/tablet views.

## Compliance

- Reuse: Existing TourTabs, icon palette, GSAP/Lenis timelines, mobile chapter
  observer and layout reused. Shared Common has no matching browser UI utility.
- No-assumptions: Compared the live DOM styles, inspected local components and
  verified computed colours, progress transforms and actual panel bounds.
- Layering/OOP: Styling and shared presentation props; no backend/API changes.
- Config/overrides: Existing colours centralized as CSS palette tokens. No
  runtime configuration or environment variables added.
- Tenancy/RBAC: No customer-data access, permissions or security claims changed.
- Audit: No customer-data mutations; local QA evidence recorded here.
- Errors/logging: No broad exception handling or sensitive logging introduced.
- Duplication: One palette feeds icons/connectors/progress; one tab component
  serves both tours. Compliance reuses its original scroll progress timeline.
- Unused code: Removed superseded background/pseudo-element/hide rules; no
  library or unused component added.
- Tests: Build/static checks and browser evidence above. No unit suite or
  coverage run; no new implementation-mirroring style tests. The tablet layout
  failure was reproduced and remeasured after correction. No Jenkins pass claimed.
- Workflow automation: No external automation or notification changes.
- Product value: White surroundings and consistent colour cues make the tours
  easier to follow while preserving the site's content and interactions.
- Cross-service impact: None. Pricing, guides, chat, QR and contact contracts
  are unchanged.
- Skill updated: Accepted choices recorded in DESIGN-RESEARCH.md; no service
  capability change and no shared external skill-file edit.
- Residual risk / follow-ups: Browser viewport checks do not replace physical
  device testing. Reduced-motion behavior was inspected in source; OS setting
  switching was not exercised. Existing hosted enquiry-delivery and release
  prerequisites still apply. Nothing published.
