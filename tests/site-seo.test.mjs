import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import sharp from "sharp";
import { siteCaption } from "../app/site-config.ts";
import { createPageMetadata, homeDescription, indexingMetadata, isProductionSite, siteIcons, siteKeywords, siteUrl } from "../app/site-seo.ts";

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
  assert.match(metadata.description, /^HR and compliance software/);
  for (const term of ["employee records", "document expiry", "time tracking", "leave", "invoicing"]) {
    assert.ok(metadata.description.includes(term));
  }
  assert.deepEqual(metadata.keywords, siteKeywords);
});

test("search favicon is a stable 96px PNG matching the existing blue SVG artwork", async () => {
  assert.deepEqual(siteIcons, { icon: [{ url: "/favicon.png", type: "image/png", sizes: "96x96" }] });
  const png = readFileSync(new URL("../public/favicon.png", import.meta.url));
  const svg = readFileSync(new URL("../app/icon.svg", import.meta.url));
  const generated = await sharp(svg, { density: 216 }).resize(96, 96).png().toBuffer();
  assert.deepEqual(png, generated, "Committed PNG must be regenerated after changing the SVG");
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.width, 96);
  assert.equal(info.height, 96);
  const bluePixel = (9 * info.width + 48) * info.channels;
  assert.deepEqual([...data.subarray(bluePixel, bluePixel + 4)], [40, 84, 214, 255]);
  assert.match(readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8"), /icons: siteIcons/);
});

test("explicit keywords include compliance and its supported workflows", () => {
  for (const term of ["compliance", "HR compliance", "document compliance management", "document expiry tracking", "renewal review workflows", "compliance audit history"]) {
    assert.ok(siteKeywords.includes(term), `Keywords must include ${term}`);
  }
  assert.equal(new Set(siteKeywords).size, siteKeywords.length);
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
    assert.deepEqual(metadata.keywords, siteKeywords);
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
