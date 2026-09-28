import s from "./section-heading.module.css";

type SectionHeadingProps = {
  label: string;
  title: string;
  emphasis: string;
  description?: string;
  id?: string;
};

/** One typographic system for marketing sections, separate from product UI. */
export function SectionHeading({ label, title, emphasis, description, id }: SectionHeadingProps) {
  return <div className={s.headingGroup} data-section-heading>
    <p className={s.label}>{label}</p>
    <h2 className={s.title} id={id}>{title}<br /><span>{emphasis}</span></h2>
    {description && <p className={s.description}>{description}</p>}
  </div>;
}
