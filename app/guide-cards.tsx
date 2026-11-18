import { SiteLink as Link } from "./site-link";
import { ArrowRight } from "lucide-react";
import { guideRoutes, guidePath } from "./site-routes";
import styles from "./resources/guides/guide.module.css";

export function GuideCards({ headingTag: Heading = "h3" }: { headingTag?: "h2" | "h3" }) {
  return <div className={styles.cards}>
    {guideRoutes.map(guide => <article key={guide.slug}>
      <p className={styles.category}>{guide.category}</p>
      <Heading className={styles.cardTitle}><Link href={guidePath(guide.slug)}>{guide.title}</Link></Heading>
      <p>{guide.description}</p>
      <Link className={styles.readLink} href={guidePath(guide.slug)}>Read the guide <ArrowRight size={16} aria-hidden="true" /></Link>
    </article>)}
  </div>;
}
