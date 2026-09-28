export type PinScope = "none" | "cards" | "section";

/** Keep the introduction in view when it fits with the cards. Shorter screens
 * retain card-only pinning; never shrink product text to fill a viewport. */
export function pinScope(viewportHeight: number, cardsHeight: number, introHeight: number): PinScope {
  const available = viewportHeight - 112;
  if (viewportHeight < 680 || cardsHeight > available) return "none";
  return cardsHeight + introHeight <= available ? "section" : "cards";
}
