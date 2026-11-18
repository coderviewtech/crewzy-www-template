"use client";

import { SiteLink } from "./site-link";
import { useState } from "react";
import { ArrowRight, CheckCheck } from "lucide-react";
import { Brand } from "./brand";
import { SectionHeading } from "./section-heading";
import { IconTile, modules } from "./platform-tour";
import { moduleHref } from "./site-config";
import styles from "./connections.module.css";

const connectionPaths = [
  { desktop: "M200 53 H275 Q340 53 340 118 Q340 160 420 160", mobile: "M167 66 V83 Q167 113 197 113 H470 Q500 113 500 140", color: "var(--preview-brand-accent)" },
  { desktop: "M200 160 H420", mobile: "M500 66 V140", color: "var(--preview-module-violet)" },
  { desktop: "M200 267 H275 Q340 267 340 202 Q340 160 420 160", mobile: "M833 66 V83 Q833 113 803 113 H530 Q500 113 500 140", color: "var(--preview-module-amber)" },
  { desktop: "M800 53 H725 Q660 53 660 118 Q660 160 580 160", mobile: "M167 254 V237 Q167 207 197 207 H470 Q500 207 500 180", color: "var(--preview-module-rose)" },
  { desktop: "M800 160 H580", mobile: "M500 254 V180", color: "var(--preview-module-teal)" },
  { desktop: "M800 267 H725 Q660 267 660 202 Q660 160 580 160", mobile: "M833 254 V237 Q833 207 803 207 H530 Q500 207 500 180", color: "var(--preview-module-green)" },
];

export function ConnectedWorkspace() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className={styles.connectionSection} aria-labelledby="connection-title" data-connection-section>
      <div className={styles.connectionCopy}>
        <SectionHeading label="The Crewzy workspace" title="One record." emphasis="Everyone connected." description="Your people, permissions and context flow across every module." id="connection-title" />
      </div>
      <div className={styles.connectionDiagram} data-connection-diagram>
        {(["desktop", "mobile"] as const).map(layout => (
          <svg key={layout} className={`${styles.connectionLines} ${layout === "desktop" ? styles.connectionDesktop : styles.connectionMobile}`} viewBox="0 0 1000 320" preserveAspectRatio="none" fill="none" aria-hidden="true" data-connection-links>
            {connectionPaths.map((path, index) => (
              <g key={index} className={styles.connectionPath} data-highlighted={active === index}>
                <path d={path[layout]} stroke="#e4ebf5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <path d={path[layout]} stroke={path.color} strokeWidth="1.6" strokeLinecap="round" strokeOpacity=".6" vectorEffect="non-scaling-stroke" pathLength="1" data-connection-line />
                <path className={styles.connectionPulse} d={path[layout]} stroke={path.color} strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength="1" />
              </g>
            ))}
          </svg>
        ))}
        {modules.map((item, index) => (
          <SiteLink key={item.name} className={`${styles.connectionNode} ${styles[`connectionNode${index}`]}`} href={index === 5 ? "#compliance" : moduleHref(index)} data-connection-node data-connection-side={index < 3 ? "left" : "right"}
            onPointerEnter={() => setActive(index)} onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(index)} onBlur={() => setActive(null)}>
            <IconTile index={index} small /><strong>{item.name}</strong><ArrowRight size={14} aria-hidden="true" />
          </SiteLink>
        ))}
        <SiteLink href="#platform" className={styles.connectionHub} aria-label="Explore Crewzy’s connected platform">
          <div className={styles.connectionCore} data-connection-core>
            <Brand />
            <strong>One employee record</strong>
            <span>Shared by every module</span>
            <span className={styles.connectionReady} data-connection-ready><CheckCheck size={14} aria-hidden="true" /> Connected</span>
          </div>
        </SiteLink>
      </div>
    </section>
  );
}
