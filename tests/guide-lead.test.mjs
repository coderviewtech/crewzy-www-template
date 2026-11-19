import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { test } from "node:test";
import { leadFollowUpRequest, leadFormName, leadFormPath, leadRegistrationMarker } from "../app/product-guide/lead-config.ts";

const source = new URL("../app/product-guide/submit-lead.ts", import.meta.url).href;
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    return nextResolve(context.parentURL === source && specifier === "./lead-config"
      ? new URL("./lead-config.ts", source).href : specifier, context);
  },
});
const { encodeGuideLead, submitGuideLead } = await import(source);
hooks.deregister();

const lead = { name: " Test Visitor ", email: " visitor@example.com ", source: "meetup-page", honeypot: "" };

test("an enquiry contains the follow-up request and only the declared contact fields", () => {
  const body = encodeGuideLead(lead);
  assert.equal(body.get("form-name"), leadFormName);
  assert.equal(body.get("name"), "Test Visitor");
  assert.equal(body.get("email"), "visitor@example.com");
  assert.equal(body.get("follow-up-request"), leadFollowUpRequest);
  assert.equal(body.get("source"), "meetup-page");
  assert.deepEqual([...body.keys()].sort(), ["bot-field", "email", "follow-up-request", "form-name", "name", "notice-version", "source"]);
  const registration = readFileSync(new URL("../public/__forms.html", import.meta.url), "utf8");
  const registered = [...registration.matchAll(/<input\b[^>]*\bname="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(registered.sort(), [...body.keys()].sort());
  assert.ok(registration.includes(`name="${leadFormName}"`));
  assert.match(registration, /netlify-honeypot="bot-field"/);
  assert.equal(encodeGuideLead({ ...lead, honeypot: "bot" }).get("bot-field"), "bot");
});

test("blank, oversized or malformed contact details cannot be submitted by the client", () => {
  for (const invalid of [{ name: " " }, { name: "x".repeat(121) }, { name: "A\nB" },
    { email: "no-at-sign" }, { email: "a@b" }, { email: "a b@example.com" }, { email: `${"a".repeat(250)}@example.com` }]) {
    assert.throws(() => encodeGuideLead({ ...lead, ...invalid }), /valid email/);
  }
});

test("submission waits for the provider, posts only once and omits browser credentials", async t => {
  let acknowledge;
  const response = new Promise(resolve => { acknowledge = resolve; });
  const fetch = t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, leadFormPath);
    assert.equal(options.method, "POST");
    assert.equal(options.credentials, "omit");
    assert.equal(options.headers["Content-Type"], "application/x-www-form-urlencoded");
    assert.equal(new URLSearchParams(options.body).get("email"), "visitor@example.com");
    assert.ok(options.signal instanceof AbortSignal);
    return response;
  });
  let accepted = false;
  const submitting = submitGuideLead(lead).then(() => { accepted = true; });
  await Promise.resolve();
  assert.equal(accepted, false);
  acknowledge(new Response("", { status: 200 }));
  await submitting;
  assert.equal(accepted, true);
  assert.equal(fetch.mock.callCount(), 1);
});

test("HTTP errors and an unprocessed registration page never count as acceptance", async t => {
  for (const response of [new Response("Unavailable", { status: 503 }), new Response(leadRegistrationMarker)]) {
    const fetch = t.mock.method(globalThis, "fetch", async () => response);
    await assert.rejects(submitGuideLead(lead));
    assert.equal(fetch.mock.callCount(), 1);
    fetch.mock.restore();
  }
});

test("network and timeout failures propagate without retry or false success", async t => {
  for (const error of [new TypeError("offline"), new DOMException("Timed out", "TimeoutError")]) {
    const fetch = t.mock.method(globalThis, "fetch", async () => { throw error; });
    await assert.rejects(submitGuideLead(lead), error);
    assert.equal(fetch.mock.callCount(), 1);
    fetch.mock.restore();
  }
});

test("consented attribution stays on the saved enquiry alongside the existing form source", () => {
  const body = encodeGuideLead({
    ...lead, attribution: { source: "google", medium: "cpc", campaign: "crewzy-qa" },
  });
  assert.equal(body.get("source"), "meetup-page");
  assert.equal(body.get("lead-source"), "google");
  assert.equal(body.get("lead-medium"), "cpc");
  assert.equal(body.get("lead-campaign"), "crewzy-qa");
  assert.equal(encodeGuideLead(lead).get("lead-source"), null);
});
