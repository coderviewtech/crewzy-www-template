import type { Metadata } from "next";
import type { ReactNode } from "react";

/* See app/solutions/layout.tsx for why metadata lives in a layout here. */
export const metadata: Metadata = {
  title: "Early access and design partners",
  description:
    "Crewzy is live and onboarding a small group of design partners rather than opening to everyone at once, so the platform is shaped by companies actually running on it.",
  alternates: { canonical: "/customers" },
  openGraph: {
    url: "/customers",
    title: "We are picking our first customers carefully",
    description:
      "Apply as a Crewzy design partner. A small group, onboarded deliberately, shaping the platform as it is built.",
    /* Required because overriding openGraph drops the root's injected image —
       see the note in app/solutions/layout.tsx. */
    images: ["/opengraph-image"],
  },
};

export default function CustomersLayout({ children }: { children: ReactNode }) {
  return children;
}
