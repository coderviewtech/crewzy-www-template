"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Mail, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { appUrl, demoHref, salesEmail, siteCaption } from "./site-config";
import {
  footerGroups,
  platformColumns,
  resourcesColumns,
  solutionsColumns,
  type MenuColumn,
} from "./site-navigation";
import s from "./site-shell.module.css";

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
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
        leaveTimer.current = null;
      }
      setOpenMenu(label);
    }
  };

  const handlePointerLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      leaveTimer.current = setTimeout(() => {
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

  const dropdown = (label: string, columns: MenuColumn[], panelClassName?: string) => {
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
          onClick={() => setOpenMenu(expanded ? null : label)}
        >
          {label}
          <ChevronDown size={14} aria-hidden="true" className={s.navChevron} />
        </button>
        <div
          className={`${s.dropdownPanel} ${panelClassName || ""}`}
          id={`${id}-${label}`}
          hidden={!expanded}
          data-lenis-prevent
        >
          <div className={s.megaGrid}>
            {columns.map(col => (
              <div key={col.title} className={s.menuColumn}>
                <p className={s.columnHeading}>{col.title}</p>
                <div className={s.columnLinks}>
                  {col.items.map(({ label: name, description, href, icon: Icon }) => (
                    <a href={href} key={name} className={s.menuItem} onClick={close}>
                      <span className={s.menuItemIcon}>
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span className={s.menuItemText}>
                        <strong className={s.menuItemTitle}>{name}</strong>
                        {description && <small className={s.menuItemDesc}>{description}</small>}
                      </span>
                      <ArrowRight size={13} aria-hidden="true" className={s.menuItemArrow} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header ref={header} className={s.header}>
      <a href="/#top" aria-label="Crewzy home" onClick={close}>
        <Brand className={s.headerBrand} markClassName={s.headerMark} />
      </a>
      <nav
        className={s.navigation}
        aria-label="Main navigation"
        id={`${id}-navigation`}
        data-open={mobileOpen}
        data-lenis-prevent
      >
        {dropdown("Platform", platformColumns, s.platformPanel)}
        {dropdown("Solutions", solutionsColumns, s.solutionsPanel)}
        <a href="/customers" aria-current={pathname === "/customers" ? "page" : undefined} onClick={close}>
          Customers
        </a>
        {dropdown("Resources", resourcesColumns, s.resourcesPanel)}
        <a href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={close}>
          Contact us
        </a>
        <div className={s.mobileActions}>
          <a href={appUrl("/login")} className={s.signIn} onClick={close}>Sign in</a>
          <a href={appUrl("/signup")} className={s.primaryButton} onClick={close}>Start free <ArrowRight size={15} /></a>
        </div>
      </nav>
      <div className={s.headerActions}>
        <a className={s.signIn} href={appUrl("/login")}>Sign in</a>
        <a className={s.primaryButton} href={demoHref}>Book a demo <ArrowRight size={16} aria-hidden="true" /></a>
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
  );
}

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.footerIntro}>
        <div>
          <a href="/#top" aria-label="Crewzy home"><Brand className={s.footerBrand} /></a>
          <p>{siteCaption}</p>
          <span>One employee record. Connected workflows. Less everyday admin.</span>
        </div>
        <a className={s.footerEmail} href={`mailto:${salesEmail}`}>
          <Mail size={18} aria-hidden="true" />
          <span>Let’s talk about your team<strong>{salesEmail}</strong></span>
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
      <div className={s.footerGroups}>
        {footerGroups.map(group => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <nav aria-label={`${group.title} footer links`}>
              {group.links.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}
            </nav>
          </section>
        ))}
      </div>
      <div className={s.footerBottom}>
        <span>© {new Date().getFullYear()} Crewzy. All rights reserved.</span>
        <div>
          <a href="/resources#security">Security & trust</a>
          <a href="/contact">Contact us</a>
        </div>
      </div>
    </footer>
  );
}
