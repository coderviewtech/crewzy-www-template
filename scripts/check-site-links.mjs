import assert from "node:assert/strict";
import { resolveHomeHash } from "../app/site-config.ts";
import { marketingPaths, legalPaths } from "../app/site-routes.ts";
import { auditFetch as fetch } from "./audit-http.mjs";

// Read-only audit of a running local preview; no forms or emails are submitted.
const origin = process.argv[2] ?? "http://127.0.0.1:3017";
const routes = [...marketingPaths, ...legalPaths];
const assetRoutes = new Set(["/meet/qr.svg", "/meet/qr.png"]);
const pages = new Map();
for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, `${route} must load`);
  const html = await response.text();
  for (const landmark of ["header", "footer"]) {
    const markup = html.match(new RegExp(`<${landmark}\\b[^>]*>([\\s\\S]*?)<\\/${landmark}>`))?.[1] ?? "";
    const complianceLinks = Array.from(markup.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g))
      .filter(match => match[2].replace(/<[^>]*>/g, "").trim() === "Compliance" || /<strong\b[^>]*>Compliance<\/strong>/.test(match[2]));
    assert.ok(complianceLinks.length > 0, `${route}: ${landmark} must expose Compliance`);
    for (const match of complianceLinks) {
      assert.equal(new URL(match[1], new URL(route, origin)).href, new URL("/#compliance", origin).href,
        `${route}: Compliance must open its dedicated section, not a platform preview card`);
    }
  }
  pages.set(route, { ids: new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1])), links: Array.from(html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g), match => match[1].replaceAll("&amp;", "&")) });
}
let checked = 0;
const productLinks = new Set();
for (const [route, page] of pages) {
  for (const href of page.links) {
    assert.ok(href !== "#" && !href.startsWith("javascript:"), `${route}: placeholder link ${href}`);
    const target = new URL(href, new URL(route, origin));
    if (target.protocol === "mailto:") continue;
    if (target.origin !== new URL(origin).origin) { productLinks.add(target.href); continue; }
    if (assetRoutes.has(target.pathname)) {
      const response = await fetch(target);
      assert.equal(response.status, 200, `${route}: download ${target.pathname}`);
      assert.match(response.headers.get("content-type"), /^image\//);
      checked++;
      continue;
    }
    assert.ok(pages.has(target.pathname), `${route}: missing route ${target.pathname}`);
    if (target.hash) {
      const hash = decodeURIComponent(target.hash);
      const homeTarget = target.pathname === "/" ? resolveHomeHash(hash) : null;
      const id = homeTarget?.section ?? hash.slice(1);
      assert.ok(pages.get(target.pathname).ids.has(id), `${route}: missing anchor ${target.pathname}${hash}`);
    }
    checked++;
  }
}
console.log(JSON.stringify({ pages: pages.size, internalLinksChecked: checked, productLinks: [...productLinks], result: "All local routes and anchors resolve" }, null, 2));
