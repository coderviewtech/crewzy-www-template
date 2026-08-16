import { ImageResponse } from "next/og";

/* The card shown whenever crewzy.io is shared — LinkedIn, Slack, WhatsApp, X.
   Until now there was no image at all, so every share rendered as a bare text
   link, which reads as an unfinished site.

   Generated at build time rather than checked in as a PNG, so the wording and
   the brand colours stay in one place and cannot drift from the site. Size is
   the 1.91:1 that every platform crops to. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Crewzy — everything your team runs on, in one workspace";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
        }}
      >
        {/* Brand lockup — the purple tile and wordmark, matching the header. */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 17,
              background: "#7650e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 21a8 8 0 0 0-16 0" />
              <circle cx="10" cy="8" r="5" />
              <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
            </svg>
          </div>
          <div style={{ fontSize: 50, fontWeight: 800, color: "#19191d" }}>Crewzy</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 800, color: "#19191d", lineHeight: 1.1, letterSpacing: -1.5 }}>
            Everything your team runs on,
          </div>
          <div style={{ fontSize: 66, fontWeight: 800, color: "#ff6b57", lineHeight: 1.1, letterSpacing: -1.5 }}>
            in one workspace.
          </div>
          <div style={{ fontSize: 30, color: "#66616c", marginTop: 26, lineHeight: 1.4 }}>
            One platform instead of six subscriptions — core HR, recruitment,
            time, leave, finance and AI.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, color: "#66616c" }}>crewzy.io</div>
          <div style={{ display: "flex", gap: 12 }}>
            {["One login", "One bill", "One audit trail"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#5a35c7",
                  background: "#f0eafe",
                  padding: "10px 20px",
                  borderRadius: 999,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
