import assert from "node:assert/strict";
import { test } from "node:test";

// Run against an already-started server with trusted test geography supplied
// by its local process, or a deployment whose expected geography is known.
const origin = process.env.CREWZY_PRICING_TEST_ORIGIN;
const market = process.env.CREWZY_PRICING_EXPECTED_MARKET;
const prices = { UK: "£8", IN: "₹149", US: "$10", EU: "€9", unknown: "Let’s talk" };

async function request(path, init = {}) {
  return fetch(new URL(path, origin), {
    ...init, redirect: "manual", signal: AbortSignal.timeout(10_000),
  });
}

async function checkHtml(path = "/pricing", init) {
  const response = await request(path, init);
  assert.equal(response.status, 200, `Expected pricing HTML, received ${response.status}; bind local Next servers with --hostname localhost`);
  assert.equal(response.headers.get("location"), null);
  assert.match(response.headers.get("content-type"), /^text\/html/);
  const html = await response.text();
  const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, "");
  assert.ok(text.includes(prices[market]), `Expected ${market} price in complete server HTML`);
  assert.match(html, /<link rel="canonical" href="https:\/\/crewzy\.io\/pricing"\/>/);
}

test("native pricing HTTP routing serves HTML and Flight without loops or currency overrides", { skip: !origin }, async () => {
  assert.ok(Object.hasOwn(prices, market), "Set CREWZY_PRICING_EXPECTED_MARKET to the server's trusted market");
  await checkHtml();
  await checkHtml("/pricing?previewMarket=UK&country=GB&currency=GBP", {
    headers: { "x-crewzy-pricing-country": market === "IN" ? "GB" : "IN", cookie: "market=UK; currency=GBP" },
  });

  const head = await request("/pricing", { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.match(head.headers.get("content-type"), /^text\/html/);
  assert.equal(await head.text(), "");

  for (const value of [...Object.keys(prices), "invalid"]) {
    const response = await request(`/pricing/market/${value}`);
    assert.equal(response.status, 307);
    const destination = new URL(response.headers.get("location"), origin);
    assert.equal(destination.origin, new URL(origin).origin);
    assert.equal(destination.pathname, "/pricing");
  }

  // Next may normalize an invalid Flight hash with a public-URL redirect first.
  // Follow only bounded same-origin redirects and retain the RSC request headers.
  let flightPath = "/pricing?_rsc=pricing-regression";
  let flight;
  for (let attempt = 0; attempt < 4; attempt++) {
    flight = await request(flightPath, { headers: { RSC: "1", Accept: "text/x-component" } });
    if (flight.status !== 307 && flight.status !== 308) break;
    const destination = new URL(flight.headers.get("location"), origin);
    assert.equal(destination.origin, new URL(origin).origin);
    assert.equal(destination.pathname, "/pricing", "Flight normalization must keep the public URL");
    flightPath = destination.pathname + destination.search;
  }
  assert.equal(flight.status, 200, "Flight normalization must finish without a redirect loop");
  assert.match(flight.headers.get("content-type"), /^text\/x-component/);
  const body = await flight.text();
  assert.ok(body.includes(`"market":${market === "unknown" ? "null" : JSON.stringify(market)}`));
  assert.doesNotMatch(body, /^\s*<!doctype html/i);
  // The inverse cache/protocol order must still return HTML after Flight.
  await checkHtml();
});
