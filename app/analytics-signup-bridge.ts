import { readAttribution } from "./analytics-attribution";
import type { AnalyticsConfig } from "./analytics-policy";
import type { AnalyticsRuntime } from "./analytics-runtime";

export const signupBridgePath = "/analytics/signup";
const unknownSource = { source: "unattributed", medium: "unattributed" };
const readyMessage = "crewzy:signup-ready:v1";
const completeMessage = "crewzy:signup-completed:v1";
const acknowledgeMessage = "crewzy:signup-received:v1";

/** Only the central signup page can notify this frame. No form or identity data crosses origins. */
export function listenForSignup(
  config: AnalyticsConfig, runtime: AnalyticsRuntime, hasConsent: () => boolean, state: { processed: boolean },
) {
  const signupUrl = new URL(config.signupUrl);
  const appOrigin = signupUrl.origin;
  if (window.parent === window || !config.measurementId) return;
  function receive(event: MessageEvent) {
    if (event.origin !== appOrigin || event.source !== window.parent || event.data !== completeMessage || state.processed) return;
    state.processed = true;
    const acknowledge = () => window.parent.postMessage(acknowledgeMessage, appOrigin);
    if (!hasConsent()) { acknowledge(); return; }
    try {
      const attribution = readAttribution(window.localStorage, Date.now(), config.attributionMs);
      const location = `${appOrigin}${signupUrl.pathname}`;
      runtime.grant(location, "", attribution?.source === "(direct)" ? undefined : attribution);
      runtime.conversion("sign_up", location, attribution ?? unknownSource, acknowledge);
    } catch (error) {
      acknowledge();
      if (!(error instanceof DOMException)) throw error;
    }
  }
  window.addEventListener("message", receive);
  window.parent.postMessage(readyMessage, appOrigin);
  return () => window.removeEventListener("message", receive);
}
