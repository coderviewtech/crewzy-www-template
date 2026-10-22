"use client";

import { useEffect, useRef, useState, type AnchorHTMLAttributes } from "react";
import { createMailtoActivationGuard, MAILTO_ACTIVATION_COOLDOWN_MS } from "./mailto-activation";

type MailtoLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  pendingLabel?: string;
};

export function MailtoLink({ pendingLabel, children, ...props }: MailtoLinkProps) {
  const guard = useRef<ReturnType<typeof createMailtoActivationGuard> | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [opening, setOpening] = useState(false);
  if (!guard.current) guard.current = createMailtoActivationGuard();

  useEffect(() => () => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  }, []);

  return <a {...props} aria-disabled={opening || props["aria-disabled"]} onClick={event => {
    const result = guard.current?.(event);
    if (result !== "accepted" || !pendingLabel) return;
    setOpening(true);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setOpening(false), MAILTO_ACTIVATION_COOLDOWN_MS);
  }}>{opening ? pendingLabel : children}</a>;
}
