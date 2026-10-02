"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";
import { Check, FileSpreadsheet } from "lucide-react";
import { Brand } from "../brand";
import { storyDuration, storyProgress } from "./workspace-illustration-motion";
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
  const stage = useRef<HTMLDivElement>(null);
  const captionId = useId();

  useEffect(() => {
    const element = figure.current;
    const visual = stage.current;
    if (!element || !visual) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    let visible = true;

    const render = () => {
      frame = null;
      if (preference.matches) return;
      const { top, height } = element.getBoundingClientRect();
      const progress = storyProgress(top, height, document.documentElement.clientHeight);
      visual.style.setProperty("--story-time", `${(progress * storyDuration).toFixed(4)}s`);
      visual.dataset.scrollMotion = "true";
    };
    const schedule = () => {
      if (!preference.matches && frame === null) frame = window.requestAnimationFrame(render);
    };
    const onScroll = () => { if (visible) schedule(); };
    const updatePreference = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      if (preference.matches) {
        delete visual.dataset.scrollMotion;
        visual.style.removeProperty("--story-time");
      } else schedule();
    };

    // Only measure during visible scrolling; one final update settles either
    // endpoint on exit. Browsers without this observer still follow scroll.
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      schedule();
    }) : null;
    observer?.observe(element);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", updatePreference);
    updatePreference();
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", updatePreference);
      if (frame !== null) window.cancelAnimationFrame(frame);
      delete visual.dataset.scrollMotion;
      visual.style.removeProperty("--story-time");
    };
  }, []);

  return (
    <figure ref={figure} className={s.figure} aria-labelledby={captionId}>
      <div ref={stage} className={s.stage} aria-hidden="true">
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
      </figcaption>
    </figure>
  );
}
