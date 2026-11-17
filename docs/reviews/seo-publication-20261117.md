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

Application release `a4792991dbb002244568de96982d1d2934045182` was committed with
the required hooks and pushed as a normal fast-forward to the existing Netlify
production branch, `codex/crewzy-light-compliance-redesign`. The remote SHA was
verified. The deployed homepage and guides hub return HTTP 200 with the issued
GA4 measurement ID and Bing verification tag. The live sitemap contains 17 URLs.
The [live SEO audit](evidence/live-seo-20261117.txt) passed all 17 marketing pages;
the [live link audit](evidence/live-links-20261117.txt) resolved 1,581 internal
links across 21 pages. Live UK pricing also renders GBP correctly.

### External account results

- **GA4:** the Crewzy property received the controlled, consented UK test visit.
  Realtime showed one active user and the guides-hub page title, with page_view,
  first_visit and session_start events. This is verification traffic, not evidence
  of an organic customer. The standard Home report still showed its initial
  no-data message while Realtime already contained the visit. Reports cannot
  reconstruct earlier visitors. Owner: coderview.io@gmail.com.
- **Consent:** production browser checks found no Google script before consent
  or after rejection. Accepting loaded the correct G-SLHHQ68M3R tag. Withdrawing
  consent reloaded the page and removed the Google tag; the test browser was left
  with analytics rejected. Desktop/mobile controls were checked locally as above.
- **Bing:** HTML meta-tag ownership verification completed and the authenticated
  Crewzy dashboard became available. https://crewzy.io/sitemap.xml was accepted
  on 17 November and showed Processing, zero errors and zero warnings. All nine
  new URLs (four workflow pages, four guides and the hub) were submitted once;
  the dashboard showed nine submitted today and 91 remaining quota. Crawl and
  indexing results are pending, not claimed complete.
- **Google Search Console:** the existing domain property accepted the updated
  sitemap on 17 November with the “Sitemap submitted successfully” confirmation.
  The table still showed eight discovered pages from its 11 November read;
  that historical count is not the new sitemap's 17 URLs. The new guides hub
  inspection initially reported unknown to Google; Request indexing completed
  successfully and added it to the priority crawl queue. No instant indexing or
  ranking promise is made.

Browser evidence is retained under
`/Users/mano/.codex/visualizations/2026/11/11/01a1cac9-7ee6-79f1-b3ab-9a34f0f991da/crewzy-seo-20261117/`:
`ga4-realtime-confirmed.png`, `bing-sitemap-submitted.png`,
`google-sitemap-submitted.png`, `google-guides-indexing-requested.png` and
`crewzy-guides-live.png`.

### What this release does not implement

The work improves search/AI discovery and adds consent-based visitor measurement.
It does not add an on-site chatbot or modify the existing authenticated Crewzy
assistant. Successful signup/conversion tracking, Ads links, paid campaigns,
IndexNow automation and UTM campaign attribution are not part of this release.
Query strings are deliberately stripped from the measured page URL.

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
