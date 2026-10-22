"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  Briefcase,
  Check,
  DoorOpen,
  Landmark,
  MessagesSquare,
  Rocket,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import styles from "../landing.module.css";
import secondary from "../secondary-page.module.css";
import typeStyles from "../content-typography.module.css";
import { Eyebrow, Footer, Header, useScrollMotion } from "../chrome";
import { demoHref } from "../site-config";

const EXPLORE = [
  {
    icon: Users,
    title: "See the whole employee lifecycle",
    text: "Explore people management and employee lifecycle workflows, from onboarding through everyday changes to offboarding.",
  },
  {
    icon: Briefcase,
    title: "Connect everyday work",
    text: "Walk through projects, time, leave and approvals to see how shared context can support your team’s day.",
  },
  {
    icon: ShieldCheck,
    title: "Keep compliance evidence in view",
    text: "Explore document expiry tracking, reminders and activity records that help teams follow up and prepare evidence.",
  },
  {
    icon: MessagesSquare,
    title: "Help shape what comes next",
    text: "Share the workflows that matter to your team. Your feedback informs product decisions as Crewzy develops.",
  },
];

const FIT = [
  { icon: Briefcase, label: "Agencies", text: "Bring people, projects and client work into one conversation" },
  { icon: Landmark, label: "Consultancies", text: "Explore how employee workflows connect with time and delivery" },
  { icon: ShieldCheck, label: "Teams managing documents", text: "Keep document dates, follow-ups and compliance evidence together" },
];

export default function CustomersPage() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollMotion(pageRef, styles.revealed, styles.motionReady);

  return (
    <main className={`${styles.page} ${secondary.page} ${typeStyles.page}`} ref={pageRef}>
      <Header />

      <section className={styles.subHero}>
        <div className={`${styles.subHeroInner} ${typeStyles.hero}`} data-reveal>
          <Eyebrow icon={DoorOpen}>Early access</Eyebrow>
          <h1>Help shape a more <span>connected way to work.</span></h1>
          <p>Explore how Crewzy brings people management, employee lifecycle workflows and everyday work together with document expiry tracking and compliance evidence.</p>
          <div className={`${styles.subHeroActions} ${typeStyles.actions}`}>
            <Link href={demoHref}>Request a demo <ArrowRight size={18} /></Link>
            <Link href="/platform">Explore the platform</Link>
          </div>
          <small className={`${styles.subHeroNote} ${typeStyles.note}`}>Crewzy is in pre-launch development. Demos use sample data so you can explore the workflows before discussing a pilot.</small>
        </div>
      </section>

      <section className={styles.subSection}>
        <div className={`${styles.subSectionHead} ${typeStyles.heading}`} data-reveal>
          <Eyebrow icon={Wrench}>What to explore</Eyebrow>
          <h2>A clearer view of <span>how your team works.</span></h2>
          <p>Start with the workflows you manage today, then explore how they connect in Crewzy.</p>
        </div>
        <div className={`${styles.subCards} ${typeStyles.cards}`}>
          {EXPLORE.map(({ icon: ItemIcon, title, text }, index) => (
            <article key={title} data-reveal data-reveal-delay={String((index % 2) + 1)} data-scroll-zoom="card">
              <span><ItemIcon size={19} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.subSection}>
        <div className={`${styles.subSectionHead} ${typeStyles.heading}`} data-reveal>
          <Eyebrow icon={Users}>Who it suits</Eyebrow>
          <h2>Teams ready to connect <span>people and work.</span></h2>
          <p>If records, documents and day-to-day work are spread across separate tools, a walkthrough can help you assess the fit.</p>
        </div>
        <div className={`${styles.subFit} ${typeStyles.audience}`} data-reveal>
          {FIT.map(({ icon: FitIcon, label, text }) => (
            <div key={label}>
              <span><FitIcon size={18} /></span>
              <strong>{label}</strong>
              <small>{text}</small>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.subSection}>
        <div className={`${styles.subSectionHead} ${typeStyles.heading}`} data-reveal>
          <Eyebrow icon={Check}>Getting started</Eyebrow>
          <h2>Explore first. <span>Plan the next step together.</span></h2>
        </div>
        <ol className={`${styles.subSteps} ${typeStyles.steps}`} data-reveal>
          <li><strong>Discuss your workflow</strong><span>Tell us about your team, the tools you use and the work you want to simplify.</span></li>
          <li><strong>Explore with sample data</strong><span>Walk through relevant workflows in a demo and see how the information connects.</span></li>
          <li><strong>Review the fit</strong><span>Discuss current capabilities, your requirements and any gaps before deciding whether to continue.</span></li>
          <li><strong>Agree a pilot plan</strong><span>If there is a fit, agree the scope, access arrangements, privacy requirements and terms before introducing company or employee data.</span></li>
        </ol>
      </section>

      <section className={`${styles.subCta} ${typeStyles.closing}`} data-reveal>
        <Eyebrow icon={Rocket} dark>Start a conversation</Eyebrow>
        <h2>Bring your workflow. <span>See what connects.</span></h2>
        <p>Explore Crewzy with sample data and discuss what a more connected workspace could look like for your team.</p>
        <div>
          <Link href={demoHref}>Request a demo <ArrowRight size={18} /></Link>
          <Link href="/platform">Explore the platform</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
