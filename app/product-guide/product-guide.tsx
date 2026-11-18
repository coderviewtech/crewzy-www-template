"use client";

import { SiteLink } from "../site-link";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, MessageCircleQuestion, ShieldCheck, X } from "lucide-react";
import { guideCategories, guideQuestions, type GuideCategory } from "./content";
import { GuideLeadForm } from "./lead-form";
import { GuideAnswer } from "./answer-content";
import { useSmoothScroll } from "../smooth-scroll";
import { cancelSmoothScroll } from "../anchor-navigation";
import s from "./product-guide.module.css";

type OpenGuide = (category?: GuideCategory) => void;
const GuideContext = createContext<OpenGuide | null>(null);
const dialogId = "crewzy-product-guide";

/** A normal FAQ link remains usable before hydration or without JavaScript. */
export function AskCrewzy({ children = "Ask about Crewzy", className, category }: {
  children?: ReactNode; className?: string; category?: GuideCategory;
}) {
  const open = useContext(GuideContext);
  return <SiteLink href="/meet#questions" className={className} aria-haspopup="dialog"
    onClick={event => {
      if (!open || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open(category);
    }}>{children}</SiteLink>;
}

/** Enquiry capture followed by prepared answers; no AI or transcript storage. */
export function ProductGuideProvider({ children }: { children: ReactNode }) {
  const scroller = useSmoothScroll();
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const welcome = useRef<HTMLParagraphElement>(null);
  const questionButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<GuideCategory>("start");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [leadAccepted, setLeadAccepted] = useState(false);
  const selected = guideQuestions.find(item => item.id === selectedId);

  useEffect(() => {
    if (leadAccepted && dialog.current?.open) welcome.current?.focus();
  }, [leadAccepted]);

  const open: OpenGuide = (nextCategory = "start") => {
    if (scroller.current) cancelSmoothScroll(scroller.current);
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setCategory(nextCategory);
    setSelectedId(null);
    dialog.current?.showModal();
    setIsOpen(true);
  };
  const close = () => dialog.current?.close();
  const reset = () => {
    setIsOpen(false);
    setSelectedId(null);
    returnFocus.current?.focus();
  };

  return <GuideContext.Provider value={open}>
    {children}
    <button className={s.launcher} type="button" aria-haspopup="dialog" aria-controls={dialogId}
      aria-expanded={isOpen} onClick={() => open()}>
      <MessageCircleQuestion size={21} aria-hidden="true" /> Ask about Crewzy
    </button>
    <dialog ref={dialog} id={dialogId} className={s.dialog} data-product-guide data-lenis-prevent
      aria-labelledby={`${dialogId}-title`} aria-describedby={`${dialogId}-description`} onClose={reset}
      onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className={s.panel}>
        <header className={s.header}>
          <span className={s.mark}><MessageCircleQuestion size={24} aria-hidden="true" /></span>
          <div><h2 id={`${dialogId}-title`}>Ask about Crewzy</h2><p>Product guide · Prepared answers</p></div>
          <button type="button" className={s.close} aria-label="Close product guide" onClick={close}><X size={22} aria-hidden="true" /></button>
        </header>
        <div className={s.body}>
          <p className={s.description} id={`${dialogId}-description`}>Product answers, with a personal follow-up from Crewzy.</p>
          {!leadAccepted ? <GuideLeadForm onBrowse={close} onAccepted={() => setLeadAccepted(true)} /> : <>
          <p className={s.welcome} ref={welcome} tabIndex={-1}>Thanks for sharing your details.<br /><strong>Explore our answers while the team picks up your enquiry.</strong></p>
          <div className={s.categories} role="group" aria-label="Question topics">
            {guideCategories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id}
              onClick={() => { setCategory(item.id); setSelectedId(null); }}>{item.label}</button>)}
          </div>
          {selected ? <div className={s.conversation}>
            <button type="button" className={s.back} onClick={() => {
              setSelectedId(null);
              requestAnimationFrame(() => questionButtons.current[selected.id]?.focus());
            }}><ArrowLeft size={16} aria-hidden="true" /> More questions</button>
            <h3 className={s.questionBubble} ref={questionHeading} tabIndex={-1}>{selected.question}</h3>
            <div className={s.answer} aria-live="polite" aria-atomic="true">
              <GuideAnswer question={selected} />
              <SiteLink href={selected.href} onClick={close}>{selected.linkLabel}<ArrowRight size={16} aria-hidden="true" /></SiteLink>
            </div>
          </div> : <div className={s.questions}>
            <p>What would you like to know?</p>
            {guideQuestions.filter(item => item.category === category).map(item =>
              <button type="button" key={item.id} ref={node => { questionButtons.current[item.id] = node; }} onClick={() => {
                setSelectedId(item.id);
                // Focus the new answer heading after React commits the selection.
                requestAnimationFrame(() => questionHeading.current?.focus());
              }}>{item.question}<ArrowRight size={16} aria-hidden="true" /></button>)}
          </div>}
          </>}
        </div>
        <footer className={s.footer}>
          <p><ShieldCheck size={15} aria-hidden="true" /> Your question choices stay in this page.</p>
          <div><SiteLink href="/privacy" onClick={close}>Website privacy</SiteLink><SiteLink href="/contact" onClick={close}>Contact Crewzy <ArrowRight size={13} aria-hidden="true" /></SiteLink></div>
        </footer>
      </div>
    </dialog>
  </GuideContext.Provider>;
}
