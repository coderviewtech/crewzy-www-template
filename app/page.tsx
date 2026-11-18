"use client";

import { SiteLink } from "./site-link";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRight, BrainCircuit, BriefcaseBusiness, CheckCheck, FileText, Plus, ShieldCheck, UsersRound } from "lucide-react";
import previewStyles from "./preview.module.css";
import connectionStyles from "./connections.module.css";
import narrativeStyles from "./narrative.module.css";
import editorial from "./editorial.module.css";
import { ComplianceWorkspace } from "./compliance-workspace";
import { ProductShowcase } from "./product-showcase";
import { PlatformExplorer } from "./platform-tour";
import { usePreviewMotion } from "./use-preview-motion";
import { HeroHeadline } from "./hero-headline";
import { SectionHeading } from "./section-heading";
import { ConnectedWorkspace } from "./connected-workspace";
import { SiteHeader, SiteFooter } from "./site-shell";
import { appUrl, demoHref } from "./site-config";
import { homeQuestions as faqs } from "./product-guide/content";

const styles = { ...previewStyles, ...connectionStyles };


export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [activeModule, setActiveModule] = useState(0);
  const [storyStep, setStoryStep] = useState(0);
  const navigateStep = useRef<((index: number) => void) | null>(null);
  const navigateModule = useRef<((index: number, immediate?: boolean) => void) | null>(null);
  usePreviewMotion(root, setStoryStep, navigateStep, setActiveModule, navigateModule);
  const selectModule = (index: number) => {
    if (navigateModule.current) { navigateModule.current(index); return true; }
    setActiveModule(index);
    return false;
  };
  return <div className={`${styles.preview} ${editorial.page}`} ref={root}>
    <div className={styles.pageProgress} data-page-progress aria-hidden="true" />
    <SiteLink className={styles.skipLink} href="#main">Skip to content</SiteLink>
    <SiteHeader />
    <main id="main">
      <section className={`${styles.hero} ${editorial.hero}`} id="top"><div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroContent}>
          <HeroHeadline className={editorial.heroTitle}>A clearer way to run<br /><span>your people and work.</span></HeroHeadline>
          <p className={`${styles.heroDescription} ${editorial.heroDescription}`} data-hero-enter>People management and employee lifecycle workflows.<br className={styles.desktopBreak} /> Everyday work, document expiry tracking and compliance evidence.</p>
          <div className={`${styles.heroActions} ${editorial.heroActions}`} data-hero-enter><SiteLink href={appUrl("/signup")} className={`${styles.button} ${styles.largeButton}`}>Start free for up to 10 employees <ArrowRight size={18} /></SiteLink><SiteLink href={demoHref} className={styles.textButton}>Request a demo <ArrowRight size={17} /></SiteLink></div>
          <ul className={styles.benefitHighlights} aria-label="Workspace highlights" data-hero-enter>
            <li><span className={`${styles.iconTile} ${styles.smallIcon} ${styles.blue}`}><UsersRound size={19} /></span><strong>One employee record</strong></li>
            <li><span className={`${styles.iconTile} ${styles.smallIcon} ${styles.violet}`}><CheckCheck size={19} /></span><strong>Connected workflows</strong></li>
            <li><span className={`${styles.iconTile} ${styles.smallIcon} ${styles.green}`}><ShieldCheck size={19} /></span><strong>Compliance evidence</strong></li>
          </ul>
        </div>
        <ProductShowcase />
      </section>
      <ConnectedWorkspace />
      <section className={editorial.platformSection} id="platform" aria-labelledby="platform-title">
        <div className={editorial.platformStory} data-module-story>
          <header className={`${styles.section} ${editorial.platformIntro}`} data-module-intro><SectionHeading label="Built to work together" title="Less switching tabs." emphasis="More moving forward." description="Bring the work around your people into one place, with context that stays connected from one team to the next." id="platform-title" /></header>
          <PlatformExplorer active={activeModule} onSelect={selectModule} />
        </div>
      </section>
      <ComplianceWorkspace step={storyStep} onStep={index => { if (navigateStep.current) navigateStep.current(index); else setStoryStep(index); }} />
      <section className={`${styles.section} ${styles.teamSection} ${narrativeStyles.zigTeam} ${editorial.teamSection}`} id="teams" data-zoom-section>
        <div className={`${styles.teamPhoto} ${editorial.teamPhoto}`}><Image src="/images/crewzy-team-editorial-4k.png" alt="Illustrative scene of three colleagues reviewing creative work in a sunlit studio" width={3840} height={2160} quality={90} sizes="(max-width: 420px) 680px, (max-width: 760px) 850px, 900px" data-scroll-zoom="image" /><div className={`${styles.photoCaption} ${editorial.photoCaption}`}><UsersRound size={19} /><span>Built around people.<br /><strong>Not around paperwork.</strong></span></div></div>
        <div className={styles.teamCopy} data-reveal>
          <SectionHeading label="For people-driven businesses" title="Big plans." emphasis="A little less busywork." description="When your people are your business, disconnected tools get in the way. Crewzy brings the everyday work together, so your team can focus on what comes next." />
          <ul className={editorial.audienceList}>
            <li><BriefcaseBusiness size={18} /><span>Agencies & consultancies</span></li>
            <li><ShieldCheck size={18} /><span>Document-led businesses</span></li>
            <li><UsersRound size={18} /><span>Growing teams</span></li>
          </ul>
          <SiteLink href="/solutions" className={`${styles.textButton} ${editorial.sectionLink}`}>Find the right fit for your team <ArrowRight size={17} /></SiteLink>
        </div>
      </section>
      <section className={`${styles.aiSection} ${narrativeStyles.zigAI} ${editorial.aiSection}`} id="crewzy-ai" data-reveal data-zoom-section>
        <SectionHeading label="Meet Crewzy AI" title="Less digging." emphasis="Better-informed decisions." description="Ask questions about your workspace. Get source-linked answers from the information you’re authorised to access, with human review where it matters." />
        <div className={`${styles.aiExample} ${editorial.aiExample}`} data-scroll-zoom="frame"><div className={editorial.assistantHeader}><BrainCircuit size={19} /><strong>Crewzy AI</strong><span>Workspace assistant</span></div><div className={styles.aiQuestion}>Which documents need my attention?</div><div className={styles.aiAnswer}><BrainCircuit size={21} /><div><strong>Three document reviews need attention.</strong><p>Start with Daniel’s professional certificate, which expires in 14 days. Amelia’s insurance document and Sophie’s training certificate are also coming up for renewal.</p><div className={styles.sourceChip}><FileText size={14} /> Source: document records</div></div></div><small>Illustrative response · Review source records before acting</small></div>
      </section>
      <section className={`${styles.section} ${styles.faqSection}`} id="questions">
        <div data-reveal><SectionHeading label="A little more clarity" title="Good questions." emphasis="Straight answers." description="Still wondering if Crewzy fits?" /><SiteLink className={editorial.sectionLink} href="/contact">We’re happy to talk. <ArrowRight size={15} /></SiteLink></div>
        <div className={styles.faqList} data-reveal>{faqs.map(item => <details key={item.question}><summary>{item.question}<Plus size={19} /></summary><p>{item.answer}</p></details>)}</div>
      </section>
      <section className={`${styles.closingSection} ${editorial.closingSection}`} data-reveal><SectionHeading label="One workspace. A clearer day." title="Make room for" emphasis="your next chapter." description="People, work and compliance. Connected." /><div className={editorial.closingActions}><SiteLink className={`${styles.button} ${styles.largeButton}`} href={appUrl("/signup")}>Start free for up to 10 employees <ArrowRight size={18} /></SiteLink><SiteLink className={styles.closingSecondary} href={demoHref}>Request a demo <ArrowRight size={14} /></SiteLink></div></section>
    </main>
    <SiteFooter />
  </div>;
}
