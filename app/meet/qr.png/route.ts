import { createMeetupQr } from "../qr-response";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  return createMeetupQr("png");
}
