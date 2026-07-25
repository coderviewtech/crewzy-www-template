"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  FileText,
  FolderKanban,
  KeyRound,
  LockKeyhole,
  Menu,
  Play,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserRoundCheck,
  UsersRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import styles from "./landing.module.css";
import { appUrl, BrandIcon, Eyebrow, Footer, Header, moduleSlug, useScrollMotion } from "./chrome";

/* Six modules, so this is the full-tour length divided by six. At 5s a visitor
   had to give it 30 seconds to see everything, which nobody does. 3.5s still
   leaves time to read a title and a kicker, and anyone who wants to read the
   detail hovers — which pauses it. */
const CAPABILITY_ROTATION_MS = 3500;

// The stack a growing team typically pays for. These collapse into one Crewzy
// hub on screen — six tools, one replacement, which is the whole argument.
// Deliberately generic categories, never competitor brand names.
// Six tools scattered around the edges, each wired to the central Crewzy hub
// by a dashed connector — the "bring it all together" constellation. `line`
// is the spoke's outer endpoint in the stage's 0–100 coordinate space (the hub
// sits at 50,50), aimed just short of each chip so the line meets it cleanly.
const CONVERGE_TOOLS = [
  { label: "People management", at: { top: "3%", left: "1%" }, line: { x: 19, y: 21 }, tone: "#7650e8", soft: "#ddd3fa" },
  { label: "Timesheet", at: { top: "1%", right: "2%" }, line: { x: 82, y: 18 }, tone: "#168f82", soft: "#c7e6e2" },
  { label: "Recruitment", at: { top: "43%", left: "0%" }, line: { x: 17, y: 50 }, tone: "#ff6b57", soft: "#ffd5cf" },
  { label: "Invoicing", at: { top: "43%", right: "0%" }, line: { x: 83, y: 50 }, tone: "#2f6fd0", soft: "#cfdff7" },
  { label: "Expenses", at: { bottom: "3%", left: "4%" }, line: { x: 20, y: 81 }, tone: "#d9832a", soft: "#f6dfc4" },
  { label: "Compliance", at: { bottom: "1%", right: "3%" }, line: { x: 81, y: 83 }, tone: "#c2418a", soft: "#f3ccdf" },
];

const FAQS = [
  {
    question: "Which companies is Crewzy designed for?",
    answer: "Crewzy is built for growing small and mid-size companies — consultancies, agencies, IT services, insurance and other people-driven businesses — that are running day to day on too many disconnected tools.",
  },
  {
    question: "What tools does Crewzy replace?",
    answer: "Most teams arrive using a separate HR tool, a timesheet app, an applicant tracking system, an invoicing tool and a compliance spreadsheet. Crewzy covers core HR, onboarding and offboarding, leave, time, projects, recruitment, document and policy expiry, invoicing, expenses and AI in one workspace, on one bill.",
  },
  {
    /* Says plainly what is not covered yet. A visitor who needs payroll or
       rotas finds out here rather than three weeks into an evaluation. */
    question: "Does Crewzy run payroll or staff rotas?",
    answer: "Not yet. Crewzy covers core HR, recruitment, time and projects, leave, documents and expiry, invoicing and expenses. It does not run a payroll cycle or build shift rotas today, so if scheduling hourly shifts is your main problem, Crewzy is not the right fit yet. Approved timesheet and leave data is structured so it can be exported to your payroll provider.",
  },
  {
    question: "What can a small team use for free?",
    answer: "Free supports up to 10 employees with core employee records, documents, leave, basic projects, timesheets and audit history. No payment card is required, and the same workspace can grow with the company.",
  },
  {
    question: "How are roles and approvals protected?",
    answer: "API permissions are evaluated from company-scoped identity and role grants. Sensitive approval workflows also apply maker-checker controls to prevent self-approval.",
  },
  {
    question: "Does Crewzy keep an audit history?",
    answer: "Yes. Connected services record actor, company scope, action, result and time so operational activity can be investigated and exported as evidence.",
  },
  {
    question: "How does Crewzy AI answer questions?",
    answer: "The assistant uses authorised service APIs and returns source-linked results. It does not answer from another tenant's data, and extracted document fields require human review.",
  },
];

function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.browserFrame}>
      <div className={styles.browserBar}>
        <div><span /><span /><span /></div>
        <div className={styles.browserAddress}><LockKeyhole size={11} /> northstar.crewzy.io</div>
        <div className={styles.browserTools}><span /><span /></div>
      </div>
      {children}
    </div>
  );
}

function ProductSidebar({ active = "Overview" }: { active?: string }) {
  const items = [
    { label: "Overview", icon: Activity },
    { label: "People", icon: UsersRound },
    { label: "Time & leave", icon: Clock3 },
    { label: "Projects", icon: FolderKanban },
    { label: "Finance", icon: WalletCards },
    { label: "Compliance", icon: ShieldCheck },
  ];
  return (
    <aside className={styles.productSidebar}>
      <span className={styles.productLogo}><BrandIcon size={15} /> Crewzy</span>
      <div className={styles.companySwitch}><span>N</span><div><strong>Northstar Labs</strong><small>Business plan</small></div><ChevronDown size={13} /></div>
      <div className={styles.productLinks}>{items.map(({ label, icon: ItemIcon }) => <div className={label === active ? styles.productLinkActive : styles.productLink} key={label}><span><ItemIcon size={13} /></span>{label}</div>)}</div>
      <div className={styles.productUser}><span>EW</span><div><strong>Emma Wilson</strong><small>Workspace owner</small></div></div>
    </aside>
  );
}

function ProductTopbar() {
  return (
    <div className={styles.productTopbar}>
      <div><Search size={13} /> Search people, projects and records</div>
      <button type="button" aria-label="Notifications"><Bell size={15} /></button>
      <button type="button"><Sparkles size={14} /> Ask Crewzy AI</button>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className={styles.productShell}>
      <ProductSidebar />
      <div className={styles.productMain}>
        <ProductTopbar />
        <div className={styles.dashboardBody}>
          <div className={styles.dashboardHeading}><div><small>Wednesday, 22 July</small><h2>Good morning, Emma</h2><p>Here&apos;s what needs your attention across the company.</p></div><button type="button"><UsersRound size={14} /> Add employee</button></div>
          <div className={styles.attentionGrid}>
            <AttentionCard icon={FileCheck2} count="3" label="Documents expiring" tone="coral" />
            <AttentionCard icon={TimerReset} count="4" label="Timesheets missing" tone="coral" />
            <AttentionCard icon={CheckCircle2} count="6" label="Approvals waiting" tone="violet" />
            <AttentionCard icon={UserRoundCheck} count="2" label="Onboarding reviews" tone="teal" />
          </div>
          <div className={styles.metricGrid}>
            <MetricCard icon={UsersRound} tone="violet" label="Active employees" value="148" detail="Across 7 teams" />
            <MetricCard icon={Clock3} tone="teal" label="Hours this week" value="4,892" detail="94% submitted" />
            <MetricCard icon={ShieldCheck} tone="coral" label="Compliance" value="96%" detail="8 items to review" />
            <MetricCard icon={WalletCards} tone="coral" label="Open expenses" value="£8,420" detail="12 claims awaiting review" />
          </div>
          <div className={styles.dashboardBottom}>
            <section className={styles.activityList}>
              <div><strong>Recent activity</strong><span>Open audit log</span></div>
              <ActivityRow icon={Clock3} title="Timesheet approved" detail="Daniel Brooks · Project Atlas" time="9 min" />
              <ActivityRow icon={CalendarDays} title="Leave request submitted" detail="Sophie Harris · 2 working days" time="24 min" />
              <ActivityRow icon={ReceiptText} title="Expense ready for review" detail="Emily Carter · £184.20" time="1 hr" />
            </section>
            <section className={styles.aiInsight}><div><Sparkles size={16} /><strong>Crewzy AI</strong></div><p>Four employees have not submitted last week&apos;s timesheet.</p><small>Timesheet Compliance</small><button type="button">Review results <ArrowRight size={13} /></button></section>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttentionCard({ icon: Icon, count, label, tone }: { icon: LucideIcon; count: string; label: string; tone: string }) {
  return <article className={styles[`tone${tone}`]}><span><Icon size={15} /></span><div><strong>{count}</strong><small>{label}</small></div></article>;
}

function MetricCard({ icon: Icon, tone, label, value, detail }: { icon: LucideIcon; tone: string; label: string; value: string; detail: string }) {
  return <article className={styles[`metric${tone}`]}><div className={styles.metricHeader}><span>{label}</span><i><Icon size={14} /></i></div><strong>{value}</strong><small>{detail}</small></article>;
}

function ActivityRow({ icon: Icon, title, detail, time }: { icon: LucideIcon; title: string; detail: string; time: string }) {
  return <div className={styles.activityRow}><span><Icon size={14} /></span><div><strong>{title}</strong><small>{detail}</small></div><time>{time}</time></div>;
}

/* The six scattered tool cards that collapse into the Crewzy window. x/y are
   the resting scatter offset from centre (px), r the resting tilt. */
const COLLAPSE_TOOLS = [
  { label: "People", Icon: UsersRound, tone: "#7650e8", soft: "#ede8fc", x: -252, y: -118, r: -8 },
  { label: "Timesheets", Icon: Clock3, tone: "#137b70", soft: "#d7efeb", x: 252, y: -132, r: 7 },
  { label: "Recruitment", Icon: UserRoundCheck, tone: "#d9563f", soft: "#fce2db", x: -300, y: 34, r: -5 },
  { label: "Finance", Icon: WalletCards, tone: "#2f6fd0", soft: "#dbe8fb", x: 300, y: 40, r: 6 },
  { label: "Leave", Icon: CalendarDays, tone: "#b06a1c", soft: "#fbedd6", x: -206, y: 168, r: -6 },
  { label: "Compliance", Icon: ShieldCheck, tone: "#c2418a", soft: "#fbe1ef", x: 212, y: 176, r: 5 },
];

/* Scroll-scrubbed collapse (portrait.so style, no pinning): the scattered tool
   cards fly to the centre, shrink and fade while the Crewzy window zooms up —
   driven entirely by where the block sits in the viewport, written to `--p`
   (0 = scattered, 1 = collapsed). */
function CollapseWindow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setP = (p: number) => el.style.setProperty("--p", p.toFixed(4));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Track the block's CENTRE, not its top. Top-based ramping started the
      // collapse the instant the block peeked in from the bottom, so it was
      // already fully collapsed before the reader reached the section. Now the
      // cards stay scattered until the section is roughly centred in view, then
      // collapse as it rises past centre toward the top.
      const centre = rect.top + rect.height / 2;
      const start = vh * 0.62; // p = 0 while the centre is at/below 62% down
      const end = vh * 0.15; // p = 1 once the centre nears the top
      const p = Math.min(1, Math.max(0, (start - centre) / (start - end)));
      setP(p);
    };
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.collapse} ref={ref}>
      <div className={styles.collapseStage} aria-label="Six separate tools collapsing into one Crewzy workspace">
        {COLLAPSE_TOOLS.map(({ label, Icon, tone, soft, x, y, r }) => (
          <div
            className={styles.collapseCard}
            key={label}
            style={{ "--x": `${x}px`, "--y": `${y}px`, "--r": `${r}deg`, "--tool": tone, "--tool-soft": soft } as unknown as CSSProperties}
          >
            <span><Icon size={18} /></span>
            <b>{label}</b>
            <i /><i />
          </div>
        ))}
        <div className={styles.collapseWindow}>
          <div className={styles.collapseWindowBar}>
            <span /><span /><span />
            <em><LockKeyhole size={10} /> app.crewzy.io</em>
          </div>
          <div className={styles.collapseWindowBody}>
            <div className={styles.collapseWindowHub}><span><BrandIcon size={16} /></span> Crewzy workspace</div>
            <div className={styles.collapseWindowNav}>
              {COLLAPSE_TOOLS.map(({ label, Icon, tone, soft }) => (
                <span key={label} style={{ "--tool": tone, "--tool-soft": soft } as unknown as CSSProperties}><Icon size={13} />{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroContent} data-reveal>
        <Eyebrow icon={UsersRound}>Built for people-driven businesses</Eyebrow>
        <h1>Stop running your business across a dozen <span>disconnected tools.</span></h1>
        <p>Crewzy runs hiring, HR, time, leave and invoicing in one place — so a growing team spends less on software and gets its time back.</p>
        <div className={styles.heroActions}>
          <Link href={appUrl("/signup")}>Set up free workspace <ArrowRight size={18} /></Link>
          <Link href="#outcomes">See how Crewzy helps <Play size={16} fill="currentColor" /></Link>
        </div>
        <div className={styles.heroMeta}><span><Check size={14} /> Free for 10 employees</span><span><Check size={14} /> No credit card</span><span><ShieldCheck size={14} /> Audit-ready</span></div>
      </div>
      <div className={styles.heroProduct} data-reveal="hero" data-scroll-zoom="hero"><BrowserFrame><DashboardPreview /></BrowserFrame></div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section className={styles.outcomesSection} id="outcomes">
      <div className={styles.outcomesInner}>
        <div className={styles.outcomesHeading} data-reveal>
          <Eyebrow icon={TimerReset}>Why teams switch</Eyebrow>
          <h2>One platform, not <span>six subscriptions.</span></h2>
          <p>The problem is rarely one bad tool. It&apos;s that none of them talk to each other — so the same new hire gets typed into five systems, timesheets and leave never quite reconcile, and every month-end turns into a scramble to work out what&apos;s actually true.</p>
        </div>
        <CollapseWindow />
      </div>
    </section>
  );
}

function TimesheetVisual() {
  const rows = [
    ["Daniel Brooks", "8", "8", "7.5", "8", "8", "39.5", "Approved"],
    ["Sophie Harris", "8", "8", "Leave", "Leave", "8", "24", "Approved"],
    ["Emily Carter", "8", "6", "8", "8", "—", "30", "Draft"],
  ];
  return (
    <div className={styles.timesheetVisual}>
      <div className={styles.miniToolbar}><strong>Weekly timesheets</strong><span>94% submitted</span></div>
      <div className={styles.timesheetHeader}><span>Employee</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Total</span><span>Status</span></div>
      {rows.map(row => <div className={styles.timesheetRow} key={row[0]}>{row.map((cell, i) => <span key={`${row[0]}-${i}`}>{i === 0 ? <strong>{cell}</strong> : i === 7 ? <i>{cell}</i> : cell}</span>)}</div>)}
      <div className={styles.timesheetFooter}><span>Weekly submission coverage</span><div><i /><b>94%</b></div></div>
    </div>
  );
}

function PeopleVisual() {
  return (
    <div className={styles.peopleVisual}>
      <div className={styles.peopleHead}><div><strong>148</strong><span>Employees</span></div><button type="button">Add employee</button></div>
      {[{initials:"EW",name:"Emma Wilson",role:"Product · Owner"},{initials:"DB",name:"Daniel Brooks",role:"Engineering · Manager"},{initials:"EC",name:"Emily Carter",role:"People · HR Manager"}].map(person => <div className={styles.personRow} key={person.name}><span>{person.initials}</span><div><strong>{person.name}</strong><small>{person.role}</small></div><i>Active</i></div>)}
      <div className={styles.peopleSummary}><span><b>12</b><small>Onboarding</small></span><span><b>4</b><small>Documents due</small></span><span><b>96%</b><small>Profiles complete</small></span></div>
    </div>
  );
}

function RecruitmentVisual() {
  return (
    <div className={styles.peopleVisual}>
      <div className={styles.peopleHead}><div><strong>24</strong><span>Candidates</span></div><button type="button">Post a job</button></div>
      {[{initials:"AR",name:"Aisha Rahman",role:"Senior Consultant · Interview"},{initials:"MK",name:"Marcus King",role:"Claims Analyst · Shortlisted"},{initials:"LN",name:"Lena Novak",role:"Developer · Offer sent"}].map(person => <div className={styles.personRow} key={person.name}><span>{person.initials}</span><div><strong>{person.name}</strong><small>{person.role}</small></div><i>Active</i></div>)}
      <div className={styles.peopleSummary}><span><b>5</b><small>Open roles</small></span><span><b>3</b><small>Interviews</small></span><span><b>1</b><small>Offer out</small></span></div>
    </div>
  );
}

function LeaveVisual() {
  return (
    <div className={styles.leaveVisual}>
      <div><CalendarDays size={19} /><strong>Leave balance</strong><span>2026</span></div>
      <section><article><span>Annual leave</span><strong>18.5</strong><small>days available</small></article><article><span>Sick leave</span><strong>10</strong><small>days tracked</small></article></section>
      <p><span>SH</span><strong>Sophie requested 2 days</strong><small>Awaiting manager approval</small></p>
      <div className={styles.leavePulse}><span>Team availability</span><div><i /></div><b>92%</b></div>
    </div>
  );
}

function FinanceVisual() {
  return (
    <div className={styles.financeVisual}>
      <div className={styles.invoiceTop}><span><FileText size={18} /></span><div><small>Invoice</small><strong>INV-2048</strong></div><b>Sent</b></div>
      <div className={styles.invoiceAmount}><small>Acme Studios</small><strong>£8,420.00</strong><span>Due 28 July</span></div>
      <div className={styles.expenseLine}><ReceiptText size={17} /><div><strong>12 expenses awaiting review</strong><small>£2,184 total</small></div><ArrowRight size={15} /></div>
      <div className={styles.financeMetrics}><span><small>Paid this month</small><b>£24.8k</b></span><span><small>Overdue</small><b>2 invoices</b></span></div>
    </div>
  );
}

function AiVisual() {
  return (
    <div className={styles.aiVisual}>
      <div className={styles.aiPrompt}>Who has not submitted a timesheet last week?</div>
      <div className={styles.aiResponse}><span><Sparkles size={17} /></span><div><strong>4 employees are missing a submission.</strong><p>Two records are drafts and two have no entries.</p></div></div>
      <div className={styles.aiSources}><span><Clock3 size={15} /> Timesheet compliance</span><span><UsersRound size={15} /> Employee directory</span><b>Live sources</b></div>
    </div>
  );
}

function Features() {
  const capabilities = [
    {
      label: "People",
      kicker: "One source of truth",
      title: "One employee record from day one to last day.",
      description: "Onboarding, documents, profiles, access and offboarding in one place, so HR stops maintaining parallel spreadsheets for the same person.",
      highlights: ["Faster onboarding", "Self-service profiles", "Clean offboarding"],
      icon: UsersRound,
      tone: "violet",
      visual: <PeopleVisual />,
    },
    {
      label: "Recruitment",
      kicker: "Hire and onboard in one place",
      title: "Take a candidate from application to first day.",
      description: "Track candidates, roles and interviews, then onboard the person you hired without re-keying anything into a second system.",
      highlights: ["Candidate pipeline", "CV and interview notes", "Hire straight into onboarding"],
      icon: UserRoundCheck,
      tone: "teal",
      visual: <RecruitmentVisual />,
    },
    {
      label: "Time & projects",
      kicker: "No more chasing",
      title: "Know what is missing before payroll and invoicing.",
      description: "Employees record time against the right work while managers see incomplete entries early and approve complete weeks with project context attached.",
      highlights: ["Earlier exception visibility", "Cleaner submissions", "Faster approvals"],
      icon: Clock3,
      tone: "coral",
      visual: <TimesheetVisual />,
    },
    {
      label: "Leave",
      kicker: "Consistent decisions",
      title: "Apply leave policy without spreadsheet reconciliation.",
      description: "Employees see the right balance before requesting leave, while managers follow regional policy and retain the complete approval history.",
      highlights: ["Clear balances", "Policy-aware approvals", "Less manual checking"],
      icon: CalendarDays,
      tone: "teal",
      visual: <LeaveVisual />,
    },
    {
      label: "Finance",
      kicker: "From delivery to cash",
      title: "Invoice the work, then let Crewzy chase it.",
      description: "Raise invoices without rebuilding client and project context, bill retainer clients on a recurring schedule, and send automatic reminders when someone pays late.",
      highlights: ["Recurring invoices", "Automatic payment reminders", "Connected project costs"],
      icon: WalletCards,
      tone: "coral",
      visual: <FinanceVisual />,
    },
    {
      label: "Crewzy AI",
      kicker: "Ask it, or tell it",
      title: "An assistant that answers — and acts, with your confirmation.",
      description: "Ask operational questions in plain language, or ask it to raise an invoice or onboard a new hire. Crewzy shows exactly what it will create and waits for your yes, with every action recorded.",
      highlights: ["Confirms before it acts", "Runs with your permissions", "Every action audited"],
      icon: Sparkles,
      tone: "violet",
      visual: <AiVisual />,
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);

  /* Selecting a module from the Platform menu. Two entry points, because one
     alone never covers both cases reliably:
       - Same-page click: the menu fires a `crewzy:select-module` event (a
         `hashchange` does NOT reliably fire on a same-page hash under the
         App Router, which is why the old version scrolled to the top instead).
       - Arriving from a sub-page: this component mounts with #module-x already
         in the URL, so we read the hash once on mount.
     Matched by slug, not index, so reordering the modules can't open the
     wrong one. */
  const capabilitiesRef = useRef(capabilities);
  capabilitiesRef.current = capabilities;
  useEffect(() => {
    const goToModule = (slug: string) => {
      const index = capabilitiesRef.current.findIndex(item => moduleSlug(item.label) === slug);
      if (index < 0) return;
      setActiveSlide(index);
      const el = sectionRef.current;
      if (!el) return;
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: { offset?: number }) => void } }).__lenis;
      if (lenis) lenis.scrollTo(el, { offset: -16 });
      else el.scrollIntoView({ block: "start" });
    };
    const match = /^#module-(.+)$/.exec(window.location.hash);
    if (match) goToModule(match[1]);
    const onSelect = (event: Event) => goToModule((event as CustomEvent<string>).detail);
    window.addEventListener("crewzy:select-module", onSelect);
    return () => window.removeEventListener("crewzy:select-module", onSelect);
  }, []);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const capabilityCount = capabilities.length;
  const activeCapability = capabilities[activeSlide];
  const showSlide = (offset: number) => setActiveSlide(current => (current + offset + capabilityCount) % capabilityCount);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    /* Only tracks whether to run the timer. It deliberately does NOT reset to
       the first slide on re-entry: doing so meant scrolling up and down kept
       snapping the carousel back to slide one so it never appeared to advance,
       and it also raced the "Platform → Recruitment" deep link, overwriting
       the chosen module a moment after the page landed on it. */
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActiveSlide(current => (current + 1) % capabilityCount), CAPABILITY_ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [activeSlide, capabilityCount, isInView, isPaused]);

  return (
    <section className={styles.features} id="features" ref={sectionRef}>
      <div className={styles.sectionHeading} data-reveal><Eyebrow icon={Zap}>Product proof</Eyebrow><h2>See the outcome, then see how Crewzy <span>delivers it.</span></h2><p>See each module in action — and how everything runs on one shared employee record, so a detail entered once shows up everywhere it&apos;s needed.</p></div>
      <div className={`${styles.capabilityShowcase} ${isPaused ? styles.carouselPaused : ""}`} data-reveal="scale" data-scroll-zoom="panel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocusCapture={() => setIsPaused(true)} onBlurCapture={() => setIsPaused(false)}>
        <div className={styles.capabilityTabs} role="tablist" aria-label="Crewzy platform capabilities">
          {capabilities.map((capability, index) => {
            const CapabilityIcon = capability.icon;
            return <button type="button" role="tab" aria-selected={index === activeSlide} className={index === activeSlide ? styles.capabilityTabActive : styles.capabilityTab} onClick={() => setActiveSlide(index)} key={capability.label}><span><CapabilityIcon size={16} /></span>{capability.label}</button>;
          })}
        </div>
        <div className={`${styles.capabilityStage} ${styles[`slide${activeCapability.tone}`]}`} key={activeCapability.label}>
          <div className={styles.capabilityCopy}>
            <div><activeCapability.icon size={18} /><small>{activeCapability.kicker}</small></div>
            <h3>{activeCapability.title}</h3>
            <p>{activeCapability.description}</p>
            <ul>{activeCapability.highlights.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul>
            <div className={styles.slideControls}>
              <button type="button" aria-label="Previous capability" title="Previous capability" onClick={() => showSlide(-1)}><ArrowLeft size={19} /></button>
              <button type="button" aria-label="Next capability" title="Next capability" onClick={() => showSlide(1)}><ArrowRight size={19} /></button>
            </div>
          </div>
          <div className={styles.capabilityVisual}>{activeCapability.visual}</div>
        </div>
        <div className={styles.slideTrack} aria-hidden="true">{capabilities.map((capability, index) => <span className={index === activeSlide ? styles.slideTrackActive : ""} key={capability.label} />)}</div>
      </div>
    </section>
  );
}

function MoreSection() {
  const items = [
    { icon: Bot, type: "slack", kicker: "Less employee admin", title: "Meet employees where they work", text: "Let employees submit time and request leave from Slack or the portal without learning another daily routine." },
    { icon: Bell, type: "exceptions", kicker: "Earlier intervention", title: "Catch what is about to slip", text: "Surface missing timesheets, expiring visas, insurance and certifications, and waiting approvals while there is still time to act." },
    { icon: LockKeyhole, type: "security", kicker: "Defensible decisions", title: "Keep every approval accountable", text: "Apply tenant scope, role permissions and separation of duties without slowing down legitimate work." },
  ];
  return (
    <section className={styles.moreSection} id="security">
      <div className={styles.moreHeading} data-reveal>
        <div><Eyebrow icon={Sparkles}>Everyday value</Eyebrow><h2>Less admin for your team. <span>Evidence for the business.</span></h2></div>
        <div className={styles.moreValueProps}><span><UsersRound size={18} /><b>One login</b><small>for employees</small></span><span><UserRoundCheck size={18} /><b>One bill</b><small>for the business</small></span><span><ShieldCheck size={18} /><b>One audit trail</b><small>for compliance</small></span></div>
      </div>
      <div className={styles.moreGrid}>{items.map(({ icon: ItemIcon, type, kicker, title, text }, index) => <article className={styles[`moreCard${type}`]} data-reveal data-reveal-delay={String(index + 1)} data-scroll-zoom="card" key={title}><div className={styles.moreCardVisual}><div className={styles.moreCardHeader}><span><ItemIcon size={21} /></span><small>0{index + 1}</small></div><OperationalPreview type={type} /></div><div className={styles.moreCardCopy}><b>{kicker}</b><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      <div className={styles.integrationPanel}>
        <div className={styles.integrationCopy} data-reveal><Eyebrow icon={Sparkles}>Connected by design</Eyebrow><h3>Add a module, not <span>another integration.</span></h3><p>Every module runs on the same employee record and the same permissions, so switching one on adds capability instead of another system to wire up and keep in sync.</p><div><span><Check size={15} /> One employee identity</span><span><Check size={15} /> Nothing to integrate</span><span><Check size={15} /> Every decision keeps its evidence</span></div></div>
        <div className={styles.integrationCanvas} aria-label="Crewzy connected modules" data-reveal="scale" data-scroll-zoom="panel">
          <div className={styles.integrationConnections} aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          <div className={styles.integrationHub}><span><BrandIcon size={24} /></span><strong>Crewzy</strong><small>Identity &amp; access hub</small></div>
          <IntegrationNode icon={UsersRound} label="People" position="People" />
          <IntegrationNode icon={Clock3} label="Time" position="Time" />
          <IntegrationNode icon={FolderKanban} label="Projects" position="Projects" />
          <IntegrationNode icon={WalletCards} label="Finance" position="Finance" />
          <IntegrationNode icon={ShieldCheck} label="Audit" position="Audit" />
          <IntegrationNode icon={Sparkles} label="Crewzy AI" position="Ai" />
        </div>
      </div>
    </section>
  );
}

function OperationalPreview({ type }: { type: string }) {
  if (type === "slack") {
    return <div className={styles.slackPreview}><div><span>#</span><strong>crewzy-requests</strong><small>Now</small></div><section><i>EW</i><p><strong>Emma Wilson</strong><small>Annual leave · 2 working days</small></p><b>Submitted</b></section><footer><CheckCircle2 size={14} /> Request recorded in Crewzy</footer></div>;
  }

  if (type === "exceptions") {
    return <div className={styles.exceptionPreview}><div><strong>Needs attention</strong><small>8 open</small></div><section><span><TimerReset size={15} /></span><p><strong>Missing timesheets</strong><small>4 employees · Last week</small></p><b>Review</b></section><section><span><FileCheck2 size={15} /></span><p><strong>Documents expiring</strong><small>3 records · Within 30 days</small></p><b>Review</b></section></div>;
  }

  return <div className={styles.securityPreview}><div><span><KeyRound size={16} /></span><p><strong>Expense approval</strong><small>Manager · Finance scope</small></p><b>Allowed</b></div><section><ShieldCheck size={20} /><p><strong>Separation of duties applied</strong><small>Self-approval was blocked and recorded.</small></p></section></div>;
}

function IntegrationNode({ icon: Icon, label, position }: { icon: LucideIcon; label: string; position: string }) {
  return <div className={`${styles.integrationNode} ${styles[`node${position}`]}`}><span><Icon size={19} /></span><b>{label}</b><CheckCircle2 size={14} /></div>;
}

function FaqSection() {
  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.faqIntro} data-reveal><Eyebrow icon={Sparkles}>FAQs</Eyebrow><h2>Need <span>answers?</span></h2><p>Answers on modules, access, security and Crewzy AI.</p><Link href="mailto:support@crewzy.io">Ask our team <ArrowRight size={16} /></Link></div>
      <div className={styles.faqList} data-reveal data-reveal-delay="1">{FAQS.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
    </section>
  );
}

function EvidenceSection() {
  const events = [
    { initials: "EC", action: "Document status updated", target: "Employee · Sophie Harris", time: "10:42" },
    { initials: "DB", action: "Weekly timesheet approved", target: "Timesheet · Week 29", time: "10:18" },
    { initials: "EW", action: "Finance permission changed", target: "Access · Role 04", time: "09:56" },
  ];
  return (
    <section className={styles.evidenceSection}>
      <div className={styles.evidenceCopy} data-reveal><Eyebrow icon={ShieldCheck}>Evidence, not promises</Eyebrow><h2>Compliance is captured <span>while work happens.</span></h2><p>When a customer, auditor or manager asks what changed, Crewzy preserves who acted, which company and record were affected, what happened and when.</p><div><span><BuildingBadge icon={KeyRound} label="Role-scoped" /></span><span><BuildingBadge icon={CheckCircle2} label="Maker-checker" /></span><span><BuildingBadge icon={Activity} label="Audit context" /></span></div></div>
      <div className={styles.auditPreview} data-reveal="scale" data-reveal-delay="1" data-scroll-zoom="panel"><div><strong>Activity & audit</strong><span>All services</span></div>{events.map(event => <article key={event.time}><span>{event.initials}</span><div><strong>{event.action}</strong><small>{event.target}</small></div><time>{event.time}</time></article>)}</div>
    </section>
  );
}

function BuildingBadge({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return <><Icon size={15} />{label}</>;
}

function FinalCta() {
  return (
    <section className={styles.finalCta} id="get-started">
      <div className={styles.finalCtaCopy} data-reveal><Eyebrow icon={Sparkles}>Ready when you are</Eyebrow><h2>Replace your stack with <span>one workspace.</span></h2><p>Start free for up to 10 employees. No card required. Add the modules you need as you grow, on the same people, history and workflow.</p><div><Link href={appUrl("/signup")}>Set up free workspace <ArrowRight size={18} /></Link><Link href="mailto:sales@crewzy.io">Talk to sales</Link></div></div>
      <div className={styles.finalPhoto} data-reveal="photo" data-scroll-zoom="photo"><Image src="/images/crewzy-team-workshop.png" alt="A team collaborating around a planning board" fill sizes="(max-width: 800px) 100vw, 45vw" /></div>
    </section>
  );
}

export default function LandingConceptsPage() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollMotion(pageRef, styles.revealed, styles.motionReady);
  return (
    <main className={styles.page} ref={pageRef}>
      <Header />
      <Hero />
      <OutcomesSection />
      <Features />
      <MoreSection />
      <EvidenceSection />
      <FaqSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
