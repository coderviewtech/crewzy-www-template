"use client";

import { useRef } from "react";
import { ArrowRight, BriefcaseBusiness, CalendarDays, Check, CheckCheck, Clock3, FileCheck2, LockKeyhole, ShieldCheck, UsersRound, WalletCards } from "lucide-react";
import styles from "./preview.module.css";
import tour from "./platform-tour.module.css";
import { previewIdentity } from "./preview-identity";
import { moduleSlugs } from "./site-config";

export const modules = [
  { name: "People", icon: UsersRound, color: "blue", title: "People, not paperwork.", emphasis: "not paperwork.", description: "Employee records, onboarding and documents. A shared source of truth for every stage of the employee journey." },
  { name: "Recruitment", icon: BriefcaseBusiness, color: "violet", title: "From first hello to first day.", emphasis: "to first day.", description: "Bring candidates, interviews and hiring decisions into the same workspace as the team they will join." },
  { name: "Time & projects", icon: Clock3, color: "amber", title: "Make every hour easier to manage.", emphasis: "easier to manage.", description: "Connect projects, timesheets and approvals so work moves forward without the weekly spreadsheet chase." },
  { name: "Leave", icon: CalendarDays, color: "rose", title: "Time off, without the back-and-forth.", emphasis: "without the back-and-forth.", description: "Keep leave requests, balances and approvals connected to each employee record." },
  { name: "Finance", icon: WalletCards, color: "teal", title: "Keep work and money connected.", emphasis: "money connected.", description: "Manage invoices, expenses and reminders alongside the people and projects behind them." },
  { name: "Compliance", icon: ShieldCheck, color: "green", title: "Stay ahead of what needs attention.", emphasis: "what needs attention.", description: "Bring documents, expiry dates, reviews and audit history together. Less searching. More visibility." },
];

export function IconTile({ index, small = false }: { index: number; small?: boolean }) { const item = modules[index]; return <span className={`${styles.iconTile} ${styles[item.color]} ${small ? styles.smallIcon : ""}`}><item.icon size={small ? 17 : 23} strokeWidth={1.8} /></span>; }
export const moduleExamples = [
  { label: "Your people", caption: "Employee records · 3 shown", columns: ["TEAM MEMBER", "TEAM", "STATUS"], rows: [["Sophie Harris", "Design", "Active"], ["Daniel Brooks", "Engineering", "Active"], ["Amelia Khan", "Operations", "Onboarding"]], notes: ["A shared employee record", "Connected onboarding and offboarding", "Documents where you need them"] },
  { label: "Hiring pipeline", caption: "3 active applications", columns: ["CANDIDATE", "ROLE", "STAGE"], rows: [["Alex Morgan", "Designer", "Interview"], ["Jamie Patel", "Developer", "Review"], ["Charlie Lee", "Operations", "Offer"]], notes: ["Candidates and applications together", "Interviews with shared context", "A clearer handover into onboarding"] },
  { label: "Time & projects", caption: "Recorded time by project", columns: ["PROJECT", "HOURS", "STATUS"], rows: [["Project Atlas", "32 hours", "Approved"], ["Brand refresh", "18 hours", "In review"], ["Website launch", "24 hours", "Submitted"]], notes: ["Projects connected to your people", "Timesheets without spreadsheet chasing", "Clear approval workflows"] },
  { label: "Team leave", caption: "Leave requests for the week", columns: ["TEAM MEMBER", "REQUEST", "STATUS"], rows: [["Sophie Harris", "2 days", "Approved"], ["Daniel Brooks", "1 day", "In review"], ["Amelia Khan", "3 days", "Approved"]], notes: ["Balances on the employee record", "Requests and approvals in one place", "Policies with shared visibility"] },
  { label: "Finance overview", caption: "Invoices and expenses", columns: ["RECORD", "AMOUNT", "STATUS"], rows: [["Invoice · Atlas", "£2,400", "Sent"], ["Travel expense", "£184", "In review"], ["Invoice · Studio", "£1,280", "Paid"]], notes: ["Invoices connected to projects", "Expenses ready for review", "Reminders without another tool"] },
  { label: "Document overview", caption: "Document status by owner", columns: ["DOCUMENT", "OWNER", "STATUS"], rows: [["Professional certificate", "Daniel", "Expiring"], ["Policy acknowledgement", "Sophie", "Current"], ["Insurance document", "Amelia", "In review"]], notes: ["Documents linked to employee records", "Visibility into upcoming expiry", "Reviews supported by audit history"] },
];


const accents = ["blue", "violet", "amber", "rose", "teal", "green"];

function statusClass(status: string) {
  if (["Active", "Approved", "Paid", "Current"].includes(status)) return tour.status;
  if (status === "Expiring" || status === "In review") return tour.attention;
  return tour.pending;
}

function Initials({ name }: { name: string }) {
  return <span className={tour.avatar}>{name.split(" ").map(part => part[0]).join("")}</span>;
}

/** Native, readable product views with shared employee context. */
function ModuleScreen({ index }: { index: number }) {
  const example = moduleExamples[index];
  if (index === 1) return <div className={tour.pipeline}>
    {[example.rows[1], example.rows[0], example.rows[2]].map(row => <div className={tour.pipelineColumn} key={row[0]}>
      <div className={tour.laneHeading}><i />{row[2]}<span>1</span></div>
      <div className={tour.candidate} data-module-detail><Initials name={row[0]} /><strong>{row[0]}</strong><small>{row[1]}</small></div>
      <div className={tour.lanePlaceholder} aria-hidden="true" />
    </div>)}
  </div>;
  if (index === 2) return <div className={tour.projects}>
    {example.rows.map(row => <div className={tour.project} key={row[0]} data-module-detail>
      <div><span><Clock3 size={15} />{row[0]}</span><strong>{row[1]}</strong></div>
      <div className={tour.hoursTrack}><i style={{ width: `${parseInt(row[1], 10) / 40 * 100}%` }} /></div>
      <small>{row[2]}<span>Project timesheet</span></small>
    </div>)}
  </div>;
  if (index === 3) return <div className={tour.calendar}>
    <div className={tour.calendarHeading}><span>Team availability</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span></div>
    {example.rows.map((row, position) => <div className={tour.calendarRow} key={row[0]} data-module-detail>
      <span><Initials name={row[0]} />{row[0].split(" ")[0]}<small>{row[2]}</small></span>
      <div className={tour.calendarDays}><span style={{ gridColumn: `${position === 1 ? 4 : 2} / span ${parseInt(row[1], 10)}` }}>{row[1]}</span></div>
    </div>)}
    <div className={tour.calendarKey}><i />Requested time off<span>Illustrative week</span></div>
  </div>;
  if (index === 5) return <div className={tour.documents}>
    {example.rows.map(row => <div className={tour.document} key={row[0]} data-module-detail>
      <span className={tour.fileIcon}><FileCheck2 size={21} /></span><div><strong>{row[0]}</strong><small>Employee record · {row[1]}</small></div>
      <span className={statusClass(row[2])}>{row[2]}</span>
    </div>)}
  </div>;
  return <div className={tour.records}>
    <div className={tour.recordHeading}>{example.columns.map(column => <span key={column}>{column}</span>)}</div>
    {example.rows.map(row => <div className={tour.record} key={row[0]} data-module-detail>
      <span>{index === 0 ? <Initials name={row[0]} /> : <span className={tour.fileIcon}><WalletCards size={17} /></span>}<strong>{row[0]}</strong></span>
      <span>{row[1]}</span><span className={statusClass(row[2])}>{row[2]}</span>
    </div>)}
  </div>;
}

export function PlatformExplorer({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  return <div className={tour.tour}>
    {moduleSlugs.map(slug => <span key={slug} id={`module-${slug}`} className={tour.anchor} aria-hidden="true" />)}
    <div className={tour.pin} data-module-pin>
      <div className={tour.tabs} role="tablist" aria-label="Explore Crewzy modules">
        {modules.map((module, index) => <button className={tour[accents[index]]} key={module.name} ref={node => { tabRefs.current[index] = node; }} role="tab" id={`module-tab-${index}`} aria-controls={`module-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => onSelect(index)} onKeyDown={event => {
          let next = index;
          if (event.key === "ArrowRight") next = (index + 1) % modules.length;
          else if (event.key === "ArrowLeft") next = (index + modules.length - 1) % modules.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = modules.length - 1;
          else return;
          event.preventDefault(); onSelect(next); tabRefs.current[next]?.focus({ preventScroll: true });
        }}><IconTile index={index} small /><span>{module.name}</span><span className={tour.tabTrack} aria-hidden="true"><i data-module-fill /></span></button>)}
      </div>
      <div className={tour.frame}>
        <div className={tour.viewport} id="module-panel">
          {modules.map((item, index) => <div className={`${tour.panel} ${tour[accents[index]]}`} style={{ zIndex: index + 1 }} key={item.name} role="tabpanel" id={`module-panel-${index}`} aria-labelledby={`module-tab-${index}`} aria-hidden={active !== index} inert={active !== index} tabIndex={active === index ? 0 : -1} data-module-page data-active={active === index}>
            <div className={tour.copy}>
              <span className={tour.chapterLabel}>{item.name}</span>
              <h3>{item.title.slice(0, -item.emphasis.length)}<span>{item.emphasis}</span></h3><p>{item.description}</p>
              <ul>{moduleExamples[index].notes.map(note => <li key={note}><Check size={15} />{note}</li>)}</ul>
              <a className={tour.moduleAction} href={index === 5 ? "#compliance" : `/platform#${moduleSlugs[index]}`}>{index === 5 ? "Explore the compliance workflow" : `Explore ${item.name.toLowerCase()}`}<ArrowRight size={16} /></a>
            </div>
            <div className={tour.canvas}>
              <div className={tour.window}>
                <div className={tour.windowBar}><span><span className={tour.workspaceDot} />{item.name}</span><strong className={tour.workspaceName}>{previewIdentity.workspace}</strong></div>
                <div className={tour.windowHeading}><IconTile index={index} small /><h4>{moduleExamples[index].label}</h4><span>Overview</span></div>
                <p>{moduleExamples[index].caption}</p>
                <ModuleScreen index={index} />
                <div className={tour.windowFooter}><LockKeyhole size={12} />Connected to your workspace permissions</div>
              </div>
            </div>
          </div>)}
        </div>
        <div className={tour.sharedRail}><span><UsersRound size={16} />Single source of truth</span><span className={tour.railLine} aria-hidden="true" /><span><CheckCheck size={16} />Cross-module workflows</span><span className={tour.railLine} aria-hidden="true" /><span><ShieldCheck size={16} />Continuous audit trail</span></div>
      </div>
    </div>
  </div>;
}
