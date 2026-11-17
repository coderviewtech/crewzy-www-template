import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "../../site-shell";
import { appUrl, demoHref } from "../../site-config";
import { createPageMetadata } from "../../site-seo";
import { featureRoutes, featurePath, findFeature, guideRoutes, guidePath } from "../../site-routes";
import { featureContent } from "../../feature-content";
import { Breadcrumbs } from "../../breadcrumbs";
import base from "../../preview.module.css";
import s from "../../secondary-page.module.css";
import typography from "../../content-typography.module.css";
import detail from "./feature.module.css";

type Props = { params: Promise<{ feature: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return featureRoutes.map(({ slug }) => ({ feature: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const feature = findFeature((await params).feature);
  if (!feature) notFound();
  return createPageMetadata({ ...feature, canonical: featurePath(feature.slug) });
}

export default async function FeaturePage({ params }: Props) {
  const feature = findFeature((await params).feature);
  if (!feature) notFound();
  const content = featureContent[feature.slug];
  const guide = guideRoutes.find(item => item.feature === feature.slug);
  const breadcrumbs = [
    { name: "Crewzy", path: "/" },
    { name: "Platform", path: "/platform" },
    { name: feature.label, path: featurePath(feature.slug) },
  ];

  return <div className={`${base.preview} ${s.page} ${typography.page} ${detail.page}`}>
    <a className={base.skipLink} href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main">
      <section className={s.hero}><div className={`${s.heroInner} ${typography.hero}`}>
        <Breadcrumbs items={breadcrumbs} className={detail.breadcrumb} />
        <h1>{content.heading}</h1>
        <p>{content.introduction}</p>
        <div className={s.actions}>
          <a className={s.button} href={appUrl("/signup")}>Start free <ArrowRight size={17} aria-hidden="true" /></a>
          <a className={`${s.textLink} ${typography.link}`} href={demoHref}>Request a demo <ArrowRight size={16} aria-hidden="true" /></a>
          <a className={`${s.textLink} ${typography.link}`} href="/pricing">Compare plans</a>
        </div>
      </div></section>
      <div className={s.content}>
        <div className={detail.overview}>
          {content.sections.map(section => <section className={typography.detail} key={section.title}>
            <h2>{section.title}</h2><p>{section.text}</p>
          </section>)}
        </div>
        <section className={`${detail.workflow} ${typography.heading}`} aria-labelledby="workflow-title">
          <h2 id="workflow-title">{content.workflowTitle}</h2>
          <ol>{content.steps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        </section>
        <section className={`${detail.faq} ${typography.heading}`} aria-labelledby="questions-title">
          <h2 id="questions-title">Questions about {feature.label.toLowerCase()}</h2>
          {content.questions.map(item => <details key={item.question}>
            <summary>{item.question}</summary><p>{item.answer}</p>
          </details>)}
        </section>
        <aside className={detail.fit}><h2>Check the fit for your team</h2><p>{content.fit}</p>
          <a href="/resources#security">Read about security, privacy and current limitations</a>
          {guide && <p><Link href={guidePath(guide.slug)}>Practical guide: {guide.title}</Link></p>}
        </aside>
        <nav className={detail.related} aria-label="Related workflows"><h2>Explore connected workflows</h2><ul>
          {featureRoutes.filter(item => item.slug !== feature.slug).map(item => <li key={item.slug}>
            <a href={featurePath(item.slug)}>{item.label} <ArrowRight size={16} aria-hidden="true" /></a>
          </li>)}
          <li><Link href="/platform">View the full platform <ArrowRight size={16} aria-hidden="true" /></Link></li>
        </ul></nav>
      </div>
    </main>
    <SiteFooter />
  </div>;
}
