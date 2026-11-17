import assert from "node:assert/strict";
import { test } from "node:test";
import { analyticsId, measurementLocation, measurementReferrer, millisecondsPerDay, parseConsent } from "../app/analytics-policy.ts";
import { AnalyticsRuntime } from "../app/analytics-runtime.ts";

const NOW = Date.UTC(2026, 10, 17);
const ID = "G-TEST123456";
const ORIGIN = "https://crewzy.io";
const PATHS = ["/", "/pricing", "/resources/guides"];
const record = (choice, savedAt = NOW) => JSON.stringify({ version: 1, choice, savedAt });

test("analytics only accepts a valid public GA4 ID", () => {
  for (const value of [undefined, "", "UA-123", "G-test", 'G-ABC123\" onload=\"x', "https://bad.test"]) assert.equal(analyticsId(value), "");
  assert.equal(analyticsId(ID), ID);
});

test("a missing, malformed, future or expired consent never grants tracking", () => {
  for (const raw of [null, "{", "null", "[]", record("yes"), record("accepted", NOW + 1), record("accepted", NOW - 180 * millisecondsPerDay), JSON.stringify({ version: 0, choice: "accepted", savedAt: NOW })]) {
    assert.equal(parseConsent(raw, NOW, 180), null);
  }
  assert.equal(parseConsent(record("accepted"), NOW, 180), "accepted");
  assert.equal(parseConsent(record("rejected"), NOW, 180), "rejected");
});

test("measurement drops query strings and fragments, and rejects private or foreign paths", () => {
  assert.equal(measurementLocation(`${ORIGIN}/pricing?email=private@example.test#token`, ORIGIN, PATHS), `${ORIGIN}/pricing`);
  for (const href of [`${ORIGIN}/private@example.test`, "https://app.crewzy.io/", "https://other.test/pricing", "not a URL"]) assert.equal(measurementLocation(href, ORIGIN, PATHS), null);
});

test("referrers contain only a public HTTP origin, never paths or queries", () => {
  assert.equal(measurementReferrer("https://www.google.com/search?q=private"), "https://www.google.com/");
  assert.equal(measurementReferrer("https://user:password@example.test/private?email=x"), "https://example.test/");
  for (const value of ["", "bad", "data:text/plain,x", "file:///private/doc"]) assert.equal(measurementReferrer(value), "");
});

function fixture() {
  const scripts = [];
  const removals = [];
  const browser = {};
  const document = {
    head: { appendChild: script => scripts.push(script) },
    createElement: type => { assert.equal(type, "script"); return {}; },
    get cookie() { return "session=keep; crewzy_marketing_ga=id; crewzy_marketing_ga_TEST123456=value; _ga=other"; },
    set cookie(value) { removals.push(value); },
  };
  const runtime = new AnalyticsRuntime(browser, document, { measurementId: ID, cookieDays: 180, cookiePrefix: "crewzy_marketing" });
  return { runtime, browser, scripts, removals };
}

test("no tag or event exists before consent, including when rejecting", () => {
  const { runtime, browser, scripts } = fixture();
  runtime.page(`${ORIGIN}/`, "");
  runtime.stop();
  assert.deepEqual(scripts, []);
  assert.equal(browser.dataLayer, undefined);
  assert.equal(browser[`ga-disable-${ID}`], true);
});

test("grant initializes denied advertising consent before loading a single tag", () => {
  const { runtime, browser, scripts } = fixture();
  runtime.grant(`${ORIGIN}/`, "https://www.google.com/");
  runtime.grant(`${ORIGIN}/`, "https://www.google.com/");
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${ID}`);
  assert.equal(scripts[0].referrerPolicy, "origin");
  assert.equal(Object.prototype.toString.call(browser.dataLayer[0]), "[object Arguments]");
  assert.deepEqual(Array.from(browser.dataLayer[0]), ["consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" }]);
  assert.equal(browser.dataLayer[1][2].analytics_storage, "granted");
  const config = browser.dataLayer.find(command => command[0] === "config")[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
  assert.equal(config.cookie_domain, "none");
  assert.equal(config.cookie_expires, 180 * 86_400);
  assert.equal(config.cookie_update, false);
});

test("client navigation records one view per page and suppresses duplicate renders", () => {
  const { runtime, browser } = fixture();
  runtime.grant(`${ORIGIN}/`, "");
  runtime.page(`${ORIGIN}/`, "");
  runtime.page(`${ORIGIN}/`, "");
  runtime.page(`${ORIGIN}/pricing`, "");
  const events = browser.dataLayer.filter(command => command[0] === "event");
  assert.deepEqual(events.map(command => command[2].page_location), [`${ORIGIN}/`, `${ORIGIN}/pricing`]);
  assert.ok(events.every(command => command[1] === "page_view" && command[2].send_to === ID));
});

test("withdrawal disables the tag immediately and removes only its own cookies", () => {
  const { runtime, browser, removals } = fixture();
  runtime.grant(`${ORIGIN}/`, "");
  runtime.page(`${ORIGIN}/`, "");
  const before = browser.dataLayer.length;
  runtime.stop();
  runtime.page(`${ORIGIN}/pricing`, "");
  assert.equal(browser[`ga-disable-${ID}`], true);
  assert.equal(browser.dataLayer.length, before);
  assert.deepEqual(removals, ["crewzy_marketing_ga=; Max-Age=0; Path=/; SameSite=Lax; Secure", "crewzy_marketing_ga_TEST123456=; Max-Age=0; Path=/; SameSite=Lax; Secure"]);
  runtime.grant(`${ORIGIN}/pricing`, "");
  runtime.page(`${ORIGIN}/pricing`, "");
  assert.equal(browser[`ga-disable-${ID}`], false);
  assert.equal(browser.dataLayer.at(-1)[2].page_location, `${ORIGIN}/pricing`);
});
