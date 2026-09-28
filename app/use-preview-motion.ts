"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { complianceChapters, complianceDepth, complianceDuration, complianceStepAt, complianceTransitionDuration, complianceTransitions } from "./compliance-model";
import { platformCadence, platformChapters, platformDepth, platformStepAt, platformTransitionDuration, platformTransitions } from "./platform-model";
import { pinScope } from "./scroll-layout";
import { resolveHomeHash } from "./site-config";
import { scrollToMeasuredTarget } from "./anchor-navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** One animation clock and one native document scroller; no iframe bridge. */
export function usePreviewMotion(
  root: RefObject<HTMLDivElement | null>,
  setStep: Dispatch<SetStateAction<number>>,
  navigateStep: RefObject<((index: number) => void) | null>,
  setModule: Dispatch<SetStateAction<number>>,
  navigateModule: RefObject<((index: number, immediate?: boolean) => void) | null>,
) {
  useGSAP(() => {
    if (!root.current) return;
    const select = gsap.utils.selector(root);
    const media = gsap.matchMedia();
    let lenis: Lenis | undefined;
    const introHeight = (selector: string) => {
      const intro = select(selector)[0] as HTMLElement | undefined;
      if (!intro) return 0;
      const style = getComputedStyle(intro);
      return intro.offsetHeight + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
    };

    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Lenis already reads CSS scroll-margin-top. Adding another offset here
      // doubles the header clearance and leaves an unintended gap on navigation.
      // All home hashes use the handler below; a second anchor handler would
      // compete with module chapter navigation and history restoration.
      lenis = new Lenis({ duration: .85, smoothWheel: true, syncTouch: false, anchors: false });
      const scrollEngine = lenis;
      const tick = (seconds: number) => scrollEngine.raf(seconds * 1000);
      scrollEngine.on("scroll", ScrollTrigger.update);
      // Lenis's documented GSAP integration uses an unadjusted shared clock.
      gsap.ticker.lagSmoothing(0);
      gsap.ticker.add(tick);

      gsap.fromTo(select("[data-page-progress]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true } });
      // Reading content never fades out. Short, one-time movement adds polish
      // without a low-contrast state or a replay every time direction changes.
      if (window.scrollY < 180) gsap.from(select("[data-hero-enter]"), { y: 10, force3D: false, duration: .6, stagger: .045, ease: "power2.out", clearProps: "transform" });
      select("[data-reveal]").forEach((element: HTMLElement) => {
        gsap.from(element, { y: 10, force3D: false, duration: .6, ease: "power2.out", clearProps: "transform", scrollTrigger: { trigger: element, start: "top 94%", once: true } });
      });
      // A short entrance finishes at native size; never scrub the dashboard text.
      gsap.from(select("[data-product-frame]"), { y: 12, force3D: false,
        duration: .6, ease: "power2.out", clearProps: "transform",
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
      gsap.from(select("[data-chart-bar]"), { scaleY: .15, duration: .8, stagger: .04, ease: "power2.out", scrollTrigger: { trigger: "[data-product-stage]", start: "top 65%", once: true } });

      // The Crewzy hub never transforms. Its satellites spread outward as the
      // section enters and retract on reverse scroll, finishing at native size.
      const connection = select("[data-connection-section]")[0];
      const diagram = select("[data-connection-diagram]")[0] as HTMLElement | undefined;
      if (connection && diagram) {
        const lines = select("[data-connection-line]");
        const nodes = select("[data-connection-node]");
        const contraction = () => window.matchMedia("(max-width: 620px)").matches ? .12 : .34;
        const inwardX = (_index: number, node: HTMLElement) => (diagram.clientWidth / 2 - node.offsetLeft - node.offsetWidth / 2) * contraction();
        const inwardY = (_index: number, node: HTMLElement) => (diagram.clientHeight / 2 - node.offsetTop - node.offsetHeight / 2) * contraction();
        gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
        const connected = gsap.timeline({
          scrollTrigger: { id: "crewzy-connected-workspace", trigger: connection, start: "top 88%", end: "center 42%", scrub: .35, invalidateOnRefresh: true },
        });
        connected.fromTo(nodes, {
          x: inwardX, y: inwardY, scale: () => 1 - contraction() * .5,
          transformOrigin: "50% 50%", force3D: false,
        }, { x: 0, y: 0, scale: 1, duration: 1, ease: "power2.out", force3D: false }, 0)
          .fromTo(select("[data-connection-links]"), {
            scale: () => 1 - contraction(), transformOrigin: "50% 50%", force3D: false,
          }, { scale: 1, duration: 1, ease: "power2.out", force3D: false }, 0)
          .to(lines, { strokeDashoffset: 0, duration: .8, ease: "power1.out" }, .12);
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
      const story = select("[data-module-story]")[0] as HTMLElement | undefined;
      const panels = select("[data-module-page]") as HTMLElement[];
      const fills = select("[data-module-fill]");
      // Fall back to ordinary tabs when zoomed text or a short viewport cannot fit.
      if (!pin || !story || panels.length !== platformChapters.length) return;
      const scope = pinScope(window.innerHeight, pin.offsetHeight, introHeight("[data-module-intro]"));
      if (scope === "none") return;
      const pinTarget = scope === "section" ? story : pin;
      pin.dataset.moduleMode = "scroll";
      pin.dataset.pinScope = scope;
      gsap.set(fills, { scaleX: 0, transformOrigin: "left" });
      // Each complete module is a card. Only recessed cards scale; the incoming
      // and active product interface stay at native size without 3D rasterizing.
      gsap.set(panels, { autoAlpha: 1, y: 0, yPercent: 112, scale: platformDepth.active, transformOrigin: "50% 0%", force3D: false });
      gsap.set(panels[0], { yPercent: 0 });
      let previousModule = -1;
      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          id: "crewzy-platform-tour", trigger: pinTarget, pin: true, start: "top 100px",
          end: () => `+=${Math.min(3000, Math.max(2400, window.innerHeight * 3.2))}`,
          scrub: .3, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 2,
          // Refresh temporarily rewinds the animation for measurement, then
          // restores it with callbacks suppressed. Restore the accessible tab
          // selection too, including direct links into later chapters.
          onRefresh: self => {
            previousModule = platformStepAt(self.animation?.time() ?? 0, previousModule);
            setModule(previousModule);
          },
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
      navigateModule.current = (index: number, immediate = false) => {
        const chapter = platformChapters[index];
        const trigger = timeline.scrollTrigger;
        if (!chapter || !trigger) return;
        const position = trigger.labelToScroll(chapter.label);
        if (lenis) scrollToMeasuredTarget(lenis, position, { duration: .7, immediate, onComplete: () => setModule(index) });
        else window.scrollTo({ top: position, behavior: immediate ? "instant" : "smooth" });
        // Direct arrivals can seek before React has committed the initial tab
        // state. Keep the accessible selection in sync with the requested card.
        if (immediate) timeline.time(chapter.time);
        setModule(index);
      };
      return () => { navigateModule.current = null; delete pin.dataset.moduleMode; delete pin.dataset.pinScope; };
    });

    media.add({ tall: "(min-height: 680px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions?.tall || !context.conditions?.motion) return;
      const panels = select("[data-stack-page]");
      const pin = select("[data-story-pin]")[0];
      const story = select("[data-compliance-story]")[0];
      // The explanation and its data now travel inside the same full-width
      // card. Pin the complete stage only when all its content can fit.
      if (!pin || !story || panels.length !== 3) return;
      const scope = pinScope(window.innerHeight, pin.offsetHeight, introHeight("[data-story-intro]"));
      if (scope === "none") return;
      const pinTarget = scope === "section" ? story : pin;
      pin.dataset.stackMode = "scroll";
      pin.dataset.pinScope = scope;
      gsap.set(panels, { autoAlpha: 1, x: 0, y: 0, yPercent: 112, scale: complianceDepth.active, transformOrigin: "50% 0%", rotation: 0, force3D: false });
      gsap.set(panels[0], { yPercent: 0, scale: complianceDepth.active, rotation: 0 });
      let previousStep = -1;
      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          id: "crewzy-compliance-story", trigger: pinTarget, pin: true, start: "top 100px",
          end: () => `+=${Math.max(1800, window.innerHeight * 2.7)}`,
          scrub: .3, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1,
          onRefresh: self => {
            previousStep = complianceStepAt(self.animation?.time() ?? 0, previousStep);
            setStep(previousStep);
          },
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
        if (lenis) scrollToMeasuredTarget(lenis, position + (index === 0 ? 4 : 0), { duration: .8 });
        else window.scrollTo({ top: position, behavior: "smooth" });
      };
      return () => { navigateStep.current = null; delete pin.dataset.stackMode; delete pin.dataset.pinScope; };
    });

    let disposed = false;
    let layoutFrame = 0;
    let fontsSettled = false;
    let pageLoaded = document.readyState === "complete";
    let pendingInitialHash = window.location.hash;
    const followHomeHash = (hash: string, immediate = false) => {
      const destination = resolveHomeHash(hash);
      if (!destination) return;
      if (destination.moduleIndex !== undefined) {
        if (navigateModule.current) { navigateModule.current(destination.moduleIndex, immediate); return; }
        setModule(destination.moduleIndex);
      }
      const target = document.getElementById(destination.section);
      if (!target) return;
      if (lenis) scrollToMeasuredTarget(lenis, target, { duration: .7, immediate });
      else target.scrollIntoView({ behavior: "instant", block: "start" });
    };
    const onHomeLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== "/" || url.search !== window.location.search || !resolveHomeHash(url.hash)) return;
      event.preventDefault();
      pendingInitialHash = "";
      if (window.location.hash !== url.hash) history.pushState(history.state, "", url.hash);
      followHomeHash(url.hash);
    };
    const onHashChange = () => { pendingInitialHash = ""; followHomeHash(window.location.hash, true); };
    document.addEventListener("click", onHomeLink);
    window.addEventListener("hashchange", onHashChange);
    const syncScrollDimensions = () => lenis?.resize();
    ScrollTrigger.addEventListener("refresh", syncScrollDimensions);
    const modulePanel = root.current.querySelector("#module-panel");
    const modulePin = select("[data-module-pin]")[0] as HTMLElement | undefined;
    const storyViewport = select("[data-stack-viewport]")[0] as HTMLElement | undefined;
    const storyPin = select("[data-story-pin]")[0] as HTMLElement | undefined;
    const queueLayoutCheck = () => {
      cancelAnimationFrame(layoutFrame);
      layoutFrame = requestAnimationFrame(() => {
        if (disposed) return;
        const moduleScope = modulePin && window.matchMedia("(min-width: 761px) and (prefers-reduced-motion: no-preference)").matches
          ? pinScope(window.innerHeight, modulePin.offsetHeight, introHeight("[data-module-intro]")) : "none";
        const storyScope = storyPin && window.matchMedia("(prefers-reduced-motion: no-preference)").matches
          ? pinScope(window.innerHeight, storyPin.offsetHeight, introHeight("[data-story-intro]")) : "none";
        // Re-evaluate both the fit guard and heading retention after resizing.
        if (moduleScope !== (modulePin?.dataset.pinScope ?? "none") || storyScope !== (storyPin?.dataset.pinScope ?? "none")) gsap.matchMediaRefresh();
        ScrollTrigger.refresh();
        // Wait for native load-time restoration and ScrollTrigger's load
        // refresh as well as fonts; otherwise a reload can undo this jump.
        if (fontsSettled && pageLoaded && pendingInitialHash) { const hash = pendingInitialHash; pendingInitialHash = ""; followHomeHash(hash, true); }
      });
    };
    const layoutObserver = new ResizeObserver(queueLayoutCheck);
    if (modulePanel) layoutObserver.observe(modulePanel);
    if (storyViewport) layoutObserver.observe(storyViewport);
    const moduleIntro = select("[data-module-intro]")[0];
    const storyIntro = select("[data-story-intro]")[0];
    if (moduleIntro) layoutObserver.observe(moduleIntro);
    if (storyIntro) layoutObserver.observe(storyIntro);
    window.addEventListener("resize", queueLayoutCheck);
    const onPageLoad = () => { pageLoaded = true; queueLayoutCheck(); };
    window.addEventListener("load", onPageLoad);
    // Re-measure after self-hosted fonts settle, without touching parent frames.
    void document.fonts.ready.then(() => { if (!disposed) { fontsSettled = true; queueLayoutCheck(); } });
    return () => {
      disposed = true;
      cancelAnimationFrame(layoutFrame);
      layoutObserver.disconnect();
      window.removeEventListener("resize", queueLayoutCheck);
      window.removeEventListener("load", onPageLoad);
      document.removeEventListener("click", onHomeLink);
      window.removeEventListener("hashchange", onHashChange);
      ScrollTrigger.removeEventListener("refresh", syncScrollDimensions);
      navigateStep.current = null;
      navigateModule.current = null;
      media.revert();
    };
  }, { scope: root });
}
