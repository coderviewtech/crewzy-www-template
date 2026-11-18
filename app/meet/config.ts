import { siteUrl } from "../site-seo";

export const meetupPath = "/meet";
// Use the site's canonical public origin, never a preview host or third-party redirect.
export const meetupUrl = new URL(meetupPath, siteUrl).href;
export const meetupDisplayUrl = meetupUrl.replace(/^https:\/\//, "");
export const qrSvgPath = "/meet/qr.svg";
export const qrPngPath = "/meet/qr.png";

// Asset format constants: a four-module quiet zone, opaque background and
// high error correction keep printed codes readable without a decorative logo.
export const qrOptions = {
  errorCorrectionLevel: "H" as const,
  margin: 4,
  width: 1024,
  color: { dark: "#000000", light: "#ffffff" },
};
