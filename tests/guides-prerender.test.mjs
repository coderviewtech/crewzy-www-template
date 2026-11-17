import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { guideRoutes, guidePath, findGuide } from "../app/site-routes.ts";
import { guideContent } from "../app/guide-content.ts";
import { siteUrl } from "../app/site-seo.ts";

const buildDirectory = process.env.SEO_BUILD_DIR;
const readBuild = file => readFileSync(path.join(buildDirectory, file), "utf8");
const decode = value => value.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');

test("unrecognised and inherited-property guide slugs cannot render editorial content", () => {
  for (const slug of ["unknown", "constructor", "__proto__", "../pricing", ""]) assert.equal(findGuide(slug), undefined);
});

for (const guide of guideRoutes) {
  test(`${guide.slug} serves readable guidance, a checklist and correct identity without JavaScript`, { skip: !buildDirectory }, () => {
    const route = guidePath(guide.slug);
    const html = readBuild(`server/app${route}.html`);
    const text = decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " "));
    assert.ok(text.includes(guide.title));
    for (const section of guideContent[guide.slug].sections) {
      for (const paragraph of section.paragraphs) assert.ok(text.includes(paragraph));
      for (const item of section.checklist ?? []) assert.ok(text.includes(item));
      for (const row of section.table?.rows ?? []) for (const cell of row) assert.ok(text.includes(cell));
    }
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}${route}"`));
    assert.ok(html.includes('aria-label="On this page"'));
    assert.match(text, /Worked examples are illustrative/);
  });
}

test("guides are pre-rendered and unknown guide URLs have no dynamic fallback", { skip: !buildDirectory }, () => {
  const manifest = JSON.parse(readBuild("prerender-manifest.json"));
  for (const guide of guideRoutes) assert.ok(manifest.routes[guidePath(guide.slug)]);
  assert.equal(manifest.dynamicRoutes["/resources/guides/[guide]"].fallback, false);
});
