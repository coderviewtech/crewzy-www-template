"use client";

import { useRef } from "react";
import { Bell, Check, CheckCheck, FileCheck2, FileText, Fingerprint, History, LockKeyhole, ShieldCheck, Upload, UserRound } from "lucide-react";
import { complianceChapters } from "./compliance-model";
import { SectionHeading } from "./section-heading";
import { previewIdentity } from "./preview-identity";
import { Brand } from "./brand";
import s from "./compliance-workspace.module.css";

const chapterIcons = [ShieldCheck, FileCheck2, History];
const workspaceLocations = ["Documents", "Reviews", "Audit history"];

function PageChrome({ title }: { title: string }) {
  return <div className={s.pageChrome}>
    <Brand className={s.miniBrand} />
    <span className={s.pageLocation}><LockKeyhole size={13} />{title}</span>
    <strong className={s.workspaceName}>{previewIdentity.workspace}</strong>
  </div>;
}

function WorkspaceContent({ index }: { index: number }) {
  if (index === 0) return <>
    <div className={s.pageHeading}><h4>Document oversight</h4><span className={s.workspaceBadge}>Overview</span></div>
    <div className={s.metrics}>
      <div><span>Current</span><strong>72 <ShieldCheck size={17} /></strong></div>
      <div><span>Expiring soon</span><strong>3 <Bell size={17} /></strong></div>
      <div><span>In review</span><strong>2 <FileCheck2 size={17} /></strong></div>
    </div>
    <div className={s.listHeading}><strong>Coming up for renewal</strong><span>Expiry</span></div>
    <div className={s.documentList}>
      {[["Professional certificate", "Daniel Brooks", "14 days"], ["Insurance document", "Amelia Khan", "30 days"], ["Training certificate", "Sophie Harris", "45 days"]].map((row, index) => <div key={row[0]}><span className={s.fileIcon}><FileText size={19} /></span><span><strong>{row[0]}</strong><small>{row[1]}</small></span><span className={s.expiry} data-soon={index === 0}>{row[2]}</span></div>)}
    </div>
    <div className={s.pageFoot}><CheckCheck size={15} />Connected to each employee record</div>
  </>;

  if (index === 1) return <>
    <div className={s.pageHeading}><h4>A review with context</h4><span className={s.pendingBadge}>In review</span></div>
    <div className={s.filePreview}><span className={s.pdfIcon}><FileCheck2 size={28} /></span><div><strong>Professional certificate.pdf</strong><small>Renewal document · PDF</small></div><span className={s.version}>v2</span></div>
    <dl className={s.reviewFields}>
      <div><dt>Employee</dt><dd>Daniel Brooks</dd></div>
      <div><dt>Expiry date</dt><dd>22 October 2027</dd></div>
      <div><dt>Assigned reviewer</dt><dd><span className={s.avatar}><UserRound size={14} aria-hidden="true" /></span>{previewIdentity.reviewer}</dd></div>
    </dl>
    <div className={s.reviewPath}><span><Check size={14} />Uploaded</span><i /><span className={s.currentReview}><FileCheck2 size={14} />Review</span><i /><span><History size={14} />Evidence</span></div>
    <div className={s.permissionNote}><Fingerprint size={18} /><p>Maker-checker controls help prevent self-approval in sensitive workflows.</p></div>
  </>;

  return <>
    <div className={s.pageHeading}><h4>The evidence stays with it.</h4><span className={s.recordedBadge}><Check size={14} />Recorded</span></div>
    <div className={s.approved}><span><ShieldCheck size={27} /></span><div><strong>Renewal reviewed and approved</strong><small>Professional certificate · Daniel Brooks</small></div></div>
    <ol className={s.auditList}>
      {[{ Icon: Upload, title: "Renewal uploaded", name: "Daniel Brooks", time: "09:10" }, { Icon: FileCheck2, title: "Review approved", name: previewIdentity.reviewer, time: "09:24" }, { Icon: History, title: "Evidence recorded", name: "Audit history", time: "09:24" }].map(item => <li key={item.title}><span><item.Icon size={17} /></span><div><strong>{item.title}</strong><small>{item.name}</small></div><time>{item.time}</time></li>)}
    </ol>
    <div className={s.evidenceFields}><span>Actor</span><span>Action</span><span>Result</span><span>Time</span><CheckCheck size={16} /></div>
  </>;
}

export function ComplianceWorkspace({ step, onStep }: { step: number; onStep: (index: number) => void }) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  return <section className={s.section} id="compliance" aria-labelledby="compliance-title">
    <div className={s.story} data-compliance-story>
    <header className={s.intro} data-story-intro>
      <SectionHeading label="Compliance, connected" title="Compliance." emphasis="A clearer picture." description="From the first alert to the final review. Bring your documents, decisions and evidence into focus." id="compliance-title" />
    </header>
    <div className={s.pin} data-story-pin>
      <div className={s.chapters} role="tablist" aria-label="Compliance workspace pages">
        {complianceChapters.map((chapter, index) => {
          const Icon = chapterIcons[index];
          return <button key={chapter.label} ref={node => { tabRefs.current[index] = node; }} role="tab" id={"compliance-tab-" + index} aria-selected={step === index} aria-controls={"compliance-page-" + index} tabIndex={step === index ? 0 : -1} onClick={() => onStep(index)} onKeyDown={event => {
            let next = index;
            if (event.key === "ArrowRight") next = (index + 1) % complianceChapters.length;
            else if (event.key === "ArrowLeft") next = (index + complianceChapters.length - 1) % complianceChapters.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = complianceChapters.length - 1;
            else return;
            event.preventDefault(); onStep(next); tabRefs.current[next]?.focus({ preventScroll: true });
          }}><Icon size={19} /><span>{chapter.shortTitle}</span></button>;
        })}
      </div>
      <div className={s.readingTrack} aria-hidden="true"><span data-story-progress /></div>
      <div className={s.deckViewport} data-stack-visual data-stack-viewport>
        {complianceChapters.map((chapter, index) => {
          const Icon = chapterIcons[index];
          return <section className={s.workspacePage} style={{ zIndex: index + 1 }} data-stack-page key={chapter.label} id={"compliance-page-" + index} role="tabpanel" aria-labelledby={"compliance-tab-" + index} aria-hidden={step !== index} inert={step !== index} tabIndex={step === index ? 0 : -1}>
            <div className={s.chapterCopy}>
              <div className={s.chapterHeading}>
                <span className={s.chapterIcon}><Icon size={28} strokeWidth={1.7} aria-hidden="true" /></span>
                <span className={s.chapterLabel}>{chapter.shortTitle}</span>
              </div>
              <h3>{chapter.title.slice(0, -chapter.emphasis.length)}<span>{chapter.emphasis}</span></h3>
              <ul className={s.chapterPoints} role="list">
                {chapter.points.map(point => <li key={point}><Check size={18} aria-hidden="true" /><span>{point}</span></li>)}
              </ul>
            </div>
            <div className={s.workspaceCanvas}>
              <div className={s.workspaceWindow}>
                <PageChrome title={workspaceLocations[index]} />
                <div className={s.pageBody}><WorkspaceContent index={index} /></div>
              </div>
            </div>
          </section>;
        })}
      </div>
    </div>
    </div>
  </section>;
}
