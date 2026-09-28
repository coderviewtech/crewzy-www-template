import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = { title: "The connected people and work platform", description: "Explore Crewzy’s people, recruitment, time, leave, finance and compliance workflows.", alternates: { canonical: "/platform" } };
export default function PlatformLayout({ children }: { children: ReactNode }) { return children; }
