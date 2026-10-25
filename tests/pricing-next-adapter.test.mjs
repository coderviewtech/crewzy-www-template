import assert from "node:assert/strict";
import { AsyncLocalStorage } from "node:async_hooks";
import { registerHooks } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import nextConfig from "../next.config.js";

// Boot the same request-local storage the Next server supplies to its adapter.
globalThis.AsyncLocalStorage ??= AsyncLocalStorage;
const { adapter } = await import("next/dist/server/web/adapter.js");
const { default: sharedConfig } = await import("next/dist/server/config-shared.js");
const proxyUrl = new URL("../proxy.ts", import.meta.url).href;
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL === proxyUrl && specifier === "./app/pricing/pricing-model") {
      return nextResolve(new URL(`${specifier}.ts`, proxyUrl).href, context);
    }
    return nextResolve(specifier, context);
  },
});
const { proxy } = await import(proxyUrl);
hooks.deregister();

async function adaptPricing(url, headers) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "Netlify");
  const keys = ["NODE_ENV", "__NEXT_NO_MIDDLEWARE_URL_NORMALIZE"];
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  try {
    Object.defineProperty(globalThis, "Netlify", {
      value: { context: { geo: { country: { code: "GB" } } } }, configurable: true,
    });
    process.env.NODE_ENV = "production";
    // Next's define-env compiler maps this exact supported config option to
    // this adapter flag. Exercise the real adapter with the project's setting.
    if (nextConfig.skipProxyUrlNormalize) process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE = "1";
    else delete process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE;
    const result = await adapter({
      handler: proxy,
      page: "/middleware",
      request: {
        url, method: "GET", headers,
        nextConfig: { basePath: "", trailingSlash: false, experimental: nextConfig.experimental ?? {} },
      },
    });
    await result.waitUntil;
    return result.response;
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "Netlify", descriptor);
    else delete globalThis.Netlify;
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
}

for (const query of ["?_rsc=", "?_rsc", "?_rsc=nonempty-flight-hash"]) {
  test(`Next's actual proxy adapter preserves ${query} through a regional rewrite`, async () => {
    const response = await adaptPricing(`https://crewzy.io/pricing${query}`, { rsc: "1", accept: "text/x-component" });
    assert.equal(response.status, 200);
    const destination = new URL(response.headers.get("x-middleware-rewrite"));
    assert.equal(destination.pathname, "/pricing/market/UK");
    assert.equal(destination.searchParams.has("_rsc"), true, "An empty RSC hash is present, not absent; losing it creates a CDN rewrite redirect loop");
    assert.equal(destination.searchParams.get("_rsc"), new URL(`https://crewzy.io/pricing${query}`).searchParams.get("_rsc"));
    assert.equal(response.headers.get("x-middleware-request-rsc"), "1");
  });
}

test("Next's actual adapter keeps real router headers and its nonempty hash together", async () => {
  const headers = {
    rsc: "1", "next-router-prefetch": "1", "next-router-state-tree": '["",{"children":["pricing",{}]}]',
    "next-router-segment-prefetch": "/_tree", "next-url": "/", accept: "text/x-component",
    "x-crewzy-pricing-country": "IN",
  };
  const response = await adaptPricing("https://crewzy.io/pricing?utm_source=review&_rsc=router-hash", headers);
  const destination = new URL(response.headers.get("x-middleware-rewrite"));
  assert.equal(destination.pathname, "/pricing/market/UK");
  assert.equal(destination.searchParams.get("_rsc"), "router-hash");
  assert.equal(destination.searchParams.get("utm_source"), "review");
  for (const [key, value] of Object.entries(headers)) {
    if (key === "x-crewzy-pricing-country") {
      assert.equal(response.headers.get(`x-middleware-request-${key}`), null);
    } else {
      assert.equal(response.headers.get(`x-middleware-request-${key}`), value);
    }
  }
});

test("HTML requests remain separate from Flight and RSC hash validation remains enabled", async () => {
  const response = await adaptPricing("https://crewzy.io/pricing", { accept: "text/html" });
  assert.equal(new URL(response.headers.get("x-middleware-rewrite")).searchParams.has("_rsc"), false);
  assert.equal(response.headers.get("x-middleware-request-rsc"), null);
  assert.equal(nextConfig.experimental?.validateRSCRequestHeaders ?? sharedConfig.defaultConfig.experimental.validateRSCRequestHeaders, true);
  assert.equal(response.headers.get("netlify-vary"), null, "The adapter, not the pricing proxy, owns CDN protocol variations");
});


test("the production build retains raw proxy URLs and RSC validation", { skip: !process.env.CREWZY_PRICING_BUILD_DIR }, () => {
  const requiredFiles = JSON.parse(readFileSync(path.join(process.env.CREWZY_PRICING_BUILD_DIR, "required-server-files.json"), "utf8"));
  assert.equal(requiredFiles.config.skipProxyUrlNormalize, true);
  assert.equal(requiredFiles.config.experimental.validateRSCRequestHeaders, true);
});
