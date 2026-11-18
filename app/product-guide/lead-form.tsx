"use client";

import { SiteLink } from "../site-link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { leadEmailMaxLength, leadFollowUpRequest, leadFormName, leadNameMaxLength } from "./lead-config";
import { submitGuideLead } from "./submit-lead";
import s from "./product-guide.module.css";

/** Contact capture precedes prepared answers; public FAQs remain accessible separately. */
export function GuideLeadForm({ onAccepted, onBrowse }: { onAccepted: () => void; onBrowse: () => void }) {
  const pending = useRef(false);
  const errorMessage = useRef<HTMLParagraphElement>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    pending.current = true;
    setSending(true);
    setError("");
    try {
      await submitGuideLead({
        name: String(fields.get("name") ?? ""), email: String(fields.get("email") ?? ""),
        honeypot: String(fields.get("bot-field") ?? ""),
        source: window.location.pathname.replace(/\/$/, "") === "/meet" ? "meetup-page" : "website-chat",
      });
      form.reset();
      onAccepted();
    } catch {
      // Keep entered details for an explicit retry, without logging personal data.
      setError("We couldn’t confirm your submission. Please try again, or contact us directly.");
      requestAnimationFrame(() => {
        if (errorMessage.current?.closest("dialog")?.open) errorMessage.current.focus();
      });
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  return <form className={s.leadForm} name={leadFormName} onSubmit={submit} aria-busy={sending}>
    <input type="hidden" name="form-name" value={leadFormName} />
    <p className={s.welcome}>Let’s get to know you.<br /><strong>Share your details to start. Our team can follow up by email.</strong></p>
    <div hidden aria-hidden="true"><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></div>
    <label htmlFor="crewzy-chat-name">Your name<input id="crewzy-chat-name" name="name" autoComplete="name" required
      maxLength={leadNameMaxLength} pattern=".*\S.*" disabled={sending} /></label>
    <label htmlFor="crewzy-chat-email">Email address<input id="crewzy-chat-email" name="email" type="email" autoComplete="email" required
      maxLength={leadEmailMaxLength} pattern="[^\s@]+@[^\s@]+\.[^\s@]+" title="Enter an email address such as name@example.com." disabled={sending} /></label>
    <p className={s.leadNotice}>By selecting “Start chat”, you’re asking: {leadFollowUpRequest} <SiteLink href="/privacy#contact" onClick={onBrowse}>How we use your details</SiteLink>.</p>
    {error && <p className={s.formError} role="alert" ref={errorMessage} tabIndex={-1}>{error} <SiteLink href="/contact" onClick={onBrowse}>Contact Crewzy</SiteLink></p>}
    <button className={s.submit} type="submit" disabled={sending}>{sending ? "Sending your details…" : "Start chat"}<ArrowRight size={17} aria-hidden="true" /></button>
    <p className={s.browseLink}>Just browsing? <SiteLink href="/meet#questions" onClick={onBrowse}>Read our public FAQs</SiteLink>.</p>
  </form>;
}
