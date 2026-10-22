export const MAILTO_ACTIVATION_COOLDOWN_MS = 1500;

type MailtoClick = Pick<MouseEvent,
  "defaultPrevented" | "button" | "metaKey" | "ctrlKey" | "shiftKey" | "altKey" | "preventDefault"
>;

/** Keep the browser's native mail handler, but ignore a second quick activation
 * while the first compose window is opening. No script launches a second URL. */
export function createMailtoActivationGuard(
  cooldownMs = MAILTO_ACTIVATION_COOLDOWN_MS,
  now: () => number = () => performance.now(),
) {
  let lastAcceptedAt: number | null = null;
  return (event: MailtoClick) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return "ignored" as const;
    const activatedAt = now();
    if (lastAcceptedAt !== null && activatedAt - lastAcceptedAt < cooldownMs) {
      event.preventDefault();
      return "blocked" as const;
    }
    lastAcceptedAt = activatedAt;
    return "accepted" as const;
  };
}
