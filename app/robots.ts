import type { MetadataRoute } from "next";

/* Generated at build time into /robots.txt.
   Everything here is public marketing content, so everything is crawlable —
   the point of this file is to advertise the sitemap, which is how a crawler
   discovers /solutions, /resources and /customers reliably rather than only
   by following navigation links. */
const SITE_URL = "https://crewzy.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
