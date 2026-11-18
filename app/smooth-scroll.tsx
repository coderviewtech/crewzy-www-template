"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { cancelSmoothScroll, samePageFragment, scrollToMeasuredTarget, shouldCancelScrollForKey } from "./anchor-navigation";

gsap.registerPlugin(ScrollTrigger);
const ScrollContext = createContext<RefObject<Lenis | null> | null>(null);

export function useSmoothScroll() {
  const scroller = useContext(ScrollContext);
  if (!scroller) throw new Error("Smooth scrolling requires SmoothScrollProvider");
  return scroller;
}

/** One document scroll engine, shared by all public routes and GSAP scenes. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const scroller = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const tick = (seconds: number) => scroller.current?.raf(seconds * 1000);
    const release = () => {
      gsap.ticker.remove(tick);
      scroller.current?.off("scroll", ScrollTrigger.update);
      scroller.current?.destroy();
      scroller.current = null;
    };
    const configure = () => {
      release();
      if (!motion.matches) return;
      scroller.current = new Lenis({ duration: .85, smoothWheel: true, syncTouch: false, anchors: false });
      scroller.current.on("scroll", ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
      gsap.ticker.add(tick);
    };
    configure();
    motion.addEventListener("change", configure);

    // The homepage owns virtual module hashes and pinned chapter positions.
    // Other pages share this handler, with CSS providing header clearance.
    const onAnchorClick = (event: MouseEvent) => {
      if (pathname === "/" || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const fragment = samePageFragment(link.href, window.location.href);
      if (!fragment) return;
      const target = document.getElementById(fragment.id);
      if (!target) return;
      event.preventDefault();
      if (window.location.hash !== fragment.hash) history.pushState(history.state, "", fragment.hash);
      if (scroller.current) scrollToMeasuredTarget(scroller.current, target, { duration: .7 });
      else target.scrollIntoView({ behavior: "instant", block: "start" });
    };
    // Let native history/Next restore position without a stale animation.
    const cancelScroll = () => {
      if (scroller.current) cancelSmoothScroll(scroller.current);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (shouldCancelScrollForKey(event)) cancelScroll();
    };
    document.addEventListener("click", onAnchorClick);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", cancelScroll);
    return () => {
      document.removeEventListener("click", onAnchorClick);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", cancelScroll);
      motion.removeEventListener("change", configure);
      release();
    };
  }, [pathname]);

  return <ScrollContext.Provider value={scroller}>{children}</ScrollContext.Provider>;
}
