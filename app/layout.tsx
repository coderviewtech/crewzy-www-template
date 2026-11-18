import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { company } from "./company";
import { siteCaption } from "./site-config";
import { ProductGuideProvider } from "./product-guide/product-guide";
import { SmoothScrollProvider } from "./smooth-scroll";
import { createPageMetadata, homeDescription, homeTitle, indexingMetadata, siteIcons, siteTitleTemplate, siteUrl as SITE_URL } from "./site-seo";
import { searchVerification } from "./search-verification";
import { StructuredData } from "./structured-data";
import { AnalyticsConsent } from "./analytics-consent";
import { analyticsConfig } from "./analytics-config";
import "./globals.css";

// One self-hosted variable face for the website, navigation and product guide.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: homeTitle,
    description: homeDescription,
    canonical: "/",
    shareTitle: siteCaption,
  }),
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${homeTitle} | Crewzy`,
    template: siteTitleTemplate,
  },
  applicationName: "Crewzy",
  icons: siteIcons,
  robots: indexingMetadata(),
  verification: searchVerification,
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
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScrollProvider>
          <ProductGuideProvider>{children}</ProductGuideProvider>
          <AnalyticsConsent config={analyticsConfig} />
        </SmoothScrollProvider>
        <StructuredData value={[organizationSchema, websiteSchema]} />
      </body>
    </html>
  );
}
