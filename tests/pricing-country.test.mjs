import assert from "node:assert/strict";
import { test } from "node:test";
import pricingCountry from "../netlify/edge-functions/pricing-country.mjs";

test("hosting country replaces a forged public display header and disables shared caching", async () => {
  let forwarded;
  const response = await pricingCountry(new Request("https://crewzy.io/pricing?currency=INR", {
    headers: { "x-crewzy-pricing-country": "IN" },
  }), {
    geo: { country: { code: "GB" } },
    next: async request => {
      forwarded = request;
      return new Response("pricing", { headers: { "Cache-Control": "public, max-age=3600", "Content-Type": "text/html" } });
    },
  });
  assert.equal(forwarded.headers.get("x-crewzy-pricing-country"), "GB");
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  assert.equal(response.headers.get("CDN-Cache-Control"), "no-store");
  assert.equal(response.headers.get("Netlify-CDN-Cache-Control"), "no-store");
  assert.equal(response.headers.get("Content-Type"), "text/html");
  assert.equal(await response.text(), "pricing");
});

test("missing hosting country never trusts a browser-provided country", async () => {
  for (const geo of [undefined, {}, { country: {} }, { country: { code: "IN,GB" } }]) {
    await pricingCountry(new Request("https://crewzy.io/pricing", { headers: { "x-crewzy-pricing-country": "IN" } }), {
      geo,
      next: async request => {
        assert.equal(request.headers.get("x-crewzy-pricing-country"), null);
        return new Response("pricing");
      },
    });
  }
});
