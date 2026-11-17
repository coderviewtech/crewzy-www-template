import { analyticsId, type AnalyticsConfig } from "./analytics-policy";
import { legalPaths, marketingPaths } from "./site-routes";
import { isProductionSite, siteUrl } from "./site-seo";

const configuredId = process.env.GA_MEASUREMENT_ID;
const measurementId = analyticsId(configuredId);
const configuredDays = process.env.ANALYTICS_CONSENT_DAYS;
const candidateDays = Number(configuredDays ?? 180);
const consentDays = Number.isInteger(candidateDays) && candidateDays >= 1 && candidateDays <= 365 ? candidateDays : 180;
if (configuredId && !measurementId) console.warn("GA_MEASUREMENT_ID is invalid; analytics remains disabled.");
if (configuredDays && consentDays !== candidateDays) console.warn("ANALYTICS_CONSENT_DAYS is invalid; using 180 days.");

/** This public configuration is passed from the server; previews never receive an active tag. */
export const analyticsConfig: AnalyticsConfig = {
  measurementId: isProductionSite() ? measurementId : "",
  origin: siteUrl,
  paths: [...marketingPaths, ...legalPaths],
  consentDays,
};
