"use client";

import Link from "next/link";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Check,
  Clock3,
  FileCheck2,
  Landmark,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  UsersRound,
  WalletCards,
} from "lucide-react";
import styles from "../landing.module.css";
import { appUrl, Eyebrow, Footer, Header, useScrollMotion } from "../chrome";

type Segment = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  /* Split so the closing phrase can be highlighted. House rule across the
     site: the eye always lands on the payoff at the end of a heading. */
  title: string;
  titleTail: string;
  lead: string;
  /* The specific way the disconnected stack fails this kind of company. Written
     from the operator's day, not from our feature list. */
  today: string[];
  instead: string[];
  modules: { label: string; icon: LucideIcon; href: string }[];
};

const SEGMENTS: Segment[] = [
  {
    id: "agencies",
    icon: Briefcase,
    eyebrow: "For agencies",
    title: "Bill every hour",
    titleTail: "you actually worked.",
    lead: "Client work lives in one tool, hours in another and invoices get rebuilt by hand every month. The gap between them is revenue you never billed.",
    today: [
      "Hours sit in a timesheet app with no link to the client they belong to",
      "Someone rebuilds each invoice from spreadsheets at month end",
      "Late payers are chased manually, when somebody remembers",
      "Work delivered in the last week of the month slips to next month's invoice",
    ],
    instead: [
      "Time is logged against the client project it belongs to, so the link already exists",
      "Approved work becomes an invoice without re-keying client or rate details",
      "Rates resolve by the date the work happened, not the date you invoice",
      "Reminders go out on their own once an invoice passes its due date",
    ],
    modules: [
      { label: "Time & projects", icon: Clock3, href: "/#module-time-projects" },
      { label: "Finance", icon: WalletCards, href: "/#module-finance" },
      { label: "People", icon: UsersRound, href: "/#module-people" },
    ],
  },
  {
    id: "consultancies",
    icon: Landmark,
    eyebrow: "For consultancies",
    title: "Know your margin",
    titleTail: "before the month closes.",
    lead: "Utilisation and project profitability are the two numbers that decide the year, and in most firms both arrive weeks late — assembled by hand, after the decisions were already made.",
    today: [
      "Who is on what lives in a spreadsheet that is right for about a day",
      "Utilisation is calculated at month end, too late to reassign anyone",
      "Retainer clients are invoiced manually on the same date every month",
      "Leave is approved without knowing what it does to a live engagement",
    ],
    instead: [
      "Consultant time lands against the engagement, so utilisation is a read, not a rebuild",
      "Managers see incomplete weeks while there is still time to chase them",
      "Retainers bill on a recurring schedule instead of a monthly reminder",
      "Leave requests carry the balance and the policy the approver needs",
    ],
    modules: [
      { label: "Time & projects", icon: Clock3, href: "/#module-time-projects" },
      { label: "Leave", icon: CalendarDays, href: "/#module-leave" },
      { label: "Finance", icon: WalletCards, href: "/#module-finance" },
    ],
  },
  {
    id: "insurance",
    icon: ShieldCheck,
    eyebrow: "For insurance teams",
    title: "Never find out a licence lapsed",
    titleTail: "from the regulator.",
    lead: "Licences, certifications and right-to-work dates decide who is legally allowed to work. When they live in a spreadsheet, the first sign of a problem is usually an audit.",
    today: [
      "Expiry dates sit in a spreadsheet nobody owns after the person who built it left",
      "Renewals are noticed late, so someone works a week they were not licensed for",
      "Proving compliance means reassembling evidence from email and folders",
      "A new hire's certifications are checked once and never checked again",
    ],
    instead: [
      "Every document with an expiry date is tracked against the employee record",
      "Approaching expiries surface while there is still time to renew",
      "Who approved what, and when, is recorded as it happens rather than reconstructed",
      "Candidates are hired and onboarded in the same place their documents are held",
    ],
    modules: [
      { label: "People", icon: UsersRound, href: "/#module-people" },
      { label: "Recruitment", icon: UserRoundCheck, href: "/#module-recruitment" },
      { label: "Crewzy AI", icon: Sparkles, href: "/#module-crewzy-ai" },
    ],
  },
];

/* Breadth is shown by naming industries, not by claiming "any industry" — a
   visitor from a construction firm needs to see the word, not be told they
   count. Grouped by the shape of the business rather than by sector, because
   the shape is what decides whether Crewzy actually fits. */
const INDUSTRY_SHAPES = [
  {
    id: "billable",
    icon: Briefcase,
    shape: "You sell your people's time",
    breaks: "Hours live in one tool and clients in another, so every invoice is rebuilt by hand.",
    industries: ["Agencies", "Consultancies", "IT services", "Software teams", "Architecture", "Legal", "Accounting", "Engineering", "Design studios", "Recruitment firms"],
    anchor: "#agencies",
    linkLabel: "See how this works",
  },
  {
    id: "regulated",
    icon: ShieldCheck,
    shape: "A certificate decides who can work",
    breaks: "Licences and renewals sit in a spreadsheet nobody owns, and lapses surface during an audit.",
    industries: ["Insurance", "Healthcare", "Clinics", "Construction", "Security services", "Care providers", "Facilities", "Training providers", "Logistics"],
    anchor: "#insurance",
    linkLabel: "See how this works",
  },
  {
    id: "growing",
    icon: UsersRound,
    shape: "You are growing and HR is still spreadsheets",
    breaks: "Onboarding, leave and documents are scattered across drives, inboxes and one very important spreadsheet.",
    industries: ["Startups", "Non-profits", "Education", "Real estate", "Manufacturing", "Professional services", "Franchise head office", "Scale-ups"],
    /* No deep segment for this shape yet, so it points at the module that
       solves it rather than at the nearest-but-wrong segment below. */
    anchor: "/#module-people",
    linkLabel: "See Core HR",
  },
];

function IndustryGrid() {
  return (
    <section className={styles.subSection} id="industries">
      <div className={styles.subSectionHead} data-reveal>
        <Eyebrow icon={UsersRound}>Who it is for</Eyebrow>
        <h2>Find the shape of your business, <span>not your industry code.</span></h2>
        <p>Crewzy is not built for one sector. It is built for a way of operating — and most companies recognise themselves in one of these three within a few seconds.</p>
      </div>
      <div className={styles.shapeGrid}>
        {INDUSTRY_SHAPES.map(({ id, icon: ShapeIcon, shape, breaks, industries, anchor, linkLabel }, index) => (
          <article id={id} key={id} data-reveal data-reveal-delay={String((index % 3) + 1)} data-scroll-zoom="card">
            <span><ShapeIcon size={19} /></span>
            <h3>{shape}</h3>
            <p>{breaks}</p>
            <ul>{industries.map(name => <li key={name}>{name}</li>)}</ul>
            <Link href={anchor}>{linkLabel} <ArrowRight size={15} /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function SegmentBlock({ segment }: { segment: Segment }) {
  const { icon: SegmentIcon } = segment;
  return (
    <section className={styles.subSegment} id={segment.id}>
      <div className={styles.subSegmentHead} data-reveal>
        <Eyebrow icon={SegmentIcon}>{segment.eyebrow}</Eyebrow>
        <h2>{segment.title} <span>{segment.titleTail}</span></h2>
        <p>{segment.lead}</p>
      </div>
      <div className={styles.subCompare} data-reveal="scale" data-scroll-zoom="panel">
        <div className={styles.subCompareToday}>
          <h3>Running on a stack of tools</h3>
          <ul>{segment.today.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className={styles.subCompareCrewzy}>
          <h3>Running on Crewzy</h3>
          <ul>{segment.instead.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
        </div>
      </div>
      <div className={styles.subModules} data-reveal>
        <small>Modules that carry this</small>
        <div>
          {segment.modules.map(({ label, icon: ModuleIcon, href }) => (
            <Link href={href} key={label}><span><ModuleIcon size={16} /></span>{label}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollMotion(pageRef, styles.revealed, styles.motionReady);

  return (
    <main className={styles.page} ref={pageRef}>
      <Header />
      <section className={styles.subHero}>
        <div className={styles.subHeroInner} data-reveal>
          <Eyebrow icon={Sparkles}>Solutions</Eyebrow>
          <h1>The same platform, shaped to <span>how you actually work.</span></h1>
          <p>Crewzy replaces the same stack everywhere — but what hurts most depends on what you sell. Here is where the disconnected tools cost each kind of company the most.</p>
          <nav className={styles.subJump} aria-label="Jump to a segment">
            <Link href="#industries">All industries</Link>
            {SEGMENTS.map(segment => <Link href={`#${segment.id}`} key={segment.id}>{segment.eyebrow.replace("For ", "")}</Link>)}
          </nav>
        </div>
      </section>

      {/* Breadth first so nobody bounces thinking it is not for them, then
          depth on the three we can speak about most precisely. */}
      <IndustryGrid />

      {SEGMENTS.map(segment => <SegmentBlock key={segment.id} segment={segment} />)}

      <section className={styles.subCta} data-reveal>
        <Eyebrow icon={FileCheck2} dark>Not on this list?</Eyebrow>
        <h2>Any company with employees runs <span>most of this already.</span></h2>
        <p>IT services, construction, healthcare staffing, professional services — if you employ people, track their time and bill for their work, the same stack of tools is costing you the same admin.</p>
        <div>
          <Link href={appUrl("/signup")}>Set up free workspace <ArrowRight size={18} /></Link>
          <Link href="mailto:sales@crewzy.io">Talk to us</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
