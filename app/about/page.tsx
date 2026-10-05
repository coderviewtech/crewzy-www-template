import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "../site-shell";
import { company, founder } from "../company";
import { createPageMetadata } from "../site-seo";
import { WorkspaceIllustration } from "./workspace-illustration";
import base from "../landing.module.css";
import secondary from "../secondary-page.module.css";
import typography from "../content-typography.module.css";
import s from "./about.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "About Crewzy, Our Story & Founder",
  description: "How tracking passport expiries, contractor renewals and overtime in spreadsheets inspired Manohar Nunna to build Crewzy for small and medium-sized businesses.",
  canonical: "/about",
});

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
            <p>Crewzy began with a practical question: how could small and medium-sized businesses manage essential people tasks without relying on scattered spreadsheets and separate subscriptions?</p>
            <div className={secondary.actions}>
              <a className={secondary.textLink} href="#story">How it started <ArrowRight size={16} aria-hidden="true" /></a>
              <a className={secondary.textLink} href="#founder">Meet the founder <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <div className={s.content}>
          <section className={s.storySection} id="story" aria-labelledby="story-heading">
            <div className={`${s.sectionIntro} ${typography.heading}`}>
              <span className={`${secondary.eyebrow} ${typography.label}`}>From problem to platform</span>
              <h2 id="story-heading">How Crewzy<br /><span>took shape.</span></h2>
              <WorkspaceIllustration />
            </div>
            <div className={s.storyCopy}>
              <ol className={s.storySteps}>
                <li>
                  <h3>The challenge</h3>
                  <p>While working at a small company, Manohar saw passport expiry dates and contractor renewal dates managed in separate spreadsheets. Overtime hours were sometimes tracked that way too. Essential people administration depended on keeping those records up to date.</p>
                </li>
                <li>
                  <h3>The opportunity</h3>
                  <p>For small and medium-sized businesses, the answer wasn’t another subscription for a single task. It was a connected workspace that could bring essential employee and HR administration together.</p>
                </li>
                <li>
                  <h3>That became Crewzy</h3>
                  <p>Crewzy took shape around that idea: bring employee information and day-to-day workflows into one place, helping teams spend less time on manual administration and find the information they need more easily.</p>
                </li>
              </ol>
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
