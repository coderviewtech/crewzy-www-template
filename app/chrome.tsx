"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { BrainCircuit, UsersRound, type LucideIcon } from "lucide-react";
import styles from "./landing.module.css";
import { scrollToMeasuredTarget } from "./anchor-navigation";

export { appUrl } from "./site-config";
export { SiteHeader as Header, SiteFooter as Footer } from "./site-shell";
export const BrandIcon = UsersRound;
export const CrewzyAiIcon = BrainCircuit;

export function Eyebrow({ icon: Icon, children, dark = false }: { icon: LucideIcon; children: ReactNode; dark?: boolean }) {
  return <div className={`${styles.eyebrow} ${dark ? styles.eyebrowDark : ""}`}><Icon size={14} />{children}</div>;
}

/* Scroll-reveal + scroll-zoom, extracted so every page animates identically.
   Honours prefers-reduced-motion by revealing everything up front. */
export function useScrollMotion(pageRef: React.RefObject<HTMLElement | null>, revealedClass: string, motionReadyClass: string) {
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-reveal]"));
    const zoomItems = Array.from(page.querySelectorAll<HTMLElement>("[data-scroll-zoom]"));
    const documentRoot = document.documentElement;
    const previousScrollBehavior = documentRoot.style.scrollBehavior;
    const previousScrollPadding = documentRoot.style.scrollPaddingTop;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const restoreScrollSettings = () => {
      documentRoot.style.scrollBehavior = previousScrollBehavior;
      documentRoot.style.scrollPaddingTop = previousScrollPadding;
    };

    // Section/card scroll-margin-top is the single source of header clearance.
    // Adding root scroll-padding and another Lenis offset used to triple it.

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(item => {
        item.classList.add(revealedClass);
        item.dataset.revealVisible = "true";
      });
      return restoreScrollSettings;
    }

    page.classList.add(motionReadyClass);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const item = entry.target as HTMLElement;
        item.classList.add(revealedClass);
        item.dataset.revealVisible = "true";
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.12 });

    const revealVisibleItems = () => {
      const revealBoundary = window.innerHeight * 0.94;
      revealItems.forEach(item => {
        if (item.dataset.revealVisible === "true") return;
        const bounds = item.getBoundingClientRect();
        if (bounds.top < revealBoundary && bounds.bottom > 0) {
          item.classList.add(revealedClass);
          item.dataset.revealVisible = "true";
        }
      });
    };

    const updateZoomItems = () => {
      const viewportHeight = window.innerHeight;
      const entryDistance = Math.max(viewportHeight * 0.72, 1);

      zoomItems.forEach(item => {
        const bounds = item.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (viewportHeight - bounds.top) / entryDistance));
        const mode = item.dataset.scrollZoom;
        const startScale = mode === "hero" ? 0.94 : mode === "card" ? 0.985 : 0.975;
        const startOffset = mode === "hero" ? 36 : mode === "card" ? 12 : 20;
        const startRotation = mode === "hero" ? 4 : mode === "card" ? 1.2 : 2.5;
        item.style.setProperty("--scroll-scale", (startScale + (1 - startScale) * progress).toFixed(4));
        item.style.setProperty("--scroll-y", `${(startOffset * (1 - progress)).toFixed(2)}px`);
        item.style.setProperty("--scroll-rotate", `${(startRotation * (1 - progress)).toFixed(2)}deg`);
      });
    };

    let scrollMotionFrame = 0;
    const updateScrollMotion = () => {
      scrollMotionFrame = 0;
      revealVisibleItems();
      updateZoomItems();
    };
    const requestScrollMotion = () => {
      if (scrollMotionFrame) return;
      scrollMotionFrame = window.requestAnimationFrame(updateScrollMotion);
    };

    revealItems.forEach(item => observer.observe(item));
    scrollMotionFrame = window.requestAnimationFrame(updateScrollMotion);
    window.addEventListener("scroll", requestScrollMotion, { passive: true });
    window.addEventListener("resize", requestScrollMotion);

    // Inertia scroll. This is the single biggest "premium feel" lever — the
    // page decelerates with weight instead of stopping dead. Lenis drives real
    // scroll, so the reveal/zoom system above keeps working unchanged; we just
    // also nudge it on every Lenis frame so the parallax stays in lock-step.
    const lenis = new Lenis({
      duration: 1.05,
      // easeOutExpo — quick to respond, long gentle settle. Matches the reveal
      // curve so scroll and content share one motion character.
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
    });
    // Exposed so in-page components (e.g. the Platform-menu module select) can
    // scroll through the same smooth engine instead of a native jump.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", requestScrollMotion);

    let lenisFrame = 0;
    const runLenis = (time: number) => {
      lenis.raf(time);
      lenisFrame = window.requestAnimationFrame(runLenis);
    };
    lenisFrame = window.requestAnimationFrame(runLenis);

    // Route in-page anchor clicks through Lenis so #section jumps glide too,
    // with the same header offset the CSS uses. External and same-page module
    // deep-links (handled elsewhere) are left alone.
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return;
      const target = url.hash && url.hash.length > 1 ? document.getElementById(url.hash.slice(1)) : null;
      if (!target) return;
      event.preventDefault();
      scrollToMeasuredTarget(lenis, target);
      if (window.location.hash !== url.hash) history.pushState(history.state, "", url.hash);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      observer.disconnect();
      if (scrollMotionFrame) window.cancelAnimationFrame(scrollMotionFrame);
      if (lenisFrame) window.cancelAnimationFrame(lenisFrame);
      lenis.destroy();
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("scroll", requestScrollMotion);
      window.removeEventListener("resize", requestScrollMotion);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      restoreScrollSettings();
    };
  }, [pageRef, revealedClass, motionReadyClass]);
}
