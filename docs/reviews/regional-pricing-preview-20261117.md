# Regional pricing preview correction — 17 November 2026

## Cause and correction

The local design preview was running with `npm start`, which uses production
mode. A plain local Next server has no Netlify request geography. The existing
pricing proxy therefore correctly chose the unknown-region variant, showing
“Confirm pricing for your company” and “Let’s talk” instead of a local amount.
Using that server for regional visual review was a preview setup mistake.

No approved prices had been removed. `proxy.ts`, `pricing-model.ts`, the public
pricing route and the internal market route have no working-tree changes and
match the newer published-source worktree for routing and rates. The current
rates remain:

| Region | Monthly | Annual monthly equivalent |
| --- | ---: | ---: |
| UK | £8 | £6 |
| India | ₹149 | ₹119 |
| US | $10 | $8 |
| Euro area | €9 | €7 |

Amounts are per additional managed employee beyond the first 10, before
applicable taxes. Annual billing is paid upfront for the year.

Stopped this chat's production preview and started the existing development
mode with `npm run dev -- --hostname localhost --port 3214 --webpack`.
The active review address is now **http://localhost:3214/pricing**. It defaults
to UK prices; **http://localhost:3214/pricing?previewMarket=IN** previews India.
The loopback-IP address from earlier screenshots is no longer the active server
address. README now documents the correct mode and the reason for the fallback.

Production still chooses the market from trusted
`Netlify.context.geo.country.code`: GB → UK, IN → India, US → US and the existing
euro-area country list → EUR. Missing/unsupported geography stays neutral.
Development preview parameters cannot override production pricing. The app
independently controls purchasable prices from the company's billing country.

## Verification

- UK browser view shows £8 monthly and £6 annual monthly equivalent; for 15
  employees, the calculator shows £40/month or £360/year with 10 included and
  5 billed. The default 10-employee total is £0.
- India browser view shows ₹149 monthly and ₹119 annual monthly equivalent;
  for 15 employees, totals are ₹745/month or ₹7,140/year, with 10 included and
  5 billed. The default 10-employee total is ₹0.
- Read-only local HTTP check returns 200 with £8 and no unknown-region notice.
- US and euro-area browser previews show $10 and €9 respectively. India, US and
  euro-area views have no document horizontal overflow at 390px; the India
  calculator remains usable on mobile. UK and India desktop views checked at
  1280px. The original automatic country map and approved rates are unchanged.
- Existing pricing tests cover trusted geography, missing/malformed/unsupported
  countries, production query/header/cookie override rejection, regional rates,
  the first-ten allowance, HTML/Flight routing and distinct static variants.
  Their source was inspected; unit execution/coverage remain in Jenkins under
  repository instructions. No pricing source changed and no new unit test was
  necessary for this local server-mode correction.
- Real country-specific Netlify/CDN requests were not exercised in this local
  fix. Do not mistake development query previews for a live geolocation test.
- Screenshots: `crewzy-pricing/uk-monthly.jpg` and `india-monthly.jpg` under this
  chat's visualizations root. No contact forms or external messages submitted.

## Change Compliance Report

- Reuse/no assumptions: Reused the existing development preview rather than
  changing approved rates or weakening the production geography boundary.
  Compared source and actual browser output, including both billing cycles.
- Layering/configuration: No application architecture, new runtime config or
  pricing algorithm changes. Only preview startup mode and README guidance.
- Tenancy/RBAC/audit/logging: No changes to billing-country enforcement, customer
  records, permissions, audit records or logging. No secrets accessed or printed.
- Duplication/unused code: No production code added or duplicated.
- Tests: Browser and local HTTP evidence above; previous build/type/lint results
  still apply to unchanged application source. No new coverage claim.
- Workflow/product value: Correct local pricing review setup is documented to
  avoid repeating the misleading unknown-region preview.
- Cross-service impact: None. No payment integration, checkout, backend or
  deployment change.
- Skill delta: This local record documents the fix; external shared skills were
  not edited.
- Status: Local preview corrected. Nothing committed, pushed or published.
  Reconcile the separate newer SEO/analytics source and run required release
  checks before any separately authorized publication.
