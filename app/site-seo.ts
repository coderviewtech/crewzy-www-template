import type { Metadata } from "next";

export const siteUrl = "https://crewzy.io";
export const siteTitleTemplate = "%s — Crewzy";
export const homeTitle = "HR, Time Tracking & Document Compliance Software";
export const homeDescription =
  "HR and compliance software for small teams. Connect employee records, document expiry tracking, time tracking, leave and invoicing. Start free with Crewzy.";

// Stable raster URL for search engines, alongside Next's existing SVG icon.
// Generated from app/icon.svg with scripts/generate-favicon.mjs.
export const siteIcons: Metadata["icons"] = {
  icon: [{ url: "/favicon.png", type: "image/png", sizes: "96x96" }],
};

// Explicit topic metadata requested for the site. Google does not use the
// meta-keywords tag for rankings; keep titles, descriptions and visible copy useful.
export const siteKeywords = [
  "people management software",
  "compliance",
  "people management compliance",
  "document compliance management",
  "document expiry tracking",
  "renewal review workflows",
  "compliance audit history",
  "employee records",
  "time tracking",
  "timesheets",
  "leave management",
  "invoicing software",
  "recruitment software",
];

// next.config.js embeds Netlify’s build context for static and dynamic routes.
// Runtime functions need not receive CONTEXT. Local, branch and PR previews stay noindex.
const siteBuildContext = process.env.CREWZY_SITE_BUILD_CONTEXT;

export function isProductionSite(context = siteBuildContext): boolean {
  return context === "production";
}

export function indexingMetadata(context = siteBuildContext): Metadata["robots"] {
  const index = isProductionSite(context);
  return {
    index,
    follow: index,
    ...(index ? { googleBot: { index: true, follow: true, "max-image-preview": "large" as const } } : {}),
  };
}

type PageMetadata = {
  title: string;
  description: string;
  canonical: string;
  shareTitle?: string;
};

// Child metadata replaces (rather than deep-merges) Open Graph/Twitter objects.
// Keep each page's URL, title, description and image together.
export function createPageMetadata({ title, description, canonical, shareTitle = title }: PageMetadata): Metadata {
  const images = [{
    url: `${siteUrl}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: "Crewzy connected workspace for people, work and compliance",
  }];
  return {
    // Layouts must pass the template on to their nested feature/guide pages.
    // A plain title string at an intermediate layout clears that template.
    title: { default: title, template: siteTitleTemplate },
    description,
    keywords: siteKeywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: "Crewzy",
      url: new URL(canonical, siteUrl).href,
      title: shareTitle,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images },
  };
}


/** Ordinary legal titles, withheld from search until launch adoption is complete. */
export function createLegalMetadata(input: PageMetadata): Metadata {
  return {
    ...createPageMetadata(input),
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}
