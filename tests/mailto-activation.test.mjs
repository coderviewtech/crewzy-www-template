import assert from "node:assert/strict";
import { test } from "node:test";
import { createMailtoActivationGuard } from "../app/mailto-activation.ts";

function click(overrides = {}) {
  return {
    defaultPrevented: false, button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false,
    preventDefault() { this.defaultPrevented = true; },
    ...overrides,
  };
}

// A browser opens a mailto URL through the native default action. Count that
// action after the handler without ever launching Outlook or sending an email.
function activate(guard, event, nativeOpen) {
  guard(event);
  if (!event.defaultPrevented) nativeOpen();
}

test("a demo email click has exactly one native dispatch and a rapid repeat has none", () => {
  let at = 0;
  let opened = 0;
  const guard = createMailtoActivationGuard(1500, () => at);
  activate(guard, click(), () => opened++);
  at = 100;
  activate(guard, click({ detail: 2 }), () => opened++);
  at = 1499;
  activate(guard, click(), () => opened++);
  assert.equal(opened, 1);
  at = 1500;
  activate(guard, click(), () => opened++);
  assert.equal(opened, 2, "a later deliberate request must still work");
});

test("keyboard activation is native and repeated Enter is guarded", () => {
  let at = 100;
  let opened = 0;
  const guard = createMailtoActivationGuard(1500, () => at);
  activate(guard, click({ detail: 0 }), () => opened++);
  at = 140;
  activate(guard, click({ detail: 0 }), () => opened++);
  assert.equal(opened, 1);
});

test("cancelled or modified clicks retain their original browser behaviour", () => {
  const guard = createMailtoActivationGuard(1500, () => 0);
  const cancelled = click({ defaultPrevented: true });
  guard(cancelled);
  for (const modifier of ["metaKey", "ctrlKey", "shiftKey", "altKey"]) {
    const modified = click({ [modifier]: true });
    guard(modified);
    assert.equal(modified.defaultPrevented, false);
  }
  const middle = click({ button: 1 });
  guard(middle);
  assert.equal(middle.defaultPrevented, false);
  const ordinary = click();
  guard(ordinary);
  assert.equal(ordinary.defaultPrevented, false, "ignored events must not consume the cooldown");
});

test("separate email links do not block each other's legitimate actions", () => {
  const demo = createMailtoActivationGuard(1500, () => 0);
  const support = createMailtoActivationGuard(1500, () => 0);
  const demoClick = click();
  const supportClick = click();
  demo(demoClick);
  support(supportClick);
  assert.equal(demoClick.defaultPrevented, false);
  assert.equal(supportClick.defaultPrevented, false);
});
