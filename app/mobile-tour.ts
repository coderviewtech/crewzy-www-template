import { useSyncExternalStore, type RefObject } from "react";
import type Lenis from "lenis";
import { chapterAtReadingLine, mobileTourQuery } from "./tour-navigation";
import { scrollToMeasuredTarget } from "./anchor-navigation";

function subscribeMobile(listener: () => void) {
  const query = window.matchMedia(mobileTourQuery);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}
const isMobile = () => window.matchMedia(mobileTourQuery).matches;
const serverMobile = () => false;

/** Mobile chapters stay in the document, including for assistive technology. */
export function useMobileTourLayout() {
  return useSyncExternalStore(subscribeMobile, isMobile, serverMobile);
}

/** Native vertical reading; only tab navigation requests an animated scroll. */
export function mountMobileTour(
  pin: HTMLElement, panels: HTMLElement[], onChange: (index: number) => void,
  scroller: RefObject<Lenis | null>,
) {
  let frame = 0;
  let previous = -1;
  const readingLine = () => Number.parseFloat(getComputedStyle(panels[0]).scrollMarginTop);
  const update = () => {
    frame = 0;
    const next = chapterAtReadingLine(panels.map(panel => panel.getBoundingClientRect().top), Math.ceil(readingLine()));
    if (next !== previous) { previous = next; onChange(next); }
  };
  const queueUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
  const observer = new ResizeObserver(queueUpdate);
  observer.observe(pin);
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  queueUpdate();
  return {
    navigate(index: number, immediate = false) {
      const panel = panels[index];
      if (!panel) return;
      const position = window.scrollY + panel.getBoundingClientRect().top - readingLine();
      if (scroller.current) scrollToMeasuredTarget(scroller.current, position, { immediate });
      else window.scrollTo({ top: position, behavior: immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    },
    destroy() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    },
  };
}
