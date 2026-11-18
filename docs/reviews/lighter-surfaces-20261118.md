# Change Compliance Report — lighter workspace surfaces

Date: 18 November 2026. Local preview only; nothing committed, pushed or published.

## Change

Softened the grey backgrounds of the module and compliance tours while retaining
the existing cobalt/navy palette and visible selection, borders and status colours.
The shared workspace surface is now `#fbfcfe` (previously `#f6f8fb`), and both tab
rails reuse it instead of their darker `#f4f7fc` background. Module canvases mix
their existing washes with 70% white; compliance uses the existing 3% brand surface
instead of the 8% brand tint. This follow-up changes four CSS files only.

## Verification

- Visually reviewed People and Document oversight at 1280×1000 and People at
  390×844. Text, selected tabs, borders and status indicators remain distinct.
- Computed tab/header backgrounds are `rgb(251, 252, 254)` and the People canvas
  is `color(srgb 0.979765 0.983906 0.996141)`.
- Document widths match both tested viewports: 1280px and 390px, with no
  horizontal page overflow.
- `git diff --check` passes. Development preview compiled and rendered the CSS.
- No new tests were added or unit suites executed for this colour-only change.
  The preceding tour-navigation review records the earlier full static, build
  and HTTP checks; those checks were not rerun for this follow-up.
- Viewport override reset and the local People preview left open for review.

Screenshots are saved in this chat's `crewzy-lighter-surfaces` visualization
folder: `desktop.jpg`, `mobile.jpg` and `compliance.jpg`.

## Compliance

- Reuse / duplication: Reused existing brand and shared preview tokens; both
  tours share the same tab-rail surface. No new dependency or duplicate component.
- No-assumptions: Verified actual rendered colours and desktop/mobile layouts.
- Layering / OOP: Presentation-only CSS; no component or application logic changed.
- Config / overrides: No runtime configuration or environment change.
- Tenancy / RBAC / audit: No customer-data access, permission or security-claim changes.
- Errors / logging: No new error handling, logging or sensitive output.
- Unused code: No unused imports, functions or packages introduced.
- Tests: Visual and diff checks above; no new CI or coverage result claimed.
- Workflow automation: No external automation, notifications or form submissions.
- Product value: Lighter panels with clear hierarchy and readable selection states.
- Cross-service impact: None; pricing, content, chat, QR and navigation are unchanged.
- Skill updated: This report records the follow-up; shared skill files unchanged.
- Residual risk / follow-ups: Existing release prerequisites in the tour-navigation
  and site-preservation reports still apply. No publication performed.
