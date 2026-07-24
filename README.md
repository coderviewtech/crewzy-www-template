# crewzy-www

The public marketing site — **crewzy.io**.

Deliberately separate from `crewzy-frontend-nextjs`. This repo contains no
product routes, no API routes, no auth and no backend configuration, so there
is nothing here that could leak onto a public host. Every page is statically
prerendered.

The product itself lives on its own host (dev.crewzy.io today, app.crewzy.io
later) and is reached only through the CTA links below.

## Pages

| Route | What it is |
|---|---|
| `/` | Landing page — the consolidation pitch, module carousel, evidence, FAQs |
| `/solutions` | Industries by business shape, then three deep segments |
| `/customers` | Early-access / design-partner page |
| `/resources` | How modules work, and the security & trust controls |

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Where the CTAs point

"Start free" and "Sign in" are the only links that leave this site. They all go
through a single helper — `appUrl()` in `app/chrome.tsx` — so there is exactly
one place that decides which host serves the product.

It reads `NEXT_PUBLIC_APP_ORIGIN` and defaults to `https://dev.crewzy.io`.
When `app.crewzy.io` exists, change the one line in `netlify.toml`. No code
change is needed.

## Deployment — Netlify

Connected to this repo; every push to `main` rebuilds. Settings live in
`netlify.toml`, including `NEXT_PUBLIC_APP_ORIGIN`.

### DNS

DNS stays at **Namecheap** — there is no nameserver change, so the SendGrid
domain-authentication records are untouched.

| Record | Host | Value |
|---|---|---|
| CNAME | `www` | `<site>.netlify.app` |
| ALIAS / A | `@` | as shown in Netlify's domain settings |

`dev.crewzy.io` continues to point at EC2 and is unaffected by any of this.

## Conventions worth keeping

- **One heading rule.** The closing phrase of every heading is wrapped in a
  `<span>` and rendered in coral, so the eye lands on the payoff. Every `h1`
  and `h2` follows it.
- **One brand mark.** `BrandIcon` in `app/chrome.tsx` is the single definition.
  Header, footer, the convergence hub and the integration hub all use it —
  they previously drifted onto different icons.
- **The module menu is matched by slug, not index.** Reordering the modules
  cannot open the wrong one.
- **Claims are checked before they ship.** The security page lists only
  controls that exist, and says plainly that there is no SOC 2 or ISO 27001
  certification yet. Keep it that way.
