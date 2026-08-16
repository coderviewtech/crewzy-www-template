import type { Metadata } from "next";
import type { ReactNode } from "react";

/* See app/solutions/layout.tsx for why metadata lives in a layout here. */
export const metadata: Metadata = {
  title: "How the modules work, and how your data is protected",
  description:
    "Two things worth understanding before committing a company to a platform: how Crewzy's modules relate to each other, and which security controls actually guard your data today.",
  alternates: { canonical: "/resources" },
  openGraph: {
    url: "/resources",
    title: "How Crewzy fits together, and how it is protected",
    description:
      "Modules share one employee record and one permission model. The security page lists only controls that exist today.",
    /* Required because overriding openGraph drops the root's injected image —
       see the note in app/solutions/layout.tsx. */
    images: ["/opengraph-image"],
  },
};

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return children;
}
