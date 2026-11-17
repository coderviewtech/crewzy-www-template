import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

const buildDirectory = process.env.SEO_BUILD_DIR;
test("built pages never load Google before consent and previews never enable analytics", { skip: !buildDirectory }, () => {
  const html = readFileSync(path.join(buildDirectory, "server/app/index.html"), "utf8");
  assert.doesNotMatch(html, /<(?:script|link)\b[^>]*(?:src|href)="https:\/\/(?:www\.)?(?:googletagmanager|google-analytics)\.com/i);
  if (process.env.CONTEXT === "production") {
    assert.match(html, /Cookie settings/);
    assert.match(html, /Reject analytics/);
    assert.match(html, /Accept analytics/);
  } else {
    assert.doesNotMatch(html, /Cookie settings|Reject analytics|Accept analytics/);
    assert.ok(!html.includes(process.env.GA_MEASUREMENT_ID));
  }
});
