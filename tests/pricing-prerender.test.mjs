import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

// Run against an isolated production build, never rebuild the user's live .next.
const buildDirectory = process.env.CREWZY_PRICING_BUILD_DIR;
const markets = { UK: "£8", IN: "₹149", US: "$10", EU: "€9", unknown: "Let’s talk" };

function readBuild(file) {
  return readFileSync(path.join(buildDirectory, file), "utf8");
}

function visibleText(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, "");
}

test("pricing has a pre-rendered fallback and all five finite market variants", { skip: !buildDirectory }, () => {
  const manifest = JSON.parse(readBuild("prerender-manifest.json"));
  for (const route of ["/pricing", ...Object.keys(markets).map(market => `/pricing/market/${market}`)]) {
    assert.ok(manifest.routes[route], `${route} must be generated at build time`);
    assert.equal(manifest.routes[route].initialRevalidateSeconds, false);
  }
  assert.equal(manifest.dynamicRoutes["/pricing/market/[market]"].fallback, false);
});

for (const [market, price] of Object.entries(markets)) {
  test(`${market} pricing is complete and indexable under the public canonical before JavaScript`, { skip: !buildDirectory }, () => {
    const html = readBuild(`server/app/pricing/market/${market}.html`);
    const text = visibleText(html);
    assert.ok(text.includes(price), `${market} must show its approved Business price in server HTML`);
    assert.match(text, /your first 10 stay included/i);
    assert.match(text, /Charges start with employee 11/);
    assert.match(html, /<link rel="canonical" href="https:\/\/crewzy\.io\/pricing"\/>/);
    assert.match(html, /<meta name="robots" content="index, follow"\/>/);
    assert.doesNotMatch(html, /<meta name="(?:robots|googlebot)" content="[^"]*noindex/);
    if (market === "unknown") {
      assert.doesNotMatch(text, /(?:£|₹|€|\$)\d/);
      assert.doesNotMatch(html, /id="employees"/);
    } else {
      assert.match(html, /id="employees"/);
    }
  });
}
