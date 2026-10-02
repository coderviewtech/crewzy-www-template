export const storyDuration = 2.8;

/** Start at 85% of the viewport; finish when the figure's bottom reaches 25%.
 * Position, not elapsed time, drives the sequence in either scroll direction. */
export function storyProgress(top: number, height: number, viewportHeight: number) {
  if (height <= 0 || viewportHeight <= 0) return 1;
  const travel = viewportHeight * 0.6 + height;
  return Math.max(0, Math.min(1, (viewportHeight * 0.85 - top) / travel));
}
