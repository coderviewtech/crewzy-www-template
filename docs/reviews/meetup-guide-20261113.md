# Meetup page, product guide and customer-data access

Prepared 13 November 2026 in `codex/meetup-product-guide`, from the remote
default branch `codex/crewzy-light-compliance-redesign` at `f98ed55`.
Local implementation only; no commit, push or deployment.

Latest owner confirmation: the owner explicitly confirmed that all six listed
staff-access safeguards have been implemented and requested removal of the pending
implementation caveat. The public question now reads “How does Crewzy control
staff access to customer data?” and introduces the same six safeguards as current
controls. This supersedes the earlier proposed-control copy and its rationale
recorded below. The source of the implementation status is the owner's statement;
this copy update is not an independent infrastructure audit or certification.

Copy-update checks: production Webpack build (including TypeScript), changed-file
lint, regression-source syntax and whitespace checks pass. The local browser was
refreshed and the expanded FAQ showed the new question/introduction plus all six
unchanged controls. Existing regression expectations were updated; unit execution
and coverage remain for Jenkins. Preview remains running on port 3214 at the
owner's request. No backend setting, security mechanism or deployment was changed.

## Implemented

- Global, explicitly labelled prepared-answer guide. A native modal dialog
  contains keyboard focus and supports Escape; focus returns to its opener.
- The chat starts with required name and email fields for a requested Crewzy
  product follow-up. Netlify Forms receives the enquiry before answers unlock.
  Public FAQs, the tour and meetup page remain accessible without contact details.
  No question transcript, analytics events, AI provider or browser storage is added.
- `/meet` provides a mobile-friendly introduction, tour/pricing links, all answers
  in server-rendered disclosures, optional contact and a shareable QR card.
- `/meet/qr.svg` and `/meet/qr.png` are generated at build time with `qrcode`.
  They encode `https://crewzy.io/meet`, using the existing canonical site origin,
  with an opaque white background and four-module quiet zone. No QR provider,
  scanner identifier, subscription, redirect or tracking parameter is involved.
- Home FAQs, meetup answers, the guide and resource-page data questions share
  `app/product-guide/content.ts`. Edit approved answers there to prevent drift.
- `NEXT_PUBLIC_ENQUIRY_TIMEOUT_MS` controls the browser POST timeout, with a
  validated 15-second default, documented in `.env.example`. QR format constants
  and the canonical destination are unchanged. Pricing links to existing rates.

## What we can say about staff access today

`app/privacy/page.tsx`, `app/dpa/page.tsx`, Security & trust and the 21 October
clarification in `docs/privacy-review.md` establish the public statement's scope.
Crewzy personnel administer AWS; customers use the SaaS. The DPA describes limiting
authorised personnel to necessary access under confidentiality obligations. This
is a contractual description, not proof of customer-approved, automatically
expiring staff access in production.

The current administrator inventory, approvers, working locations, direct
database/object permissions and access records were not established in this task.
Public copy asks customers to confirm arrangements for their service. It does not
claim staff cannot view records, all support requires customer consent, every read
is logged, all processing stays in the UK or SOC 2/ISO 27001 certification exists.

## Enterprise comparison and proposed Crewzy policy

These are recommendations to adopt and verify, not implemented website features
or a statement that Crewzy has already deployed these controls.

| Provider | Documented example | Relevant pattern |
| --- | --- | --- |
| Microsoft 365 | Customer Lockbox, where enabled for supported services, adds customer approval to support access; grants expire and actions are audited. | Ticket, internal/customer approval, expiry, evidence. |
| Salesforce | Customers grant Support login access for a chosen duration and can revoke it without sharing passwords. | Explicit grant and revocation. |
| Atlassian | Restricts customer-data access to authorised staff for operational/support purposes with authentication and privileged access controls. | Named personnel, purpose and restricted privilege. |

Sources reviewed 13 November 2026:
- [Microsoft Customer Lockbox](https://learn.microsoft.com/en-us/purview/customer-lockbox-requests)
- [Salesforce Support login access](https://help.salesforce.com/s/articleView?id=000384334&language=en_US&type=1)
- [Atlassian security practices](https://www.atlassian.com/trust/security/security-practices)

Recommended Crewzy operating model:

1. Inventory production access: staff, contractors, service identities, accounts,
   roles, resources and access countries. Require named staff identities and MFA;
   do not share logins or customer passwords.
2. Separate infrastructure administration from permission to inspect content.
   Prefer metrics, redacted logs and synthetic reproduction. Customer workspace
   permissions do not establish restrictions on Crewzy's direct AWS, database,
   document or backup access.
3. For support content access, record a ticket, purpose, tenant/resources, actions
   and duration. Default to read-only and least privilege. Obtain customer approval
   and independent internal approval. Never describe self-approval in a one-person
   team as independent approval.
4. Implement temporary grants, automatic expiry and immediate revocation across
   the actual access paths. A support UI toggle is insufficient if direct database
   or S3 credentials bypass it. Keep production content out of developer laptops,
   test fixtures, logs and external AI tools unless separately authorised.
5. Record requester, approver, reason, tenant, grant/expiry/revocation and relevant
   access actions in restricted audit storage. Verify database reads, file reads
   and support sessions separately: infrastructure logging alone does not establish
   that every record read is captured. Review access and alerts regularly.
6. Define a narrow emergency process with an incident record, minimal duration,
   alerts, retrospective review and appropriate customer notification. Address
   legal obligations separately; avoid absolute promises that contradict exceptions.
7. Document confidentiality/training, departing-staff removal, access reviews,
   incident owners, evidence retention and customer access-report requests. Update
   public answers only after controls are operating and evidenced.

No AWS or backend control was changed. Assessing whether Crewzy is sufficiently
secure for a customer's HR data requires production evidence and that customer's
requirements; website wording cannot establish that conclusion.

## Initial meetup verification

- Production Webpack build passed: 26 static pages/assets, including `/meet` and
  both QR routes. TypeScript and `git diff --check` passed.
- All 13 changed/new TypeScript files passed Next core-web-vitals lint with zero
  warnings or errors. The final keyboard-focus change was rechecked. The repo's
  legacy `next lint` script and ESLint 10/plugin compatibility problem predate this
  work; validation used the already-installed frontend ESLint 9 engine with this
  website's own `eslint-config-next/core-web-vitals` configuration, without
  suppressions or dependency changes to the lint toolchain.
- Updated the read-only HTTP audit scripts for `/meet`, QR assets and existing
  routes they had omitted. Corrected stale navigation markup and home-description
  expectations. Checks passed for 937 internal links/anchors across 13 pages and
  SEO/indexing/social metadata across 9 indexable pages, including the new page.
- The generated PNG independently decoded with `jsqr` to exactly
  `https://crewzy.io/meet`; dimensions are 1024 × 1024. SVG and PNG are static
  prerender outputs. The browser's Download PNG action saved `crewzy-meet.png`.
- Browser review covered desktop, 390 × 844 and 320 × 640 layouts; no horizontal
  overflow at either phone width. Guide topics, staff-access and browsing-privacy
  answers, answer-heading focus, back-to-question focus, close/Escape and opener
  focus restoration worked. The security shortcut opens the correct topic. Native
  inline disclosures also expand. No browser console errors were observed.
- Screenshots and exported QR assets are in the chat's `crewzy-meetup` artifact
  directory. Preview used only loopback port 3214; the owned server was stopped
  after review. No production requests or customer records were changed.
- Regression sources: `tests/meetup-guide.test.mjs` (syntax checked). Per the
  engineering standard, the unit suite/coverage is left to Jenkins; no local
  fail-before/pass-after or Jenkins success is claimed. CI can include the build
  assertions with `CREWZY_MEETUP_BUILD_DIR=.next` using Node 24's native TypeScript
  support. This marketing repo currently defines Netlify build configuration, not
  a repository-specific Jenkins test job.

## Contact capture and staff-control update

The owner's final instruction requires contact capture before chat. The form
sends name/email, a source category (`meetup-page` or `website-chat`), explicit
follow-up request wording, notice version and an empty honeypot. It never sends
question selections, page query strings or a transcript. Required/email/pattern
and length checks run in the client; Netlify manages field registration, spam
screening and storage. These checks do not establish email ownership, server-side
schema enforcement or an authenticated session.

A synchronous pending guard and disabled submit prevent repeated clicks while a
request is pending. Failed or timed-out requests retain fields and keep answers
locked, with a direct-contact fallback. A returned registration HTML page is
rejected as an unprocessed form. Requests are not retried automatically. Once
accepted, only an in-memory boolean remains; closing/reopening does not resubmit,
and reloading resets the gate. This is a lead workflow, not a security boundary.

The static registration target `public/__forms.html` follows the current Next
adapter's documented integration. No provider keys or custom email backend were
introduced. README describes activation, detection, notification setup for the
existing sales inbox and a real receipt check. The hosting dashboard was not
changed, no test email was sent and no live enquiry delivery was established.

The public privacy and provider disclosures now cover Netlify Forms, submitted
contact details, source and notice records, purpose, retention criteria and contact
choices. The submit action requests a product follow-up; it is not consent to an
ongoing campaign. Netlify/dashboard and inbox access, operational retention and
suppression still need an owner before launch.

Added a shared question, “What controls are proposed for Crewzy staff access?”,
with six readable safeguards: named identities/MFA, least privilege, recorded
purpose/customer approval, temporary access/revocation, audits/access reviews,
and emergency access. The answer expressly says implementation and verification
remain necessary. It does not upgrade the existing DPA statement into a claim
that customer approval, expiry or complete read auditing already operates.

Sources checked for this update:
- [Netlify's Next.js form integration](https://opennext.js.org/netlify/forms)
- [Form detection and setup](https://docs.netlify.com/manage/forms/setup/)
- [Email notifications and recipient verification](https://docs.netlify.com/manage/forms/notifications/)
- [Provider spam filtering](https://docs.netlify.com/manage/forms/spam-filters/)
- [AWS IAM security practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [Microsoft Customer Lockbox](https://learn.microsoft.com/en-us/purview/customer-lockbox-requests)
- [ICO electronic-mail guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules/)

## Final contact-flow verification

- Final production Webpack build and TypeScript pass (26 static pages/assets).
  All 19 changed/new TypeScript files passed the website's core-web-vitals lint;
  subsequent validation and focus fixes were individually rechecked with zero
  warnings/errors. `git diff --check` and both regression-file syntax checks pass.
- Updated read-only HTTP checks passed: 965 links/anchors across 13 pages and SEO
  across nine pages. No email/form submission is performed by those scripts.
- Browser checks on desktop, 390 × 844 and 320 × 640 verified required/invalid
  fields, failure retaining details, retry/error focus and no premature unlocking.
  No horizontal overflow; the narrow modal remains within the viewport and scrolls.
- A loopback-only synthetic receiver confirmed the exact seven payload fields,
  meetup source, notice version and requested follow-up wording. While pending,
  fields and submit are disabled and answers remain absent. Acceptance clears the
  fields, opens the intended category and focuses the welcome message. A focus
  timing issue found during review was fixed and the final build rechecked.
- Reopening after acceptance does not submit again; a fresh load resets the form.
  Escape restores opener focus, question selection focuses its heading, and all
  six staff-control details are visible in both chat and the public FAQ disclosure.
  Final browser console review found no errors; expected local submission failure
  is handled in the interface. Owned preview/fixture servers were stopped.
- Screenshots: `chat-contact-desktop.jpg`, `chat-contact-mobile.jpg` and
  `staff-access-faq.jpg` in the chat's `crewzy-meetup` artifact directory.
- `tests/guide-lead.test.mjs` covers payload/registration agreement, invalid input,
  awaiting acceptance, HTTP/unprocessed-form/network/timeout failures and no retry.
  `tests/meetup-guide.test.mjs` now distinguishes the public page from the required
  contact form and keeps proposed controls qualified. Unit execution/coverage and
  red-green proof remain for Jenkins under the engineering standard, not claimed
  locally. No live Netlify submission or mailbox receipt was tested.

## Release limitations

- Enable Netlify form detection, deploy the approved change, configure the sales
  notification (including recipient confirmation where required), and verify a
  saved submission plus mailbox receipt. No delivery promise is made before this.

- Publish `/meet` before distributing the QR: it deliberately targets the real
  public URL, not this temporary preview.
- `npm audit` reported 15 pre-existing affected packages (1 critical, 4 high,
  10 moderate). All listed packages retain the versions from the base lockfile;
  none of the added QR/decoder packages is listed. Next.js 16.3.4 is among the
  affected runtime packages. This task did not establish production exploitability
  or remediate the prior dependency tree. Triage and update before release.
- Staff permissions, approval/expiry/revocation, direct database/S3 read auditing,
  access locations and actual security certification still require operational
  evidence. This work is not a production security assessment.
- Automatic approval review rejected appending this marketing-only context to
  the shared `crewzy-frontend-nextjs` skill outside the repository, describing it
  as a broader, unnecessary instruction-file change. That file was not modified;
  this tracked report is the bounded record of implemented/missing context.

## Change Compliance Report — crewzy-www / meetup chat and enquiries

- Reuse: existing brand, navigation, metadata, canonical origin and sales inbox.
  Common email helpers are application-specific Python workflows; they do not
  provide a public website lead endpoint. Reused the existing Netlify host.
- No-assumptions: current remote default, live public disclosures and local
  privacy/DPA/history reviewed. Current staff-control wording additionally relies
  on the owner's explicit implementation confirmation recorded above.
- Layering/OOP: server pages/static asset handlers, shared answer presentation,
  client form and a separate submission adapter; Netlify owns submission storage.
- Config/overrides: canonical URL reused; validated submission timeout in
  `.env.example`; no secrets. Form names/fields/lengths are schema constants.
- Tenancy/RBAC: n/a; no workspace data, authenticated API or query is accessed.
- Audit: provider submission metadata and follow-up request/notice version form
  the enquiry record; no HR-data action occurs. Identity is not verified.
- Errors/logging: form errors are visible and retain input; pending/timeout and
  retry are handled explicitly. No contact details or raw errors are logged.
- Duplication: shared answer catalogue/renderer, one QR helper and lead adapter.
  Static field declarations are required by Netlify and checked by regression source.
- Unused code: new exports are consumed; changed-file lint and typecheck pass.
- Tests: regression sources provided for Jenkins; build/browser/HTTP/QR checks
  passed locally as detailed above; CI/coverage and red-green proof pending.
- Workflow automation: QR build generation; Netlify captures submissions after
  activation. Email notifications require dashboard configuration before launch.
- Product value: chat enquiries provide a usable follow-up contact; public
  browsing remains open and staff-control claims remain transparent.
- Cross-service impact: Netlify adds enquiry handling to its existing hosting
  role; privacy/provider notices updated. No HR backend/schema/permissions change.
- Skill updated: shared-file change rejected by automatic review; repository
  context and README updated instead.
- Residual risk/follow-ups: Netlify activation/receipt, CI/coverage, dependency
  advisories and staff-access evidence remain as described above. No commit, push,
  deployment or live customer-data/security setting change was performed.
