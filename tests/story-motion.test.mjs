import assert from "node:assert/strict";
import { test } from "node:test";
import { storyDuration, storyProgress } from "../app/about/workspace-illustration-motion.ts";

test("story sequence is bounded before entry and after exit", () => {
  assert.equal(storyProgress(1200, 260, 1000), 0);
  assert.equal(storyProgress(850, 260, 1000), 0);
  assert.equal(storyProgress(-10, 260, 1000), 1);
  assert.equal(storyProgress(-500, 260, 1000), 1);
  assert.equal(storyDuration, 2.8);
});

test("scroll position holds the frame and reverses along the same sequence", () => {
  const positions = [850, 600, 420, 100, -10];
  const forward = positions.map(top => storyProgress(top, 260, 1000));
  assert.equal(forward[2], 0.5);
  assert.deepEqual(positions.toReversed().map(top => storyProgress(top, 260, 1000)), forward.toReversed());
  for (let index = 1; index < forward.length; index++) assert.ok(forward[index] > forward[index - 1]);
});

test("scroll range adapts to small screens and larger illustrations", () => {
  for (const [height, viewport] of [[350, 844], [500, 740], [260, 1314]]) {
    assert.equal(storyProgress(viewport * 0.85, height, viewport), 0);
    assert.ok(Math.abs(storyProgress(viewport * 0.25 - height, height, viewport) - 1) < 1e-10);
  }
});

test("unmeasurable illustrations use the completed readable state", () => {
  assert.equal(storyProgress(0, 0, 1000), 1);
  assert.equal(storyProgress(0, 260, 0), 1);
});
