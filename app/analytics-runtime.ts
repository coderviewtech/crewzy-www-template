type Gtag = (...args: unknown[]) => void;
type AnalyticsWindow = Window & {
  dataLayer?: IArguments[];
  gtag?: Gtag;
  [key: `ga-disable-${string}`]: boolean;
};
type RuntimeConfig = { measurementId: string; cookieDays: number; cookiePrefix: string };
const tagUrl = "https://www.googletagmanager.com/gtag/js";
const tagElementId = "crewzy-google-analytics";
const secondsPerDay = 86_400;
const deniedConsent = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };

/** Owns one consent-gated tag. No script, cookie or Google request is created before grant. */
export class AnalyticsRuntime {
  private started = false;
  private lastPage: string | null = null;
  private enabled = false;
  private readonly browser: AnalyticsWindow;
  private readonly document: Document;
  private readonly config: RuntimeConfig;

  constructor(browser: Window, document: Document, config: RuntimeConfig) {
    this.browser = browser as AnalyticsWindow;
    this.document = document;
    this.config = config;
  }

  grant(location: string, referrer: string): void {
    const { measurementId, cookieDays, cookiePrefix } = this.config;
    this.browser[`ga-disable-${measurementId}`] = false;
    this.enabled = true;
    if (this.started) return;
    this.started = true;
    const queue = this.browser.dataLayer ??= [];
    // gtag's documented command protocol queues Arguments objects, not GTM event objects.
    const gtag = this.browser.gtag ??= function () { queue.push(arguments); };
    gtag("consent", "default", deniedConsent);
    gtag("consent", "update", { ...deniedConsent, analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ads_data_redaction: true,
      cookie_domain: "none",
      cookie_prefix: cookiePrefix,
      cookie_expires: cookieDays * secondsPerDay,
      cookie_update: false,
      cookie_flags: "SameSite=Lax;Secure",
      page_location: location,
      page_referrer: referrer,
    });
    const script = this.document.createElement("script");
    script.id = tagElementId;
    script.async = true;
    script.referrerPolicy = "origin";
    script.src = `${tagUrl}?id=${measurementId}`;
    this.document.head.appendChild(script);
  }

  page(location: string, referrer: string): void {
    if (!this.enabled || location === this.lastPage) return;
    this.lastPage = location;
    this.browser.gtag?.("set", { page_location: location, page_referrer: referrer });
    this.browser.gtag?.("event", "page_view", {
      send_to: this.config.measurementId, page_location: location, page_referrer: referrer,
    });
  }

  stop(): void {
    this.browser[`ga-disable-${this.config.measurementId}`] = true;
    this.enabled = false;
    this.lastPage = null;
    // Clear only our host-only analytics cookies, never application/authentication cookies.
    for (const cookie of this.document.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (name.startsWith(`${this.config.cookiePrefix}_`)) {
        this.document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
      }
    }
  }
}
