import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { AsyncLocalStorage } from "node:async_hooks";
import { test } from "node:test";
// Match the runtime bootstrap Next provides before loading its server modules.
globalThis.AsyncLocalStorage ??= AsyncLocalStorage;
const { NextRequest } = await import("next/server.js");
const { default: testing } = await import("next/experimental/testing/server.js");

const { getRedirectUrl, getRewrittenUrl, isRewrite, unstable_doesMiddlewareMatch: doesProxyMatch } = testing;

// Node's native TS runner needs the explicit extension; Next resolves this import
// through its bundler. Exercise the actual proxy without compiling a test copy.
const proxyUrl = new URL("../proxy.ts", import.meta.url).href;
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL === proxyUrl && specifier === "./app/pricing/pricing-model") {
      return nextResolve(new URL(`${specifier}.ts`, proxyUrl).href, context);
    }
    return nextResolve(specifier, context);
  },
});
const { proxy, config } = await import(proxyUrl);
hooks.deregister();

function route(url = "https://crewzy.io/pricing", { country, headers, mode = "production", platform = true, method = "GET" } = {}) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "Netlify");
  const previousMode = process.env.NODE_ENV;
  try {
    if (platform !== false) Object.defineProperty(globalThis, "Netlify", {
      value: platform === true ? { context: { geo: { country: { code: country } } } } : platform, configurable: true,
    });
    else delete globalThis.Netlify;
    process.env.NODE_ENV = mode;
    return proxy(new NextRequest(url, { headers, method }));
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "Netlify", descriptor);
    else delete globalThis.Netlify;
    if (previousMode === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousMode;
  }
}

function target(response) {
  assert.equal(isRewrite(response), true);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("location"), null, "Public pricing must not redirect to an internal market URL");
  return new URL(getRewrittenUrl(response));
}

test("trusted hosting geography selects each supported pre-rendered market", () => {
  for (const [country, market] of [["GB", "UK"], ["IN", "IN"], ["US", "US"], ["DE", "EU"], ["IE", "EU"], ["BG", "EU"]]) {
    assert.equal(target(route(undefined, { country })).pathname, `/pricing/market/${market}`);
  }
});

test("unknown, malformed and unsupported countries never receive an invented local price", () => {
  for (const country of [undefined, null, "", "CA", "AU", "CH", "GB,IN", "gb", " UK", "GB\n", "GB ", {}, 123]) {
    assert.equal(target(route(undefined, { country })).pathname, "/pricing/market/unknown");
  }
  assert.equal(target(route(undefined, { platform: false })).pathname, "/pricing/market/unknown");
  for (const platform of [null, {}, { context: null }, { context: {} }, { context: { geo: null } }, { context: { geo: {} } }, { context: { geo: { country: null } } }]) {
    assert.equal(target(route(undefined, { platform })).pathname, "/pricing/market/unknown");
  }
});

test("browser headers, cookies and query parameters cannot switch production prices", () => {
  const response = route("https://crewzy.io/pricing?previewMarket=IN&country=IN&currency=INR", {
    country: "GB",
    headers: {
      "x-crewzy-pricing-country": "IN", "x-country": "IN", "x-nf-geo": "IN",
      "x-forwarded-for": "1.1.1.1", cookie: "country=IN; currency=INR; market=IN",
    },
  });
  assert.equal(target(response).pathname, "/pricing/market/UK");
  assert.equal(response.headers.get("x-middleware-request-x-crewzy-pricing-country"), null);
  assert.equal(target(route("https://crewzy.io/pricing?previewMarket=IN", {
    headers: { "x-crewzy-pricing-country": "IN" },
  })).pathname, "/pricing/market/unknown");
});

test("native rewrites preserve Flight requests, _rsc hashes and router-state variation", () => {
  const headers = {
    rsc: "1", "next-router-state-tree": '["",{"children":["pricing",{}]}]',
    "next-router-prefetch": "1", "next-router-segment-prefetch": "/_tree",
    "next-url": "/", accept: "text/x-component", "x-crewzy-pricing-country": "IN",
  };
  const response = route("https://crewzy.io/pricing?_rsc=flight-hash&utm_source=review", { country: "US", headers });
  const url = target(response);
  assert.equal(url.pathname, "/pricing/market/US");
  assert.equal(url.searchParams.get("_rsc"), "flight-hash");
  assert.equal(url.searchParams.get("utm_source"), "review");
  for (const [name, value] of Object.entries(headers)) {
    if (name === "x-crewzy-pricing-country") continue;
    assert.equal(response.headers.get(`x-middleware-request-${name}`), value);
  }
});

test("ordinary HTML and HEAD navigation keep native content negotiation intact", () => {
  const response = route("https://crewzy.io/pricing?utm_campaign=one&utm_campaign=two", {
    country: "IN", headers: { accept: "text/html", "accept-language": "en-GB" },
  });
  assert.deepEqual(target(response).searchParams.getAll("utm_campaign"), ["one", "two"]);
  assert.equal(response.headers.get("x-middleware-request-accept"), "text/html");
  assert.equal(response.headers.get("x-middleware-request-rsc"), null);
  assert.equal(target(route(undefined, { country: "IN", method: "HEAD" })).pathname, "/pricing/market/IN");
  // No local response body/header conversion: the adapter owns HTML/RSC and CDN caching.
  for (const header of ["content-type", "cache-control", "cdn-cache-control", "netlify-cdn-cache-control", "netlify-vary"]) {
    assert.equal(response.headers.get(header), null);
  }
});

test("direct internal-market URLs return to public pricing instead of selecting another currency", () => {
  for (const suffix of ["market/IN", "market/UK", "market/unknown", "market/invalid", "other"]) {
    const response = route(`https://crewzy.io/pricing/${suffix}?previewMarket=IN`, { country: "GB" });
    assert.equal(isRewrite(response), false);
    assert.equal(response.status, 307);
    assert.equal(new URL(getRedirectUrl(response)).pathname, "/pricing");
    assert.equal(new URL(getRedirectUrl(response)).origin, "https://crewzy.io");
    assert.equal(response.headers.get("cache-control"), "private, no-store");
  }
});

test("a trailing slash still chooses the same trusted market", () => {
  assert.equal(target(route("https://crewzy.io/pricing/", { country: "IN" })).pathname, "/pricing/market/IN");
});

test("market preview overrides remain limited to local development", () => {
  for (const market of ["UK", "IN", "US", "EU"]) {
    assert.equal(target(route(`https://crewzy.io/pricing?previewMarket=${market}`, {
      country: "GB", mode: "development",
    })).pathname, `/pricing/market/${market}`);
  }
  assert.equal(target(route(undefined, { mode: "development", platform: false })).pathname, "/pricing/market/UK");
  assert.equal(target(route("https://crewzy.io/pricing?previewMarket=INR", {
    country: "US", mode: "development",
  })).pathname, "/pricing/market/US");
});

test("proxy matching covers pricing and its internal variants without touching other pages or assets", () => {
  for (const url of ["/pricing", "/pricing/", "/pricing?_rsc=abc", "/pricing/market/IN"]) {
    assert.equal(doesProxyMatch({ config, nextConfig: {}, url }), true, url);
  }
  for (const url of ["/", "/about", "/privacy", "/pricing-guide", "/_next/static/app.js", "/images/crewzy.jpg"]) {
    assert.equal(doesProxyMatch({ config, nextConfig: {}, url }), false, url);
  }
});
