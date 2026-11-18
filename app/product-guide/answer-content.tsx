import type { GuideQuestion } from "./content";

/** Keep longer trust answers equally readable in the chat and public FAQs. */
export function GuideAnswer({ question }: { question: GuideQuestion }) {
  return <><p>{question.answer}</p>{question.details && <ul>{question.details.map(detail => <li key={detail}>{detail}</li>)}</ul>}</>;
}
