# Static regional pricing review — 25 October 2026

## Change and scope

Public `/pricing` previously called `headers()` under `force-dynamic`; a custom Netlify Edge Function then disabled all CDN caching. It now uses a native Next proxy and five build-time page variants: UK, India, US, euro area and unknown. The public fallback is also static and shows no inferred regional price.

The existing calculator, approved rates, first-ten-included rule, page layout and colours are unchanged. This changes public price presentation only. The application remains responsible for selecting purchasable prices from its stored billing country and payment checks; neither GeoIP nor a marketing-page URL authorizes a subscription or currency.

## Routing and trust boundary

- `proxy.ts` selects a supported market only from the Netlify platform's `Netlify.context.geo.country.code`. Missing, malformed and unsupported geo selects `unknown`. Browser headers, cookies and query parameters do not select a production market. The obsolete `x-crewzy-pricing-country` header is removed before forwarding.
- Development-only `previewMarket` retains local visual QA, including the previous UK local default. Production builds ignore this query override.
- The native `NextResponse.rewrite` preserves the query string, `_rsc` hash and Next router request headers. No private adapter metadata or cache headers are constructed by application code.
- Each market has a separate rewritten pathname and therefore a separate adapter cache key. External requests for market implementation paths receive a non-cacheable 307 back to `/pricing`; those paths are not a public currency selector.
- All variants inherit the public `/pricing` canonical and normal build-context indexing policy. No internal-path noindex metadata leaks into the rewritten public page. The sitemap continues to list only `/pricing`.
- The Pricing navigation state recognizes both the public and internal path during hydration.

The old custom edge registration and its forced no-store response wrapper are removed. Native proxy is compiled by Netlify's Next adapter as an edge function. The adapter owns HTML/Flight variations and cache behavior. A first request after deployment may still invoke its server function to fetch pre-rendered route-cache content; static generation alone does not promise zero cold-start latency. Live cache-hit and regional navigation checks remain required.

## Primary runtime evidence

The public Netlify bootstrap used for this review is version 3.2.0:

- [Handler, line 65](https://v3-2-0--edge.netlify.com/bootstrap/handler.ts): assigns `globalThis.Netlify`.
- [Global implementation, lines 5–9](https://v3-2-0--edge.netlify.com/bootstrap/globals/implementation.ts): its context getter returns the current invocation context.
- [Function chain, lines 258–265 and 548–556](https://v3-2-0--edge.netlify.com/bootstrap/function_chain.ts): the invocation context includes platform geolocation and is available through request-scoped asynchronous execution.
- [Context type, lines 3–8 and 36–38](https://v3-2-0--edge.netlify.com/bootstrap/context.ts): defines `geo.country.code`.

The adapter's [Node middleware fixture](https://github.com/opennextjs/opennextjs-netlify/blob/main/tests/fixtures/middleware-node-runtime-specific/middleware.ts) accesses the same Netlify global. Its [Node shim](https://github.com/opennextjs/opennextjs-netlify/blob/main/edge-runtime/shim/node.js) provides Node runtime primitives without replacing that global.

The adapter's [native rewrite implementation](https://github.com/opennextjs/opennextjs-netlify/blob/main/edge-runtime/lib/response.ts#L209-L225) keeps the public request URL separately from the rewritten cache pathname. Its [response-header implementation](https://github.com/opennextjs/opennextjs-netlify/blob/main/src/run/headers.ts#L124-L179) maintains RSC/router-header and `_rsc` cache variations. This is why the change uses native rewrites and does not replace the adapter's `Vary`, `Netlify-Vary` or private request metadata.

Relevant platform documentation: [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/), [edge API and full global Context](https://docs.netlify.com/build/edge-functions/api/#netlifycontext), and [request processing order](https://docs.netlify.com/resources/troubleshooting/request-chain/).

## Verification

The regression was observed before implementation: the existing production build had no pre-rendered `/pricing` entry, and none of the five market HTML files existed. The new build passes all six artifact checks: finite static routes with fallback disabled; each approved price already present before JavaScript; first-ten inclusion; public canonical; index/follow; and a currency-neutral unknown variant.

Nine actual-proxy behavioral tests cover supported geography, malformed/missing/null platform context, production override attempts, Flight headers and query preservation, HTML and HEAD requests, direct implementation-path redirects, trailing slashes, development-only previews and matcher scope. Tests invoke the real proxy under Node's native TypeScript runner. The installed Next package currently exports the matcher helper under `unstable_doesMiddlewareMatch`, although its bundled documentation calls it `unstable_doesProxyMatch`.

Checks completed:

- Complete website suite with the isolated production build and known-geo HTTP origin supplied: **76 passed, 0 failed, 0 skipped**.
- Default unit-suite invocation: **69 passed, 7 integration checks skipped** until a build directory and known-geo HTTP origin are supplied.
- Full TypeScript check and whitespace check passed.
- Isolated production Webpack build passed on Next 16.3.4; `/pricing` is static and all five market routes are SSG.

Commands:

```sh
node --test tests/*.test.mjs
./node_modules/.bin/tsc --noEmit --incremental false
CONTEXT=production npm run build -- --webpack
CREWZY_PRICING_BUILD_DIR=/path/to/isolated-build/.next node --test tests/*.test.mjs
```

The build command must run inside an isolated checkout so that active local preview artifacts are preserved. Production deployment, genuine country-specific CDN hits, actual HTML/Flight negotiation and browser calculator/hydration checks are separate integration steps. No application billing data, authentication, infrastructure, DNS or deployment was changed by this pricing patch.


## Native HTTP integration and local binding

A native production server bound with `--hostname 127.0.0.1` exposed a local Next origin-normalization mismatch: NextRequest normalizes loopback IPs to `localhost`, but the router compares a rewrite against the configured bind hostname. The rewritten URL was then fetched as an external origin, causing a new request to reach the direct-market redirect guard. Changing the browser's Host alone does not change the configured bind hostname.

The same unmodified production build bound with `--hostname localhost` returns 200 HTML at `/pricing`, the correct Indian rate under trusted test-process geography, no production query/header currency override, and the intended 307 for direct market URLs. No product routing exception or client-supplied bypass header was added. Local QA servers must bind to `localhost`; this avoids changing production logic to accommodate a loopback-only server mismatch.

`tests/pricing-http.test.mjs` is an opt-in regression against an already-running server. It checks complete pricing HTML, HEAD, forged currency hints, direct-route redirects, bounded Flight hash normalization that retains `/pricing`, an actual RSC payload, and HTML after an RSC request. It uses no production geo override.

```sh
# Start the isolated Next server with --hostname localhost, with known platform geo.
CREWZY_PRICING_TEST_ORIGIN=http://localhost:3187 CREWZY_PRICING_EXPECTED_MARKET=IN node --test tests/pricing-http.test.mjs
```

Without an explicitly configured test origin this integration check is skipped. The final combined run supplies both the isolated build directory and this origin, so that all artifact and HTTP checks execute. Browser and genuine Netlify CDN/geo-cache checks remain separate.

The native HTTP regression failed against the original IP-bound server (307 instead of 200) and passed against the localhost-bound server using the same application build. The combined final suite passed all 76 checks, with no skips.


## Browser verification

The root browser check used the isolated production build at
`http://localhost:3187/pricing`, with Indian geography supplied only by that
local server process. The page displayed INR at its public URL. Ten employees
showed no employee charge; employee eleven showed ₹149 monthly. Switching to
annual billing showed ₹119 per additional employee per month and ₹1,428 yearly
for the one billable employee. The page had no console errors after hydration.
The existing layout, colours, policy/app links and first-ten messaging remain.
A screenshot is retained in the task artifacts as
`crewzy-inr-pricing-tested-20261025.png`.

Root HTTP checks independently confirmed complete INR HTML, canonical metadata,
ignored forged GBP hints, direct-market redirects, Flight completion with one
public hash-normalization redirect, and HTML after Flight. Real regional CDN
behavior remains a deployment check; no production GeoIP override was added.

An extra source-directory build was interrupted before completion during QA.
It invalidated generated production build manifests; no website server was
running on port 3001 and the source `.next/dev` directory was unchanged.
No generated cache reset or server restart was performed. Final build and
integration verification used the isolated build above.
