import { SiteLink } from "./site-link";
import { ArrowRight, Layers, ShieldCheck } from "lucide-react";
import { DashboardPreview } from "./dashboard-preview";
import s from "./product-showcase.module.css";

export function ProductShowcase() {
  return <figure className={s.stage} data-product-stage>
    <div className={s.chrome}>
      <span><Layers size={17} aria-hidden="true" /><strong>Your day. One workspace.</strong></span>
    </div>
    <div className={s.frame} data-product-frame><DashboardPreview /></div>
    <figcaption className={s.caption}>
      <span><ShieldCheck size={15} aria-hidden="true" />Shared records. Connected permissions.</span>
      <SiteLink href="/platform">Explore the full platform <ArrowRight size={15} aria-hidden="true" /></SiteLink>
    </figcaption>
  </figure>;
}
