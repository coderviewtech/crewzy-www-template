"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  BrainCircuit,
  ClipboardList,
  MessagesSquare,
  BookOpen,
  Building2,
  Check,
  KeyRound,
  Layers,
  LockKeyhole,
  Rocket,
  ScrollText,
  ShieldCheck,
  UserRoundCheck,
  Workflow,
} from "lucide-react";
import styles from "../landing.module.css";
import secondary from "../secondary-page.module.css";
import typeStyles from "../content-typography.module.css";
import trust from "./trust.module.css";
import { appUrl, Eyebrow, Footer, Header, useScrollMotion } from "../chrome";
import { demoHref } from "../site-config";

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

// Evidence scope: source review, not confirmation of a production deployment.
const TRUST_CONTROLS = [
  {
    icon: KeyRound,
    title: "Company-scoped access",
    text: "Roles, company permissions and record ownership checks govern access to records and actions.",
  },
  {
    icon: UserRoundCheck,
    title: "Approval controls",
    text: "Supported workflows separate the person raising a request from the person approving it.",
  },
  {
    icon: ScrollText,
    title: "Activity history",
    text: "Recorded actions include the actor, outcome and time, helping teams review changes.",
  },
  {
    icon: LockKeyhole,
    title: "Account protection",
    text: "Password hashing, optional multi-factor authentication and failed sign-in controls support account security.",
  },
  {
    icon: Building2,
    title: "Controlled document access",
    text: "Authenticated requests, company permissions and time-limited download links govern access to uploaded documents.",
  },
  {
    icon: ShieldCheck,
    title: "Service protections",
    text: "Application controls include security headers, request rate limits and production-secret checks.",
  },
];

const AI_GUIDANCE = [
  {
    icon: KeyRound,
    title: "Permission-aware context",
    text: "Where AI features are enabled, workspace tools use company and role permissions to retrieve relevant information. Inputs and relevant context are processed by the configured AI provider.",
  },
  {
    icon: MessagesSquare,
    title: "Careful inputs and review",
    text: "Share only the information needed for the task. Keep passwords, sign-in codes and tokens out of prompts and uploads. Check generated answers, summaries and extracted fields before acting on them.",
  },
];

export default function ResourcesPage() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollMotion(pageRef, styles.revealed, styles.motionReady);

  return (
    <main className={`${styles.page} ${secondary.page} ${typeStyles.page}`} ref={pageRef}>
      <Header />

      <section className={styles.subHero}>
        <div className={`${styles.subHeroInner} ${typeStyles.hero}`} data-reveal>
          <Eyebrow icon={BookOpen}>Resources</Eyebrow>
          <h1>How Crewzy fits together, and <span>how it is protected.</span></h1>
          <p>Understand how the modules work together, how application controls support your workspace, and where to find our privacy and service information.</p>
          <nav className={`${styles.subJump} ${typeStyles.jumpLinks}`} aria-label="Jump to a section">
            <Link href="#modules">How modules work</Link>
            <Link href="#security">Security &amp; trust</Link>
            <Link href="#privacy-progress">Privacy &amp; service information</Link>
          </nav>
        </div>
      </section>

      <section className={styles.subSection} id="modules">
        <div className={`${styles.subSectionHead} ${typeStyles.heading}`} data-reveal>
          <Eyebrow icon={Layers}>How modules work</Eyebrow>
          <h2>Add a module, not <span>another integration.</span></h2>
          <p>Every module runs on the same employee record and the same permissions, so switching one on adds capability instead of another system to wire up and keep in sync.</p>
        </div>
        <div className={`${styles.subCards} ${typeStyles.cards}`}>
          {MODULE_FACTS.map(({ icon: FactIcon, title, text }, index) => (
            <article key={title} data-reveal data-reveal-delay={String((index % 2) + 1)} data-scroll-zoom="card">
              <span><FactIcon size={19} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.subSection} id="security" aria-labelledby="security-title">
        <div className={[styles.subSectionHead, typeStyles.heading].join(" ")} data-reveal>
          <Eyebrow icon={ShieldCheck}>Security &amp; trust</Eyebrow>
          <h2 id="security-title">Security <span>at Crewzy.</span></h2>
          <p>Crewzy’s primary database and document storage are hosted on AWS in London, UK. We use HTTPS, encryption at rest, a private database network and protections against public access to stored documents. Automated database backups, threat detection and infrastructure audit logging are enabled. Further security and data-processing information is available on request.</p>
          <p>Access permissions, approval controls and activity history are part of Crewzy’s application design.</p>
        </div>
        <div className={[styles.subCards, typeStyles.cards].join(" ")}>
          {TRUST_CONTROLS.map(({ icon: ControlIcon, title, text }, index) => (
            <article key={title} data-reveal data-reveal-delay={String((index % 2) + 1)} data-scroll-zoom="card">
              <span><ControlIcon size={19} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={[styles.subSection, trust.aiSection].join(" ")} id="ai-safeguards" aria-labelledby="ai-security-title">
        <div className={[styles.subSectionHead, typeStyles.heading].join(" ")} data-reveal>
          <Eyebrow icon={BrainCircuit}>Using AI thoughtfully</Eyebrow>
          <h2 id="ai-security-title">Relevant context. <span>Human judgement.</span></h2>
          <p>AI can help with workspace questions, document fields and summaries where enabled. Use relevant information and review the results.</p>
        </div>
        <div className={[styles.subCards, typeStyles.cards].join(" ")}>
          {AI_GUIDANCE.map(({ icon: GuidanceIcon, title, text }) => (
            <article key={title} data-reveal data-scroll-zoom="card">
              <span><GuidanceIcon size={19} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.subSection} id="privacy-progress" aria-labelledby="privacy-title">
        <div className={[styles.subSectionHead, typeStyles.heading].join(" ")} data-reveal>
          <Eyebrow icon={ClipboardList}>Privacy &amp; service information</Eyebrow>
          <h2 id="privacy-title">Understand how <span>your data is used.</span></h2>
          <p>Read how Crewzy handles account and workspace information, the terms for using the service, and the arrangements for customer-controlled data.</p>
        </div>
        <div className={[styles.trustNote, typeStyles.note, trust.assurance].join(" ")} data-reveal>
          <ScrollText size={17} aria-hidden="true" />
          <div>
            <p><strong>Information in one place.</strong> Our privacy and service pages explain the relevant scope, responsibilities and current provider information.</p>
            <nav className={trust.documentLinks} aria-label="Privacy and service documents">
              <Link href="/privacy">Privacy policy <ArrowRight size={15} aria-hidden="true" /></Link>
              <Link href="/terms">Terms and conditions <ArrowRight size={15} aria-hidden="true" /></Link>
              <Link href="/dpa">Data processing agreement <ArrowRight size={15} aria-hidden="true" /></Link>
              <Link href="/subprocessors">Service providers <ArrowRight size={15} aria-hidden="true" /></Link>
            </nav>
          </div>
        </div>
        <div className={[styles.trustNote, typeStyles.note, trust.assurance].join(" ")} data-reveal>
          <ShieldCheck size={17} aria-hidden="true" />
          <div>
            <p><strong>Compliance support with a clear scope.</strong> Crewzy tracks document dates and expiry and helps organise compliance evidence. It does not verify document authenticity or guarantee regulatory compliance.</p>
            <Link href="/contact">Discuss your security requirements <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className={`${styles.subCta} ${typeStyles.closing}`} data-reveal>
        <Eyebrow icon={Rocket} dark>Ready when you are</Eyebrow>
        <h2>Explore Crewzy <span>with your team.</span></h2>
        <p>Explore the connected workflows, or request a demo to discuss your team’s requirements.</p>
        <div>
          <Link href={appUrl("/signup")}>Set up free workspace <ArrowRight size={18} /></Link>
          <Link href={demoHref}>Request a demo</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
