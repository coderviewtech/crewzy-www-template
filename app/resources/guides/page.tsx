import { SiteLink } from "../../site-link";
import { createPageMetadata } from "../../site-seo";
import { guidesPath } from "../../site-routes";
import { SiteHeader, SiteFooter } from "../../site-shell";
import { Breadcrumbs } from "../../breadcrumbs";
import { GuideCards } from "../../guide-cards";
import base from "../../preview.module.css";
import page from "../../secondary-page.module.css";
import styles from "./guide.module.css";

export const metadata = createPageMetadata({
  title: "Practical HR, Document & Timesheet Guides",
  description: "Practical guides for small teams: employee document renewals, timesheet-to-invoice workflows, HR spreadsheet migration and staff holiday approvals.",
  canonical: guidesPath,
});

export default function GuidesPage() {
  return <div className={`${base.preview} ${page.page} ${styles.page}`}>
    <SiteLink href="#main" className={base.skipLink}>Skip to content</SiteLink>
    <SiteHeader />
    <main id="main">
      <section className={page.hero}><div className={page.heroInner}>
        <Breadcrumbs className={styles.breadcrumb} items={[{ name: "Crewzy", path: "/" }, { name: "Resources", path: "/resources" }, { name: "Guides", path: guidesPath }]} />
        <h1>Practical guides for your team’s everyday work.</h1>
        <p>Checklists, worked examples and clear starting points for employee records, document renewals, timesheets and staff holiday requests.</p>
      </div></section>
      <div className={page.content}><GuideCards headingTag="h2" /></div>
    </main>
    <SiteFooter />
  </div>;
}
