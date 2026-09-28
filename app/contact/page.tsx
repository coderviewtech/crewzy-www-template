import { ArrowRight, Mail } from "lucide-react";
import { SiteHeader, SiteFooter } from "../site-shell";
import { appUrl, demoEmailHref, salesEmail, supportEmail } from "../site-config";
import base from "../landing.module.css";
import s from "../secondary-page.module.css";
import typeStyles from "../content-typography.module.css";

export default function ContactPage() {
  return <div className={`${base.page} ${s.page} ${typeStyles.page}`}><SiteHeader /><main>
    <section className={s.hero}><div className={`${s.heroInner} ${typeStyles.hero}`}>
      <span className={`${s.eyebrow} ${typeStyles.label}`}>Contact Crewzy</span>
      <h1>Let’s talk about<br /><span>your team.</span></h1>
      <p>See how Crewzy fits the way you work, ask a question, or get help with your workspace.</p>
    </div></section>
    <section className={s.content} aria-label="Get in touch"><div className={s.contactGrid}>
      <article className={`${s.contactCard} ${typeStyles.detail}`} id="demo"><span className={s.moduleIcon}><Mail size={23} /></span><h2>A demo shaped around your day.</h2>
        <p>Tell us a little about your team and what you’d like to explore. We’ll follow up by email to arrange a conversation.</p>
        <ol><li><span>1</span>Share your team size and the tools you use today.</li><li><span>2</span>Let us know which workflows you want to see.</li><li><span>3</span>We’ll arrange a time to walk through Crewzy together.</li></ol>
        <a className={s.button} href={demoEmailHref}>Email us to arrange a demo <ArrowRight size={17} /></a>
        <small>Opens your email app. You can also write directly to <a href={`mailto:${salesEmail}`}>{salesEmail}</a>.</small>
      </article>
      <div className={`${s.contactOptions} ${typeStyles.detail}`}>
        <article className={s.contactOption}><h2>Have a question?</h2><p>Ask about the platform, your team’s requirements or getting started.</p><a className={`${s.textLink} ${typeStyles.link}`} href={`mailto:${salesEmail}`}>{salesEmail}<ArrowRight size={16} /></a></article>
        <article className={s.contactOption}><h2>Already using Crewzy?</h2><p>Contact support about your existing workspace. Please don’t include passwords or employee documents in your message.</p><a className={`${s.textLink} ${typeStyles.link}`} href={`mailto:${supportEmail}`}>{supportEmail}<ArrowRight size={16} /></a></article>
        <article className={s.contactOption}><h2>Prefer to explore first?</h2><p>Start free for up to 10 employees, or take a look at the interactive platform preview.</p><div className={s.actions}><a className={`${s.textLink} ${typeStyles.link}`} href={appUrl("/signup")}>Create a workspace <ArrowRight size={16} /></a><a className={`${s.textLink} ${typeStyles.link}`} href="/platform">Explore the platform <ArrowRight size={16} /></a></div></article>
      </div>
    </div></section>
  </main><SiteFooter /></div>;
}
