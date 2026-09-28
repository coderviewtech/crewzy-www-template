import { CalendarDays, Check, ChevronDown, Clock3, LayoutDashboard, Search, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { modules, IconTile } from "./platform-tour";
import { weeklyHours, totalWeeklyHours, maxDailyHours } from "./dashboard-data";
import { previewIdentity } from "./preview-identity";
import { Brand } from "./brand";
import ui from "./dashboard-preview.module.css";

export function DashboardPreview() {
  return <div className={ui.dashboard} aria-label="Crewzy sample workspace" data-dashboard-ui>
    <aside className={ui.sidebar}>
      <Brand className={ui.brand} />
      <div className={ui.workspace}><span>{previewIdentity.workspaceMark}</span><div><strong>{previewIdentity.workspace}</strong><small>Team workspace</small></div><ChevronDown size={14} /></div>
      <div className={ui.navigation} aria-label="Illustrative workspace navigation">
        <div className={ui.current}><LayoutDashboard size={18} /><span>Overview</span></div>
        {modules.map((module, index) => <div key={module.name}><IconTile index={index} small /><span>{module.name}</span></div>)}
      </div>
      <div className={ui.account}><span className={ui.avatar}><UserRound size={17} aria-hidden="true" /></span><div><strong>{previewIdentity.owner}</strong><small>{previewIdentity.ownerRole}</small></div></div>
    </aside>
    <div className={ui.main}>
      <div className={ui.topbar}><span>Workspace <span aria-hidden="true">/</span><strong>Overview</strong></span><div><Search size={17} /><span className={ui.workspaceName}>{previewIdentity.workspace}</span><span className={ui.avatar} role="img" aria-label={previewIdentity.owner}><UserRound size={17} aria-hidden="true" /></span></div></div>
      <div className={ui.content}>
        <div className={ui.heading}><div><h2>Workspace overview</h2><p>People, time and documents</p></div><span className={ui.period}><CalendarDays size={15} />This week</span></div>
        <div className={ui.metrics}>
          <div><span>Employees <UsersRound size={17} /></span><strong>128</strong><small>Across 6 teams</small></div>
          <div><span>Hours recorded <Clock3 size={17} /></span><strong>{totalWeeklyHours.toLocaleString("en-GB")}</strong><small>This week</small></div>
          <div><span>Documents current <ShieldCheck size={17} /></span><strong>96<span>%</span></strong><small className={ui.warning}><i />3 reviews due</small></div>
        </div>
        <div className={ui.grid}>
          <section className={ui.hoursCard} aria-labelledby="hours-title">
            <div className={ui.cardHeading}><h3 id="hours-title">Recorded hours</h3><span>Mon–Fri</span></div>
            <div className={ui.chart} role="img" aria-label={`Recorded hours: ${weeklyHours.map(day => `${day.day} ${day.hours}`).join(", ")}. Total ${totalWeeklyHours}.`}>
              <div className={ui.axis} aria-hidden="true"><span>320</span><span>160</span><span>0</span></div>
              <div className={ui.plot} aria-hidden="true">
                {weeklyHours.map(day => <div className={ui.column} key={day.day}>
                  <div className={ui.barSlot}><div className={ui.barValue} style={{ height: `${day.hours / maxDailyHours * 100}%` }}><span>{day.hours}</span><i data-chart-bar /></div></div><span>{day.day}</span>
                </div>)}
              </div>
            </div>
            <div className={ui.chartFooter}><span><i />Recorded time</span><strong>{totalWeeklyHours.toLocaleString("en-GB")} hours</strong></div>
          </section>
          <section className={ui.queueCard} aria-labelledby="queue-title">
            <div className={ui.cardHeading}><h3 id="queue-title">Review queue</h3><span>3 categories</span></div>
            <ul className={ui.queue}>
              <li><IconTile index={5} small /><div><strong>Document reviews</strong><small>3 records need review</small></div><span className={ui.due}>Due</span></li>
              <li><IconTile index={3} small /><div><strong>Leave approvals</strong><small>2 requests awaiting approval</small></div><span className={ui.pending}>Pending</span></li>
              <li><IconTile index={2} small /><div><strong>Timesheet approvals</strong><small>Submitted for review</small></div><span className={ui.pending}>Pending</span></li>
            </ul>
            <div className={ui.queueFooter}><Check size={14} />Linked to employee records</div>
          </section>
        </div>
        <div className={ui.footer}><ShieldCheck size={14} />Workspace access is role-based<span>{previewIdentity.workspace}</span></div>
      </div>
    </div>
  </div>;
}
