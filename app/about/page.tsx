import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "../site-shell";
import { company, founder } from "../company";
import { WorkspaceIllustration } from "./workspace-illustration";
import base from "../landing.module.css";
import secondary from "../secondary-page.module.css";
import typography from "../content-typography.module.css";
import s from "./about.module.css";

export const metadata: Metadata = {
  title: "Our story and the founder behind Crewzy",
  description: "How tracking passport expiries, contractor renewals and overtime in spreadsheets inspired Manohar Nunna to build Crewzy for small and medium-sized businesses.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "Crewzy: it started with spreadsheets",
    description: "The small-company experience that inspired Crewzy, and the founder who decided to build it.",
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <div className={`${base.page} ${secondary.page} ${typography.page}`}>
      <a className={s.skipLink} href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <section className={secondary.hero}>
          <div className={`${secondary.heroInner} ${typography.hero}`}>
            <span className={`${secondary.eyebrow} ${typography.label}`}>About Crewzy</span>
            <h1>It started with<br /><span>spreadsheets.</span></h1>
            <p>Before Crewzy was a platform, it was an idea that kept coming back during Manohar’s time at a small company.</p>
            <div className={secondary.actions}>
              <a className={secondary.textLink} href="#story">How it started <ArrowRight size={16} aria-hidden="true" /></a>
              <a className={secondary.textLink} href="#founder">Meet the founder <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <div className={s.content}>
          <section className={s.storySection} id="story" aria-labelledby="story-heading">
            <div className={`${s.sectionIntro} ${typography.heading}`}>
              <span className={`${secondary.eyebrow} ${typography.label}`}>How Crewzy started</span>
              <h2 id="story-heading">The problem<br /><span>behind the idea.</span></h2>
              <WorkspaceIllustration />
            </div>
            <div className={s.storyCopy}>
              <p>While working at a small company, Manohar noticed that passport expiry dates and contractor renewal dates were tracked in spreadsheets. Overtime hours were sometimes recorded that way too.</p>
              <p>It made him think about what small and medium-sized businesses really needed: one place to manage these everyday tasks, without paying for several separate tools that each did only one job.</p>
              <p>That became the starting point for Crewzy. He set out to bring the essential, time-saving tasks for employees and HR teams into a single platform, with less manual administration and the information they need at their fingertips.</p>
            </div>
          </section>

          <section className={s.founderSection} id="founder" aria-labelledby="founder-heading">
            <div className={`${s.sectionIntro} ${typography.heading}`}>
              <span className={`${secondary.eyebrow} ${typography.label}`}>Meet the founder</span>
              <h2 id="founder-heading">A problem-solver.<br /><span>A product builder.</span></h2>
            </div>
            <article className={s.founderProfile}>
              <div className={s.founderIdentity}>
                <span className={s.monogram} aria-hidden="true">MN</span>
                <div><h3>{founder.name}</h3><p>{founder.role}</p></div>
              </div>
              <p>Manohar looks for real-world problems and builds practical solutions to them. His experience spans creating products and solutions for organisations ranging from small businesses to enterprises.</p>
              <p>With a decade of experience in DevOps, DevSecOps and platform engineering, he brings a build-and-operate perspective to that work: developing applications, deploying them and running them with security, reliability and scale in mind.</p>
              <a className={secondary.textLink} href={founder.linkedInUrl} target="_blank" rel="noopener noreferrer">Connect with Manohar on LinkedIn <ArrowUpRight size={16} aria-hidden="true" /><span className={s.srOnly}> (opens in a new tab)</span></a>
            </article>
          </section>

          <section className={s.companySection} id="company" aria-labelledby="company-heading">
            <div className={`${s.sectionIntro} ${typography.heading}`}>
              <span className={`${secondary.eyebrow} ${typography.label}`}>The company</span>
              <h2 id="company-heading">Built by <span>{company.displayName}.</span></h2>
            </div>
            <div className={s.companyCopy}>
              <p>Crewzy is developed by {company.legalName}, a technology company registered in {company.jurisdiction}. Manohar is a director of the company, which works in IT consultancy and technology services.</p>
              <a className={secondary.textLink} href={company.companiesHouseUrl} target="_blank" rel="noopener noreferrer">View Companies House record <ArrowUpRight size={16} aria-hidden="true" /><span className={s.srOnly}> (opens in a new tab)</span></a>
            </div>
          </section>

          <section className={`${s.contactSection} ${typography.heading}`} aria-labelledby="about-contact-heading">
            <div><h2 id="about-contact-heading">Have a similar <span>story?</span></h2><p>Tell us which everyday tasks you’d like to make easier for your team.</p></div>
            <a className={secondary.button} href="/contact">Talk to us <ArrowRight size={17} aria-hidden="true" /></a>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
