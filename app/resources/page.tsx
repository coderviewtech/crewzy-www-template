"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  KeyRound,
  Layers,
  LockKeyhole,
  ScrollText,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import styles from "../landing.module.css";
import { appUrl, Eyebrow, Footer, Header, useScrollMotion } from "../chrome";

const MODULE_FACTS = [
  {
    icon: Layers,
    title: "One employee record underneath",
    text: "Every module reads the same person, the same team and the same permissions. Switching one on adds capability rather than another system to keep in sync.",
  },
  {
    icon: ShieldCheck,
    title: "Permissions travel with the person",
    text: "Access is evaluated from company-scoped role grants, so turning on a module never means re-granting everyone access to it separately.",
  },
  {
    icon: Check,
    title: "Turn one on, turn one off",
    text: "Modules are enabled per company. What you do not use stays out of the way instead of cluttering every screen.",
  },
  {
    icon: Workflow,
    title: "Data crosses without an integration",
    text: "Approved leave reaches the timesheet, approved time reaches the invoice. No connector to configure, no sync to monitor, no mapping to maintain.",
  },
];

/* Only controls that are actually implemented. Certifications we do not hold
   are named as not-yet rather than implied, because the first enterprise buyer
   who asks will check. */
const TRUST_CONTROLS = [
  {
    icon: KeyRound,
    title: "Access control",
    text: "Every API request is authorised against company-scoped role grants rather than a client-side check, and object-level ownership is verified separately from the route guard.",
  },
  {
    icon: UserRoundCheck,
    title: "Separation of duties",
    text: "Sensitive approvals apply maker-checker rules, so the person who raised a request cannot be the person who approves it — enforced on the server, not hidden in the UI.",
  },
  {
    icon: ScrollText,
    title: "Audit trail",
    text: "Connected services record actor, company, action, result and time — including refusals, not only successes — so an investigation can show what was attempted as well as what happened.",
  },
  {
    icon: LockKeyhole,
    title: "Sign-in protection",
    text: "Multi-factor authentication with authenticator apps, email fallback and backup codes, plus account lockout after repeated failed attempts.",
  },
  {
    icon: Building2,
    title: "Tenant isolation",
    text: "Every query is scoped to the company it belongs to, and services re-verify that scope rather than trusting an identifier supplied by the caller.",
  },
  {
    icon: ShieldCheck,
    title: "Service hardening",
    text: "Standard security headers, per-endpoint rate limiting on write paths, and a fail-closed configuration check that refuses to start on a weak or missing production secret.",
  },
];

export default function ResourcesPage() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollMotion(pageRef, styles.revealed, styles.motionReady);

  return (
    <main className={styles.page} ref={pageRef}>
      <Header />

      <section className={styles.subHero}>
        <div className={styles.subHeroInner} data-reveal>
          <Eyebrow icon={Sparkles}>Resources</Eyebrow>
          <h1>How Crewzy fits together, and <span>how it is protected.</span></h1>
          <p>Two things worth understanding before you commit a company to a platform: how the modules relate to each other, and what actually guards your data.</p>
          <nav className={styles.subJump} aria-label="Jump to a section">
            <Link href="#modules">How modules work</Link>
            <Link href="#security">Security &amp; trust</Link>
          </nav>
        </div>
      </section>

      <section className={styles.subSection} id="modules">
        <div className={styles.subSectionHead} data-reveal>
          <Eyebrow icon={Layers}>How modules work</Eyebrow>
          <h2>Add a module, not <span>another integration.</span></h2>
          <p>Every module runs on the same employee record and the same permissions, so switching one on adds capability instead of another system to wire up and keep in sync.</p>
        </div>
        <div className={styles.subCards}>
          {MODULE_FACTS.map(({ icon: FactIcon, title, text }, index) => (
            <article key={title} data-reveal data-reveal-delay={String((index % 2) + 1)} data-scroll-zoom="card">
              <span><FactIcon size={19} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.subSection} id="security">
        <div className={styles.subSectionHead} data-reveal>
          <Eyebrow icon={ShieldCheck}>Security &amp; trust</Eyebrow>
          <h2>Controls that are in the product <span>today.</span></h2>
          <p>Everything below is implemented and running, not on a roadmap. Where we do not yet have something, it says so.</p>
        </div>
        <div className={styles.subCards}>
          {TRUST_CONTROLS.map(({ icon: ControlIcon, title, text }, index) => (
            <article key={title} data-reveal data-reveal-delay={String((index % 2) + 1)} data-scroll-zoom="card">
              <span><ControlIcon size={19} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        {/* Saying this plainly costs nothing a serious buyer would not find out
            in their first security review — and it makes the list above land. */}
        <div className={styles.trustNote} data-reveal>
          <ShieldCheck size={17} />
          <p><strong>What we do not claim yet.</strong> Crewzy is not SOC 2 or ISO 27001 certified — those audits take a trading history we do not have. The controls above are built and running, and we will happily walk your security team through how each one works. If a certificate is a hard requirement for you today, we are not the right choice yet, and we would rather tell you now.</p>
        </div>
      </section>

      <section className={styles.subCta} data-reveal>
        <Eyebrow icon={Sparkles} dark>Ready when you are</Eyebrow>
        <h2>See it running on <span>your own data.</span></h2>
        <p>Start free for up to 10 employees, or ask us to set a workspace up with your people already in it.</p>
        <div>
          <Link href={appUrl("/signup")}>Set up free workspace <ArrowRight size={18} /></Link>
          <Link href={"/customers"}>Apply as a design partner</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
