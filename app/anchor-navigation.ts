import type Lenis from "lenis";

/** Pin spacers and font reflow can change the page height before Lenis's
 * debounced observer runs. Measure now so the destination is not clamped to
 * an obsolete scroll limit. CSS supplies the header clearance exactly once. */
export function scrollToMeasuredTarget(
  scroller: Pick<Lenis, "resize" | "scrollTo" | "isScrolling" | "isStopped" | "stop" | "start">,
  target: Parameters<Lenis["scrollTo"]>[0],
  options?: Parameters<Lenis["scrollTo"]>[1],
) {
  // A quick second click can target the current position. Lenis returns early
  // in that case, so cancel the previous animation before measuring/navigating.
  // Never unlock a scroller deliberately stopped by another UI component.
  if (scroller.isScrolling === "smooth" && !scroller.isStopped) {
    scroller.stop();
    scroller.start();
  }
  scroller.resize();
  scroller.scrollTo(target, options);
}
