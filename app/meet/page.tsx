import Image from "next/image";
import { SiteLink as Link } from "../site-link";
import { ArrowRight, Download, MessageCircleQuestion, Play, QrCode, ShieldCheck } from "lucide-react";
import { SiteHeader, SiteFooter } from "../site-shell";
import { SectionHeading } from "../section-heading";
import { Brand } from "../brand";
import { demoHref } from "../site-config";
import { createPageMetadata } from "../site-seo";
import { guideCategories, guideQuestions } from "../product-guide/content";
import { AskCrewzy } from "../product-guide/product-guide";
import { QuestionList } from "../product-guide/question-list";
import { meetupDisplayUrl, meetupPath, meetupUrl, qrPngPath, qrSvgPath } from "./config";
import s from "./meet.module.css";

export const metadata = createPageMetadata({
  title: "Meet Crewzy — Explore at Your Own Pace",
  description: "Discover Crewzy’s people, work and compliance tools. Take a product tour and get answers without sharing your email or phone number.",
  canonical: meetupPath,
});

export default function MeetupPage() {
  return <div className={s.page}>
    <Link className={s.skip} href="#main">Skip to content</Link>
    <SiteHeader />
    <main id="main">
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <p className={s.eyebrow}>Nice to meet you. Meet Crewzy.</p>
          <h1>Good to connect.<br /><span>Explore in your own time.</span></h1>
          <p className={s.intro}>Bring your people, everyday work and document renewals together in one workspace.</p>
          <p className={s.reassurance}><ShieldCheck size={18} aria-hidden="true" /> Browse freely. Share your details when you start a chat.</p>
          <div className={s.actions}>
            <Link className={s.primary} href="/#platform"><Play size={17} aria-hidden="true" /> Take the product tour</Link>
            <AskCrewzy className={s.secondary}><MessageCircleQuestion size={18} aria-hidden="true" /> Ask about Crewzy</AskCrewzy>
          </div>
          <Link className={s.textLink} href="/pricing">Explore plans and pricing <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <aside className={s.overview} aria-label="Crewzy at a glance">
          <Brand className={s.cardBrand} />
          <p className={s.cardCaption}>One workspace, connected around your people.</p>
          <ol>
            <li><span>01</span><div><h2>Your people</h2><p>Employee records, hiring, onboarding and offboarding.</p></div></li>
            <li><span>02</span><div><h2>The everyday work</h2><p>Projects, timesheets, leave, invoices and expenses.</p></div></li>
            <li><span>03</span><div><h2>What needs attention</h2><p>Document expiry, renewal reviews and activity history.</p></div></li>
          </ol>
          <Link href="/platform">Explore the connected platform <ArrowRight size={16} aria-hidden="true" /></Link>
        </aside>
      </section>

      <section className={s.trust} aria-labelledby="trust-heading">
        <div><ShieldCheck size={26} aria-hidden="true" /><h2 id="trust-heading">Your data. <span>Clear answers.</span></h2></div>
        <p>Understand who can access customer data, where it is stored and how Crewzy describes its security controls.</p>
        <AskCrewzy category="trust" className={s.textLink}>Ask about data &amp; security <ArrowRight size={16} aria-hidden="true" /></AskCrewzy>
        <Link className={s.textLink} href="/resources#security">Read Security &amp; trust <ArrowRight size={16} aria-hidden="true" /></Link>
      </section>

      <section className={s.faq} id="questions" aria-labelledby="questions-heading">
        <SectionHeading label="A little more clarity" title="Good questions." emphasis="Straight answers."
          description="Read our answers here without sharing your details. Start a chat for a follow-up from our team." id="questions-heading" />
        <div>{guideCategories.map(category => <section key={category.id} className={s.questionGroup} aria-labelledby={`meet-${category.id}`}>
          <h3 id={`meet-${category.id}`}>{category.label}</h3>
          <QuestionList questions={guideQuestions.filter(item => item.category === category.id)} />
        </section>)}</div>
      </section>

      <section className={s.share} id="share" aria-labelledby="share-heading">
        <div className={s.shareCopy}>
          <p className={s.eyebrow}><QrCode size={17} aria-hidden="true" /> Keep the conversation going</p>
          <h2 id="share-heading">A quick scan.<br /><span>A little more Crewzy.</span></h2>
          <p>Show this code to someone you meet, or put it on a business card or presentation. It opens this page directly, without asking for their contact details.</p>
          <div className={s.actions}>
            <Link className={s.secondary} href={qrPngPath} download="crewzy-meet.png"><Download size={17} aria-hidden="true" /> Download PNG</Link>
            <Link className={s.secondary} href={qrSvgPath} download="crewzy-meet.svg"><Download size={17} aria-hidden="true" /> Download SVG</Link>
          </div>
          <p className={s.small}>PNG for sharing. SVG for sharp printing at any size. Keep the white border around the code.</p>
        </div>
        <figure className={s.qrCard}>
          <Brand className={s.qrBrand} />
          <Image src={qrSvgPath} alt={`Scan to open ${meetupDisplayUrl}`} width={232} height={232} unoptimized />
          <figcaption><Link href={meetupUrl}>{meetupDisplayUrl}</Link><span>Explore. No contact details needed.</span></figcaption>
        </figure>
      </section>

      <section className={s.next}>
        <h2>A conversation, <span>when you’re ready.</span></h2>
        <p>Keep exploring, or choose to contact us for a walkthrough of your team’s needs.</p>
        <Link className={s.primary} href={demoHref}>Request a demo — optional <ArrowRight size={17} aria-hidden="true" /></Link>
        <p className={s.small}>Starting a chat sends your name and email for a Crewzy follow-up. Your question choices stay in the page. <Link href="/privacy#contact">How we use your details.</Link></p>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
