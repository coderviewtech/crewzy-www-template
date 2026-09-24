"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, BrainCircuit, BriefcaseBusiness, CheckCheck, Clock3, FileText, Menu, Plus, ShieldCheck, UsersRound, X } from "lucide-react";
import previewStyles from "./preview.module.css";
import connectionStyles from "./connections.module.css";
import narrativeStyles from "./narrative.module.css";
import { ComplianceWorkspace } from "./compliance-workspace";
import { DashboardPreview } from "./dashboard-preview";
import { modules, IconTile, PlatformExplorer } from "./platform-tour";
import { usePreviewMotion } from "./use-preview-motion";

const styles = { ...previewStyles, ...connectionStyles };

const appOrigin = (process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://dev.crewzy.io").replace(/\/$/, "");
function Brand() { return <span className={styles.brand}><span className={styles.brandMark}><UsersRound size={22} strokeWidth={2.2} aria-hidden="true" /></span>crewzy</span>; }



const connectionPaths = [
  { desktop: "M200 53 H275 Q340 53 340 118 Q340 160 420 160", mobile: "M167 66 V83 Q167 113 197 113 H470 Q500 113 500 140", color: "#3261ec" },
  { desktop: "M200 160 H420", mobile: "M500 66 V140", color: "#8960d7" },
  { desktop: "M200 267 H275 Q340 267 340 202 Q340 160 420 160", mobile: "M833 66 V83 Q833 113 803 113 H530 Q500 113 500 140", color: "#b37d18" },
  { desktop: "M800 53 H725 Q660 53 660 118 Q660 160 580 160", mobile: "M167 254 V237 Q167 207 197 207 H470 Q500 207 500 180", color: "#c75171" },
  { desktop: "M800 160 H580", mobile: "M500 254 V180", color: "#288d91" },
  { desktop: "M800 267 H725 Q660 267 660 202 Q660 160 580 160", mobile: "M833 254 V237 Q833 207 803 207 H530 Q500 207 500 180", color: "#258b64" },
];

function ConnectedWorkspace({ onSelect }: { onSelect: (index: number) => boolean }) {
  return (
    <section className={styles.connectionSection} aria-labelledby="connection-title" data-connection-section>
      <div className={styles.connectionCopy}>
        <span className={styles.eyebrow}>THE CREWZY WORKSPACE</span>
        <h2 id="connection-title">One record.<br /><span>Everyone connected.</span></h2>
        <p>Your people, permissions and context flow across every module.</p>
      </div>
      <div className={styles.connectionDiagram}>
        {(["desktop", "mobile"] as const).map(layout => (
          <svg key={layout} className={`${styles.connectionLines} ${layout === "desktop" ? styles.connectionDesktop : styles.connectionMobile}`} viewBox="0 0 1000 320" preserveAspectRatio="none" fill="none" aria-hidden="true">
            {connectionPaths.map((path, index) => (
              <g key={index}>
                <path d={path[layout]} stroke="#e4ebf5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <path d={path[layout]} stroke={path.color} strokeWidth="1.6" strokeLinecap="round" strokeOpacity=".7" vectorEffect="non-scaling-stroke" pathLength="1" data-connection-line />
              </g>
            ))}
          </svg>
        ))}
        {modules.map((item, index) => (
          <a key={item.name} className={`${styles.connectionNode} ${styles[`connectionNode${index}`]}`} href={index === 5 ? "#compliance" : "#platform"} onClick={event => {
            if (index < 5 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && onSelect(index)) {
              event.preventDefault(); event.stopPropagation();
            }
          }} data-connection-node data-connection-side={index < 3 ? "left" : "right"}>
            <IconTile index={index} small /><strong>{item.name}</strong><ArrowRight size={14} />
          </a>
        ))}
        <a href="#platform" className={styles.connectionHub} aria-label="Explore Crewzy’s connected platform">
          <div className={styles.connectionCore} data-connection-core>
            <Brand />
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [storyStep, setStoryStep] = useState(0);
  const navigateStep = useRef<((index: number) => void) | null>(null);
  const navigateModule = useRef<((index: number) => void) | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  usePreviewMotion(root, setStoryStep, navigateStep, setActiveModule, navigateModule);
  const selectModule = (index: number) => {
    if (navigateModule.current) { navigateModule.current(index); return true; }
    setActiveModule(index);
    return false;
  };
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);
  return <div className={styles.preview} ref={root}>
    <div className={styles.pageProgress} data-page-progress aria-hidden="true" />
    <a className={styles.skipLink} href="#main">Skip to content</a>
    <header className={styles.header}><a href="#top" aria-label="Crewzy home"><Brand /></a>
      <nav aria-label="Main navigation" className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} id="main-navigation" onClick={() => setMenuOpen(false)}><a href="#platform">Platform</a><a href="#compliance">Compliance <span className={styles.navDot} /></a><a href="#teams">Who it’s for</a><a href="#questions">FAQs</a></nav>
      <div className={styles.navActions}><a className={styles.login} href={`${appOrigin}/login`}>Sign in</a><a href="mailto:sales@crewzy.io?subject=Crewzy%20demo" className={styles.button}>Book a demo <ArrowRight size={16} /></a><button ref={menuButton} className={styles.menuToggle} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>
    <main id="main">
      <section className={styles.hero} id="top"><div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroContent}>
          <a className={styles.eyebrowPill} href="#compliance" data-hero-enter><ShieldCheck size={15} /><span>People-first. Compliance-connected.</span><ArrowRight size={14} /></a>
          <h1 data-hero-enter>A clearer way to run<br /><span>your people and work.</span></h1>
          <p className={styles.heroDescription} data-hero-enter>HR, hiring, time, finance and compliance.<br className={styles.desktopBreak} /> Finally connected, in one beautifully simple workspace.</p>
          <div className={styles.heroActions} data-hero-enter><a href="mailto:sales@crewzy.io?subject=Crewzy%20demo" className={`${styles.button} ${styles.largeButton}`}>Let’s meet your new workspace <ArrowRight size={18} /></a><a href="#platform" className={styles.textButton}>Explore the platform <ArrowDown size={17} /></a></div>
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
      <ConnectedWorkspace onSelect={selectModule} />
      <section className={`${styles.section} ${styles.sectionIntro}`} id="platform" data-reveal><span className={styles.eyebrow}>BUILT TO WORK TOGETHER</span><h2>Less switching tabs.<br /><span>More moving forward.</span></h2><p>Bring the work around your people into one place, with context that stays connected from one team to the next.</p></section>
      <PlatformExplorer active={activeModule} onSelect={selectModule} />
      <ComplianceWorkspace step={storyStep} onStep={index => { if (navigateStep.current) navigateStep.current(index); else setStoryStep(index); }} />
      <section className={`${styles.section} ${styles.teamSection} ${narrativeStyles.zigTeam}`} id="teams" data-zoom-section>
        <div className={styles.teamPhoto}><Image src="/images/crewzy-team-workshop.png" alt="A team planning work together around a whiteboard" width={1672} height={941} sizes="(max-width: 760px) 100vw, 50vw" data-scroll-zoom="image" /><div className={styles.photoCaption}><UsersRound size={19} /><span>Built around people.<br /><strong>Not around paperwork.</strong></span></div></div>
        <div className={styles.teamCopy} data-reveal><span className={styles.eyebrow}>FOR PEOPLE-DRIVEN BUSINESSES</span><h2>Big plans.<br /><span>A little less busywork.</span></h2><p>When your people are your business, disconnected tools get in the way. Crewzy brings the everyday work together, so your team can focus on what comes next.</p><div className={styles.industryList}><span><BriefcaseBusiness size={18} /> Agencies & consultancies</span><span><ShieldCheck size={18} /> Document-led businesses</span><span><UsersRound size={18} /> Growing teams</span></div><a href="mailto:sales@crewzy.io?subject=Is%20Crewzy%20right%20for%20our%20team%3F" className={styles.textButton}>Let’s talk about your team <ArrowRight size={17} /></a></div>
      </section>
      <section className={`${styles.aiSection} ${narrativeStyles.zigAI}`} data-reveal data-zoom-section><div className={styles.aiCopy}><span className={`${styles.iconTile} ${styles.violet}`}><BrainCircuit size={24} /></span><span className={styles.eyebrow}>MEET CREWZY AI</span><h2>Less digging.<br /><span>Better-informed decisions.</span></h2><p>Ask questions about your workspace. Get source-linked answers from the information you’re authorised to access, with human review where it matters.</p></div><div className={styles.aiExample} data-scroll-zoom="frame"><div className={styles.aiQuestion}>Which documents need my attention?</div><div className={styles.aiAnswer}><BrainCircuit size={21} /><div><strong>Here’s a useful place to start.</strong><p>Three records in your workspace need review. Check their expiry dates and supporting documents before you take action.</p><div className={styles.sourceChip}><FileText size={14} /> Source: document records</div></div></div><small>Illustrative AI response · Source-linked, permission-aware</small></div></section>
      <section className={`${styles.section} ${styles.faqSection}`} id="questions"><div data-reveal><span className={styles.eyebrow}>A LITTLE MORE CLARITY</span><h2>Good questions.<br /><span>Straight answers.</span></h2><p>Still wondering if Crewzy fits?<br /><a href="mailto:sales@crewzy.io">We’re happy to talk. <ArrowRight size={15} /></a></p></div><div className={styles.faqList} data-reveal>{faqs.map(item => <details key={item.question}><summary>{item.question}<Plus size={19} /></summary><p>{item.answer}</p></details>)}</div></section>
      <section className={styles.closingSection} data-reveal><span className={`${styles.iconTile} ${styles.blue}`}><UsersRound size={28} /></span><span className={styles.eyebrow}>ONE WORKSPACE. A CLEARER DAY.</span><h2>Make room for<br /><span>your next chapter.</span></h2><p>Let’s bring your people, work and compliance together.</p><a className={`${styles.button} ${styles.largeButton}`} href="mailto:sales@crewzy.io?subject=Crewzy%20demo">Book a Crewzy demo <ArrowRight size={18} /></a><a className={styles.closingSecondary} href={`${appOrigin}/signup`}>Small team? Start free for up to 10 employees <ArrowRight size={14} /></a></section>
    </main>
    <footer className={styles.footer}><a href="#top" aria-label="Back to the top"><Brand /></a><p>People. Work. Together.</p><nav aria-label="Footer navigation"><a href="#platform">Platform</a><a href="#compliance">Compliance</a><a href="mailto:sales@crewzy.io">Contact</a></nav><span>© {new Date().getFullYear()} Crewzy</span></footer>
  </div>;
}
