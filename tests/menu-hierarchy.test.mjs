import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

// Rendered-artifact checks for CI; the browser checks cover interaction and focus.
const buildDirectory = process.env.CREWZY_MEETUP_BUILD_DIR;
const mainNavigation = () => readFileSync(path.join(buildDirectory, "server/app/index.html"), "utf8")
  .match(/<nav\b[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
const visibleText = html => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");

test("main menu groups preserve the product destinations and provide trust and meetup paths", { skip: !buildDirectory }, () => {
  const navigation = mainNavigation();
  assert.ok(navigation, "the shared header exposes the main navigation");
  for (const label of ["People &amp; workplace", "Work &amp; compliance", "Explore &amp; understand", "Trust &amp; support"]) {
    assert.ok(visibleText(navigation).includes(label), `${label} is discoverable in its menu`);
  }
  for (const href of ["/#module-people", "/#module-recruitment", "/#module-time-projects", "/#module-leave", "/#module-finance", "/#compliance", "/#crewzy-ai", "/meet", "/privacy", "/resources#security", "/resources/guides"]) {
    assert.ok(navigation.includes(`href="${href}"`), `navigation preserves ${href}`);
  }
});

test("menu disclosures reference distinct initially closed panels", { skip: !buildDirectory }, () => {
  const navigation = mainNavigation();
  assert.ok(navigation);
  const controls = [...navigation.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)]
    .filter(([, , content]) => ["Platform", "Solutions", "Resources"].includes(visibleText(content).trim()));
  assert.equal(controls.length, 3);
  const ids = controls.map(([, attributes]) => {
    assert.match(attributes, /aria-expanded="false"/);
    const id = attributes.match(/aria-controls="([^"]+)"/)?.[1];
    assert.ok(id);
    const panel = [...navigation.matchAll(/<div\b([^>]*)>/g)].find(([, attributes]) => attributes.includes(`id="${id}"`));
    assert.ok(panel, `controlled panel ${id} exists`);
    assert.match(panel[1], /\bhidden=""/);
    return id;
  });
  assert.equal(new Set(ids).size, controls.length);
});
