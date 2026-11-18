import assert from "node:assert/strict";
import { test } from "node:test";
import { adjacentTourTab, chapterAtReadingLine } from "../app/tour-navigation.ts";

test("mobile chapter selection follows native scroll down and back up", () => {
  assert.equal(chapterAtReadingLine([200, 1000, 1800], 164), 0);
  assert.equal(chapterAtReadingLine([-700, 100, 900], 164), 1);
  assert.equal(chapterAtReadingLine([-1500, -700, 100], 164), 2);
  assert.equal(chapterAtReadingLine([-600, 200, 1000], 164), 0);
});

test("chapter selection uses actual layout heights and the sticky rail clearance", () => {
  assert.equal(chapterAtReadingLine([-1000, -100, 164], 164), 2);
  assert.equal(chapterAtReadingLine([-1000, -100, 165], 164), 1);
  assert.equal(chapterAtReadingLine([-1300, -500, 250, 950, 1650, 2400], 164), 1);
});

test("both tab groups wrap keyboard selection and preserve normal key behavior", () => {
  for (const count of [3, 6]) {
    assert.equal(adjacentTourTab("ArrowLeft", 0, count), count - 1);
    assert.equal(adjacentTourTab("ArrowRight", count - 1, count), 0);
    assert.equal(adjacentTourTab("Home", count - 1, count), 0);
    assert.equal(adjacentTourTab("End", 0, count), count - 1);
    assert.equal(adjacentTourTab("Tab", 0, count), null);
  }
});

test("handled tab-navigation keys do not cancel their own smooth scroll", async () => {
  const { shouldCancelScrollForKey } = await import("../app/anchor-navigation.ts");
  for (const key of ["Home", "End", "ArrowUp", "ArrowDown", " "]) {
    assert.equal(shouldCancelScrollForKey({ key, defaultPrevented: true }), false);
    assert.equal(shouldCancelScrollForKey({ key, defaultPrevented: false }), true);
  }
  assert.equal(shouldCancelScrollForKey({ key: "a", defaultPrevented: false }), false);
});
