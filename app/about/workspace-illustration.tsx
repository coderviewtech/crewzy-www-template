"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Check, FileSpreadsheet, RotateCcw } from "lucide-react";
import { Brand } from "../brand";
import s from "./workspace-illustration.module.css";

const records = [
  { sheet: "Passport expiries", workspace: "Document dates" },
  { sheet: "Contract renewals", workspace: "Renewal dates" },
  { sheet: "Overtime hours", workspace: "Recorded hours" },
];
const paths = [
  "M0 34H8Q18 34 18 44V90Q18 100 28 100H40",
  "M0 100H40",
  "M0 166H8Q18 166 18 156V110Q18 100 28 100H40",
];
const itemStyle = (index: number) => ({ "--item": index }) as CSSProperties;

/** Concept illustration, not a screenshot or an automatic-import promise. */
export function WorkspaceIllustration() {
  const figure = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [run, setRun] = useState(0);
  const captionId = useId();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!motionAllowed || hasPlayed.current || !figure.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      hasPlayed.current = true;
      setRun(value => value + 1);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(figure.current);
    return () => observer.disconnect();
  }, [motionAllowed]);

  return (
    <figure ref={figure} className={s.figure} aria-labelledby={captionId}>
      <div key={run} className={s.stage} data-playing={motionAllowed && run > 0} aria-hidden="true">
        <div className={s.sheets}>
          {records.map(({ sheet }, index) => (
            <div key={sheet} className={s.sheet} style={itemStyle(index)}>
              <div className={s.sheetTitle}><FileSpreadsheet size={15} strokeWidth={1.8} /><span>{sheet}</span></div>
              <div className={s.cells}>{Array.from({ length: 8 }, (_, cell) => <i key={cell} />)}</div>
            </div>
          ))}
        </div>
        <svg className={s.connections} viewBox="0 0 40 200" fill="none" preserveAspectRatio="none">
          {paths.map((path, index) => <g key={path} style={itemStyle(index)}>
            <path className={s.track} d={path} />
            <path className={s.signal} d={path} pathLength="1" />
          </g>)}
        </svg>
        <div className={s.workspace}>
          <Brand className={s.brand} />
          <span className={s.workspaceLabel}>One workspace</span>
          <div className={s.records}>
            {records.map(({ workspace }, index) => (
              <div key={workspace} className={s.record} style={itemStyle(index)}>
                <span>{workspace}</span><Check className={s.check} size={13} strokeWidth={2.2} />
              </div>
            ))}
          </div>
          <span className={s.shared}><span />Together in Crewzy</span>
        </div>
      </div>
      <figcaption className={s.captionRow}>
        <span id={captionId}>From spreadsheets to one workspace.<span className={s.srOnly}> Passport expiry dates, contractor renewals and overtime hours, brought together in Crewzy.</span></span>
        {motionAllowed && <button className={s.replay} type="button" aria-label="Replay spreadsheet-to-workspace animation" onClick={() => setRun(value => value + 1)}><RotateCcw size={13} aria-hidden="true" /><span>Replay</span></button>}
      </figcaption>
    </figure>
  );
}
