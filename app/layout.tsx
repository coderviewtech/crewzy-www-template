import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";

/* Nunito is the platform brand face; Inter is the companion for running text.
   Both are self-hosted by next/font, so first paint uses the real typefaces
   rather than a system fallback that reflows a moment later. */
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://crewzy.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Crewzy — People, work and compliance. Connected.",
    template: "%s — Crewzy",
  },
  description:
    "Crewzy replaces the stack of tools you pay for and stitch together — core HR, recruitment, time and projects, leave, invoicing and an AI assistant. One login, one bill, far less admin.",
  keywords: [
    "HR software",
    "timesheets",
    "leave management",
    "recruitment",
    "invoicing",
    "agencies",
    "consultancies",
    "insurance teams",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Crewzy",
    title: "Stop running your business across a dozen disconnected tools",
    description:
      "One platform instead of six subscriptions. Core HR, recruitment, time, leave, finance and AI on one employee record.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop running your business across a dozen disconnected tools",
    description: "One platform instead of six subscriptions.",
  },
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

/* Organization structured data.
 *
 * This is what lets a search engine treat Crewzy as an entity rather than as
 * an unrelated set of pages — it is the groundwork behind a brand result that
 * carries a logo, and eventually a knowledge panel.
 *
 * `sameAs` is deliberately absent. It is the list of official profiles that
 * corroborate the entity, and there are none yet. Listing profiles that do not
 * exist is worse than listing none: unverifiable claims weaken the match
 * rather than strengthen it. Add the real LinkedIn and X URLs here the day
 * they exist — that single field is the biggest remaining lever on brand
 * recognition, and it needs no other change.
 *
 * Every value below is asserted elsewhere on the site, so nothing here is a
 * claim the pages do not already make. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Crewzy",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "Crewzy is a modular HR platform for growing companies — core HR, recruitment, time and projects, leave, invoicing and an AI assistant on one employee record.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sales@crewzy.io",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@crewzy.io",
      availableLanguage: "English",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // Serialised from a literal we control — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
