"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowDown, ArrowRight, BrainCircuit, BriefcaseBusiness, CheckCheck, Clock3, FileText, Plus, ShieldCheck, UsersRound } from "lucide-react";
import previewStyles from "./preview.module.css";
import connectionStyles from "./connections.module.css";
import narrativeStyles from "./narrative.module.css";
import editorial from "./editorial.module.css";
import { ComplianceWorkspace } from "./compliance-workspace";
import { DashboardPreview } from "./dashboard-preview";
import { modules, IconTile, PlatformExplorer } from "./platform-tour";
import { usePreviewMotion } from "./use-preview-motion";
import { SectionHeading } from "./section-heading";
import { Brand } from "./brand";
import { SiteHeader, SiteFooter } from "./site-shell";
import { appUrl, demoHref, moduleHref } from "./site-config";

const styles = { ...previewStyles, ...connectionStyles };




const connectionPaths = [
  { desktop: "M200 53 H275 Q340 53 340 118 Q340 160 420 160", mobile: "M167 66 V83 Q167 113 197 113 H470 Q500 113 500 140", color: "var(--preview-brand-accent)" },
  { desktop: "M200 160 H420", mobile: "M500 66 V140", color: "#8960d7" },
  { desktop: "M200 267 H275 Q340 267 340 202 Q340 160 420 160", mobile: "M833 66 V83 Q833 113 803 113 H530 Q500 113 500 140", color: "#b37d18" },
  { desktop: "M800 53 H725 Q660 53 660 118 Q660 160 580 160", mobile: "M167 254 V237 Q167 207 197 207 H470 Q500 207 500 180", color: "#c75171" },
  { desktop: "M800 160 H580", mobile: "M500 254 V180", color: "#288d91" },
  { desktop: "M800 267 H725 Q660 267 660 202 Q660 160 580 160", mobile: "M833 254 V237 Q833 207 803 207 H530 Q500 207 500 180", color: "#258b64" },
];

function ConnectedWorkspace() {
  return (
    <section className={styles.connectionSection} aria-labelledby="connection-title" data-connection-section>
      <div className={styles.connectionCopy}>
        <SectionHeading label="The Crewzy workspace" title="One record." emphasis="Everyone connected." description="Your people, permissions and context flow across every module." id="connection-title" />
      </div>
      <div className={styles.connectionDiagram} data-connection-diagram>
        {(["desktop", "mobile"] as const).map(layout => (
          <svg key={layout} className={`${styles.connectionLines} ${layout === "desktop" ? styles.connectionDesktop : styles.connectionMobile}`} viewBox="0 0 1000 320" preserveAspectRatio="none" fill="none" aria-hidden="true" data-connection-links>
            {connectionPaths.map((path, index) => (
              <g key={index}>
                <path d={path[layout]} stroke="#e4ebf5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <path d={path[layout]} stroke={path.color} strokeWidth="1.6" strokeLinecap="round" strokeOpacity=".7" vectorEffect="non-scaling-stroke" pathLength="1" data-connection-line />
              </g>
            ))}
          </svg>
        ))}
        {modules.map((item, index) => (
          <a key={item.name} className={`${styles.connectionNode} ${styles[`connectionNode${index}`]}`} href={index === 5 ? "#compliance" : moduleHref(index)} data-connection-node data-connection-side={index < 3 ? "left" : "right"}>
            <IconTile index={index} small /><strong>{item.name}</strong><ArrowRight size={14} />
          </a>
        ))}
        <a href="#platform" className={styles.connectionHub} aria-label="Explore Crewzy’s connected platform">
          <div className={styles.connectionCore} data-connection-core>
            <Brand className={styles.brand} markClassName={styles.brandMark} />
            <strong>One employee record</strong>
            <span>Shared by every module</span>
            <span className={styles.connectionReady} data-connection-ready><CheckCheck size={14} /> Connected</span>
          </div>
        </a>
      </div>
    </section>
  );
}


const faqs = [
  { question: "What does Crewzy bring together?", answer: "Core HR, onboarding and offboarding, recruitment, time and projects, leave, documents and expiry, invoicing, expenses and Crewzy AI. These capabilities share the employee record, so you don’t need to keep reconnecting the same information." },
  { question: "How does Crewzy help with compliance?", answer: "Crewzy connects documents and expiry dates with review workflows, permissions and audit history. It helps you see what needs attention and retain evidence of activity. It supports your compliance processes; it is not a guarantee of regulatory compliance." },
  { question: "Does Crewzy run payroll or staff rotas?", answer: "Not yet. Crewzy covers HR, recruitment, time, projects, leave and financial administration, but it does not run a payroll cycle or build shift rotas today. Approved time and leave data can be exported for your payroll provider." },
  { question: "Can a small team start for free?", answer: "Yes. The free plan supports up to 10 employees with core records, documents, leave, basic projects, timesheets and audit history. No payment card is required." },
  { question: "What security controls are in place?", answer: "Company-scoped identity and role grants protect access. Sensitive approvals use maker-checker controls, and connected services record audit history. Crewzy is not currently SOC 2 or ISO 27001 certified. Talk to us if your team needs a detailed security review." },
];

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
    <a className={styles.skipLink} href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main">
      <section className={styles.hero} id="top"><div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1 data-hero-enter>A clearer way to run<br /><span>your people and work.</span></h1>
          <p className={styles.heroDescription} data-hero-enter>HR, hiring, time, finance and compliance.<br className={styles.desktopBreak} /> Finally connected, in one beautifully simple workspace.</p>
          <div className={styles.heroActions} data-hero-enter><a href={appUrl("/signup")} className={`${styles.button} ${styles.largeButton}`}>Forever free for up to 10 employees <ArrowRight size={18} /></a><a href="#platform" className={styles.textButton}>Explore the platform <ArrowDown size={17} /></a></div>
          <ul className={styles.benefitHighlights} aria-label="Why teams choose Crewzy" data-hero-enter>
            <li><span className={`${styles.iconTile} ${styles.smallIcon} ${styles.blue}`}><UsersRound size={19} /></span><strong>One employee record</strong></li>
            <li><span className={`${styles.iconTile} ${styles.smallIcon} ${styles.violet}`}><CheckCheck size={19} /></span><strong>Connected workflows</strong></li>
            <li><span className={`${styles.iconTile} ${styles.smallIcon} ${styles.green}`}><Clock3 size={19} /></span><strong>Less everyday admin</strong></li>
          </ul>
        </div>
        <div className={styles.productStage} data-product-stage>
          <div className={styles.productFrame} data-product-frame><DashboardPreview /></div>
        </div>
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
        <div className={`${styles.teamPhoto} ${editorial.teamPhoto}`}><Image src="/images/crewzy-team-editorial-v2.png" alt="Illustrative scene of three colleagues reviewing creative work in a sunlit studio" width={1448} height={1086} sizes="(max-width: 760px) 100vw, 50vw" data-scroll-zoom="image" /><div className={`${styles.photoCaption} ${editorial.photoCaption}`}><UsersRound size={19} /><span>Built around people.<br /><strong>Not around paperwork.</strong></span></div></div>
        <div className={styles.teamCopy} data-reveal>
          <SectionHeading label="For people-driven businesses" title="Big plans." emphasis="A little less busywork." description="When your people are your business, disconnected tools get in the way. Crewzy brings the everyday work together, so your team can focus on what comes next." />
          <ul className={editorial.audienceList}>
            <li><BriefcaseBusiness size={18} /><span>Agencies & consultancies</span></li>
            <li><ShieldCheck size={18} /><span>Document-led businesses</span></li>
            <li><UsersRound size={18} /><span>Growing teams</span></li>
          </ul>
          <a href="/solutions" className={`${styles.textButton} ${editorial.sectionLink}`}>Find the right fit for your team <ArrowRight size={17} /></a>
        </div>
      </section>
      <section className={`${styles.aiSection} ${narrativeStyles.zigAI} ${editorial.aiSection}`} id="crewzy-ai" data-reveal data-zoom-section>
        <SectionHeading label="Meet Crewzy AI" title="Less digging." emphasis="Better-informed decisions." description="Ask questions about your workspace. Get source-linked answers from the information you’re authorised to access, with human review where it matters." />
        <div className={`${styles.aiExample} ${editorial.aiExample}`} data-scroll-zoom="frame"><div className={editorial.assistantHeader}><BrainCircuit size={19} /><strong>Crewzy AI</strong><span>Workspace assistant</span></div><div className={styles.aiQuestion}>Which documents need my attention?</div><div className={styles.aiAnswer}><BrainCircuit size={21} /><div><strong>Three document reviews need attention.</strong><p>Start with Daniel’s professional certificate, which expires in 14 days. Amelia’s insurance document and Sophie’s training certificate are also coming up for renewal.</p><div className={styles.sourceChip}><FileText size={14} /> Source: document records</div></div></div><small>Illustrative response · Review source records before acting</small></div>
      </section>
      <section className={`${styles.section} ${styles.faqSection}`} id="questions">
        <div data-reveal><SectionHeading label="A little more clarity" title="Good questions." emphasis="Straight answers." description="Still wondering if Crewzy fits?" /><a className={editorial.sectionLink} href="/contact">We’re happy to talk. <ArrowRight size={15} /></a></div>
        <div className={styles.faqList} data-reveal>{faqs.map(item => <details key={item.question}><summary>{item.question}<Plus size={19} /></summary><p>{item.answer}</p></details>)}</div>
      </section>
      <section className={`${styles.closingSection} ${editorial.closingSection}`} data-reveal><SectionHeading label="One workspace. A clearer day." title="Make room for" emphasis="your next chapter." description="Let’s bring your people, work and compliance together." /><div className={editorial.closingActions}><a className={`${styles.button} ${styles.largeButton}`} href={demoHref}>Book a Crewzy demo <ArrowRight size={18} /></a><a className={styles.closingSecondary} href={appUrl("/signup")}>Start free for up to 10 employees <ArrowRight size={14} /></a></div></section>
    </main>
    <SiteFooter />
  </div>;
}
