import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import { company } from "./company";
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

/* Identify the company separately from its product brand. The registration
   facts share a source with the visible footer and About page. A founder's
   personal LinkedIn profile is not an official company social profile. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#company`,
  name: company.displayName,
  legalName: company.legalName,
  url: `${SITE_URL}/about`,
  sameAs: [company.companiesHouseUrl],
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Companies House company number",
    value: company.number,
  },
  address: company.registeredOffice,
  brand: {
    "@type": "Brand",
    name: "Crewzy",
    logo: `${SITE_URL}/icon.svg`,
  },
  description:
    "coderView develops Crewzy, a connected workspace for people, work and compliance.",
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
