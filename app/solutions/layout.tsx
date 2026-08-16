import type { Metadata } from "next";
import type { ReactNode } from "react";

/* Metadata lives in this layout rather than in page.tsx because the page is a
   client component, and Next cannot export `metadata` from one. Without this
   every route silently inherited the root layout's title, so all four pages
   were served to Google with an identical title and description — which is
   both a duplicate-content signal and the reason none of them could ever be
   chosen as a sitelink. The title is deliberately suffix-free: the root
   layout's "%s — Crewzy" template appends the brand. */
export const metadata: Metadata = {
  title: "HR software for agencies, consultancies and insurance teams",
  description:
    "See how Crewzy fits agencies billing client hours, consultancies tracking utilisation and margin, and insurance teams tracking licences and renewals — on one employee record.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    url: "/solutions",
    title: "HR software shaped to how your business actually works",
    description:
      "Agencies, consultancies and insurance teams lose time in different places. Here is where the disconnected stack costs each of them the most.",
    /* Declaring `openGraph` in a child replaces the parent's object outright,
       which drops the image that app/opengraph-image.tsx injects at the root.
       Every page that overrides openGraph must name the image again or it
       shares as a bare text card. */
    images: ["/opengraph-image"],
  },
};

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  return children;
}
