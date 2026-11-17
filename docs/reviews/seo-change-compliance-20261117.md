# Change Compliance Report — crewzy-www / SEO and practical guides

Historical readiness snapshot. The subsequently authorised GA4/Bing publication
is recorded in [the publication report](seo-publication-20261117.md).

17 November 2026. Unpublished candidate on `codex/crewzy-seo-20261117`, based on
`f98ed55` from the ready-to-merge checkout. Worktree:
`/Users/mano/.codex/worktrees/crewzy-seo-20261117/crewzy-www`.
No commit, push, merge or deployment. The earlier accepted Search Console requests
for existing `/solutions` and `/contact` remain requests, not confirmed indexing.

## Compliance review

- **Reuse:** reused metadata, site/company configuration, shared header/footer,
  typography and rendered audits. One `site-routes.ts` inventory feeds features,
  guides, sitemap and checks; shared breadcrumbs, guide cards and escaped JSON-LD
  avoid duplicated page logic. Common was searched; no Common change is needed.
- **No-assumptions:** read installed Next metadata/static-parameter/ESLint docs.
  Verified the locked Next version (16.3.4), actual rendered titles, headers and
  route outputs. UK Ahrefs results are threshold estimates, with sources and
  country recorded in the keyword report. No invented volumes, customer quotes,
  ratings, legal outcomes, product screenshots or unsupported integrations.
- **Layering/OOP:** route metadata, editorial content and rendering are separate.
  Both dynamic route shapes use finite static parameters and reject unknown slugs.
  Server-rendered public content needs no database/service/repository layers.
- **Config/overrides:** `.env.example` lists app origin, build context and optional
  Google/Bing public verification tokens. Invalid tokens are omitted with a
  value-free warning. Production alone is indexable; previews have noindex meta
  and HTTP headers, and no sitemap entries. Canonical origin is centralised.
- **Tenancy/RBAC:** not applicable to public static content; no authenticated
  request, employee record, tenant scope or permission contract changed.
- **Audit:** no app mutation, denial or analytics completion path added. Search
  Console acknowledgement is described accurately. No signup is inferred from a
  CTA click and no tracking event is installed.
- **Errors/logging:** unknown slugs return HTTP 404. Verification warnings do not
  expose values. Audit HTTP requests and build/server processes have timeouts.
  JSON-LD escapes `<` before insertion. No secret logging introduced.
- **Duplication:** route inventory, breadcrumb component, metadata/title template,
  guide-card component and HTTP audit wrapper share behaviour. The guides cover
  distinct workflows with original text and illustrative calculations.
- **Unused code:** complete app/proxy/config lint passes with zero warnings and
  TypeScript passes. New source modules are consumed. Replaced the legacy ESLint
  configuration; no unused tracking library or speculative AI integration added.
- **Tests:** the complete 98-test inventory is exercised across the unit, build
  artifact and HTTP phases of `npm run verify:ci`. Both context builds and rendered
  SEO/link checks pass. The nested-page branded-title audit failed before the
  metadata fix and passed after it. No Jenkins run or changed-line coverage
  percentage is claimed; this repository has no Jenkinsfile/coverage gate wired
  into its release command. The common checker targets Python, not this source.
- **Workflow automation:** added a repeatable local/CI release command that checks
  both build contexts and cleans up its temporary servers. No scheduled job,
  publishing action, account notification setting or remote CI job was changed.
- **Product value:** visitors can find relevant HR, leave, timesheet and document
  workflows, then use a concrete checklist, reconciliation example or migration
  plan. Crawlable links and initial HTML make those answers discoverable.
- **Cross-service impact:** marketing site only. No API/database/migration/Common
  contract changed. Authenticated app indexing and successful-signup measurement
  need their own review. Netlify build Node moves from 20 to 24 to match tests.
- **Skill updated:** the frontend context pack's dated marketing entry records
  the 17-route candidate, guides, compatible lint, local-check exception and
  remaining external setup. No separate crewzy-www context pack exists.
- **Residual risk / follow-ups:** owner-authorised publication and a live hosting
  smoke check remain. Local Next cannot establish the deployed Netlify geography
  or headers. GA4/Bing account setup is not completed. Search engines decide
  indexing/ranking. Numeric changed-line coverage remains unmeasured.

## Local runtime authorisation

The owner explicitly selected **“Allow local release checks”** for this marketing
release, authorising locked dependencies, local tests/builds and a local browser.
That overrides the engineering/security skill runtime restrictions for this task.
It is not a standing waiver, deployment approval or permission to skip hooks.
Dependencies were installed with `npm ci --ignore-scripts --no-audit --no-fund`.
No lifecycle install scripts ran. Application builds used the real font downloads.

## Verification completed

- Node **24.3.0**, npm **11.4.2**, locked Next **16.3.4**, TypeScript **5.9.3**,
  ESLint **9.39.5**. Lint is now the ESLint CLI with Next core-web-vitals flat
  config, zero warnings and no rule suppression. The lockfile changes only the
  compatible lint dependency tree; application dependency versions are retained.
- `npm run verify:static`: complete lint and TypeScript passed.
- `npm run verify:ci`: passed. The first phase reports 80 passing and 18 deferred
  tests. All 18 environment-dependent tests execute later: 10 workflow/guide
  artifact checks, six pricing artifact checks, one generated pricing config
  check and one native HTTP check. No test remains skipped across the full run.
  Some unit/artifact checks run again for the second context; do not count those
  duplicates as additional unique tests.
- Separate **production** and **deploy-preview** builds passed. Eight new detail
  pages are statically generated; unknown feature/guide paths return actual 404s.
- Both SEO audits passed for **17 marketing pages**: branded unique titles,
  descriptions, canonicals, robots meta/headers, Open Graph/Twitter, visible H1,
  Article/Breadcrumb/WebSite/Organization data, sitemap, favicon and social image.
- Both link audits passed across **21 pages** (17 marketing + four legal), each
  checking **1,561 internal links/anchors**. Header and footer Compliance links
  are asserted separately. The old audit's exact `<strong>` match was corrected
  to recognise classed markup without weakening the destination requirement.
- Native pricing HTTP/Flight routing and all finite pricing artifacts passed.
- Browser review used Chrome through computer-use controls: desktop homepage,
  footer/company attribution, guides hub, Resources guide section, workflow
  page/FAQ, and article/table/contents layout;
  390px responsive views of all four guides and the leave workflow, including
  table wrapping, anchor clearance, mobile Resources menu and two-stage Escape.
  The overly large guide contents heading was found visually and corrected.
  This is representative Chrome QA, not exhaustive cross-browser accessibility
  certification or a new live PageSpeed score.
- `git diff --check` passed. No commit/push hooks have been bypassed; none were
  invoked because no commit or push was made.

The Next server emits `Internal: NoFallbackError` while the audit deliberately
requests the two unknown finite routes; responses are verified as 404, not 500.
Node also warns about native TypeScript module-type detection. Neither warning
was hidden or treated as a failed application response. No runtime framework
upgrade was attempted as part of this SEO release.

The [complete release-check log](evidence/release-checks-20261117.txt) records
the successful production and preview checks.

See the [SEO audit and publication checklist](seo-20261117.md) and
[UK keyword validation](seo-uk-keywords-20261117.md). Local success does not assert
that the unpublished URLs are already in Google's index.
