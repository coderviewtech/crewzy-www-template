"use client";

import { useRef } from "react";
import { Bell, Check, CheckCheck, FileCheck2, FileText, Fingerprint, History, LockKeyhole, ShieldCheck, Upload, UsersRound } from "lucide-react";
import { complianceChapters } from "./compliance-model";
import s from "./compliance-workspace.module.css";

const chapterIcons = [ShieldCheck, FileCheck2, History];
const workspaceLocations = ["Documents", "Reviews", "Audit history"];

function PageChrome({ title }: { title: string }) {
  return <div className={s.pageChrome}>
    <span className={s.miniBrand}><UsersRound size={17} /> crewzy<span>.</span></span>
    <span className={s.pageLocation}><LockKeyhole size={13} />{title}</span>
    <strong className={s.workspaceName}>Northstar Studio</strong>
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
      {[["Professional certificate", "Daniel Brooks", "14 days"], ["Insurance document", "Amelia Khan", "30 days"], ["Training certificate", "Sophie Harris", "45 days"]].map(row => <div key={row[0]}><span className={s.fileIcon}><FileText size={19} /></span><span><strong>{row[0]}</strong><small>{row[1]}</small></span><span className={s.expiry}>{row[2]}</span></div>)}
    </div>
    <div className={s.pageFoot}><CheckCheck size={15} />Connected to each employee record</div>
  </>;

  if (index === 1) return <>
    <div className={s.pageHeading}><h4>A review with context</h4><span className={s.pendingBadge}>In review</span></div>
    <div className={s.filePreview}><span className={s.pdfIcon}><FileCheck2 size={28} /></span><div><strong>Professional certificate.pdf</strong><small>Renewal document · PDF</small></div><span className={s.version}>v2</span></div>
    <dl className={s.reviewFields}>
      <div><dt>Employee</dt><dd>Daniel Brooks</dd></div>
      <div><dt>Expiry date</dt><dd>22 October 2027</dd></div>
      <div><dt>Assigned reviewer</dt><dd><span className={s.avatar}>EW</span>Emma Wilson</dd></div>
    </dl>
    <div className={s.reviewPath}><span><Check size={14} />Uploaded</span><i /><span className={s.currentReview}><FileCheck2 size={14} />Review</span><i /><span><History size={14} />Evidence</span></div>
    <div className={s.permissionNote}><Fingerprint size={18} /><p>Maker-checker controls help prevent self-approval in sensitive workflows.</p></div>
  </>;

  return <>
    <div className={s.pageHeading}><h4>The evidence stays with it.</h4><span className={s.recordedBadge}><Check size={14} />Recorded</span></div>
    <div className={s.approved}><span><ShieldCheck size={27} /></span><div><strong>Renewal reviewed and approved</strong><small>Professional certificate · Daniel Brooks</small></div></div>
    <ol className={s.auditList}>
      {[{ Icon: Upload, title: "Renewal uploaded", name: "Daniel Brooks", time: "09:10" }, { Icon: FileCheck2, title: "Review approved", name: "Emma Wilson", time: "09:24" }, { Icon: History, title: "Evidence recorded", name: "Audit history", time: "09:24" }].map(item => <li key={item.title}><span><item.Icon size={17} /></span><div><strong>{item.title}</strong><small>{item.name}</small></div><time>{item.time}</time></li>)}
    </ol>
    <div className={s.evidenceFields}><span>Actor</span><span>Action</span><span>Result</span><span>Time</span><CheckCheck size={16} /></div>
  </>;
}

export function ComplianceWorkspace({ step, onStep }: { step: number; onStep: (index: number) => void }) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  return <section className={s.section} id="compliance" aria-labelledby="compliance-title">
    <header className={s.intro}>
      <div><span className={s.eyebrow}><ShieldCheck size={16} />COMPLIANCE, CONNECTED</span><h2 id="compliance-title">Compliance.<br /><span>A clearer picture.</span></h2></div>
      <p>From the first alert to the final review. Bring your documents, decisions and evidence into focus.</p>
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
              <span className={s.chapterIcon}><Icon size={28} strokeWidth={1.7} /></span>
              <span className={s.chapterLabel}>{chapter.shortTitle}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.description}</p>
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
    <p className={s.disclaimer}>Illustrative workflow. Compliance tools support your processes; they do not guarantee regulatory compliance.</p>
  </section>;
}
