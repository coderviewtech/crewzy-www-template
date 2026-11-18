"use client";

import { useEffect, type ReactNode } from "react";
import { BrainCircuit, UsersRound, type LucideIcon } from "lucide-react";
import styles from "./landing.module.css";

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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(item => {
        item.classList.add(revealedClass);
        item.dataset.revealVisible = "true";
      });
      return;
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

    return () => {
      observer.disconnect();
      if (scrollMotionFrame) window.cancelAnimationFrame(scrollMotionFrame);
      window.removeEventListener("scroll", requestScrollMotion);
      window.removeEventListener("resize", requestScrollMotion);
    };
  }, [pageRef, revealedClass, motionReadyClass]);
}
