import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "./site-shell";
import styles from "./legal-page.module.css";

type LegalPageProps = { title: string; summary: string; children: ReactNode; updatedOn?: { iso: string; label: string } };

export function LegalPage({ title, summary, children, updatedOn = { iso: "2026-10-21", label: "21 October 2026" } }: LegalPageProps) {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main id="main" className={styles.main}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Crewzy privacy &amp; trust</p>
          <h1>{title}</h1>
          <p className={styles.summary}>{summary}</p>
          <p className={styles.date}>Last updated <time dateTime={updatedOn.iso}>{updatedOn.label}</time></p>
          <nav className={styles.links} aria-label="Privacy and trust documents">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms and conditions</Link>
            <Link href="/dpa">Data processing</Link>
            <Link href="/subprocessors">Service providers</Link>
            <Link href="/resources#security">Security &amp; trust</Link>
          </nav>
        </header>
        <article className={styles.content}>{children}</article>
      </main>
      <SiteFooter />
    </div>
  );
}

/** Native tables remain readable with keyboard scrolling on small screens. */
export function LegalTable({ label, children }: { label: string; children: ReactNode }) {
  return <div className={styles.tableScroll} role="region" aria-label={label} tabIndex={0}>{children}</div>;
}
