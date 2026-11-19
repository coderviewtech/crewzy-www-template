import type { Attribution } from "../analytics-attribution";
import {
  leadEmailMaxLength, leadFollowUpRequest, leadFormName, leadFormPath,
  leadNameMaxLength, leadNoticeVersion, leadRegistrationMarker, leadTimeoutMs,
} from "./lead-config";

export type GuideLead = { name: string; email: string; source: "meetup-page" | "website-chat"; honeypot: string; attribution?: Attribution };

/** Only the enquiry is sent; question selections, page queries and transcripts are excluded. */
export function encodeGuideLead(lead: GuideLead): URLSearchParams {
  const name = lead.name.trim();
  const email = lead.email.trim();
  if (!name || name.length > leadNameMaxLength || /[\r\n]/.test(name)
    || email.length > leadEmailMaxLength || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter your name and a valid email address.");
  }
  return new URLSearchParams({
    "form-name": leadFormName, name, email, source: lead.source,
    "bot-field": lead.honeypot, "follow-up-request": leadFollowUpRequest,
    "notice-version": leadNoticeVersion,
    ...(lead.attribution ? {
      "lead-source": lead.attribution.source, "lead-medium": lead.attribution.medium,
      "lead-campaign": lead.attribution.campaign ?? "",
    } : {}),
  });
}

/** Await Netlify's response before unlocking the guide; never retry a POST automatically. */
export async function submitGuideLead(lead: GuideLead): Promise<void> {
  const response = await fetch(leadFormPath, {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeGuideLead(lead).toString(), signal: AbortSignal.timeout(leadTimeoutMs),
    credentials: "omit", cache: "no-store",
  });
  if (!response.ok) throw new Error("The enquiry could not be submitted.");
  // A host serving the untouched registration file has not processed the form.
  if ((await response.text()).includes(leadRegistrationMarker)) {
    throw new Error("The enquiry service is unavailable.");
  }
}
