import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { test } from "node:test";
import { saveAttribution } from "../app/analytics-attribution.ts";

const source = new URL("../app/analytics-signup-bridge.ts", import.meta.url).href;
registerHooks({
  resolve(specifier, context, nextResolve) {
    return nextResolve(context.parentURL === source && specifier === "./analytics-attribution"
      ? new URL("./analytics-attribution.ts", source).href : specifier, context);
  },
});
const { listenForSignup } = await import(source);
const appOrigin = "https://app.crewzy.io";
const signupUrl = `${appOrigin}/signup`;
const complete = "crewzy:signup-completed:v1";
const ready = "crewzy:signup-ready:v1";
const received = "crewzy:signup-received:v1";
const attribution = { source: "google", medium: "cpc", campaign: "crewzy-qa" };
const config = { measurementId: "G-TEST123456", signupUrl, attributionMs: 3_600_000 };

function fixture(t, consent) {
  const messages = [];
  const events = [];
  const parent = { postMessage: (...args) => messages.push(args) };
  const window = new EventTarget();
  const values = new Map();
  window.parent = parent;
  window.localStorage = { setItem: (key, value) => values.set(key, value), getItem: key => values.get(key) };
  saveAttribution(window.localStorage, Date.now(), attribution);
  globalThis.window = window;
  t.after(() => { delete globalThis.window; });
  const runtime = {
    grant: (...args) => events.push(args),
    conversion: (name, location, details, onSent) => {
      events.push([name, location, details]);
      onSent();
    },
  };
  const state = { processed: false };
  const unsubscribe = listenForSignup(config, runtime, () => consent, state);
  t.after(unsubscribe);
  const send = (origin, from, data) => window.dispatchEvent(
    Object.assign(new Event("message"), { origin, source: from, data }),
  );
  return { messages, events, parent, send };
}

test("the bridge preserves campaign attribution and counts once from the expected parent", t => {
  const { messages, events, parent, send } = fixture(t, true);
  assert.deepEqual(messages, [[ready, appOrigin]]);
  send("https://example.test", parent, complete);
  send(appOrigin, {}, complete);
  send(appOrigin, parent, { event: complete });
  assert.deepEqual(events, []);
  send(appOrigin, parent, complete);
  send(appOrigin, parent, complete);
  assert.deepEqual(events, [[signupUrl, "", attribution], ["sign_up", signupUrl, attribution]]);
  assert.deepEqual(messages, [[ready, appOrigin], [received, appOrigin]]);
});

test("without consent the bridge acknowledges without loading the tag or sending an event", t => {
  const { messages, events, parent, send } = fixture(t, false);
  send(appOrigin, parent, complete);
  assert.deepEqual(events, []);
  assert.deepEqual(messages, [[ready, appOrigin], [received, appOrigin]]);
});
