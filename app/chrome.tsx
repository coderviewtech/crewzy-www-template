"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  ChevronDown,
  Clock3,
  Landmark,
  Layers,
  Menu,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import styles from "./landing.module.css";

/* Where "Start free" and "Sign in" send people.
 *
 * This site is marketing only — the workspace itself lives on another host.
 * Every product CTA goes through appUrl() so there is exactly one place that
 * decides which host that is.
 *
 * Defaults to dev.crewzy.io, which is where the app runs today. When
 * app.crewzy.io exists, set NEXT_PUBLIC_APP_ORIGIN in netlify.toml — one
 * line, no code change, and nothing here needs revisiting.
 */
const APP_ORIGIN = (process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://dev.crewzy.io").replace(/\/$/, "");

export const appUrl = (path: string) => `${APP_ORIGIN}${path}`;

/* The Crewzy mark. Defined once so every surface — header, footer, the
   convergence hub, the integration hub — can never drift onto a different
   icon the way two of them had drifted onto a lightning bolt. */
export const BrandIcon = UsersRound;

/* Module labels become URL slugs, so "Platform → Recruitment" survives a full
   page navigation from a sub-page. Keep this the only place slugs are made. */
export const moduleSlug = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type MenuItem = { label: string; blurb: string; icon: LucideIcon; href: string };

/* Labels must match the `capabilities` entries in Features. Selection resolves
   by slug, not array index, so a reorder can't open the wrong module. */
export const PLATFORM_MENU: MenuItem[] = [
  { label: "People", blurb: "Core HR, onboarding and offboarding", icon: UsersRound, href: "/#module-people" },
  { label: "Recruitment", blurb: "Candidates, interviews and hiring", icon: UserRoundCheck, href: "/#module-recruitment" },
  { label: "Time & projects", blurb: "Timesheets, projects and approvals", icon: Clock3, href: "/#module-time-projects" },
  { label: "Leave", blurb: "Balances, policy and approvals", icon: CalendarDays, href: "/#module-leave" },
  { label: "Finance", blurb: "Invoices, expenses and reminders", icon: WalletCards, href: "/#module-finance" },
  { label: "Crewzy AI", blurb: "Ask questions, act with approval", icon: Sparkles, href: "/#module-crewzy-ai" },
];

/* Organised by the shape of the business, because shape is what decides
   whether Crewzy fits. The blurbs carry the industry names so a visitor finds
   their own word in the menu without having to open the page first. */
export const SOLUTIONS_MENU: MenuItem[] = [
  { label: "You sell your people's time", blurb: "Agencies · Consultancies · IT services · Legal · Accounting", icon: Briefcase, href: "/solutions#billable" },
  { label: "A certificate gates the work", blurb: "Insurance · Healthcare · Construction · Security · Care", icon: ShieldCheck, href: "/solutions#regulated" },
  { label: "Growing past spreadsheets", blurb: "Startups · Non-profits · Education · Real estate", icon: Landmark, href: "/solutions#growing" },
  { label: "All industries", blurb: "Find yours, or the shape closest to it", icon: Layers, href: "/solutions#industries" },
];

export const RESOURCES_MENU: MenuItem[] = [
  { label: "How modules work", blurb: "Switch one on, nothing to integrate", icon: Layers, href: "/resources#modules" },
  { label: "Security & trust", blurb: "Access control, audit and isolation", icon: ShieldCheck, href: "/resources#security" },
];

export const NAV_LINKS = [
  { label: "Customers", href: "/customers" },
  { label: "Contact us", href: "mailto:sales@crewzy.io" },
];

export const FOOTER_GROUPS = [
  {
    /* Mirrors the six modules in the platform carousel — a visitor should be
       able to name the same modules from the footer as from the product. */
    title: "Platform",
    links: PLATFORM_MENU.map(item => ({ label: item.label, href: item.href })),
  },
  {
    /* Short segment names rather than the menu's shape sentences — a footer
       column is scanned, and this is also where the three deep segments stay
       reachable now that the nav leads with shapes. */
    title: "Solutions",
    links: [
      { label: "Agencies", href: "/solutions#agencies" },
      { label: "Consultancies", href: "/solutions#consultancies" },
      { label: "Insurance teams", href: "/solutions#insurance" },
      { label: "All industries", href: "/solutions#industries" },
      { label: "Customers", href: "/customers" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security", href: "/#security" },
      { label: "Audit & compliance", href: "/resources#security" },
      { label: "How modules work", href: "/resources#modules" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Start free", href: appUrl("/signup") },
      { label: "Book a demo", href: "mailto:sales@crewzy.io" },
      { label: "Sign in", href: appUrl("/login") },
      { label: "Support", href: "mailto:support@crewzy.io" },
    ],
  },
];

export function Logo() {
  return (
    <span className={styles.logo}>
      <span className={styles.logoMark}><BrandIcon size={19} /></span>
      <strong>Crewzy</strong>
    </span>
  );
}

export function Eyebrow({ icon: Icon = Sparkles, children, dark = false }: { icon?: LucideIcon; children: ReactNode; dark?: boolean }) {
  return <div className={`${styles.eyebrow} ${dark ? styles.eyebrowDark : ""}`}><Icon size={14} />{children}</div>;
}

function NavMenu({ label, items, onNavigate }: { label: string; items: MenuItem[]; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className={styles.navMenu}
      ref={wrap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(value => !value)}>
        {label} <ChevronDown size={15} aria-hidden="true" />
      </button>
      {open && (
        <div className={styles.navMenuPanel} role="menu" aria-label={label}>
          {items.map(({ icon: ItemIcon, label: itemLabel, blurb, href }) => (
            <Link
              href={href}
              key={itemLabel}
              role="menuitem"
              onClick={() => { setOpen(false); onNavigate?.(); }}
            >
              <span><ItemIcon size={17} /></span>
              <div><strong>{itemLabel}</strong><small>{blurb}</small></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" aria-label="Crewzy home"><Logo /></Link>
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <NavMenu label="Platform" items={PLATFORM_MENU} />
          <NavMenu label="Solutions" items={SOLUTIONS_MENU} />
          <Link href={"/customers"}>Customers</Link>
          <NavMenu label="Resources" items={RESOURCES_MENU} />
          <Link href="mailto:sales@crewzy.io">Contact us</Link>
        </nav>
        <div className={styles.headerActions}>
          <Link className={styles.signIn} href={appUrl("/login")}>Sign in</Link>
          <Link className={styles.signIn} href="mailto:sales@crewzy.io">Book a demo</Link>
          <Link className={styles.headerCta} href={appUrl("/signup")}>Start free <ArrowRight size={16} /></Link>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(value => !value)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          <NavMenu label="Platform" items={PLATFORM_MENU} onNavigate={close} />
          <NavMenu label="Solutions" items={SOLUTIONS_MENU} onNavigate={close} />
          <Link href={"/customers"} onClick={close}>Customers</Link>
          <NavMenu label="Resources" items={RESOURCES_MENU} onNavigate={close} />
          <Link href="mailto:sales@crewzy.io" onClick={close}>Contact us</Link>
          <Link href={appUrl("/login")} onClick={close}>Sign in</Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain} data-reveal>
        <div className={styles.footerBrand}><Logo /><p>Everything your team runs on, in one workspace.</p><Link href="mailto:hello@crewzy.io">hello@crewzy.io</Link></div>
        <div className={styles.footerLinks}>
          {FOOTER_GROUPS.map(group => <section key={group.title}><h3>{group.title}</h3><nav aria-label={`${group.title} links`}>{group.links.map(link => <Link href={link.href} key={link.label}>{link.label}</Link>)}</nav></section>)}
        </div>
      </div>
      <div className={styles.footerBottom}><span>© 2026 Crewzy. All rights reserved.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
    </footer>
  );
}

/* Scroll-reveal + scroll-zoom, extracted so every page animates identically.
   Honours prefers-reduced-motion by revealing everything up front. */
export function useScrollMotion(pageRef: React.RefObject<HTMLElement | null>, revealedClass: string, motionReadyClass: string) {
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-reveal]"));
    const zoomItems = Array.from(page.querySelectorAll<HTMLElement>("[data-scroll-zoom]"));
    const documentRoot = document.documentElement;
    const previousScrollBehavior = documentRoot.style.scrollBehavior;
    const previousScrollPadding = documentRoot.style.scrollPaddingTop;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const restoreScrollSettings = () => {
      documentRoot.style.scrollBehavior = previousScrollBehavior;
      documentRoot.style.scrollPaddingTop = previousScrollPadding;
    };

    if (!prefersReducedMotion) {
      documentRoot.style.scrollBehavior = "smooth";
      documentRoot.style.scrollPaddingTop = "76px";
    }

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(item => {
        item.classList.add(revealedClass);
        item.dataset.revealVisible = "true";
      });
      return restoreScrollSettings;
    }

    page.classList.add(motionReadyClass);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const item = entry.target as HTMLElement;
        item.classList.add(revealedClass);
        item.dataset.revealVisible = "true";
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.12 });

    const revealVisibleItems = () => {
      const revealBoundary = window.innerHeight * 0.94;
      revealItems.forEach(item => {
        if (item.dataset.revealVisible === "true") return;
        const bounds = item.getBoundingClientRect();
        if (bounds.top < revealBoundary && bounds.bottom > 0) {
          item.classList.add(revealedClass);
          item.dataset.revealVisible = "true";
        }
      });
    };

    const updateZoomItems = () => {
      const viewportHeight = window.innerHeight;
      const entryDistance = Math.max(viewportHeight * 0.72, 1);

      zoomItems.forEach(item => {
        const bounds = item.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (viewportHeight - bounds.top) / entryDistance));
        const mode = item.dataset.scrollZoom;
        const startScale = mode === "hero" ? 0.94 : mode === "card" ? 0.985 : 0.975;
        const startOffset = mode === "hero" ? 36 : mode === "card" ? 12 : 20;
        const startRotation = mode === "hero" ? 4 : mode === "card" ? 1.2 : 2.5;
        item.style.setProperty("--scroll-scale", (startScale + (1 - startScale) * progress).toFixed(4));
        item.style.setProperty("--scroll-y", `${(startOffset * (1 - progress)).toFixed(2)}px`);
        item.style.setProperty("--scroll-rotate", `${(startRotation * (1 - progress)).toFixed(2)}deg`);
      });
    };

    let scrollMotionFrame = 0;
    const updateScrollMotion = () => {
      scrollMotionFrame = 0;
      revealVisibleItems();
      updateZoomItems();
    };
    const requestScrollMotion = () => {
      if (scrollMotionFrame) return;
      scrollMotionFrame = window.requestAnimationFrame(updateScrollMotion);
    };

    revealItems.forEach(item => observer.observe(item));
    scrollMotionFrame = window.requestAnimationFrame(updateScrollMotion);
    window.addEventListener("scroll", requestScrollMotion, { passive: true });
    window.addEventListener("resize", requestScrollMotion);

    return () => {
      observer.disconnect();
      if (scrollMotionFrame) window.cancelAnimationFrame(scrollMotionFrame);
      window.removeEventListener("scroll", requestScrollMotion);
      window.removeEventListener("resize", requestScrollMotion);
      restoreScrollSettings();
    };
  }, [pageRef, revealedClass, motionReadyClass]);
}
