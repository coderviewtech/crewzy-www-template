import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import { company } from "./company";
import { siteCaption } from "./site-config";
import { createPageMetadata, homeDescription, indexingMetadata, siteIcons, siteUrl as SITE_URL } from "./site-seo";
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

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "HR, Compliance, Time Tracking & Invoicing Software",
    description: homeDescription,
    canonical: "/",
    shareTitle: siteCaption,
  }),
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Crewzy | HR, Compliance, Time Tracking & Invoicing Software",
    template: "%s — Crewzy",
  },
  applicationName: "Crewzy",
  icons: siteIcons,
  robots: indexingMetadata(),
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
    `${company.displayName} develops Crewzy, a connected workspace for people, work and compliance.`,
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Crewzy",
  url: SITE_URL,
  description: homeDescription,
  inLanguage: "en-GB",
  publisher: { "@id": `${SITE_URL}/#company` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // Serialised from a literal we control — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
