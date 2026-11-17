# Crewzy SEO, visitor measurement and Bing release — 17 November 2026

The owner explicitly authorised publication to crewzy.io and completion of GA4
and Bing. They separately approved Google Analytics' UK service/data-processing
agreements and Bing sign-in sharing the displayed Google name, profile picture
and coderview.io@gmail.com address. This supersedes the earlier ready-to-publish
scope; the earlier readiness reports are historical snapshots.

## Release scope

- Marketing repository only: four workflow pages, four practical guides and their
  hub; 17 marketing sitemap URLs; metadata, structured data, links and preview
  indexing controls. No authenticated-application or chatbot implementation change.
- GA4 account Crewzy, property Crewzy — crewzy.io, account 416664942, property
  564865283, web stream 16361465668, public measurement ID G-SLHHQ68M3R.
  Reporting uses UK time (including daylight saving) and GBP. Optional data
  sharing and marketing emails are off. Enhanced measurement is off; email
  redaction remains enabled. No Ads link, Google Signals or user-provided data
  was enabled. No Measurement Protocol secret was created.
- Bing site https://crewzy.io/ was added manually. The issued public verification
  tag is configured for the production build. No Search Console OAuth import
  or DNS change is needed.
- Basic consent: no Google tag before acceptance; reject and later withdrawal
  supported. Versioned choice expires after 180 days. Own analytics cookies use
  a distinct prefix, host-only scope and non-refreshing expiry. Only explicit
  views of known public pages are recorded; query/fragment data and referrer
  paths are stripped. Preview builds and noncanonical origins do not collect.
- GA4 counts consenting, unblocked browser visits from installation onward;
  it does not reconstruct past traffic or count successful application signups.

## Verification and publication

Local release checks cover lint, TypeScript, 107 unique tests across unit/build/
HTTP phases, separate production/preview builds, SEO audits of 17 pages and
internal-link audits of 21 pages. The production consent prompt adds 21 privacy
links: 1,582 checked links in production and 1,561 in preview. Synthetic Analytics
IDs are used by the repeatable checker; canonical-origin gating prevents local
QA from sending production traffic. The final production configuration is also
built with the issued public IDs and checked in its generated HTML.
The [final local release log](evidence/publication-checks-20261117.txt) records
both context builds and their passed audits.

Desktop and 390px mobile consent review verifies readable controls, rejection,
reopening, acceptance and withdrawal/reload. Runtime tests verify no pre-consent
script/event, Google command protocol, one view per route, restricted URL data,
disable-on-revoke and selective cookie removal. Earlier guide/browser evidence
remains in the readiness report. This is not an exhaustive accessibility audit.

Publication status and live evidence are recorded below once the production push,
hosting smoke checks, Bing verification and GA4 receipt have completed.

## Change Compliance Report

- **Reuse:** existing site origin, production context, route inventory, layout and
  legal components. Common and app source were searched; no reusable marketing
  consent/GA4 implementation exists there. One runtime owns tag/event behaviour.
- **No-assumptions:** account/stream IDs and Bing tag read from their actual UIs;
  locked Next docs and Google's current consent/configuration docs reviewed.
  Production remote was checked against f98ed55 before publication preparation.
- **Layering/OOP:** server config, pure consent/URL policy, tag runtime and React
  controls have separate responsibilities. No backend/repository change.
- **Config/overrides:** GA_MEASUREMENT_ID and ANALYTICS_CONSENT_DAYS documented,
  bounded and safe when absent/invalid; production public IDs in Netlify context.
- **Tenancy/RBAC:** public marketing pages only; no tenant or logged-in data read.
- **Audit:** no HR mutation. Consent choice/version/time stay in the visitor's
  browser; no claimed signup conversion or fabricated traffic.
- **Errors/logging:** invalid config warnings contain no values; malformed consent
  denies tracking; blocked storage falls back to session memory; no credential
  logging. External tag failures leave the site usable and cause missing analytics.
- **Duplication:** shared route inventory and one measurement lifecycle; no second
  tracker, GTM container, advertising pixel or duplicate page-view source.
- **Unused code:** full lint/typecheck cover all app code; new modules are consumed.
- **Tests:** 107-test release inventory and both build/HTTP contexts exercised;
  no Jenkins or numerical changed-line coverage claim. See retained release log.
- **Workflow automation:** deployment uses the existing Git-connected Netlify
  production branch. Installed actual pre-commit/pre-push hooks; no bypass.
- **Product value:** useful search content plus visitor/source reporting and Bing
  indexing diagnostics; clear visitor choice without an account requirement.
- **Cross-service impact:** no backend, authenticated frontend or DNS change.
- **Skill updated:** dated frontend marketing entry records this publication
  authorisation, consent integration and measured external setup status.
- **Residual limits:** GA4 excludes rejected/blocked traffic; historical traffic
  and real application conversions are not available from this tag. Search
  engines control crawl/indexing/ranking. AI-answer inclusion is not guaranteed.

Sources: [Google basic consent mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic),
[GA4 configuration](https://developers.google.com/analytics/devguides/collection/ga4/reference/config),
[manual page-view measurement](https://developers.google.com/analytics/devguides/collection/ga4/views),
[ICO storage/access guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/).
The consent design is a conservative implementation choice; this report is not
a legal certification. Exact legal responsibilities depend on actual data use.
