"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { adjacentTourTab } from "./tour-navigation";
import s from "./tour-tabs.module.css";

type TourTabsProps = {
  label: string;
  tabPrefix: string;
  panelPrefix: string;
  active: number;
  onSelect: (index: number) => void;
  items: { name: string; icon: ReactNode; accent?: string }[];
  moduleProgress?: boolean;
  indicator?: "tab" | "section";
  children?: ReactNode;
};

/** Shared colour-aware selection and keyboard/touch behavior for both tours. */
export function TourTabs({ label, tabPrefix, panelPrefix, active, onSelect, items, moduleProgress, indicator = "tab", children }: TourTabsProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useLayoutEffect(() => {
    const container = track.current;
    const viewport = scroller.current;
    const selected = tabs.current[active];
    const highlight = marker.current;
    if (!container || !viewport || !selected || !highlight) return;
    const measure = () => {
      highlight.style.width = `${selected.offsetWidth}px`;
      highlight.style.height = `${selected.offsetHeight}px`;
      highlight.style.transform = `translate(${selected.offsetLeft}px, ${selected.offsetTop}px)`;
      highlight.dataset.ready = "true";
      const left = selected.offsetLeft - (viewport.clientWidth - selected.offsetWidth) / 2;
      viewport.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(selected);
    measure();
    return () => observer.disconnect();
  }, [active]);
  return <div className={s.navigation} data-tour-navigation data-indicator={indicator}
    style={{ "--tour-accent": items[active]?.accent } as CSSProperties}>
    <div className={s.scroller} ref={scroller}>
      <div className={s.track} ref={track} role="tablist" aria-label={label}>
        <span className={s.selection} ref={marker} aria-hidden="true" />
        {items.map((item, index) => <button className={s.tab} key={item.name}
          style={{ "--tour-accent": item.accent } as CSSProperties}
          ref={node => { tabs.current[index] = node; }} role="tab"
          id={`${tabPrefix}-${index}`} aria-controls={`${panelPrefix}-${index}`}
          aria-selected={active === index} tabIndex={active === index ? 0 : -1}
          onClick={() => onSelect(index)} onKeyDown={event => {
            const next = adjacentTourTab(event.key, index, items.length);
            if (next === null) return;
            event.preventDefault(); onSelect(next); tabs.current[next]?.focus({ preventScroll: true });
          }}>
          <span className={s.icon}>{item.icon}</span><span>{item.name}</span>
          {moduleProgress && <span className={s.progress} aria-hidden="true"><i data-module-fill /></span>}
        </button>)}
      </div>
    </div>
    {children}
  </div>;
}
