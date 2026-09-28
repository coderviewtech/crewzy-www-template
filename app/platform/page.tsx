"use client";

import { useRef } from "react";
import { ArrowRight, BrainCircuit, Check } from "lucide-react";
import { Header, Footer, useScrollMotion } from "../chrome";
import { appUrl, demoHref, moduleHref, moduleSlugs } from "../site-config";
import { modules, moduleExamples } from "../platform-tour";
import base from "../landing.module.css";
import s from "../secondary-page.module.css";
import typeStyles from "../content-typography.module.css";

export default function PlatformPage() {
  const root = useRef<HTMLDivElement>(null);
  useScrollMotion(root, base.revealed, base.motionReady);
  return <div ref={root} className={`${base.page} ${s.page} ${typeStyles.page}`}><Header /><main>
    <section className={s.hero}><div className={`${s.heroInner} ${typeStyles.hero}`}>
      <span className={`${s.eyebrow} ${typeStyles.label}`}>The Crewzy platform</span>
      <h1>Your people and their work.<br /><span>Connected from the start.</span></h1>
      <p>Core HR, hiring, time, leave, finance and compliance, built around one employee record. Explore what each part does and how it fits into the working day.</p>
      <div className={s.actions}><a className={s.button} href={appUrl("/signup")}>Start free for up to 10 employees <ArrowRight size={17} /></a><a className={`${s.textLink} ${typeStyles.link}`} href={demoHref}>Book a Crewzy demo <ArrowRight size={16} /></a></div>
    </div></section>
    <section className={s.content} aria-label="Platform modules">
      <div className={`${s.sectionIntro} ${typeStyles.heading}`}><h2>One record. More of your day connected.</h2><p>Keep employee details, requests and decisions in context as work moves between teams.</p></div>
      <div className={s.moduleGrid}>{modules.map((module, index) => <article key={module.name} id={moduleSlugs[index]} className={`${s.moduleCard} ${typeStyles.detail}`} data-reveal>
        <div className={`${s.moduleLabel} ${typeStyles.label}`}><span className={s.moduleIcon}><module.icon size={22} /></span>{module.name}</div>
        <h2>{module.title.slice(0, -module.emphasis.length)}<span>{module.emphasis}</span></h2>
        <p>{module.description}</p><ul>{moduleExamples[index].notes.map(note => <li key={note}><Check size={16} />{note}</li>)}</ul>
        <a className={`${s.textLink} ${typeStyles.link}`} href={index === 5 ? "/#compliance" : moduleHref(index)}>{index === 5 ? "Explore the compliance workflow" : `View the ${module.name.toLowerCase()} preview`}<ArrowRight size={16} /></a>
      </article>)}</div>
      <aside className={`${s.aiCallout} ${typeStyles.detail}`} data-reveal><BrainCircuit size={28} /><div><h2>A little help finding the answer.</h2><p>Crewzy AI brings source-linked answers to questions about the workspace information you’re authorised to access.</p></div><a className={`${s.textLink} ${typeStyles.link}`} href="/#crewzy-ai">Explore Crewzy AI <ArrowRight size={16} /></a></aside>
    </section>
  </main><Footer /></div>;
}
