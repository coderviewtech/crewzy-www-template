"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  Briefcase,
  Check,
  Landmark,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import styles from "../landing.module.css";
import { appUrl, Eyebrow, Footer, Header, useScrollMotion } from "../chrome";

/* No logos, quotes or case studies here until they are real ones from real
   customers. An early-access page that says what it is beats a customers page
   with invented references — the first prospect who checks decides everything. */

const PARTNER_GETS = [
  {
    icon: Wrench,
    title: "The roadmap follows your workflow",
    text: "You are early enough that what you need shapes what gets built next, rather than joining a queue behind a thousand other requests.",
  },
  {
    icon: MessagesSquare,
    title: "A direct line, not a ticket queue",
    text: "You talk to the people building it. Problems get answered the same day rather than routed through a support tier.",
  },
  {
    icon: Users,
    title: "Migration done with you",
    text: "We help move your employee records, documents and open projects across, so you are not the one exporting spreadsheets at the weekend.",
  },
  {
    icon: ShieldCheck,
    title: "Pricing fixed while you grow",
    text: "Early partners keep their terms as the platform and the team expand.",
  },
];

const FIT = [
  { icon: Briefcase, label: "Agencies", text: "10–200 people, billing clients for delivered work" },
  { icon: Landmark, label: "Consultancies", text: "Utilisation and project margin decide your year" },
  { icon: ShieldCheck, label: "Insurance teams", text: "Licences and certifications gate who can work" },
];

export default function CustomersPage() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollMotion(pageRef, styles.revealed, styles.motionReady);

  return (
    <main className={styles.page} ref={pageRef}>
      <Header />

      <section className={styles.subHero}>
        <div className={styles.subHeroInner} data-reveal>
          <Eyebrow icon={Sparkles}>Early access</Eyebrow>
          <h1>We are picking our <span>first customers carefully.</span></h1>
          <p>Crewzy is live and in use, and we are onboarding a small group of design partners rather than opening the doors to everyone at once. That way the platform gets shaped by companies actually running on it.</p>
          <div className={styles.subHeroActions}>
            <Link href="mailto:sales@crewzy.io?subject=Design%20partner%20enquiry">Apply as a design partner <ArrowRight size={18} /></Link>
            <Link href={appUrl("/signup")}>Or just start free</Link>
          </div>
          <small className={styles.subHeroNote}>No case studies here yet — we would rather show you none than show you invented ones. Ask us and we will introduce you to a team already using it.</small>
        </div>
      </section>

      <section className={styles.subSection}>
        <div className={styles.subSectionHead} data-reveal>
          <Eyebrow icon={Wrench}>What a design partner gets</Eyebrow>
          <h2>Early is only worth it if <span>you get something for it.</span></h2>
        </div>
        <div className={styles.subCards}>
          {PARTNER_GETS.map(({ icon: ItemIcon, title, text }, index) => (
            <article key={title} data-reveal data-reveal-delay={String((index % 2) + 1)} data-scroll-zoom="card">
              <span><ItemIcon size={19} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.subSection}>
        <div className={styles.subSectionHead} data-reveal>
          <Eyebrow icon={Users}>Who it suits</Eyebrow>
          <h2>Companies running day to day on <span>too many tools.</span></h2>
          <p>If you employ people, track their time and bill for their work, the fit is usually obvious within one conversation.</p>
        </div>
        <div className={styles.subFit} data-reveal>
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
        <div className={styles.subSectionHead} data-reveal>
          <Eyebrow icon={Check}>How it works</Eyebrow>
          <h2>Four steps, and you can stop <span>at any of them.</span></h2>
        </div>
        <ol className={styles.subSteps} data-reveal>
          <li><strong>A short call</strong><span>Twenty minutes on what you run today and where it hurts. If Crewzy is not the answer, we will say so.</span></li>
          <li><strong>A workspace with your data</strong><span>We set up a workspace with your people and projects in it, so you are judging your own operation rather than a demo.</span></li>
          <li><strong>One team, one month</strong><span>Run a single team on it for a month. Real timesheets, real approvals, real invoices.</span></li>
          <li><strong>Roll out, or walk away</strong><span>If it works, we help move the rest across. If it does not, you keep your data and we part on good terms.</span></li>
        </ol>
      </section>

      <section className={styles.subCta} data-reveal>
        <Eyebrow icon={Sparkles} dark>Ready when you are</Eyebrow>
        <h2>Tell us what you are running <span>on today.</span></h2>
        <p>That one answer tells us most of what we need to know about whether this is worth your time.</p>
        <div>
          <Link href="mailto:sales@crewzy.io?subject=Design%20partner%20enquiry">Apply as a design partner <ArrowRight size={18} /></Link>
          <Link href={"/#features"}>See the platform first</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
