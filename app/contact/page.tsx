import { ArrowRight, Mail } from "lucide-react";
import { SiteHeader, SiteFooter } from "../site-shell";
import { appUrl, demoEmailHref, salesEmail, supportEmail } from "../site-config";
import { company } from "../company";
import base from "../landing.module.css";
import s from "../secondary-page.module.css";
import typeStyles from "../content-typography.module.css";

export default function ContactPage() {
  return <div className={`${base.page} ${s.page} ${typeStyles.page}`}><SiteHeader /><main>
    <section className={s.hero}><div className={`${s.heroInner} ${typeStyles.hero}`}>
      <span className={`${s.eyebrow} ${typeStyles.label}`}>Contact Crewzy</span>
      <h1>Let’s talk about<br /><span>your team.</span></h1>
      <p>Explore people management, employee lifecycle workflows and compliance evidence in a guided Crewzy walkthrough.</p>
    </div></section>
    <section className={s.content} aria-label="Get in touch"><div className={s.contactGrid}>
      <article className={`${s.contactCard} ${typeStyles.detail}`} id="demo"><span className={s.moduleIcon}><Mail size={23} /></span><h2>See Crewzy with your workflows in mind.</h2>
        <p>Start with a walkthrough using sample data. Tell us which parts of your day you’d like to connect.</p>
        <ol><li><span>1</span>Share your team size and the tools you use today.</li><li><span>2</span>Choose your priorities: onboarding, document renewals, approvals or compliance evidence.</li><li><span>3</span>Email us to discuss a walkthrough and the right next steps.</li></ol>
        <a className={s.button} href={demoEmailHref}>Email to request a demo <ArrowRight size={17} /></a>
        <small>Opens your email app. You can also write directly to <a href={`mailto:${salesEmail}`}><strong>{salesEmail}</strong></a>.</small>
      </article>
      <div className={`${s.contactOptions} ${typeStyles.detail}`}>
        <article className={s.contactOption}><h2>Have a question?</h2><p>Ask about the platform, your team’s requirements or getting started.</p><a className={`${s.textLink} ${typeStyles.link}`} href={`mailto:${salesEmail}`}><strong>{salesEmail}</strong><ArrowRight size={16} /></a></article>
        <article className={s.contactOption}><h2>Already using Crewzy?</h2><p>Contact support about your existing workspace. Please don’t include passwords or employee documents in your message.</p><a className={`${s.textLink} ${typeStyles.link}`} href={`mailto:${supportEmail}`}>{supportEmail}<ArrowRight size={16} /></a></article>
        <article className={s.contactOption}><h2>Prefer to explore first?</h2><p>Start free for up to 10 employees, or take a look at the interactive platform preview.</p><div className={s.actions}><a className={`${s.textLink} ${typeStyles.link}`} href={appUrl("/signup")}>Create a workspace <ArrowRight size={16} /></a><a className={`${s.textLink} ${typeStyles.link}`} href="/platform">Explore the platform <ArrowRight size={16} /></a></div></article>
        <article className={s.contactOption}><h2>The company behind Crewzy</h2><p>Crewzy is developed by {company.legalName}, registered in {company.jurisdiction}. Company number {company.number}.</p><a className={`${s.textLink} ${typeStyles.link}`} href="/about#company">Meet the company <ArrowRight size={16} /></a></article>
      </div>
    </div></section>
  </main><SiteFooter /></div>;
}
