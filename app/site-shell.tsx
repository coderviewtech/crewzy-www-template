"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteLink as Link } from "./site-link";
import { ArrowRight, ChevronDown, Mail, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { company } from "./company";
import { MailtoLink } from "./mailto-link";
import { appUrl, demoHref, salesEmail, siteCaption } from "./site-config";
import {
  footerGroups,
  navigationMenus,
  type NavigationMenu,
} from "./site-navigation";
import s from "./site-shell.module.css";
import { SiteMenuPanel } from "./site-menu-panel";
import menuStyle from "./site-menu.module.css";

function HomeLink({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return <Link href="/#top" aria-label="Crewzy home" onClick={onClick}>{children}</Link>;
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuTriggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const leaveTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const id = useId();

  const close = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setMobileOpen(false);
    setOpenMenu(null);
  };

  const handlePointerEnter = (label: string) => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1051px) and (hover: hover)").matches) {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
        leaveTimer.current = null;
      }
      setOpenMenu(label);
    }
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    const region = event.currentTarget;
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1051px) and (hover: hover)").matches) {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      leaveTimer.current = setTimeout(() => {
        if (region.querySelector("a:focus-visible")) return;
        setOpenMenu(null);
      }, 180);
    }
  };

  useEffect(() => {
    if (!mobileOpen && !openMenu) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) close();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openMenu) { menuTriggers.current[openMenu]?.focus(); setOpenMenu(null); }
      else { setMobileOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, [mobileOpen, openMenu]);

  const dropdown = (menu: NavigationMenu) => {
    const { label } = menu;
    const expanded = openMenu === label;
    return (
      <div
        className={`${s.dropdown} ${expanded ? s.dropdownActive : ""}`}
        onPointerEnter={() => handlePointerEnter(label)}
        onPointerLeave={handlePointerLeave}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setOpenMenu(current => (current === label ? null : current));
          }
        }}
      >
        <button
          ref={node => { menuTriggers.current[label] = node; }}
          type="button"
          className={s.navTrigger}
          aria-expanded={expanded}
          aria-controls={`${id}-${label}`}
          onKeyDown={event => {
            if (event.key !== "ArrowDown") return;
            event.preventDefault();
            setOpenMenu(label);
            requestAnimationFrame(() => document.getElementById(`${id}-${label}`)?.querySelector<HTMLAnchorElement>("a")?.focus());
          }}
          onClick={event => {
            // A pointer click confirms a hover-open menu; keyboard and touch toggle it.
            const pointerHover = event.detail > 0 && window.matchMedia("(min-width: 1051px) and (hover: hover)").matches;
            setOpenMenu(pointerHover ? label : expanded ? null : label);
          }}
        >
          {label}
          <ChevronDown size={14} aria-hidden="true" className={s.navChevron} />
        </button>
        <div className={menuStyle.panel} id={`${id}-${label}`} hidden={!expanded} data-lenis-prevent>
          <SiteMenuPanel menu={menu} onNavigate={close} />
        </div>
      </div>
    );
  };

  return (
    <>
    {openMenu && <button className={menuStyle.backdrop} type="button" tabIndex={-1} aria-label="Close navigation menu" onClick={close} />}
    <header ref={header} className={s.header}>
      <HomeLink onClick={close}>
        <Brand className={s.headerBrand} markClassName={s.headerMark} />
      </HomeLink>
      <nav
        className={s.navigation}
        aria-label="Main navigation"
        id={`${id}-navigation`}
        data-open={mobileOpen}
        data-lenis-prevent
      >
        {dropdown(navigationMenus.Platform)}
        {dropdown(navigationMenus.Solutions)}
        <Link href="/pricing" aria-current={pathname === "/pricing" || pathname?.startsWith("/pricing/market/") ? "page" : undefined} onClick={close}>
          Pricing
        </Link>
        <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={close}>
          About Crewzy
        </Link>
        {dropdown(navigationMenus.Resources)}
        <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={close}>
          Contact us
        </Link>
        <div className={s.mobileActions}>
          <Link href={appUrl("/login")} className={s.signIn} onClick={close}>Sign in</Link>
          <Link href={demoHref} className={s.primaryButton} onClick={close}>Request a demo <ArrowRight size={15} /></Link>
        </div>
      </nav>
      <div className={s.headerActions}>
        <Link className={s.signIn} href={appUrl("/login")}>Sign in</Link>
        <Link className={s.primaryButton} href={demoHref}>Request a demo <ArrowRight size={16} aria-hidden="true" /></Link>
        <button
          ref={menuButton}
          className={s.menuToggle}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls={`${id}-navigation`}
          onClick={() => { setMobileOpen(value => !value); setOpenMenu(null); }}
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.footerIntro}>
        <div>
          <HomeLink><Brand className={s.footerBrand} /></HomeLink>
          <p>{siteCaption}</p>
          <span>One employee record. Connected workflows. Less everyday admin.</span>
          <span>Crewzy is developed by <Link className={s.companyLink} href="/about">{company.legalName}</Link>, registered in {company.jurisdiction}.</span>
        </div>
        <MailtoLink className={s.footerEmail} href={`mailto:${salesEmail}`}>
          <Mail size={18} aria-hidden="true" />
          <span>Let’s talk about your team<strong>{salesEmail}</strong></span>
          <ArrowRight size={18} aria-hidden="true" />
        </MailtoLink>
      </div>
      <div className={s.footerGroups}>
        {footerGroups.map(group => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <nav aria-label={`${group.title} footer links`}>
              {group.links.map(link => <Link key={link.label} href={link.href}>{link.label}</Link>)}
            </nav>
          </section>
        ))}
      </div>
      <div className={s.footerLegal}>
        <p>{company.legalName} · Company number {company.number} · Registered in {company.jurisdiction}.</p>
        <p>Registered office: {company.registeredOffice}.</p>
        <Link href={company.companiesHouseUrl} target="_blank" rel="noopener noreferrer">View company registration <span className={s.srOnly}>(opens in a new tab)</span></Link>
      </div>
      <div className={s.footerBottom}>
        <span>© {new Date().getFullYear()} Crewzy. All rights reserved.</span>
        <div>
          <Link href="/about">About Crewzy</Link>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms and conditions</Link>
          <Link href="/dpa">Data processing</Link>
          <Link href="/subprocessors">Service providers</Link>
          <Link href="/resources#security">Security &amp; trust</Link>
          <Link href="/contact">Contact us</Link>
        </div>
      </div>
    </footer>
  );
}
