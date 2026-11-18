"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { SiteLink as Link } from "./site-link";
import { AnalyticsRuntime } from "./analytics-runtime";
import { analyticsCookiePrefix, consentChangeEvent, consentStorageKey, measurementLocation, measurementReferrer, parseConsent, type AnalyticsChoice, type AnalyticsConfig } from "./analytics-policy";
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
  try { window.localStorage.setItem(consentStorageKey, JSON.stringify({ version: 1, choice, savedAt: Date.now() })); }
  catch (error) { if (!(error instanceof DOMException)) throw error; memoryOnly = true; }
  window.dispatchEvent(new Event(consentChangeEvent));
}
const serverChoice = (): AnalyticsChoice => null;

export function AnalyticsConsent({ config }: { config: AnalyticsConfig }) {
  const choice = useSyncExternalStore(subscribe, () => readChoice(config.consentDays), serverChoice);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const runtime = useRef<AnalyticsRuntime | null>(null);
  const settingsButton = useRef<HTMLButtonElement>(null);
  const canMeasure = Boolean(config.measurementId);

  useEffect(() => {
    if (!canMeasure) return;
    const location = measurementLocation(window.location.href, config.origin, config.paths);
    runtime.current ??= new AnalyticsRuntime(window, document, {
      measurementId: config.measurementId, cookieDays: config.consentDays, cookiePrefix: analyticsCookiePrefix,
    });
    if (choice !== "accepted" || !location) { runtime.current.stop(); return; }
    const referrer = measurementReferrer(document.referrer);
    runtime.current.grant(location, referrer);
    runtime.current.page(location, referrer);
  }, [canMeasure, choice, pathname, config]);

  if (!canMeasure) return null;
  const choose = (next: Exclude<AnalyticsChoice, null>) => {
    // Revoke synchronously before React updates; reload removes the downloaded library/listeners.
    const wasAccepted = choice === "accepted";
    if (next === "rejected") runtime.current?.stop();
    saveChoice(next);
    setOpen(false);
    settingsButton.current?.focus();
    if (wasAccepted && next === "rejected") window.location.reload();
  };

  return (
    <>
      <button ref={settingsButton} className={styles.settings} data-cookie-settings onClick={() => setOpen(value => !value)} aria-expanded={open || choice === null} aria-controls="analytics-choice">Cookie settings</button>
      {(choice === null || open) && (
        <section id="analytics-choice" className={styles.banner} aria-labelledby="analytics-choice-title" data-lenis-prevent>
          <div><h2 id="analytics-choice-title">Your privacy choices</h2>
            <p>Allow Google Analytics to help us understand visits to Crewzy? It uses cookies to measure pages and traffic sources. Optional analytics stays off until you accept. <Link href="/privacy#analytics">Privacy details</Link></p>
            {choice && <p className={styles.status}>Analytics is currently {choice === "accepted" ? "on" : "off"}. You can change this at any time.</p>}
          </div>
          <div className={styles.actions}>
            <button onClick={() => choose("rejected")}>Reject analytics</button>
            <button onClick={() => choose("accepted")}>Accept analytics</button>
            {choice && <button className={styles.close} onClick={() => { setOpen(false); settingsButton.current?.focus(); }}>Close</button>}
          </div>
        </section>
      )}
    </>
  );
}
