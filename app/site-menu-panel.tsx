import { SiteLink } from "./site-link";
import { ArrowRight, CheckCheck, ShieldCheck, UsersRound } from "lucide-react";
import type { NavigationMenu } from "./site-navigation";
import s from "./site-menu.module.css";

/** One menu composition shared by desktop dropdowns and mobile disclosures. */
export function SiteMenuPanel({ menu, onNavigate }: { menu: NavigationMenu; onNavigate: () => void }) {
  const FeatureIcon = menu.featured.icon;
  return <>
    <div className={s.layout}>
      <SiteLink className={s.feature} href={menu.featured.href} onClick={onNavigate}>
        <span className={s.eyebrow}>{menu.eyebrow}</span>
        <span className={s.featureArt} aria-hidden="true">
          <span><UsersRound size={21} /></span><i /><span><FeatureIcon size={26} /></span><i /><span><ShieldCheck size={21} /></span>
        </span>
        <strong>{menu.title}</strong>
        <p>{menu.description}</p>
        <span className={s.featureAction}>{menu.featured.label}<ArrowRight size={17} /></span>
      </SiteLink>
      {menu.columns.map(column => <section className={s.column} key={column.title}>
        <h3>{column.title}</h3>
        <div className={s.links}>
          {column.items.map(({ label, description, href, icon: Icon }) => <SiteLink key={label} className={s.item} href={href} onClick={onNavigate}>
            <span className={s.icon}><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
            <span><strong>{label}</strong><small>{description}</small></span>
            <ArrowRight className={s.arrow} size={16} aria-hidden="true" />
          </SiteLink>)}
        </div>
      </section>)}
    </div>
    <div className={s.bottom}>
      <span><CheckCheck size={16} aria-hidden="true" /> People, work and compliance. Connected.</span>
      <SiteLink href={menu.shortcut.href} onClick={onNavigate}>{menu.shortcut.label}<ArrowRight size={16} aria-hidden="true" /></SiteLink>
    </div>
  </>;
}
