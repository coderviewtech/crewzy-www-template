"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { SiteLink as Link } from "./site-link";
import { AnalyticsRuntime } from "./analytics-runtime";
import { analyticsCookiePrefix, consentChangeEvent, consentStorageKey, consentVersion, measurementLocation, measurementReferrer, parseConsent, type AnalyticsChoice, type AnalyticsConfig } from "./analytics-policy";
import { campaignAttribution, readAttribution, referralAttribution, resolveAttribution, saveAttribution, type Attribution } from "./analytics-attribution";
import { EnquiryAnalytics } from "./analytics-context";
import { listenForSignup, signupBridgePath } from "./analytics-signup-bridge";
import styles from "./analytics-consent.module.css";

let sessionChoice: AnalyticsChoice = null;
let memoryOnly = false;
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(consentChangeEvent, listener);
  return () => { window.removeEventListener("storage", listener); window.removeEventListener(consentChangeEvent, listener); };
}
function readChoice(days: number): AnalyticsChoice {
  if (memoryOnly) return sessionChoice;
  try { return parseConsent(window.localStorage.getItem(consentStorageKey), Date.now(), days); }
  catch (error) { if (error instanceof DOMException) return sessionChoice; throw error; }
}
function saveChoice(choice: Exclude<AnalyticsChoice, null>): void {
  sessionChoice = choice;
  try { window.localStorage.setItem(consentStorageKey, JSON.stringify({ version: consentVersion, choice, savedAt: Date.now() })); }
  catch (error) { if (!(error instanceof DOMException)) throw error; memoryOnly = true; }
  window.dispatchEvent(new Event(consentChangeEvent));
}
const serverChoice = (): AnalyticsChoice => null;

export function AnalyticsConsent({ config, children }: { config: AnalyticsConfig; children: React.ReactNode }) {
  const choice = useSyncExternalStore(subscribe, () => readChoice(config.consentDays), serverChoice);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const runtime = useRef<AnalyticsRuntime | null>(null);
  const latest = useRef<Attribution | undefined>(undefined);
  const handledEntry = useRef(false);
  const bridgeState = useRef({ processed: false });
  const bridge = pathname === signupBridgePath;
  const settingsButton = useRef<HTMLButtonElement>(null);
  const canMeasure = Boolean(config.measurementId);

  useEffect(() => {
    if (!canMeasure) return;
    const location = measurementLocation(window.location.href, config.origin, config.paths);
    runtime.current ??= new AnalyticsRuntime(window, document, {
      measurementId: config.measurementId, cookieDays: config.consentDays, cookiePrefix: analyticsCookiePrefix,
    });
    if (bridge) {
      if (choice !== "accepted") runtime.current.stop();
      return listenForSignup(config, runtime.current, () => readChoice(config.consentDays) === "accepted", bridgeState.current);
    }
    if (choice !== "accepted" || !location) { runtime.current.stop(); return; }
    const referrer = measurementReferrer(document.referrer);
    const campaign = campaignAttribution(new URLSearchParams(window.location.search));
    const incoming = campaign ?? (!handledEntry.current ? referralAttribution(referrer, config.origin) : undefined);
    handledEntry.current = true;
    try {
      const now = Date.now();
      const existing = readAttribution(window.localStorage, now, config.attributionMs);
      latest.current = resolveAttribution(incoming, existing);
      if (incoming || !existing) saveAttribution(window.localStorage, now, latest.current);
    } catch (error) {
      if (!(error instanceof DOMException)) throw error;
      latest.current = resolveAttribution(incoming, latest.current);
    }
    runtime.current.grant(location, referrer, campaign);
    runtime.current.page(location, referrer);
  }, [bridge, canMeasure, choice, pathname, config]);

  if (bridge) return null;
  if (!canMeasure) return children;
  const attribution = () => {
    if (readChoice(config.consentDays) !== "accepted") return;
    try {
      return resolveAttribution(readAttribution(window.localStorage, Date.now(), config.attributionMs));
    } catch (error) {
      if (!(error instanceof DOMException)) throw error;
      return latest.current;
    }
  };
  const completed = (submissionAttribution?: Attribution) => {
    if (!submissionAttribution || readChoice(config.consentDays) !== "accepted") return;
    const location = measurementLocation(window.location.href, config.origin, config.paths);
    if (location) runtime.current?.conversion("generate_lead", location, submissionAttribution);
  };
  const choose = (next: Exclude<AnalyticsChoice, null>) => {
    // Revoke synchronously before React updates; reload removes the downloaded library/listeners.
    const wasAccepted = choice === "accepted";
    if (next === "rejected") {
      runtime.current?.stop();
      latest.current = undefined;
      try { saveAttribution(window.localStorage, Date.now()); }
      catch (error) { if (!(error instanceof DOMException)) throw error; }
    }
    saveChoice(next);
    setOpen(false);
    settingsButton.current?.focus();
    if (wasAccepted && next === "rejected") window.location.reload();
  };

  return (
    <EnquiryAnalytics.Provider value={{ attribution, completed }}>
      {children}
      <button ref={settingsButton} className={styles.settings} data-cookie-settings onClick={() => setOpen(value => !value)} aria-expanded={open || choice === null} aria-controls="analytics-choice">Cookie settings</button>
      {(choice === null || open) && (
        <section id="analytics-choice" className={styles.banner} aria-labelledby="analytics-choice-title" data-lenis-prevent>
          <div><h2 id="analytics-choice-title">Your privacy choices</h2>
            <p>Allow Google Analytics to measure Crewzy visits, completed sign-ups and enquiries? If you accept, we also record how you found us on submitted enquiries. Optional analytics stays off until you accept. <Link href="/privacy#analytics">Privacy details</Link></p>
            {choice && <p className={styles.status}>Analytics is currently {choice === "accepted" ? "on" : "off"}. You can change this at any time.</p>}
          </div>
          <div className={styles.actions}>
            <button onClick={() => choose("rejected")}>Reject analytics</button>
            <button onClick={() => choose("accepted")}>Accept analytics</button>
            {choice && <button className={styles.close} onClick={() => { setOpen(false); settingsButton.current?.focus(); }}>Close</button>}
          </div>
        </section>
      )}
    </EnquiryAnalytics.Provider>
  );
}
