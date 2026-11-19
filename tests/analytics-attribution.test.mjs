import assert from "node:assert/strict";
import { test } from "node:test";
import { campaignAttribution, readAttribution, referralAttribution, resolveAttribution, saveAttribution } from "../app/analytics-attribution.ts";

const now = Date.UTC(2026, 10, 19);
const oneDay = 86_400_000;

test("a tagged visit takes precedence and survives internal navigation until expiry", () => {
  const entries = new Map();
  const storage = { getItem: key => entries.get(key), setItem: (key, value) => entries.set(key, value), removeItem: key => entries.delete(key) };
  const campaign = campaignAttribution(new URLSearchParams("utm_source=google&utm_medium=cpc&utm_campaign=crewzy-qa&email=private@crewzy.io"));
  const referral = referralAttribution("https://www.reddit.com/r/smallbusiness/", "https://crewzy.io");
  assert.deepEqual(referral, { source: "reddit.com", medium: "referral" });
  assert.deepEqual(resolveAttribution(campaign, referral), { source: "google", medium: "cpc", campaign: "crewzy-qa" });
  saveAttribution(storage, now, campaign);
  assert.deepEqual(resolveAttribution(undefined, readAttribution(storage, now, oneDay)), campaign);
  assert.equal(readAttribution(storage, now + oneDay, oneDay), undefined);
  saveAttribution(storage, now);
  assert.equal(readAttribution(storage, now, oneDay), undefined);
});

test("only campaign tokens and external referrer hostnames are accepted", () => {
  assert.equal(campaignAttribution(new URLSearchParams("utm_source=test%40example.com&utm_medium=email")), undefined);
  assert.deepEqual(campaignAttribution(new URLSearchParams("utm_source=producthunt&utm_medium=referral&utm_campaign=https%3A%2F%2Fexample.com")), { source: "producthunt", medium: "referral" });
  assert.equal(referralAttribution("https://app.crewzy.io/signup", "https://crewzy.io"), undefined);
  assert.deepEqual(resolveAttribution(), { source: "(direct)", medium: "(none)" });
});
