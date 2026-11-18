# Change Compliance Report — Crewzy website publication

## Outcome and authorisation

The owner explicitly requested publication to `crewzy.io` and verification of
the live chat and email notifications. Published the reviewed local update using
the previously authorised official Netlify CLI, with a fresh **production** build.
The preview artifact was not promoted because it intentionally blocks indexing.
No application code or dependency changes were needed during publication.

- Live site: <https://crewzy.io>
- Meetup and anonymous FAQs: <https://crewzy.io/meet>
- Netlify project: `jade-brigadeiros-857d10`
- Project ID: `9e2edff1-ebdd-4119-8677-c1a6c56b742c`
- Production deploy: `6afd96fb18b43dca47f3e40b`
- Published: **18 November 2026, 12:16:26 UTC**
- [Deploy details](https://app.netlify.com/projects/jade-brigadeiros-857d10/deploys/6afd96fb18b43dca47f3e40b)
- Previous production deploy: `6afc9a98b44f0e71789ca6c9`, source commit
  `182f287850258154741454ff653869ce8e16da95` (rollback reference).

Netlify's read-only API confirmed the new published deploy ID and time after
publication. The CLI used `--prod --context production` and the canonical project
UUID. DNS, email routing and provider permissions were not changed.

## Live enquiry verification

Submitted exactly one labelled synthetic enquiry through the actual homepage
chat at **12:17 UTC**:

| Field | Saved value |
| --- | --- |
| Name | Crewzy live test 2026-11-18 |
| Email | sales@crewzy.io |
| Source | website-chat |
| Follow-up request | Please email me about my interest in Crewzy. This does not subscribe me to ongoing marketing. |
| Notice version | 2026-11-13 |

The real form displayed its pending state, then unlocked the prepared answers.
Selected “What does Crewzy bring together?” and verified the answer rendered.
The existing form `crewzy-product-enquiry` retained its honeypot and showed the
exact values above in verified submissions. No question choices or transcript
were submitted. IP details are excluded from this report and screenshot evidence.

Zoho's **Sales** folder received `Crewzy website enquiry` from
`formresponses@netlify.com` at **12:17:29 UTC**. To and Reply-To both showed
`sales@crewzy.io`, and all five fields matched the saved live submission. The
existing confirmed, form-specific notification was reused without changes.
The test record and email are retained for owner review.

[Saved submissions](https://app.netlify.com/projects/jade-brigadeiros-857d10/forms/6afd8df112363dd68f9b4d38)

## Release checks

- Full repository ESLint with zero warnings and TypeScript: passed.
- Netlify CLI 27.20.0 production build and upload: passed.
- Live SEO audit: all 18 marketing pages passed production indexing, metadata,
  canonicals, JSON-LD, sitemap, favicon and social image checks.
- Live internal-link audit: all 1,833 links across 22 pages resolved, including
  both QR download routes. External destinations were inventoried, not submitted.
- Browser-selected UK pricing: £8 per additional employee monthly; switching to
  annual billing shows £6 per month, £72 per year. First ten remain included.
  This release does not claim new multi-country runtime testing.
- Live `/meet` presents public answers without contact capture and both QR
  downloads. The form uses the same verified handler throughout the site.
- Decoded the published QR PNG to exactly `https://crewzy.io/meet`. The live
  homepage retains the existing GA4 public identifier and Bing verification tag.
- Live accepted-chat desktop and 390×844 mobile layouts checked. Mobile dialog
  width 370px within a 390px viewport, document width 390px; answer and footer
  links are readable. Temporary viewport override was reset.
- No unit suite or coverage was run locally and no Jenkins pass is claimed.
  The earlier preview, preservation and design reports retain their own scope.

Evidence is retained under
`/Users/mano/.codex/visualizations/2026/11/13/01a1d5a0-c171-7c70-a766-d9c097e8582b/crewzy-netlify-forms/`:

- `live-notification-delivered.jpg`: relevant email only, excluding other mail
  and the provider's unsubscribe token.
- `live-chat-accepted.jpg`: desktop answer after successful live submission.
- `live-chat-mobile.jpg`: accepted answer at 390px width.

## Source and operational notes

This was a direct CLI deployment from the existing reviewed worktree
`codex/meetup-product-guide`; no Git commit, push or merge was performed. The
uncommitted source remains intact locally. Before a future Git-triggered release,
integrate this reviewed source into the connected production branch with the
required hooks; deploying the older branch alone could replace this update.

The test proves this live submission and receipt; it does not verify ownership
of visitors' supplied email addresses or guarantee every future delivery. Enquiries
are saved in Netlify Forms and sent to the sales inbox, not to the Crewzy product
database or a CRM. Existing provider access and retention arrangements were not
changed. Local `next dev` still does not process hosted Netlify Forms submissions.

## Compliance

- Reuse: Existing form registration, lead capture, prepared answers, notification
  and site configuration; no duplicate implementation introduced.
- No-assumptions: Verified published deploy, live browser flow, stored values,
  actual mailbox receipt, public HTTP responses and pricing.
- Layering/OOP: No application implementation changed during publication.
- Config/overrides: Existing production context, public analytics/search
  identifiers and regional pricing proxy retained; no secrets printed or stored
  in repository documentation.
- Tenancy/RBAC: Public marketing site only; no customer workspace permissions
  or data-access controls changed or independently certified.
- Audit: Deploy IDs, UTC timestamps and labelled synthetic submission recorded.
- Errors/logging: No fabricated success or automatic test retry; exactly one
  production enquiry. No customer data or credentials included in evidence.
- Duplication/unused code: No new runtime code or dependencies.
- Tests: Static, production build, read-only HTTP and real live enquiry checks
  above; no CI or changed-line coverage assertion.
- Workflow automation: Confirmed sales notification runs on live submissions.
- Product value: Published the reviewed design, meetup/QR and lead capture flow;
  public exploration remains available without contact details.
- Cross-service impact: Netlify production hosting/Forms and Zoho sales inbox;
  no authenticated Crewzy application or DNS change.
- Skill updated: README and this report record live status; external skill
  packages were not edited.
- Residual risks: Source synchronization before the next Git-triggered deploy,
  visitor email accuracy and future provider delivery as described above.
