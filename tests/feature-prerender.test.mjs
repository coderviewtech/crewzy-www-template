import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { featureRoutes, featurePath, findFeature } from "../app/site-routes.ts";
import { featureContent } from "../app/feature-content.ts";
import { siteUrl } from "../app/site-seo.ts";

const buildDirectory = process.env.SEO_BUILD_DIR;
const readBuild = file => readFileSync(path.join(buildDirectory, file), "utf8");
const decode = value => value.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"');

test("unknown feature paths cannot resolve to a generic marketing page", () => {
  for (const slug of ["unknown", "constructor", "../pricing", "", "HR-software-small-business"]) {
    assert.equal(findFeature(slug), undefined);
  }
});

for (const feature of featureRoutes) {
  test(`${feature.slug} is readable and correctly identified before JavaScript`, { skip: !buildDirectory }, () => {
    const route = featurePath(feature.slug);
    const html = readBuild(`server/app${route}.html`);
    const text = decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " "));
    assert.ok(text.includes(featureContent[feature.slug].heading));
    assert.ok(text.includes(featureContent[feature.slug].introduction));
    for (const section of featureContent[feature.slug].sections) assert.ok(text.includes(section.text));
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}${route}"`));
    assert.ok(decode(html).includes(feature.description));
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .flatMap(([, json]) => JSON.parse(json));
    const breadcrumb = schemas.find(schema => schema["@type"] === "BreadcrumbList");
    assert.deepEqual(breadcrumb.itemListElement.map(item => item.item), [
      `${siteUrl}/`, `${siteUrl}/platform`, `${siteUrl}${route}`,
    ]);
    assert.equal(breadcrumb.itemListElement.at(-1).name, feature.label);
  });
}

test("feature pages are pre-rendered with no unbounded dynamic fallback", { skip: !buildDirectory }, () => {
  const manifest = JSON.parse(readBuild("prerender-manifest.json"));
  for (const feature of featureRoutes) assert.ok(manifest.routes[featurePath(feature.slug)]);
  assert.equal(manifest.dynamicRoutes["/platform/[feature]"].fallback, false);
});
