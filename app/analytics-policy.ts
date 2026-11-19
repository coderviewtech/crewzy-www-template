export type AnalyticsChoice = "accepted" | "rejected" | null;
export type AnalyticsConfig = {
  measurementId: string;
  origin: string;
  paths: string[];
  consentDays: number;
  attributionMs: number;
  signupUrl: string;
};

export const consentVersion = 2;
const visitOnlyConsentVersion = 1;
export const consentStorageKey = "crewzy.analytics-consent.v1";
export const consentChangeEvent = "crewzy:analytics-consent";
export const analyticsCookiePrefix = "crewzy_marketing";
export const millisecondsPerDay = 86_400_000;

export function parseConsent(raw: string | null, now: number, lifetimeDays: number): AnalyticsChoice {
  if (!raw) return null;
  try {
    const record = JSON.parse(raw);
    if (!record || !Number.isFinite(record.savedAt)) return null;
    if (record.savedAt > now || now - record.savedAt >= lifetimeDays * millisecondsPerDay) return null;
    // A prior refusal still applies. Conversion attribution needs the updated notice.
    if (record.version === visitOnlyConsentVersion && record.choice === "rejected") return "rejected";
    if (record.version !== consentVersion) return null;
    return record.choice === "accepted" || record.choice === "rejected" ? record.choice : null;
  } catch (error) {
    if (error instanceof SyntaxError) return null;
    throw error;
  }
}

export function analyticsId(value: string | undefined): string {
  return value && /^G-[A-Z0-9]{6,20}$/.test(value) ? value : "";
}

/** Only named public pages are measured; queries, fragments and unknown paths are excluded. */
export function measurementLocation(href: string, origin: string, paths: string[]): string | null {
  try {
    const url = new URL(href);
    if (url.origin !== origin || !paths.includes(url.pathname)) return null;
    return `${origin}${url.pathname}`;
  } catch (error) {
    if (error instanceof TypeError) return null;
    throw error;
  }
}

export function measurementReferrer(referrer: string): string {
  try {
    const url = new URL(referrer);
    return url.protocol === "https:" || url.protocol === "http:" ? `${url.origin}/` : "";
  } catch (error) {
    if (error instanceof TypeError) return "";
    throw error;
  }
}
