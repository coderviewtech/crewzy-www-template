import type Lenis from "lenis";

const nativeScrollKeys = new Set(["Tab", "PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp", " "]);

/** A control that consumed the key owns any navigation it just started. */
export function shouldCancelScrollForKey(event: Pick<KeyboardEvent, "key" | "defaultPrevented">): boolean {
  return !event.defaultPrevented && nativeScrollKeys.has(event.key);
}

/** Only intercept a real fragment in the current document, including its query. */
export function samePageFragment(href: string, currentHref: string) {
  try {
    const current = new URL(currentHref);
    const destination = new URL(href, current);
    if (destination.origin !== current.origin || destination.pathname !== current.pathname || destination.search !== current.search || destination.hash.length < 2) return null;
    return { hash: destination.hash, id: decodeURIComponent(destination.hash.slice(1)) };
  } catch {
    return null;
  }
}

export function cancelSmoothScroll(scroller: Pick<Lenis, "isScrolling" | "isStopped" | "stop" | "start">) {
  if (scroller.isScrolling === "smooth" && !scroller.isStopped) {
    scroller.stop();
    scroller.start();
  }
}

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
  cancelSmoothScroll(scroller);
  scroller.resize();
  scroller.scrollTo(target, options);
}
