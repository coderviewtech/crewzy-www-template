# Privacy and service terms — evidence and release decisions

Original review date: 20 October 2026. Current presentation review: 21 October 2026. Internal repository documentation for `/privacy`, `/terms`, `/dpa`, `/subprocessors`, `/resources` and `app/privacy-data.ts`.

**Current status:** The local website now presents professional privacy and service information, including Terms for individuals and organisations. The DPA page explains the agreement process; it is not an executed DPA. Supplier selection remains unfinished. A presentation update is not evidence of live operational readiness. The historical notes below describe the original 20 October drafts; the 21 October record at the end supersedes their presentation status. Source capabilities do not establish deployed settings, contractual commitments or a compliance certification. No production records, secrets or operational logs were inspected for this inventory.

## Human-confirmed facts

The user confirmed on 20 October 2026 that Crewzy is developed by **CODER VIEW LTD**, planned markets are **the UK and India**, customer workspaces contain **test data only**, and supplier selection **has not been decided**. CODER VIEW LTD is the proposed contracting entity; its precise contracting/controller role has not been separately confirmed. The user selected crewzy.io for contact email addresses and will arrange mailbox service later. The planned privacy/DPA contact is privacy@crewzy.io; provisioning, monitoring and the responsible owner remain pending. Existing sales@crewzy.io and support@crewzy.io already use the chosen domain. UK and Indian legal finalisation remains pending; the draft now distinguishes phased Indian commencement from current transitional requirements.

The user need not describe functionality again: the source inventory supplies that baseline. Ask for business decisions, actual arrangements and missing operational evidence.

## Source evidence map

Paths below are relative to `/Users/mano/Documents/Prism-HR/ready-to-merge-code/`. Line numbers describe the reviewed working source and may move. `Common` means `crewzy-common-py-utils/crewzy_common/`.

| Area | Evidence and drafting boundary |
| --- | --- |
| Accounts | Common `models/db_models.py:151–222`: email, tenant/roles/status, password hashes, optional MFA and recovery information, verification/session metadata. Do not portray authentication secrets as AI inputs. |
| People lifecycle | Common `models/db_models.py:293–385,519–605,2530–2568`: identity, optional birth date/gender/contact details, employment/manager/status, notes, certifications, compensation and contracts. Offboarding questionnaire/asset records: `models/offboarding/_records.py:21–112`. |
| Additional onboarding | `crewzy-employee-service/schemas/employee_schema.py:236–283` and `services/employee/crud/update/_update_self_steps/_apply_allowed.py:38–113`: optional addresses, emergency contacts, bank accounts, nationality, marital status, PAN/Aadhaar/passport/UAN and blood group, persisted in onboarding JSON. |
| Documents/compliance | Common `models/db_models.py:641–818`; `src/document_types.py:28–71`; `crewzy-compliance-service/models/compliance_models.py:130–259`: files/versions, identifiers, dates, extraction/reviewer records and findings. `services/compliance_service.py:79–91` categorises expiry dates. Customer review/status labels do not establish authenticity verification. |
| Everyday work | Common `models/db_models.py:1034–1071,1153–1178,1420–1478,1570–1639`: assignments, dated hours, descriptions, approvals and leave. Leave reasons/supporting attachment URLs: `crewzy-leave-service/app/schemas/leave_request_schemas.py:28–53`. |
| Finance | Common `models/db_models.py:1672–1705,1758–1828,1917–2027,2069–2099`: expenses/receipts, invoices, contacts and payment/bank references. These records do not prove payroll execution. |
| Recruitment | `crewzy-recruitment-service/app/models/candidate.py:23–71`, `candidate_document.py:20–41`, `interview.py:23–53`, `assessment.py:21–47`: optional contact/career details, CVs, stages, interviewers, recordings/transcripts, feedback and scores. Self-applications: `services/intake_service.py:119–184`. |
| Matching and AI | Recruitment `services/matching_service.py:38–150` ranks skill overlap; `cv_upload_service.py:66–107` derives summaries/skills; `interview_media_service.py:66–100` summarises uploaded transcripts. AI-service `services/bedrock_client.py:315–327` and `openai_client.py:250–264` send document image content. Neither “no profiling” nor “only expiry dates reach AI” is supported. |
| Sharing/activity | Recruitment `services/client_access_service.py:134–242`: client decisions/notes, profiles, selected documents and assessments. External clients are customer-selected recipients, not automatically subprocessors. Common `models/db_models.py:821–858,993–1014` records actors, actions, IP/browser information and acknowledgements. |

Health information is possible in blood group, leave evidence, files and free text. Optional fields are not collected from everyone. Decide permitted special-category/criminal-offence scope; an ordinary photo/video is not automatically biometric identification. Confirm enabled features and meaningful human review of recruitment recommendations.

## Rights, retention and release limits

Common `src/gdpr.py:1–5,39–115` exports a subset. `src/data_export.py:91–97` excludes document binaries. Company `routes/export_routes.py:44–49,133–161` applies access checks/no-store; `206–234` blocks permanent employee erasure. Company `services/retention.py:22–50` explicitly lacks full cross-store coverage. Common `docs/retention-matrix-uk-in-us.md:3–11` has no approved executable periods. Recruitment `services/candidate_service.py:129–135` deletes database records without an object-storage purge instruction. No complete deletion/export promise follows.

AI credential/chat fixes have local test evidence; production deployment verification remains pending. No operational fix, deadline or historical cleanup is promised here.

## Decisions and external evidence still needed

Confirm contracting roles and contacts; launch features/sensitive-data restrictions; actual providers/accounts/entities; storage, backup, AI-routing and support-access countries; supplier/transfer terms; staff access/confidentiality; off-code support/CRM/email/analytics; purpose-specific lawful grounds; retention and closure/rights/breach procedures; acceptance, notification and review owners. Supplier candidates and source references are recorded on `/subprocessors`; none is confirmed live. Customer-selected integrations and independent-purpose recipients require separate classification. UK/India regulatory review must precede finalisation.

## Change Compliance Report

Static website documentation/content only. Draft pages reuse site typography/navigation and shared legal layout, scoped styles, metadata and category data. No API, database, authentication authority, permission or processing configuration changes. The original review used draft banners. Following the owner’s 21 October instruction, customer-facing pages use ordinary document titles and an update date; unresolved provider and operating facts remain explicit, and legal routes remain noindex until operational adoption. Validation is recorded below. Static presentation/content changes introduce no configurable processing behaviour, API contracts or data migrations.

## Regulatory preparation

UK source references checked: [ICO privacy information](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/), [processor contract terms](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/), [processor duties](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/controllers-and-processors/controllers-and-processors/what-does-it-mean-if-you-are-a-processor/) and [breach guidance](https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/personal-data-breaches-a-guide/).

India source references checked: [Act commencement notification](https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf), [final Rules](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf), [December corrigendum](https://www.meity.gov.in/static/uploads/2025/12/3c7ebbae0e5456f493f486e6845df86b.pdf) and [DPDP Act](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf). Draft section 4A distinguishes the phased DPDP framework from currently applicable transitional law. UK portability/objection and legitimate interests are not presented as Indian rights or legal grounds. The retention workstream must review applicable statutory recordkeeping, including future Rule 8 requirements, before choosing deletion periods.

This is drafting preparation, not legal approval. No supplier was selected or contracted, no mailbox was provisioned, no contract was executed, and no application data-handling behaviour was changed.

## Validation

- All 38 existing website tests passed.
- TypeScript and diff checks passed after the final wording clarification.
- An isolated production-context Webpack build generated 16 static pages. Its actual privacy, DPA and provider HTML contained Draft titles, the review banner, and both robots/googlebot noindex,nofollow. The production sitemap excluded the three drafts while the homepage remained indexable.
- That build included UK/India content and accessible table wrappers. A later wording-only clarification narrowed 'test data' to customer workspaces; current local HTTP checks returned 200 for all three pages and confirmed the final banner and noindex metadata.
- Desktop and 390px mobile review passed. Page width stayed within the viewport. Data tables retain native semantics in named focusable regions; an actual ArrowRight keyboard action advanced the privacy table's horizontal scroll from 0 to 40.
- Independent source reviews corrected omitted account/people categories, recruitment client input wording, Stripe/Razorpay payload distinctions, WhatsApp template content, IP-lookup fallback and external email font content.
- Internal reference snapshot: /private/tmp/crewzy-privacy-drafts-build-20261020. The existing port 3001 server was reused and left running. No production deployment, commit or push.

## Contact domain decision

On 20 October 2026 the user chose crewzy.io throughout the website and draft privacy documents. The shared privacyEmail constant supplies privacy@crewzy.io to the privacy policy, DPA, provider review and shared draft header. The address is shown as planned and pending setup/monitoring, without an active mailto link. The mailbox service was not purchased or provisioned. Selecting this address does not appoint incident responders, an audit coordinator or a privacy request owner. Existing CODER VIEW LTD legal identity and registration details are retained.

Contact-only change: shared contact reused across pages; no endpoint, schema, permission or application-processing changes; no new dependency or runtime configuration. Mail service setup remains a pre-launch task.


## Finalisation readiness — 21 October 2026

The owner has now approved regional subscription pricing for the UK, India, US
and euro area. The document shell and scope prompts were updated accordingly.
This does not establish that service launch, regional legal assessments, supplier
contracts, payment onboarding, mailbox provisioning or production deployment have
been completed. Earlier test-data-only and undecided-supplier statements record
what the owner said on 20 October; they should not be presented as newly verified
operating facts.

The current website has no Terms of Service route. Its public Security & trust
section is an internal readiness assessment, including local test counts and
pending work. The recommended final presentation is a concise factual security
page and approved Privacy Policy, Terms of Service, DPA and subprocessor list,
with internal evidence and outstanding work retained in repository documentation.
No draft banner or noindex safeguard has been removed in this readiness update.

The following information was requested from the owner before dependent final
wording is published: active monitored privacy/support contacts and responsible
people; actual launch suppliers and data/support-access locations; and business-only
sales plus monthly/annual contract and cancellation expectations. Remaining
commercial decisions include refunds, liability, suspension/termination and
notices. Retention/export/deletion and incident/request procedures require
operational evidence; country and billing code changes do not establish them.
Effective dates must match actual adoption. No agreement has been executed and
no customer acceptance mechanism was introduced by this content update.


## Customer-facing legal presentation — 21 October 2026

The owner instructed us to go ahead with crewzy.io contacts, confirmed launch
suppliers are still undecided, and said individuals should be able to buy
(“This is B2c platform”). This is authorization to prepare the local website;
it does not confirm that mailboxes work or appoint a request/incident owner.
Self-service purchasing does not determine legal consumer status: a buyer acting
mainly for a business can still be a business customer. The Terms now cover both.

### Changes made

- Replaced the review-only legal shell with a shared customer-facing layout and
  21 October update date. Removed the prominent draft banner, repeated owner
  confirmation boxes and Draft page-title prefixes.
- Reworked Privacy around actual data categories, individual and organisational
  accounts, own-purpose/controller and customer-instruction/processor roles,
  AI/document data flows, source-derived storage behaviour, retention criteria
  and rights. Hosting at AWS is not described as avoiding processing duties.
- Added `/terms`: individual/organisation scope, legal-capacity policy,
  free/paid billing, annual upfront and renewal explanation, country assertions,
  Stripe versus Razorpay seat behaviour, support/postal cancellation, consumer
  cooling-off and refund rights, optional cancellation form, responsible use,
  fair suspension/change terms, mandatory remedies and home-country protections.
- The Terms do not impose blanket non-refundability, automatically waive
  cooling-off rights when someone signs in, promise universal portal
  cancellation/proration, or introduce an unapproved business liability cap.
- DPA is a professional information/request page explaining mandatory contract
  protections and completed schedules required before live processing. The full
  earlier proposed contract source is preserved at
  `docs/legal-archive/2026-10-20-dpa-source.txt`; it is not executed.
- The provider page is explicitly a conditional selection inventory, not an
  approved live subprocessor list. No supplier, region or transfer mechanism was
  selected by this work.
- Security keeps code-supported controls and locally-tested AI release scope;
  internal test counts and readiness lists have moved out of public presentation.
  The underlying 20 October source review remains above and in the prior source
  snapshot `/private/tmp/crewzy-legal-before-20261021`.
- Added footer Privacy, Terms, Data processing and Service provider links. Pricing FAQ now distinguishes Stripe from India/Razorpay seat handling, preserves statutory refund rights and links to the consumer terms. Approved rates are unchanged.
- All four legal routes retain robots/googlebot noindex,nofollow and remain out
  of the production sitemap until operational adoption. The displayed update
  date is not a statement that a customer accepted these terms or signed a DPA.

### Consumer flow source review

Read-only review of the actual canonical app established that registration
creates a company/workspace, owner and employee record; a company/workspace name
is required, but a business email domain is not. There is no age verification or
versioned Terms-acceptance record in the reviewed signup schema/form. Existing
app `/terms` still has placeholders; it was not changed by this website task.

Stripe uses recurring monthly or annual checkout; the annual monthly-equivalent
rate is multiplied by 12 and paid upfront. Razorpay validates monthly/yearly
plans. Paid checkout requires at least one managed employee. Stripe seat
increases are prorated and reductions affect renewal quantity; Razorpay changes
require review. Stripe portal actions depend on external configuration; Razorpay
has no equivalent portal here. No general cancellation/refund or consumer
cooling-off workflow was found. Deleting the workspace is not the normal route
for cancelling renewal or exercising a refund right.

### Release work still required

1. Provision and monitor privacy@crewzy.io and support@crewzy.io, assign owners
   and operate cancellation, complaint, rights and incident procedures. A chosen
   address is not proof of delivery or monitoring. Postal contact is also shown.
2. Select providers and legal entities; establish actual storage, backup, AI,
   support access, retention/training terms, processor contracts and transfers.
3. Agree organisational DPAs with completed instructions, security,
   subprocessor, location, return/deletion and retention schedules before live
   processing. Complete missing erasure/export and backup expiry coverage.
4. Align app Terms and personal-buyer onboarding, declared billing-country
   language, legal-capacity policy and versioned acceptance with these Terms.
   For genuine personal/household workspace use, this prepared notice identifies Crewzy as controller for service processing, with contractual necessity for the purchaser’s necessary information and a separate legitimate-interests basis for ordinary information about others. Complete the documented role/basis, balancing and sensitive-data assessment before enabling that use live.
   Capture any required express early-service request separately; do not treat
   acceptance of general Terms as consent to lose cancellation rights.
5. Implement the EU online statutory withdrawal function, confirmation and durable acknowledgement required for relevant online consumer contracts under national implementation of CRD Article 11a (Directive 2023/2673, measures applicable from 19 June 2026). This is a launch requirement; no technical checkout block was installed by this website task. The public Terms explicitly identify the missing function and do not present email/post as a substitute.
   Implement and prove accessible cancellation/refunds, renewal information,
   required reminders/notices and durable order/contract confirmation. Show
   consumer tax-inclusive totals before payment; existing Business price
   estimates are not proof of complete consumer tax handling.
6. Reconcile regional package/migration history and provider plan setup noted
   in the billing review before any real payment release. A paid Stripe country
   mismatch can require operator refund/reconciliation; Razorpay does not give
   equivalent company-country evidence.
7. Complete jurisdiction-specific privacy, consumer and tax review for the UK,
   India, US and euro-area countries; EU representative/DPO and Indian grievance
   roles must be assessed, not invented. Test actual production safeguards,
   recovery, access, incident handling and rights processes before assurance
   claims. No compliance certification or legal approval is asserted here.

### Current official reference checks

- Consumer Rights Act 2015, section 2: consumer status depends on purpose.
  https://www.legislation.gov.uk/ukpga/2015/15/section/2
- UK distance selling information and cancellation requirements:
  https://www.gov.uk/online-and-distance-selling-for-businesses
- Consumer Contracts Regulations 2013, regulations 30, 34 and 36:
  https://www.legislation.gov.uk/uksi/2013/3134
- EU online withdrawal function, CRD Article 11a and Directive 2023/2673 Article 2:
  https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02011L0083-20260927
  https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32023L2673
- EU withdrawal and digital-service rights:
  https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_en.htm
  https://europa.eu/youreurope/citizens/consumers/shopping/guarantees-returns/index_en.htm
- ICO privacy information (retention periods or meaningful criteria permitted):
  https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/
- ICO Article 28 contract subjects:
  https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/
- UK subscription guidance published 19 October 2026 is expressly DRAFT and
  says the new regime is not yet in force; its anticipated 1 January 2027 start
  remains subject to approval. Do not mistake the publication wrapper for an
  already commenced regime; recheck before launch/renewals.
  https://www.gov.uk/government/publications/subscription-contracts
  https://assets.publishing.service.gov.uk/media/6acf97da2de3184ccf8b814e/subscription-contracts-rules-guidance.pdf
- India official phased commencement notification, rechecked 21 October 2026:
  https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf

No production deployment, mailbox setup, supplier appointment, contract
execution, actual customer acceptance or payment was performed by this work.


### Validation of the 21 October presentation

- All 53 website tests pass, including ordinary legal titles and explicit
  noindex protection. TypeScript and tracked whitespace checks pass.
- Final isolated production-context Webpack build passed; 17 static pages were
  generated alongside dynamic pricing. Snapshot:
  `/private/tmp/crewzy-legal-build-isrls63a`. Log:
  `/private/tmp/crewzy-legal-build-final-20261021.log`.
- Parsed generated HTML: homepage remains indexable in production, while all
  four legal pages have clean titles, no draft banner, both robots/googlebot
  noindex,nofollow and working route references. Production sitemap omits legal
  launch pages. No new contract execution or acceptance is inferred.
- Actual browser review covered Privacy, Terms, DPA, Providers and Security.
  Desktop width 1485 and mobile width 390 remained within the viewport. The
  final privacy table is 640px inside a 350px keyboard-scrollable region;
  ArrowRight advanced it from zero to 35px in the final mobile check.
- Confirmed all four new legal footer destinations. Public security checklist
  and test counts are absent; local AI/live-verification scope remains.
- Proof images in the current task artifact directory include
  `crewzy-privacy-updated-20261021.jpg`, `crewzy-consumer-rights-20261021.jpg`,
  `crewzy-privacy-mobile-20261021.jpg`, `crewzy-providers-mobile-20261021.jpg`
  and `crewzy-security-updated-20261021.jpg`.
- Existing port 3001 server reused and left running; existing preview tab left
  on `/privacy` at its normal desktop viewport. No commit, push or deployment.


## Owner-confirmed providers and policies — 21 October 2026

This record supersedes earlier blanket statements that all suppliers are
undecided. The owner confirmed AWS RDS, Amazon Bedrock, Zoho email and Netlify
website hosting. Follow-up confirmed **RDS is in London** and **Zoho handles
Crewzy mailboxes**, including support and other Crewzy addresses. The follow-up
question included document storage, but only the RDS location was answered:
document storage and backups must not be assumed to share that location.
Zoho mailbox use does not establish the sender for authentication codes and
workflow emails. Mailbox provisioning/monitoring, provider contracting entities,
data centres, Bedrock models/inference routing, retention and accepted agreements
remain to be recorded.

The owner said payment providers are **not integrated**. Existing Stripe and
Razorpay work in local source is development evidence, not a statement that live
payments, country checks, proration or provider portals are connected. Public
Privacy, Terms, Pricing and Providers now reflect that distinction. The approved
regional prices are unchanged; they remain published intended Business rates.
No production payment or provider transaction was performed.

The owner confirmed that the platform is for personal expenses as well as
business expenses and team workflows. Per-employee Business charging remains the
chosen commercial basis, rather than usage-based refunds. The chosen rule is no
discretionary refunds merely for unused time/seats or ordinary seat reductions;
mandatory cancellation/refund and service-failure rights remain preserved. A
blanket "never refund under any circumstances" clause was not added.

The owner chose **90 days starting at workspace deactivation**, including where
non-payment results in deactivation. It does **not** start at the first missed
payment date and is not triggered solely by ordinary cancellation of renewal.
`app/legal-policy.ts` holds the shared presentation value. Privacy, Terms and DPA
explain this intended policy while preserving earlier valid return/deletion or
rights requests and applicable legal retention. No claim is made of a complete
automatic purge on day 91. Database, object storage/version, provider, AI,
backup and export/deletion coverage still needs implementation and proof. This
website change did not add any deletion job or alter service behaviour.

On access, the owner confirmed that **Crewzy personnel, not customers, have AWS
account access**; customers use Crewzy as SaaS and need no AWS accounts. An earlier
"from anywhere" reply did not identify administrators or working countries, and
the clarification still did not supply them. Do not reclassify this as verified
UK-only access, permission for worldwide support, a complete personnel inventory
or a technical inability to view records. Public copy records the known SaaS
relationship and leaves permissions/personnel/access countries to documentation.
Customer control of employee records and absence of routine manual viewing do
not remove processor duties for storage/workflows/AI. Personal-only purposes
continue to need their separately documented controller/grounds assessment.

Remaining owner/operating details: AWS/Zoho/Netlify contract entities and terms;
actual document storage/application runtime/backup services and regions;
Bedrock model/routing/settings; transactional-email sender; admin and contractor
roles/countries; monitored request/incident ownership; exact return/deletion and
backup implementation; completed DPA and consumer billing/cancellation flows.
The account-holder age rule and some detailed commercial/service terms remain
prepared legal choices rather than facts demonstrated by code; legal review and
operational adoption are still required before launch-final assurance.

No AWS, Zoho or Netlify account was changed. No mailbox was created, no DPA was
executed, no production records were opened or deleted, and no deployment took
place in this update.


### Validation after supplier and retention confirmations

- All 53 website tests, TypeScript and whitespace checks pass. Independent
  read-only review found no material supplier, payment, refund or retention
  contradictions; 7 relevant TS/TSX files also passed syntax checks.
- Isolated production-context Webpack build passed with the final files:
  `/private/tmp/crewzy-confirmed-policies-build-vq64jbpn`; log
  `/private/tmp/crewzy-confirmed-policy-build-20261021.log`.
- Generated HTML checks confirmed the provider names, RDS London, inactive
  retention heading, no live online payments and statutory-rights exception.
  All four legal pages retain robots/googlebot noindex,nofollow and no visible
  draft banner. These checks do not establish legal adoption or live controls.
- Actual browser review confirmed the selected-provider list and the rendered
  90-day deactivation period. At 390px, page width remained 390px with the native
  640px table inside its horizontal scroll region. Normal viewport restored.
- Saved review screenshots: `crewzy-confirmed-providers-20261021.jpg` and
  `crewzy-retention-policy-20261021.jpg` in this task’s artifact directory.
- Existing Codex-branch port 3001 preview retained, open on `/subprocessors`.
  No commit, push, release, payment configuration or actual deletion was done.


## Public presentation simplified after peer review — 21 October 2026

The owner explicitly approved simplifying the public Security, Privacy, Terms,
DPA and provider pages after comparison with Thrivea, CharlieHR, Breathe and
Zoho Expense. This is a presentation change, not operational or legal approval.
Confirmed facts, legitimate disclosure needs and essential limits remain public;
internal data-mapping questions, detailed verification tasks and evidence remain
here. The pre-simplification public source is preserved under
`docs/legal-archive/2026-10-21-before-public-simplification/` as text files.
That archive was copied from the successful owner-confirmation build snapshot,
not reconstructed from memory. It is not a public route or an executed contract.

### Public changes

- Privacy has a short at-a-glance summary, readable sections and a native
  expandable workspace-data table. No data category was removed from the shared
  category inventory. Controller/processor roles, personal use, lawful grounds,
  AI/document content, rights/objection, contact, international scope, retention,
  browser storage and country-pricing disclosures remain.
- Repeated pending-detail checklists have been removed. One concise location
  qualification remains because London is confirmed for RDS only; removing that
  limit would risk an unsupported UK-only processing impression. Transfer
  safeguards are not represented as already executed or verified.
- Ninety days remains the intended policy from workspace deactivation, with one
  central explanation that complete deletion across systems/backups is not yet
  verified and no automatic-all-copies promise. Earlier valid requests and
  mandatory retention remain separately addressed.
- Providers now lists the four confirmed services by purpose and information,
  links to the location information and DPA, and briefly notes online payments
  are not connected. Candidate integrations, development payment providers,
  unresolved entity/account details and administrator inventories moved out of
  the public table; no exact provider legal entity was invented.
- DPA is a concise explanation and request page. Mandatory contract protections
  remain; a written service-specific agreement is still required before live
  organisational processing and is not executed by viewing the page.
- Terms are approximately 30% shorter. Personal/organisation scope, per-employee
  charging, annual upfront/renewal, no discretionary unused-seat refunds,
  statutory rights, optional cancellation form, early-start/non-waiver rules,
  future EU online withdrawal prerequisite, fair service-change/suspension,
  liability and mandatory local jurisdiction protections remain.
- Security presents application design safeguards and responsible AI use,
  without source-review banners or negative certification inventories. The
  specific credential-filtering and cross-user memory-reset assurances have
  been REMOVED from public claims while their live release is unverified.
  This does not change those local fixes or regress their test evidence. It
  avoids silently upgrading locally tested fixes into deployed guarantees.
- Existing brand colours, typography, global navigation/footer, routes and
  noindex launch protection are retained. No certification, encryption,
  restore/uptime promise or new access-control restriction was introduced.

### Internal items retained

The source evidence map and earlier entries remain applicable: supplier legal
entities/account agreements; exact storage/runtime/backup/model routing and
provider retention/training; transactional email; staff/admin roles and working
countries; confidentiality/access reviews; incident/request/contact owners;
complete export/deletion/backup operation; personal-use lawful-basis and role
assessment; regional consumer/tax review; Terms acceptance and notices;
consumer cancellation/refunds and EU online withdrawal. The 18+ account rule
remains a prepared commercial eligibility term rather than an age-verification
capability. Removing public review chatter does not close these items.

### Peer and regulator basis

Peers use layered public privacy, short security summaries, separate provider
lists and service agreements. Website-only notices must not be mistaken for
full application notices; peer business-only refund clauses must not replace
Crewzy's consumer rights. The structure was informed by, not copied from:

- https://thrivea.com/privacy-policy/
- https://thrivea.com/terms-of-use/
- https://thrivea.com/data-processing-addendum/
- https://www.charliehr.com/privacy
- https://help.charliehr.com/en/articles/2020114-security-at-charlie
- https://www.breathehr.com/en-gb/subprocessors
- https://www.breathehr.com/en-gb/privacy-policy
- https://www.zoho.com/expense/kb/admin/general/security-privacy-policies/
- https://www.zoho.com/refundpolicy.html
- https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/
- https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/how-should-we-draft-our-privacy-information/

No live configuration, customer data, payment account, cloud permissions,
mailboxes or deletion job was changed. No supplier was appointed by code, no DPA
was executed, and no live deployment or customer acceptance occurred.


### Validation of the public simplification

- All 53 website regression tests, TypeScript and whitespace checks passed.
  Independent content review found no new material contradictions or unsupported
  certification, UK-only, deployed AI-protection or automatic-deletion claims.
- Final isolated production build passed:
  `/private/tmp/crewzy-public-legal-build-zg_erfn2`; log
  `/private/tmp/crewzy-public-legal-build-20261021.log`.
- Generated HTML checks confirm the privacy overview, native disclosure closed
  by default with all 9 category rows retained in HTML, deactivation-based 90-day
  period and central deletion qualification. Terms retain statutory cancellation,
  14-day and online withdrawal provisions; DPA is not executed by page viewing;
  Providers retains all four confirmed services. All four legal routes retain
  robots/googlebot noindex,nofollow. Security omits internal review banners and
  the unverified credential/chat-reset assurances.
- Actual browser review covered Privacy, Terms, Security, Providers and DPA.
  The native privacy disclosure opened by click, closed with Enter, and exposed
  a keyboard-scrollable table. At 390px the page stayed within 390px; the open
  table was 640px in a 316px region and ArrowRight advanced horizontal position
  to 27px. Provider and DPA pages also remained within the mobile viewport.
- Desktop viewport restored to 1485px. Saved the customer-facing overview at
  `crewzy-privacy-simplified-20261021.jpg` in this task’s artifact directory.
  Existing preview tab retained on `/privacy`; server left running on port 3001.
- No production publication, cloud/payment/data-handling change, commit or push.


## Business included employees — 22 October 2026

The owner changed Business seat pricing: the first 10 managed employees remain
included and only employees above 10 are billable. This supersedes the earlier
all-seat Business examples. The website calculator, displayed regional examples
and Terms now use that rule; the rates and Free feature limits are unchanged.
The Terms update date is 22 October 2026. Online payments remain unconnected.
Canonical application billing/count presentation changes are prepared separately
and require coordinated Common, company-service and frontend release. The
Free cap remains 10 managed employees; zero-quantity paid checkout is blocked.
A self-service upgrade path at the 10-employee cap requires an explicit launch
decision before enabling payment checkout; no free Business activation was added.
