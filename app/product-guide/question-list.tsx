import { SiteLink } from "../site-link";
import { ArrowRight } from "lucide-react";
import type { GuideQuestion } from "./content";
import { GuideAnswer } from "./answer-content";
import s from "./question-list.module.css";

/** Server-rendered answers also work without opening the interactive guide. */
export function QuestionList({ questions }: { questions: GuideQuestion[] }) {
  return <div className={s.list}>{questions.map(item => <details key={item.id}>
    <summary>{item.question}<span aria-hidden="true">+</span></summary>
    <div><GuideAnswer question={item} /><SiteLink href={item.href}>{item.linkLabel}<ArrowRight size={15} aria-hidden="true" /></SiteLink></div>
  </details>)}</div>;
}
