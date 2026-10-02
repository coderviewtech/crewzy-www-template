import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { complianceChapters } from "../app/compliance-model.ts";

test("document oversight uses three concise points without duplicating the paragraph", () => {
  const oversight = complianceChapters[0];
  assert.deepEqual(oversight.points, [
    "Keep employee documents together",
    "Track expiry dates and renewals",
    "See what needs attention",
  ]);
  assert.ok(!("description" in oversight));
  for (const chapter of complianceChapters) {
    assert.equal(chapter.points.length, 3);
    assert.ok(!("description" in chapter));
  }
});

test("renewal and audit chapters use equally concise, relevant points", () => {
  assert.deepEqual(complianceChapters[1].points, [
    "Assign a reviewer",
    "Follow renewal progress",
    "Keep decisions with the document",
  ]);
  assert.deepEqual(complianceChapters[2].points, [
    "See who took each action",
    "Follow reviews and approvals",
    "Keep a timestamped history",
  ]);
});

test("compliance points are a semantic list with decorative checkmarks", () => {
  const component = readFileSync(new URL("../app/compliance-workspace.tsx", import.meta.url), "utf8");
  assert.match(component, /<ul className=\{s\.chapterPoints\} role="list">/);
  assert.match(component, /<Check size=\{18\} aria-hidden="true"/);
});
