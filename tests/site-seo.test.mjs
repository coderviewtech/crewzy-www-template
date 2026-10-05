import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { siteCaption } from "../app/site-config.ts";
import { createPageMetadata, homeDescription, indexingMetadata, isProductionSite, siteUrl } from "../app/site-seo.ts";

test("only a Netlify production build is indexable", () => {
  assert.equal(isProductionSite("production"), true);
  assert.deepEqual(indexingMetadata("production"), {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  });
  for (const context of ["deploy-preview", "branch-deploy", "dev", "", "unknown"]) {
    assert.equal(isProductionSite(context), false);
    assert.deepEqual(indexingMetadata(context), { index: false, follow: false });
  }
});

test("homepage share title is the agreed caption, separate from its search title", () => {
  const metadata = createPageMetadata({
    title: "HR, Compliance, Time Tracking & Invoicing Software",
    description: homeDescription, canonical: "/", shareTitle: siteCaption,
  });
  assert.equal(siteCaption, "People, work and compliance. Connected.");
  assert.equal(metadata.openGraph.title, siteCaption);
  assert.equal(metadata.twitter.title, siteCaption);
  assert.equal(metadata.openGraph.url, `${siteUrl}/`);
  for (const term of ["HR software", "employee records", "document compliance", "time tracking", "leave", "invoicing"]) {
    assert.ok(metadata.description.includes(term));
  }
  assert.equal(metadata.keywords, undefined);
});

test("each page gets its own social metadata and absolute shared image", () => {
  for (const route of ["/platform", "/solutions", "/customers", "/resources", "/about", "/contact"]) {
    const metadata = createPageMetadata({ title: `Title ${route}`, description: `Description ${route}`, canonical: route });
    assert.deepEqual(metadata.alternates, { canonical: route });
    assert.equal(metadata.openGraph.url, `${siteUrl}${route}`);
    assert.equal(metadata.openGraph.title, metadata.title);
    assert.equal(metadata.twitter.title, metadata.title);
    assert.equal(metadata.openGraph.description, metadata.description);
    assert.equal(metadata.twitter.description, metadata.description);
    assert.equal(metadata.openGraph.siteName, "Crewzy");
    assert.equal(metadata.openGraph.images[0].url, `${siteUrl}/opengraph-image`);
    assert.deepEqual(metadata.twitter.images, metadata.openGraph.images);
    assert.equal(metadata.twitter.card, "summary_large_image");
  }
});

test("root metadata and generated share image use the shared caption", () => {
  const root = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const image = readFileSync(new URL("../app/opengraph-image.tsx", import.meta.url), "utf8");
  assert.match(root, /shareTitle: siteCaption/);
  assert.match(root, /robots: indexingMetadata\(\)/);
  assert.match(image, /siteCaption.split/);
  assert.match(image, /#2854d6/);
  assert.doesNotMatch(root + image, /Stop running your business|#7650e8|#ff6b57/);
});
