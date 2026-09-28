import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = { title: "Contact Crewzy and arrange a demo", description: "Talk to Crewzy about your team, arrange a platform demo or get help with an existing workspace.", alternates: { canonical: "/contact" } };
export default function ContactLayout({ children }: { children: ReactNode }) { return children; }
