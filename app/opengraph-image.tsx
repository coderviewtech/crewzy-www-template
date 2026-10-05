import { ImageResponse } from "next/og";
import { siteCaption } from "./site-config";

/* The card shown whenever crewzy.io is shared — LinkedIn, Slack, WhatsApp, X.
   Generated at build time rather than checked in as a PNG, so the wording and
   the brand colours stay in one place and cannot drift from the site. Size is
   the 1.91:1 that every platform crops to. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `Crewzy — ${siteCaption}`;

export default function OpengraphImage() {
  const [lead, payoff] = siteCaption.split(". ");
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
        {/* Blue tile and wordmark, matching the approved website branding. */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 17,
              background: "#2854d6",
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
          <div style={{ fontSize: 50, fontWeight: 800, color: "#1d3353" }}>Crewzy</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 800, color: "#1d3353", lineHeight: 1.15, letterSpacing: -1.5 }}>
            {`${lead}.`}
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#2854d6", lineHeight: 1.15, letterSpacing: -1.5 }}>
            {payoff}
          </div>
          <div style={{ fontSize: 28, color: "#46546b", marginTop: 26, lineHeight: 1.4 }}>
            HR, time tracking, invoicing and document workflows.
            One connected workspace for growing teams.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, color: "#46546b" }}>crewzy.io</div>
          <div style={{ display: "flex", gap: 12 }}>
            {["People", "Work", "Compliance"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#2854d6",
                  background: "#eef3ff",
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
