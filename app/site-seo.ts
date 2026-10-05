import type { Metadata } from "next";

export const siteUrl = "https://crewzy.io";
export const homeDescription =
  "HR and compliance software for growing teams. Manage employee records, document expiry, time tracking, leave and invoicing in one connected Crewzy workspace.";

// Stable raster URL for search engines, alongside Next's existing SVG icon.
// Generated from app/icon.svg with scripts/generate-favicon.mjs.
export const siteIcons: Metadata["icons"] = {
  icon: [{ url: "/favicon.png", type: "image/png", sizes: "96x96" }],
};

// Explicit topic metadata requested for the site. Google does not use the
// meta-keywords tag for rankings; keep titles, descriptions and visible copy useful.
export const siteKeywords = [
  "HR software",
  "compliance",
  "HR compliance",
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

// Netlify sets CONTEXT at build time. Local, branch and PR previews stay noindex.
export function isProductionSite(context = process.env.CONTEXT): boolean {
  return context === "production";
}

export function indexingMetadata(context = process.env.CONTEXT): Metadata["robots"] {
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
    title,
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
