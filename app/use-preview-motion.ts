"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { complianceCanPin, complianceChapters, complianceDepth, complianceDuration, complianceStepAt, complianceTransitionDuration, complianceTransitions } from "./compliance-model";
import { platformCadence, platformChapters, platformDepth, platformStepAt, platformTransitionDuration, platformTransitions } from "./platform-model";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** One animation clock and one native document scroller; no iframe bridge. */
export function usePreviewMotion(
  root: RefObject<HTMLDivElement | null>,
  setStep: Dispatch<SetStateAction<number>>,
  navigateStep: RefObject<((index: number) => void) | null>,
  setModule: Dispatch<SetStateAction<number>>,
  navigateModule: RefObject<((index: number) => void) | null>,
) {
  useGSAP(() => {
    if (!root.current) return;
    const select = gsap.utils.selector(root);
    const media = gsap.matchMedia();
    let lenis: Lenis | undefined;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: { offset: -110 } });
      const scrollEngine = lenis;
      const tick = (seconds: number) => scrollEngine.raf(seconds * 1000);
      scrollEngine.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);

      gsap.fromTo(select("[data-page-progress]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true } });
      if (window.scrollY < 180) gsap.from(select("[data-hero-enter]"), { y: 24, autoAlpha: 0, duration: .85, stagger: .09, ease: "power3.out", clearProps: "all" });
      select("[data-reveal]").forEach((element: HTMLElement) => {
        gsap.from(element, { y: 32, autoAlpha: 0, duration: .75, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 94%", toggleActions: "play none none reverse" } });
      });
      // A short entrance finishes at native size; never scrub the dashboard text.
      gsap.from(select("[data-product-frame]"), { y: 20, opacity: 0, force3D: false,
        duration: .65, ease: "power2.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: "[data-product-stage]", start: "top 88%", once: true },
      });

      select("[data-scroll-zoom]").forEach((element: HTMLElement) => {
        const image = element.dataset.scrollZoom === "image";
        const trigger = element.closest("[data-zoom-section]") ?? element;
        if (!image) {
          gsap.from(element, { y: 16, force3D: false, duration: .55, ease: "power2.out", clearProps: "transform",
            scrollTrigger: { trigger, start: "top 88%", once: true },
          });
          return;
        }
        gsap.timeline({ scrollTrigger: { trigger, start: "top 92%", end: "bottom 8%", scrub: .7 } })
          .fromTo(element, { scale: image ? 1.13 : .93, y: image ? 0 : 18 }, { scale: 1, y: 0, duration: .7, ease: "none" })
          .to(element, { scale: image ? 1.025 : .97, y: image ? 0 : -10, duration: .3, ease: "none" });
      });
      gsap.from(select("[data-chart-bar]"), { scaleY: .15, duration: 1, stagger: .06, ease: "power2.out", scrollTrigger: { trigger: "[data-product-stage]", start: "top 65%", toggleActions: "play none none reverse" } });

      // A short, reversible diagram sequence. No perpetual decorative loop.
      const connection = select("[data-connection-section]")[0];
      if (connection) {
        const lines = select("[data-connection-line]");
        const nodes = select("[data-connection-node]");
        gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
        const connected = gsap.timeline({
          scrollTrigger: { trigger: connection, start: "top 88%", end: "bottom 68%", scrub: .65, invalidateOnRefresh: true },
        });
        connected.from(nodes, {
          x: (_index: number, node: HTMLElement) => node.dataset.connectionSide === "left" ? -22 : 22,
          y: 12, autoAlpha: 0, duration: .65, stagger: .055, ease: "power2.out",
        }, 0)
          .from(select("[data-connection-core]"), { scale: .94, duration: .7, ease: "power2.out" }, .2)
          .to(lines, { strokeDashoffset: 0, duration: .8, stagger: (index: number) => (index % 6) * .045, ease: "power1.inOut" }, .35)
          .from(select("[data-connection-ready]"), { y: 5, autoAlpha: 0, duration: .4, ease: "power2.out" }, 1.05);
      }
      return () => {
        gsap.ticker.remove(tick);
        scrollEngine.off("scroll", ScrollTrigger.update);
        scrollEngine.destroy();
        if (lenis === scrollEngine) lenis = undefined;
      };
    });

    // Create this pin before the compliance pin: both share native page scrolling.
    media.add({ wide: "(min-width: 761px)", tall: "(min-height: 680px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions?.wide || !context.conditions?.tall || !context.conditions?.motion) return;
      const pin = select("[data-module-pin]")[0] as HTMLElement | undefined;
      const panels = select("[data-module-page]") as HTMLElement[];
      const fills = select("[data-module-fill]");
      // Fall back to ordinary tabs when zoomed text or a short viewport cannot fit.
      if (!pin || panels.length !== platformChapters.length || pin.offsetHeight > window.innerHeight - 112) return;
      pin.dataset.moduleMode = "scroll";
      setModule(0);
      gsap.set(fills, { scaleX: 0, transformOrigin: "left" });
      // Each complete module is a card. Only recessed cards scale; the incoming
      // and active product interface stay at native size without 3D rasterizing.
      gsap.set(panels, { autoAlpha: 1, y: 0, yPercent: 112, scale: platformDepth.active, transformOrigin: "50% 0%", force3D: false });
      gsap.set(panels[0], { yPercent: 0 });
      let previousModule = -1;
      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          id: "crewzy-platform-tour", trigger: pin, pin: true, start: "top 100px",
          end: () => `+=${Math.min(3000, Math.max(2400, window.innerHeight * 3.2))}`,
          scrub: .55, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 2,
        },
        onUpdate: () => {
          const next = platformStepAt(timeline.time(), previousModule);
          if (next !== previousModule) { previousModule = next; setModule(next); }
        },
      });
      platformChapters.forEach((chapter, index) => {
        timeline.addLabel(chapter.label, chapter.time)
          .to(fills[index], { scaleX: 1, duration: platformCadence, ease: "none" }, index * platformCadence);
      });
      platformTransitions.forEach(({ from, to, start }) => {
        timeline.to(panels[from], { y: -24, scale: platformDepth.previous, duration: platformTransitionDuration }, start)
          .to(panels[to], { yPercent: 0, duration: platformTransitionDuration }, start);
        if (from > 0) timeline.to(panels[from - 1], { y: -44, scale: platformDepth.oldest, duration: platformTransitionDuration }, start);
        // Two visible backplates are enough to communicate depth. Older cards
        // retire underneath them, and restore naturally when scrolling upward.
        if (from > 1) timeline.to(panels[from - 2], { autoAlpha: 0, duration: platformTransitionDuration }, start);
      });
      navigateModule.current = (index: number) => {
        const chapter = platformChapters[index];
        const trigger = timeline.scrollTrigger;
        if (!chapter || !trigger) return;
        const position = trigger.labelToScroll(chapter.label);
        if (lenis) lenis.scrollTo(position, { duration: .7 });
        else window.scrollTo({ top: position, behavior: "smooth" });
      };
      return () => { navigateModule.current = null; delete pin.dataset.moduleMode; };
    });

    media.add({ tall: "(min-height: 680px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions?.tall || !context.conditions?.motion) return;
      const panels = select("[data-stack-page]");
      const pin = select("[data-story-pin]")[0];
      // The explanation and its data now travel inside the same full-width
      // card. Pin the complete stage only when all its content can fit.
      if (!pin || panels.length !== 3 || !complianceCanPin(window.innerHeight, pin.offsetHeight)) return;
      pin.dataset.stackMode = "scroll";
      setStep(0);
      gsap.set(panels, { autoAlpha: 1, x: 0, y: 0, yPercent: 112, scale: complianceDepth.active, transformOrigin: "50% 0%", rotation: 0, force3D: false });
      gsap.set(panels[0], { yPercent: 0, scale: complianceDepth.active, rotation: 0 });
      let previousStep = -1;
      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          id: "crewzy-compliance-story", trigger: pin, pin: true, start: "top 100px",
          end: () => `+=${Math.max(1800, window.innerHeight * 2.7)}`,
          scrub: .55, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1,
        },
        onUpdate: () => {
          const next = complianceStepAt(timeline.time(), previousStep);
          if (next !== previousStep) { previousStep = next; setStep(next); }
        },
      });
      timeline.to(select("[data-story-progress]"), { scaleX: 1, duration: complianceDuration, ease: "none" }, 0);
      complianceTransitions.forEach(({ from, to, start }) => {
        timeline.to(panels[from], { y: -24, scale: complianceDepth.previous, duration: complianceTransitionDuration }, start)
          .to(panels[to], { yPercent: 0, scale: complianceDepth.active, rotation: 0, duration: complianceTransitionDuration }, start);
        if (from > 0) timeline.to(panels[from - 1], { y: -42, scale: complianceDepth.oldest, duration: complianceTransitionDuration }, start);
      });
      complianceChapters.forEach(chapter => timeline.addLabel(chapter.label, chapter.time));
      navigateStep.current = (index: number) => {
        const chapter = complianceChapters[index];
        const trigger = timeline.scrollTrigger;
        if (!chapter || !trigger) return;
        const position = trigger.labelToScroll(chapter.label);
        if (lenis) lenis.scrollTo(position + (index === 0 ? 4 : 0), { duration: .8 });
        else window.scrollTo({ top: position, behavior: "smooth" });
      };
      return () => { navigateStep.current = null; delete pin.dataset.stackMode; };
    });

    let disposed = false;
    let layoutFrame = 0;
    const modulePanel = root.current.querySelector("#module-panel");
    const modulePin = select("[data-module-pin]")[0] as HTMLElement | undefined;
    const storyViewport = select("[data-stack-viewport]")[0] as HTMLElement | undefined;
    const storyPin = select("[data-story-pin]")[0] as HTMLElement | undefined;
    const queueLayoutCheck = () => {
      cancelAnimationFrame(layoutFrame);
      layoutFrame = requestAnimationFrame(() => {
        if (disposed) return;
        const canPin = !!modulePin && window.matchMedia("(min-width: 761px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)").matches
          && modulePin.offsetHeight <= window.innerHeight - 112;
        const canPinStory = !!storyPin && window.matchMedia("(prefers-reduced-motion: no-preference)").matches
          && complianceCanPin(window.innerHeight, storyPin.offsetHeight);
        // Re-evaluate the fit guard after font loading, text zoom or window resize.
        if (canPin !== (modulePin?.dataset.moduleMode === "scroll") || canPinStory !== (storyPin?.dataset.stackMode === "scroll")) gsap.matchMediaRefresh();
        ScrollTrigger.refresh();
      });
    };
    const layoutObserver = new ResizeObserver(queueLayoutCheck);
    if (modulePanel) layoutObserver.observe(modulePanel);
    if (storyViewport) layoutObserver.observe(storyViewport);
    window.addEventListener("resize", queueLayoutCheck);
    // Re-measure after self-hosted fonts settle, without touching parent frames.
    void document.fonts.ready.then(() => { if (!disposed) queueLayoutCheck(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(layoutFrame);
      layoutObserver.disconnect();
      window.removeEventListener("resize", queueLayoutCheck);
      navigateStep.current = null;
      navigateModule.current = null;
      media.revert();
    };
  }, { scope: root });
}
