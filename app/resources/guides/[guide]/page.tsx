import { SiteLink as Link } from "../../../site-link";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "../../../site-shell";
import { Breadcrumbs } from "../../../breadcrumbs";
import { StructuredData } from "../../../structured-data";
import { createPageMetadata, siteUrl } from "../../../site-seo";
import { appUrl, demoHref } from "../../../site-config";
import { guideRoutes, guidePath, guidesPath, findGuide, featurePath } from "../../../site-routes";
import { guideContent, guideAuthor, guideUpdated, guideUpdatedLabel, type GuideSection } from "../../../guide-content";
import { company } from "../../../company";
import base from "../../../preview.module.css";
import page from "../../../secondary-page.module.css";
import styles from "../guide.module.css";

type Props = { params: Promise<{ guide: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => guideRoutes.map(({ slug }) => ({ guide: slug }));

export async function generateMetadata({ params }: Props) {
  const guide = findGuide((await params).guide);
  if (!guide) notFound();
  const metadata = createPageMetadata({ ...guide, canonical: guidePath(guide.slug) });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article" as const, modifiedTime: guideUpdated } };
}

function ArticleSection({ section }: { section: GuideSection }) {
  return <section id={section.id}>
    <h2>{section.title}</h2>
    {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    {section.table && <div className={styles.tableScroll} role="region" aria-label={section.table.caption} tabIndex={0}>
      <table><caption>{section.table.caption}</caption>
        <thead><tr>{section.table.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead>
        <tbody>{section.table.rows.map(([label, ...cells]) => <tr key={label}>
          <th scope="row">{label}</th>{cells.map(cell => <td key={cell}>{cell}</td>)}
        </tr>)}</tbody>
      </table>
    </div>}
    {section.checklist && <ul className={styles.checklist}>{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}
  </section>;
}

export default async function GuidePage({ params }: Props) {
  const guide = findGuide((await params).guide);
  if (!guide) notFound();
  const content = guideContent[guide.slug];
  const canonical = new URL(guidePath(guide.slug), siteUrl).href;
  const schema = {
    "@context": "https://schema.org", "@type": "Article", "@id": `${canonical}#article`,
    headline: guide.title, description: guide.description, mainEntityOfPage: canonical,
    inLanguage: "en-GB", dateModified: guideUpdated,
    author: { "@type": "Organization", name: guideAuthor.name, url: new URL(guideAuthor.href, siteUrl).href },
    publisher: { "@type": "Organization", name: company.legalName, url: siteUrl },
  };
  return <div className={`${base.preview} ${page.page} ${styles.page}`}>
    <Link href="#main" className={base.skipLink}>Skip to content</Link>
    <SiteHeader />
    <main id="main">
      <section className={page.hero}><div className={page.heroInner}>
        <Breadcrumbs className={styles.breadcrumb} items={[{ name: "Crewzy", path: "/" }, { name: "Resources", path: "/resources" }, { name: "Guides", path: guidesPath }, { name: guide.title, path: guidePath(guide.slug) }]} />
        <h1>{guide.title}</h1><p>{content.introduction}</p>
        <div className={styles.byline}><span>By <Link href={guideAuthor.href}>{guideAuthor.name}</Link></span><span>Updated <time dateTime={guideUpdated}>{guideUpdatedLabel}</time></span></div>
      </div></section>
      <div className={`${page.content} ${styles.layout}`}>
        <article className={styles.article} aria-label={guide.title}>
          <div className={styles.takeaway}><h2>The starting point</h2><p>{content.takeaway}</p></div>
          {content.sections.map(section => <ArticleSection key={section.id} section={section} />)}
          <section className={styles.cta} id="crewzy-workflow"><h2>Explore this workflow in Crewzy</h2><p>{content.crewzy}</p>
            <div className={styles.ctaLinks}><Link href={featurePath(guide.feature)}>Explore the product workflow</Link><Link href={appUrl("/signup")}>Start free</Link><Link href={demoHref}>Request a demo</Link></div>
          </section>
          <section className={styles.sources} id="sources"><h2>Further reading</h2>
            <ul>{content.sources.map(source => <li key={source.href}><Link href={source.href}>{source.label}</Link></li>)}</ul>
            <p className={styles.editorialNote}>Prepared by Crewzy. Worked examples are illustrative and do not describe customers or guarantee an outcome. Check current official guidance and your own requirements before applying them.</p>
            <div className={styles.ctaLinks}><Link href={guidesPath}>Browse all guides</Link><Link href="/pricing">Compare Crewzy plans</Link></div>
          </section>
        </article>
        <nav className={styles.toc} aria-label="On this page"><h2>In this guide</h2><ol>
          {content.sections.map(section => <li key={section.id}><Link href={`#${section.id}`}>{section.title.replace(/^\d+\. /, "")}</Link></li>)}
        </ol></nav>
      </div>
    </main>
    <StructuredData value={schema} />
    <SiteFooter />
  </div>;
}
