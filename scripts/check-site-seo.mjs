import assert from "node:assert/strict";
import { siteCaption } from "../app/site-config.ts";
import { homeDescription, siteKeywords, siteUrl } from "../app/site-seo.ts";
import { featureRoutes, featurePath, guideRoutes, guidePath, guidesPath, marketingPaths } from "../app/site-routes.ts";
import { guideContent, guideAuthor, guideUpdated } from "../app/guide-content.ts";
import { auditFetch as fetch } from "./audit-http.mjs";

// Read-only checks of the server-rendered HTML a crawler receives; no submission.
const origin = process.argv[2] ?? "http://127.0.0.1:3018";
const mode = process.argv[3] ?? "preview";
assert.ok(["preview", "production"].includes(mode), "Choose preview or production");
const production = mode === "production";
const routes = marketingPaths;
const titles = new Set();
const descriptions = new Set();
const decode = value => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));

for (const route of routes) {
  const response = await fetch(new URL(route, origin), { headers: { "User-Agent": "Googlebot" } });
  assert.equal(response.status, 200, `${route}: response`);
  if (production) assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /noindex|none/i, `${route}: hosting must not block indexing`);
  else assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/i, `${route}: preview response must prohibit indexing`);
  const html = await response.text();
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
  assert.ok(head, `${route}: server-rendered head`);
  const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const meta = key => {
    const matches = metas.filter(tag => (tag.name ?? tag.property) === key);
    assert.equal(matches.length, 1, `${route}: one ${key}`);
    return matches[0].content;
  };
  const title = decode(head.match(/<title>(.*?)<\/title>/)?.[1] ?? "");
  assert.ok(title.includes("Crewzy"), `${route}: branded title`);
  assert.ok(!titles.has(title), `${route}: unique title`);
  titles.add(title);
  const description = meta("description");
  assert.ok(description.length > 70 && description.length < 200, `${route}: useful description`);
  assert.ok(!descriptions.has(description), `${route}: unique description`);
  descriptions.add(description);
  const links = [...head.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const canonical = links.filter(tag => tag.rel === "canonical");
  const rasterIcon = links.filter(tag => tag.rel === "icon" && new URL(tag.href, origin).pathname === "/favicon.png");
  assert.equal(rasterIcon.length, 1, `${route}: one stable PNG favicon`);
  assert.equal(rasterIcon[0].type, "image/png");
  assert.equal(rasterIcon[0].sizes, "96x96");
  assert.equal(canonical.length, 1, `${route}: one canonical`);
  assert.equal(new URL(canonical[0].href).href, new URL(route, siteUrl).href);
  assert.equal(new URL(meta("og:url")).href, new URL(route, siteUrl).href);
  assert.equal(meta("og:site_name"), "Crewzy");
  assert.equal(meta("og:title"), meta("twitter:title"));
  assert.equal(meta("og:description"), description);
  assert.equal(meta("twitter:description"), description);
  assert.equal(meta("twitter:card"), "summary_large_image");
  for (const key of ["og:image", "twitter:image"]) {
    const image = new URL(meta(key));
    assert.equal(image.origin, siteUrl);
    assert.equal(image.pathname, "/opengraph-image");
  }
  assert.match(meta("robots"), production ? /^index, follow/ : /noindex, nofollow/);
  assert.deepEqual(meta("keywords").split(",").map(term => term.trim()), siteKeywords);
  assert.doesNotMatch(head, /Stop running your business/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${route}: one primary heading in initial HTML`);
  const feature = featureRoutes.find(item => featurePath(item.slug) === route);
  const guide = guideRoutes.find(item => guidePath(item.slug) === route);
  if (feature || guide || route === guidesPath) {
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, json]) => JSON.parse(json));
    const breadcrumb = schemas.find(schema => schema["@type"] === "BreadcrumbList");
    assert.ok(breadcrumb, `${route}: breadcrumb structured data`);
    assert.equal(breadcrumb.itemListElement.at(-1).item, new URL(route, siteUrl).href);
    assert.equal(breadcrumb.itemListElement.at(-1).name, feature?.label ?? guide?.title ?? "Guides");
    assert.ok(html.includes('aria-label="Breadcrumb"'), `${route}: visible breadcrumb navigation`);
    if (guide) {
      const article = schemas.find(schema => schema["@type"] === "Article");
      assert.ok(article, `${route}: article structured data`);
      assert.equal(article.headline, guide.title);
      assert.equal(article.mainEntityOfPage, new URL(route, siteUrl).href);
      assert.equal(article.dateModified, guideUpdated);
      assert.equal(article.author.name, guideAuthor.name);
      assert.equal(article.datePublished, undefined, "Do not manufacture publication dates");
      assert.equal(meta("og:type"), "article");
      const visible = decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " "));
      for (const section of guideContent[guide.slug].sections) {
        assert.ok(visible.includes(section.title), `${route}: visible section ${section.id}`);
        for (const paragraph of section.paragraphs) assert.ok(visible.includes(paragraph), `${route}: server-rendered article text`);
      }
    }
  }
  if (route === "/") {
    assert.equal(description, homeDescription);
    assert.match(description, /^HR and compliance software/);
    assert.equal(meta("og:title"), siteCaption);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, json]) => JSON.parse(json));
    assert.ok(schemas.some(schema => schema["@type"] === "WebSite" && schema.name === "Crewzy" && schema.url === siteUrl));
    assert.ok(schemas.some(schema => schema["@type"] === "Organization" && schema.legalName === "CODER VIEW LTD"));
  }
}

const faviconResponse = await fetch(new URL("/favicon.png", origin), { headers: { "User-Agent": "Googlebot-Image" } });
assert.equal(faviconResponse.status, 200);
assert.match(faviconResponse.headers.get("content-type"), /image\/png/);
const favicon = Buffer.from(await faviconResponse.arrayBuffer());
assert.equal(favicon.readUInt32BE(16), 96);
assert.equal(favicon.readUInt32BE(20), 96);

const robotsResponse = await fetch(new URL("/robots.txt", origin));
assert.equal(robotsResponse.status, 200);
const robots = await robotsResponse.text();
assert.match(robots, /Allow: \//);
const sitemapResponse = await fetch(new URL("/sitemap.xml", origin));
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
if (production) {
  assert.ok(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));
  assert.deepEqual(urls.sort(), routes.map(route => new URL(route, siteUrl).href).sort());
} else {
  assert.doesNotMatch(robots, /Sitemap:/);
  assert.deepEqual(urls, []);
}
assert.doesNotMatch(sitemap, /<lastmod>/);

const missingPage = await fetch(new URL("/platform/not-a-real-feature", origin));
assert.equal(missingPage.status, 404, "Unknown feature must not become a soft 404");
const missingGuide = await fetch(new URL(`${guidesPath}/not-a-real-guide`, origin));
assert.equal(missingGuide.status, 404, "Unknown guide must not become a soft 404");

const imageResponse = await fetch(new URL("/opengraph-image", origin));
assert.equal(imageResponse.status, 200);
assert.match(imageResponse.headers.get("content-type"), /image\/png/);
const image = Buffer.from(await imageResponse.arrayBuffer());
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
console.log(`SEO checks passed: ${routes.length} pages, ${mode} indexing, canonical URLs, social metadata, JSON-LD, sitemap, blue PNG favicon and 1200×630 share image.`);
