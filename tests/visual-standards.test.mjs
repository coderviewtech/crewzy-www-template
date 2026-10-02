import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const source = file => readFileSync(new URL(`../app/${file}`, import.meta.url), "utf8");

test("platform and compliance slides use the same responsive typography tokens", () => {
  for (const file of ["platform-tour.module.css", "compliance-workspace.module.css"]) {
    const css = source(file);
    for (const token of ["heading-size", "heading-weight", "heading-leading", "heading-tracking", "copy-size", "copy-leading"]) {
      assert.ok(css.includes(`var(--preview-slide-${token})`), `${file} must share ${token}`);
    }
    assert.doesNotMatch(css, /(?:\.copy|\.chapterCopy)\s*(?:h3|>p)\s*\{[^}]*font-size:\s*(?:\d|clamp)/);
  }
});

test("page backgrounds are white while product surfaces retain their own tint", () => {
  const globals = source("globals.css");
  assert.match(globals, /--preview-page-background:\s*#fff;/);
  assert.match(globals, /--preview-surface:\s*var\(--preview-page-background\)/);
  assert.match(globals, /--preview-brand-surface:\s*color-mix/);
  for (const file of ["preview.module.css", "secondary-page.module.css"]) {
    assert.match(source(file), /\.hero\{[^}]*background:var\(--preview-page-background\)/);
  }
  assert.match(source("preview.module.css"), /\.heroGrid\{display:none\}/);
  assert.match(source("site-shell.module.css"), /\.footer\s*\{[^}]*background:\s*var\(--preview-page-background\)/);
});

test("header and footer share the smaller responsive wordmark size", () => {
  assert.match(source("globals.css"), /--preview-wordmark-size:\s*28px;/);
  const shell = source("site-shell.module.css");
  for (const selector of ["headerBrand", "footerBrand"]) {
    assert.match(shell, new RegExp(`\\.${selector}\\s*\\{\\s*font-size:\\s*var\\(--preview-wordmark-size\\)`));
    assert.equal(shell.match(new RegExp(`\\.${selector}\\s*\\{`, "g")).length, 1);
  }
});
