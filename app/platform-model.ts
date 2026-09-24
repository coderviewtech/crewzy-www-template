export const platformCadence = 3.2;
export const platformTransitionDuration = 1.3;

export const platformChapters = ["people", "recruitment", "time", "leave", "finance", "compliance"].map((label, index) => ({
  label,
  // Category navigation lands inside the reading hold, not mid-transition.
  time: index * platformCadence + .55,
}));

export const platformDuration = platformChapters.length * platformCadence;
export const platformTransitions = platformChapters.slice(1).map((_, index) => ({
  from: index,
  to: index + 1,
  start: (index + 1) * platformCadence - platformTransitionDuration,
  end: (index + 1) * platformCadence,
}));

export const platformDepth = { active: 1, previous: .92, oldest: .86 };

/** Keep the selected category stable until a card lands in either direction. */
export function platformStepAt(time: number, previousStep = 0): number {
  let step = Math.max(0, Math.min(platformChapters.length - 1, previousStep));
  while (step < platformTransitions.length && time >= platformTransitions[step].end) step++;
  while (step > 0 && time <= platformTransitions[step - 1].start) step--;
  return step;
}
