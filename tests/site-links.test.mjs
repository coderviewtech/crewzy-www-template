import assert from "node:assert/strict";
import { test } from "node:test";
import { appUrl, moduleHref, moduleSlugs, resolveHomeHash, demoHref, demoEmailHref } from "../app/site-config.ts";

test("each module deep link resolves to the correct preview card", () => {
  moduleSlugs.forEach((slug, index) => {
    assert.equal(moduleHref(index), `/#module-${slug}`);
    assert.deepEqual(resolveHomeHash(`#module-${slug}`), { section: "platform", moduleIndex: index });
  });
});
test("AI, compliance, FAQ and legacy links resolve to real home sections", () => {
  assert.deepEqual(resolveHomeHash("#crewzy-ai"), { section: "crewzy-ai" });
  assert.deepEqual(resolveHomeHash("#module-crewzy-ai"), { section: "crewzy-ai" });
  assert.deepEqual(resolveHomeHash("#compliance"), { section: "compliance" });
  assert.deepEqual(resolveHomeHash("#faq"), { section: "questions" });
  assert.deepEqual(resolveHomeHash("#features"), { section: "platform" });
  assert.equal(resolveHomeHash("#module-unknown"), null);
});
test("product destinations use one configured portal origin", () => {
  const origin = (process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://dev.crewzy.io").replace(/\/+$/, "");
  assert.equal(appUrl("/login"), `${origin}/login`);
  assert.equal(appUrl("signup"), `${origin}/signup`);
});
test("demo links lead to a real contact route and explicit email request", () => {
  assert.equal(demoHref, "/contact#demo");
  assert.match(demoEmailHref, /^mailto:sales@crewzy\.io\?subject=/);
});
