import { analyticsId, type AnalyticsConfig } from "./analytics-policy";
import { appUrl } from "./site-config";
import { legalPaths, marketingPaths } from "./site-routes";
import { isProductionSite, siteUrl } from "./site-seo";

const configuredId = process.env.GA_MEASUREMENT_ID;
const measurementId = analyticsId(configuredId);
const configuredDays = process.env.ANALYTICS_CONSENT_DAYS;
const candidateDays = Number(configuredDays ?? 180);
const consentDays = Number.isInteger(candidateDays) && candidateDays >= 1 && candidateDays <= 365 ? candidateDays : 180;
if (configuredId && !measurementId) console.warn("GA_MEASUREMENT_ID is invalid; analytics remains disabled.");
if (configuredDays && consentDays !== candidateDays) console.warn("ANALYTICS_CONSENT_DAYS is invalid; using 180 days.");

const configuredHours = process.env.ANALYTICS_ATTRIBUTION_HOURS;
const defaultHours = 24;
const maxHours = 168;
const millisecondsPerHour = 3_600_000;
const candidateHours = Number(configuredHours ?? defaultHours);
const validHours = Number.isInteger(candidateHours) && candidateHours >= 1 && candidateHours <= maxHours;
if (!validHours) console.warn("ANALYTICS_ATTRIBUTION_HOURS is invalid; using 24 hours.");

export const analyticsAttributionHours = validHours ? candidateHours : defaultHours;

/** This public configuration is passed from the server; previews never receive an active tag. */
export const analyticsConfig: AnalyticsConfig = {
  measurementId: isProductionSite() ? measurementId : "",
  origin: siteUrl,
  paths: [...marketingPaths, ...legalPaths],
  consentDays,
  attributionMs: analyticsAttributionHours * millisecondsPerHour,
  signupUrl: appUrl("signup"),
};
