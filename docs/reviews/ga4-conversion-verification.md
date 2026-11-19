# GA4 conversion verification

Deploy the marketing release first so its Netlify form schema contains the three lead attribution fields and the first-party signup frame is available. Deploy the app release second. Verify the marketing frame only permits the configured central app origin and the app permits the marketing frame on its signup page.

Crewzy's existing GA4 property has two code-based key events, `generate_lead` and `sign_up`, and event-scoped custom dimensions **Lead source**, **Lead medium**, and **Lead campaign**. Custom dimensions can take time to appear in standard reports. Check Realtime event parameters during the smoke test.

1. Open a fresh browser session with an ad blocker disabled. Use a tagged landing URL such as `https://crewzy.io/meet?utm_source=qa&utm_medium=test&utm_campaign=crewzy-enquiry-qa`. Accept optional analytics.
2. Open the first-party chat and submit one owner-approved, labelled test enquiry. Confirm the form shows success, Netlify stores the record with `qa / test / crewzy-enquiry-qa`, and the Sales notification gets delivered. Verify exactly one `generate_lead` with the same three values. Clicks on email links cannot verify an enquiry submission.
3. Open a fresh browser session. Use the same landing URL with `utm_campaign=crewzy-signup-qa`, accept analytics, and follow **Start free** in the same browser. Complete one owner-approved test signup. Verify the workspace is created and that exactly one `sign_up` in GA4 has `qa / test / crewzy-signup-qa`.
4. Verify that rejecting analytics prevents the tag and conversion event and that the enquiry can still be submitted. A failure or duplicate click must not emit a conversion. Check that no personal fields or raw URL queries are sent to GA4.
5. In an Exploration, break down **Event count** by **Event name**, **Lead source**, **Lead medium** and **Lead campaign**. Keep the QA campaigns out of campaign performance comparisons.

Both live acceptance cases must be observed before using these events to evaluate paid traffic.
