import assert from "node:assert/strict";
import { test } from "node:test";
import { scrollToMeasuredTarget } from "../app/anchor-navigation.ts";

test("cross-page anchors use the expanded page height, not a stale scroll limit", () => {
  const events = [];
  let limit = 5281;
  let reached;
  const scroller = {
    resize() { events.push("measure"); limit = 11856; },
    scrollTo(target) { events.push("scroll"); reached = Math.min(target, limit); },
  };
  scrollToMeasuredTarget(scroller, 11022, { immediate: true });
  assert.deepEqual(events, ["measure", "scroll"]);
  assert.equal(reached, 11022);
});

test("element targets and completion options are passed through without a second offset", () => {
  const target = { id: "crewzy-ai" };
  const options = { duration: .7, immediate: true, onComplete() {} };
  const scroller = {
    resize() {},
    scrollTo(actualTarget, actualOptions) {
      assert.equal(actualTarget, target);
      assert.equal(actualOptions, options);
      assert.equal(actualOptions.offset, undefined);
    },
  };
  scrollToMeasuredTarget(scroller, target, options);
});

test("a rapid second link cancels the earlier scroll even when already at its new target", () => {
  const events = [];
  let oldAnimationRunning = true;
  const scroller = {
    isScrolling: "smooth",
    isStopped: false,
    stop() { events.push("stop"); oldAnimationRunning = false; },
    start() { events.push("start"); },
    resize() { events.push("measure"); },
    scrollTo() { events.push("scroll"); },
  };
  scrollToMeasuredTarget(scroller, 11022);
  assert.equal(oldAnimationRunning, false);
  assert.deepEqual(events, ["stop", "start", "measure", "scroll"]);
});

test("anchor navigation does not unlock a deliberately stopped scroller", () => {
  const scroller = {
    isScrolling: "smooth",
    isStopped: true,
    stop() { assert.fail("must not change another component's scroll lock"); },
    start() { assert.fail("must not unlock scrolling"); },
    resize() {},
    scrollTo() {},
  };
  scrollToMeasuredTarget(scroller, 100);
});
