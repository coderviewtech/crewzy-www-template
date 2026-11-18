# Change Compliance Report — Crewzy enquiry hosting setup

## Requested outcome

Enable Netlify Forms for `crewzy-product-enquiry`, configure notification delivery
to `sales@crewzy.io`, and verify that a preview submission saves the supplied name
and email and reaches the sales inbox before production publication.

This report records the initial draft verification. The owner subsequently
authorised publication, completed and verified on the live site the same day.
See [the production release report](netlify-publication-20261118.md).

## Completed outcome

- Enabled form detection on Crewzy's existing Netlify project
  `jade-brigadeiros-857d10` (`9e2edff1-ebdd-4119-8677-c1a6c56b742c`).
- Netlify detected `crewzy-product-enquiry`, form ID
  `6afd8df112363dd68f9b4d38`, with honeypot protection.
- Saved and verified a notification scoped specifically to that form, addressed
  to `sales@crewzy.io`, with subject `Crewzy website enquiry`. The owner completed
  the recipient confirmation and the pending status cleared.
- The owner explicitly approved authorizing the official Netlify CLI and storing
  its credential locally. The earlier approval/session blockers were resolved;
  no credentials or confirmation links are recorded here.
- Built with Netlify CLI 27.20.0 in deploy-preview context: all 35 routes and the
  server/edge bundles completed. Deployed draft `6afd8dd6ad129253151ab286`.
  Initial upload attempts failed before completion; using the canonical project
  UUID with a full preview build resolved the storage identifier error.
- No application code or dependencies were edited for this hosting setup.
  Existing registration at `public/__forms.html` and the browser POST were reused.

## End-to-end evidence

At 11:40 UTC on 18 November 2026, submitted exactly one enquiry through the
actual preview chat on `/meet`:

| Field | Observed value |
| --- | --- |
| Name | Crewzy preview test 2026-11-18 |
| Email | sales@crewzy.io |
| Source | meetup-page |
| Follow-up request | Please email me about my interest in Crewzy. This does not subscribe me to ongoing marketing. |
| Notice version | 2026-11-13 |

The browser transitioned from sending to the prepared-question interface. Opened
“What does Crewzy bring together?” and confirmed its answer rendered. Netlify's
verified-submissions view contained the exact values above. No question selections
or transcript fields were sent.

Zoho's Sales folder received the notification from `formresponses@netlify.com`
at **11:40:51 UTC**. Verified subject, To `sales@crewzy.io`, Reply-To
`sales@crewzy.io`, and all five submitted values. Search indexing briefly lagged
behind delivery; the message was visible directly in the Sales folder.

- [Draft meetup preview](https://6afd8dd6ad129253151ab286--jade-brigadeiros-857d10.netlify.app/meet)
- [Saved submissions](https://app.netlify.com/projects/jade-brigadeiros-857d10/forms/6afd8df112363dd68f9b4d38)
- [Draft deploy](https://app.netlify.com/projects/jade-brigadeiros-857d10/deploys/6afd8dd6ad129253151ab286)

The draft returns HTTP 200 and `X-Robots-Tag: noindex, nofollow`. A read-only
Netlify API check after deployment confirmed that production still uses deploy
`6afc9a98b44f0e71789ca6c9`, commit
`182f287850258154741454ff653869ce8e16da95`, matching the baseline before the test.
No production publication, Git commit or push occurred.

Proof images are in
`/Users/mano/.codex/visualizations/2026/11/13/01a1d5a0-c171-7c70-a766-d9c097e8582b/crewzy-netlify-forms/`:
`notification-delivered.png` and `preview-chat-accepted.png`. The notification
image includes the relevant email only, excluding other correspondence and the
provider's unsubscribe token. The labelled synthetic test record/email remain
available for owner review; no records were deleted.

## Compliance

- Reuse: Existing form registration, submission code and prepared answers.
- No-assumptions: Verified provider settings, actual saved fields, chat success,
  email receipt and unchanged production deploy.
- Layering/OOP: No application code changed.
- Config/overrides: Form detection enabled; form-specific notification confirmed.
  Preview build context retained; no application environment changes.
- Tenancy/RBAC: No workspace records or access permissions touched.
- Audit: Saved test, delivered email, preview and production deploy IDs recorded.
- Errors/logging: No credentials recorded; no unrelated message bodies opened.
- Duplication/unused code: None introduced.
- Tests: Netlify build, preview HTTP/header checks and actual external submission /
  mailbox delivery passed. No unit suites or coverage run; no CI pass claimed.
- Workflow automation: Confirmed sales notification fires for the enquiry form.
- Product value: Confirm lead capture and sales follow-up before launch.
- Cross-service impact: Netlify Forms and Zoho sales inbox; no product API change.
- Skill updated: README and this report record completed hosting setup; external
  skills unchanged.
- Residual risk / follow-up: This proves the draft enquiry flow, not email ownership
  verification or every future delivery. Production publication remains separate.
  Existing account permissions and retention policies were not changed. The local
  Next development server still does not process hosted Netlify submissions.

Sources: [Next.js form integration](https://opennext.js.org/netlify/forms),
[form detection](https://docs.netlify.com/manage/forms/setup/),
[notifications](https://docs.netlify.com/manage/forms/notifications/).
