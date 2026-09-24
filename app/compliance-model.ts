export const complianceChapters = [
  { label: "oversight", time: .35, title: "See it before it’s urgent", description: "Documents and expiry dates, with a clear view of what needs attention.", shortTitle: "Document oversight" },
  { label: "review", time: 4.05, title: "Give every review an owner", description: "Keep the renewal, reviewer and decision together in one workspace.", shortTitle: "Renewal review" },
  { label: "evidence", time: 7.65, title: "Leave a clear trail", description: "Follow the people, actions and decisions behind every record.", shortTitle: "Audit history" },
] as const;

export const complianceDuration = 10.8;
export const complianceTransitionDuration = 1.1;
export const complianceTransitions = [
  { from: 0, to: 1, start: 2.5 },
  { from: 1, to: 2, start: 6.1 },
] as const;
export const complianceDepth = { active: 1, previous: .92, oldest: .86 } as const;

/** Leave room for the site header and a small bottom margin. The two-pixel
 * tolerance covers rounding of CSS viewport units without clipping content. */
export function complianceCanPin(viewportHeight: number, contentHeight: number): boolean {
  return viewportHeight >= 680 && contentHeight <= viewportHeight - 110;
}

/** Keep the selected copy until the next (or previous) card has fully landed.
 * Retaining the previous selection also avoids flicker when scroll direction
 * changes halfway through a transition. */
export function complianceStepAt(time: number, previousStep = 0): number {
  let step = Math.max(0, Math.min(complianceChapters.length - 1, previousStep));
  while (step < complianceTransitions.length && time >= complianceTransitions[step].start + complianceTransitionDuration) step++;
  while (step > 0 && time <= complianceTransitions[step - 1].start) step--;
  return step;
}
