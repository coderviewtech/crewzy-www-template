# UK keyword validation — 17 November 2026

Market: United Kingdom. Engine: Google. Source: Ahrefs Free Keyword Generator,
country selector visibly set to United Kingdom. These are third-party estimated
monthly searches, displayed as thresholds, not exact Google counts, forecasts or
promised visits. Do not turn `>100` into an invented 100–1,000 range or add volumes
across overlapping phrases. Ahrefs difficulty labels are estimates, not a guarantee
that a new site can rank. The free view exposes only a subset of keywords.

| Observed keyword | Monthly estimate shown | Ahrefs difficulty shown | Crewzy destination / use |
| --- | --- | --- | --- |
| hr software | >1,000 | Hard | Broad category context; not the sole acquisition target |
| hr software for small business | >100 | Easy | `/platform/hr-software-small-business` |
| hr software uk | >100 | Easy | Supporting UK intent on the small-business page |
| hr software for small businesses uk | >100 | Not exposed | Same page; do not create a duplicate UK landing page |
| leave management software | >100 | Easy | `/platform/leave-management` |
| hr leave management software | >100 | Easy | Same leave page |
| employee leave management software | >100 | Easy | Same leave page |
| leave management software for small business | <100 | N/A | Relevant supporting small-team wording |
| leave management software uk | <100 | Not exposed | Supporting UK intent |
| timesheet | >1,000 | Hard | Broad term; narrower commercial intent is preferable |
| timesheet software | >100 | Medium | `/platform/timesheets-and-invoicing` |
| timesheet app | >100 | Medium | Supporting phrase, without suggesting a native mobile app |
| what is a timesheet | >1,000 | Easy | Answered briefly in the timesheet-to-invoice guide |
| timesheet template | >1,000 | Easy | Separate template intent; this release does not offer a downloadable timesheet |
| document expiry tracking | <100 | Not exposed | `/platform/document-expiry-tracking` and its practical guide |
| document expiry reminder software | <100 | N/A | Adjacent intent; do not promise unverified reminder channels/features |
| document expiry tracker | <100 | Not exposed | Supporting wording on the document page |

Sources and saved observations:

- [HR software results](https://ahrefs.com/keyword-generator/?country=gb&input=hr%20software), [observed table](evidence/ahrefs-uk-hr-software.txt). The small-business result showed “5 days” under Updated; the UK small-business variant “6 days”.
- [Leave results](https://ahrefs.com/keyword-generator/?country=gb&input=leave%20management%20software), [observed table](evidence/ahrefs-uk-leave.txt). The main term showed Updated 6 November.
- [Timesheet results](https://ahrefs.com/keyword-generator/?country=gb&input=timesheet), [observed table](evidence/ahrefs-uk-timesheet.txt). Timesheet software showed Updated 29 October; the definition query 9 November.
- [Document-expiry results](https://ahrefs.com/keyword-generator/?country=gb&input=document%20expiry), [observed table](evidence/ahrefs-uk-document-expiry.txt).

Ahrefs describes these as local/global monthly search estimates based on clickstream
inputs on the [tool page](https://ahrefs.com/keyword-generator/). Its country-specific
output was read in the browser; the static public HTML alone does not contain the
result tables. A further `timesheet and invoicing` submission did not produce a
result table, so no exact-match volume is claimed for that combined phrase.

## Decisions implemented

1. Prioritise small-business HR and leave-management pages for commercial UK
   discovery. Their observed demand and product fit are stronger evidence than
   simply selecting the broadest category term.
2. Keep the timesheet page focused on agencies, approvals and client invoicing.
   The broad software term has measurable demand; the narrower positioning is a
   product-fit decision, not a validated exact-match volume claim.
3. Keep document expiry as a useful specialist acquisition page. Its smaller
   volume can still matter to qualified buyers; do not describe it as a high-volume
   keyword or infer easy ranking from low volume.
4. Give each commercial page one complementary practical guide. The guides answer
   renewal tracking, invoice reconciliation, spreadsheet migration and holiday
   request questions. They have original checklists, clearly illustrative examples,
   official references and links to the relevant product page.
5. Use natural wording in titles, introductions and headings. Do not stuff hidden
   keywords, manufacture customer evidence or create near-identical regional pages.
   Payroll, rota planning, authenticity verification and guaranteed compliance are
   not promised as Crewzy capabilities.

## Google sources and limits

Both Crewzy-related Google accounts showed no Google Ads account when opening
Keyword Planner. No Ads account, billing arrangement or campaign was created.
Google Planner volume/CPC estimates remain unavailable. That does not prevent
organic indexing or require paid advertising.

Google Trends was checked for United Kingdom, past 12 months, Web Search, using
search terms. Related queries supported “annual leave management software”,
“online staff holiday planner”, “simple timesheet software” and “what is a
timesheet”. Document expiry tracking had insufficient data, which is not proof
of zero demand. The broad HR comparison exposed unrelated rising queries, so its
numeric comparison was excluded from prioritisation. Trends is relative interest,
not absolute search volume. [Google's explanation](https://support.google.com/trends/answer/4365533?hl=en)

The current Search Console sample is mainly branded and too small to validate
non-brand conversion potential. After publication, compare UK non-brand queries,
landing pages and actual completed signups over like-for-like 28-day windows.
Record results for at least several crawl/reporting cycles before rewriting pages
based on a handful of impressions. Measurement setup is documented in the main
[SEO audit](seo-20261117.md).
