import QRCode from "qrcode";
import { meetupUrl, qrOptions } from "./config";

/** Built locally into static assets; no scanner information or provider request. */
export async function createMeetupQr(format: "png" | "svg"): Promise<Response> {
  const body = format === "svg"
    ? await QRCode.toString(meetupUrl, { ...qrOptions, type: "svg" })
    : new Uint8Array(await QRCode.toBuffer(meetupUrl, qrOptions));
  return new Response(body, {
    headers: {
      "Content-Type": format === "svg" ? "image/svg+xml" : "image/png",
      "Content-Disposition": `inline; filename="crewzy-meet.${format}"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
