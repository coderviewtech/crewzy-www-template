export const mobileTourQuery = "(max-width: 760px)";

/** Select the last chapter that has reached the unobscured reading line. */
export function chapterAtReadingLine(tops: number[], readingLine: number): number {
  return tops.reduce((active, top, index) => top <= readingLine ? index : active, 0);
}

export function adjacentTourTab(key: string, current: number, count: number): number | null {
  if (key === "ArrowRight") return (current + 1) % count;
  if (key === "ArrowLeft") return (current + count - 1) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return null;
}
