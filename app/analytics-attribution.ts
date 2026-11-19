export type Attribution = { source: string; medium: string; campaign?: string };

const attributionKey = "crewzy.analytics-attribution.v1";
const field = /^[a-z0-9][a-z0-9_-]{0,79}$/i;
const hostname = /^(?:[a-z0-9-]+\.)+[a-z0-9-]+$/i;
const direct: Attribution = { source: "(direct)", medium: "(none)" };

function label(value: unknown): string | undefined {
  return typeof value === "string" && field.test(value) ? value : undefined;
}

export function campaignAttribution(search: URLSearchParams): Attribution | undefined {
  const source = label(search.get("utm_source"));
  const medium = label(search.get("utm_medium"));
  if (!source || !medium) return;
  const campaign = label(search.get("utm_campaign"));
  return { source, medium, ...(campaign ? { campaign } : {}) };
}

export function referralAttribution(referrer: string, siteOrigin: string): Attribution | undefined {
  if (!referrer) return;
  let source: string;
  try {
    source = new URL(referrer).hostname;
  } catch (error) {
    if (error instanceof TypeError) return;
    throw error;
  }
  const siteHost = new URL(siteOrigin).hostname;
  source = source.replace(/^www\./, "");
  if (source === siteHost || source.endsWith(`.${siteHost}`) || source.length > 80 || !hostname.test(source)) return;
  return { source, medium: "referral" };
}

export function readAttribution(storage: Storage, now: number, maxAge: number): Attribution | undefined {
  try {
    const raw = storage.getItem(attributionKey);
    if (!raw) return;
    const { savedAt, source, medium, campaign } = JSON.parse(raw);
    if (!Number.isFinite(savedAt) || savedAt > now || now - savedAt >= maxAge) return;
    if (source === direct.source && medium === direct.medium) return direct;
    const validReferral = medium === "referral" && typeof source === "string"
      && source.length <= 80 && hostname.test(source);
    if ((!label(source) && !validReferral) || !label(medium)) return;
    return { source, medium, ...(label(campaign) ? { campaign } : {}) };
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof TypeError || error instanceof DOMException) return;
    throw error;
  }
}

export function saveAttribution(storage: Storage, now: number, attribution?: Attribution): void {
  if (!attribution) {
    storage.removeItem(attributionKey);
    return;
  }
  storage.setItem(attributionKey, JSON.stringify({ ...attribution, savedAt: now }));
}

export function resolveAttribution(incoming?: Attribution, existing?: Attribution): Attribution {
  return incoming ?? existing ?? direct;
}
