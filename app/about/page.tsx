import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "../site-shell";
import { company, founder } from "../company";
import { createPageMetadata } from "../site-seo";
import { WorkspaceIllustration } from "./workspace-illustration";
import { AboutHeroIllustration } from "./hero-illustration";
import base from "../landing.module.css";
import secondary from "../secondary-page.module.css";
import typography from "../content-typography.module.css";
import s from "./about.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "About Crewzy, Our Purpose, Story & Founder",
  description: "Discover Crewzy’s purpose: connecting people management, employee lifecycle workflows, everyday work and compliance evidence. Meet the founder and learn how Crewzy began.",
  canonical: "/about",
});

export default function AboutPage() {
  return (
    <div className={`${base.page} ${secondary.page} ${typography.page}`}>
      <a className={s.skipLink} href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <section className={`${secondary.hero} ${s.hero}`}>
          <div className={`${secondary.heroInner} ${s.heroLayout}`}>
            <div className={`${typography.hero} ${s.heroCopy}`}>
              <span className={`${secondary.eyebrow} ${typography.label}`}>About Crewzy</span>
              <h1>Built around people.<br /><span>Designed for<br />everyday work.</span></h1>
              <p>Crewzy brings people management, employee lifecycle workflows and everyday operations into one connected workspace. We help small and medium-sized businesses organise essential information, manage document expiry dates and keep compliance evidence in view.</p>
              <div className={secondary.actions}>
                <a className={secondary.textLink} href="#purpose">Our purpose <ArrowRight size={16} aria-hidden="true" /></a>
                <a className={secondary.textLink} href="#story">Our story <ArrowRight size={16} aria-hidden="true" /></a>
                <a className={secondary.textLink} href="#founder">Meet the founder <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <AboutHeroIllustration />
          </div>
        </section>

        <div className={s.content}>
          <section className={s.purposeSection} id="purpose" aria-labelledby="purpose-heading">
            <div className={s.purposeIntro}>
              <div className={`${s.sectionIntro} ${typography.heading}`}>
                <span className={`${secondary.eyebrow} ${typography.label}`}>Our purpose</span>
                <h2 id="purpose-heading">Make everyday work<br /><span>easier to manage.</span></h2>
              </div>
              <p>As a business grows, keeping records, requests and responsibilities aligned takes more effort. Our aim is to give teams a clearer view of the information behind their work, so they can spend less time piecing it together and more time acting on it.</p>
            </div>
            <ol className={s.principles}>
              <li><span className={s.principleNumber} aria-hidden="true">01</span><h3>People at the centre</h3><p>Keep employee information and lifecycle workflows together, from joining and onboarding through changes and leaving.</p></li>
              <li><span className={s.principleNumber} aria-hidden="true">02</span><h3>Work in context</h3><p>Connect requests, approvals, time, projects and financial records with the people and activity behind them.</p></li>
              <li><span className={s.principleNumber} aria-hidden="true">03</span><h3>Compliance in view</h3><p>Make document expiry dates, renewal activity and audit history easier to follow, while your team remains responsible for review and decisions.</p></li>
            </ol>
          </section>

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
                  <p>While working at a small company, Manohar saw passport expiry dates and contractor renewal dates managed in separate spreadsheets. Overtime hours were also tracked manually. Keeping essential records current meant checking information across different files.</p>
                </li>
                <li>
                  <h3>The opportunity</h3>
                  <p>Small and medium-sized businesses needed a practical way to connect these responsibilities. Bringing people management and employee lifecycle administration into a shared workspace could give teams a clearer view of what needed attention.</p>
                </li>
                <li>
                  <h3>That became Crewzy</h3>
                  <p>That experience shaped Crewzy: a workspace connecting employee information with everyday operations, document expiry tracking and compliance evidence. The focus is on useful context, clear responsibilities and a record of the actions taken.</p>
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
                <Image
                  className={s.founderPortrait}
                  src="/images/manohar-nunna.jpeg"
                  alt={`${founder.name}, founder of Crewzy`}
                  width={400}
                  height={400}
                  sizes="(max-width: 760px) 104px, 128px"
                />
                <div><h3>{founder.name}</h3><p>{founder.role}</p></div>
              </div>
              <p>Manohar Nunna builds practical products around everyday business challenges. His experience spans creating products and solutions for organisations ranging from small businesses to enterprises.</p>
              <p>With a decade of experience in DevOps, DevSecOps and platform engineering, he brings experience across the software lifecycle: developing applications, deploying them and operating them with security, reliability and scale in mind.</p>
              <a className={secondary.textLink} href={founder.linkedInUrl} target="_blank" rel="noopener noreferrer">Connect with Manohar on LinkedIn <ArrowUpRight size={16} aria-hidden="true" /><span className={s.srOnly}> (opens in a new tab)</span></a>
            </article>
          </section>

          <section className={s.companySection} id="company" aria-labelledby="company-heading">
            <div className={`${s.sectionIntro} ${typography.heading}`}>
              <span className={`${secondary.eyebrow} ${typography.label}`}>The company</span>
              <h2 id="company-heading">Built by <span>{company.displayName}.</span></h2>
            </div>
            <div className={s.companyCopy}>
              <p>Crewzy is a product developed by {company.legalName}, a technology company registered in {company.jurisdiction}. The company works in IT consultancy and technology services, with Manohar serving as a director.</p>
              <a className={secondary.textLink} href={company.companiesHouseUrl} target="_blank" rel="noopener noreferrer">View Companies House record <ArrowUpRight size={16} aria-hidden="true" /><span className={s.srOnly}> (opens in a new tab)</span></a>
            </div>
          </section>

          <section className={`${s.contactSection} ${typography.heading}`} aria-labelledby="about-contact-heading">
            <div><h2 id="about-contact-heading">Let’s talk about <span>your team.</span></h2><p>Explore how Crewzy could support your people, everyday work and compliance processes.</p></div>
            <a className={secondary.button} href="/contact">Talk to us <ArrowRight size={17} aria-hidden="true" /></a>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
