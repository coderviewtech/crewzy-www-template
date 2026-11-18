/** Netlify's static registration file must declare these same form/field names. */
export const leadFormName = "crewzy-product-enquiry";
export const leadFormPath = "/__forms.html";
export const leadRegistrationMarker = "crewzy-form-registration";
export const leadNoticeVersion = "2026-11-13";
export const leadFollowUpRequest = "Please email me about my interest in Crewzy. This does not subscribe me to ongoing marketing.";
// Field schema bounds, shared by the visible form and its payload validation.
export const leadNameMaxLength = 120;
export const leadEmailMaxLength = 254;

const defaultTimeoutMs = 15000;
const maximumTimeoutMs = 60000;
const configuredTimeoutMs = Number(process.env.NEXT_PUBLIC_ENQUIRY_TIMEOUT_MS ?? defaultTimeoutMs);
const validTimeout = Number.isInteger(configuredTimeoutMs) && configuredTimeoutMs > 0 && configuredTimeoutMs <= maximumTimeoutMs;
if (!validTimeout) console.warn("Invalid NEXT_PUBLIC_ENQUIRY_TIMEOUT_MS; using the default.");
export const leadTimeoutMs = validTimeout ? configuredTimeoutMs : defaultTimeoutMs;
