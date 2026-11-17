# Homepage headline restoration — 17 November 2026

The owner requested the original homepage title back after the SEO publication.
`app/page.tsx` restores the exact headline from Git revision `f98ed55`:
“A clearer way to run your people and work.” The existing line break and emphasis
are retained. This is a one-line presentation-copy change.

## Change Compliance Report

- **Reuse:** existing homepage H1, markup and styles.
- **No-assumptions:** original wording verified against `f98ed55`; production
  branch verified at `ad23b7b` before editing. Locked Next page documentation read.
- **Layering/OOP:** existing presentation component; no new logic.
- **Config/overrides:** static marketing copy; no configuration change.
- **Tenancy/RBAC:** not applicable to this public headline.
- **Audit:** no HR or account mutation; Git records the copy correction.
- **Errors/logging:** no error-handling or logging change.
- **Duplication:** no duplicate implementation added.
- **Unused code:** no imports, variables or modules added.
- **Tests:** exact original-copy comparison and `git diff --check` passed. No new
  unit test for reversible static copy. Publication uses the installed gitleaks,
  lint and TypeScript hooks; live HTML/browser verification follows deployment.
- **Workflow automation:** existing Git-connected Netlify production deployment.
- **Product value:** restores the owner's preferred homepage wording.
- **Cross-service impact:** marketing repository only; one H1 text replacement.
- **Skill updated:** dated frontend marketing note records the restored wording.
- **Residual risk / follow-ups:** low-impact copy correction; the final response
  records the observed production result.

## Supporting-text restoration

The owner subsequently requested and authorised publication of the original
supporting paragraph too. The exact `f98ed55` wording is restored:
“People management and employee lifecycle workflows.” followed by
“Everyday work, document expiry tracking and compliance evidence.”
The existing responsive line break and paragraph styles are reused. Production
branch `9535602` was verified before the edit; the checkout was clean. This is
another one-line presentation-copy change under the compliance review above.
The installed publication hooks and live homepage verification apply again.
