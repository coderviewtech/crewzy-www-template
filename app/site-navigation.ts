import {
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  ClipboardList,
  FileCheck2,
  Layers,
  LockKeyhole,
  Mail,
  QrCode,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { appUrl, demoHref, moduleHref, supportEmail } from "./site-config";
import { featurePath, featureRoutes, guidesPath } from "./site-routes";

export interface MenuLinkItem {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface MenuColumn {
  title: string;
  items: MenuLinkItem[];
}

export const platformMenu: MenuLinkItem[] = [
  { label: "Platform overview", description: "One workspace, connected around your people", href: "/platform", icon: Layers },
  { label: "People", description: "People management and employee lifecycle", href: moduleHref(0), icon: UsersRound },
  { label: "Recruitment", description: "Candidates, interviews and hiring", href: moduleHref(1), icon: BriefcaseBusiness },
  { label: "Time & projects", description: "Projects, timesheets and approvals", href: moduleHref(2), icon: Clock3 },
  { label: "Leave", description: "Requests, balances and policies", href: moduleHref(3), icon: CalendarDays },
  { label: "Finance", description: "Invoices, expenses and reminders", href: moduleHref(4), icon: WalletCards },
  { label: "Compliance", description: "Document expiry tracking and audit history", href: "/#compliance", icon: ShieldCheck },
  { label: "Crewzy AI", description: "Source-linked workspace answers", href: "/#crewzy-ai", icon: BrainCircuit },
];

export const solutionsMenu: MenuLinkItem[] = [
  { label: "All solutions", description: "Find the right fit for your business", href: "/solutions", icon: Layers },
  { label: "Agencies & consultancies", description: "Connect people, projects and client work", href: "/solutions#agencies", icon: BriefcaseBusiness },
  { label: "Document-led businesses", description: "Keep renewals and reviews in view", href: "/solutions#insurance", icon: FileCheck2 },
  { label: "Growing teams", description: "Move beyond disconnected spreadsheets", href: "/solutions#growing", icon: UsersRound },
];

export const resourcesMenu: MenuLinkItem[] = [
  { label: "Resource centre", description: "Understand the platform before you start", href: "/resources", icon: BookOpen },
  { label: "How modules work", description: "Shared records, context and permissions", href: "/resources#modules", icon: Layers },
  { label: "Security & trust", description: "Access controls, AI safeguards and privacy", href: "/resources#security", icon: ShieldCheck },
  { label: "FAQs", description: "Straight answers to common questions", href: "/#questions", icon: Mail },
  { label: "Practical guides", description: "Checklists and worked examples for small teams", href: guidesPath, icon: ClipboardList },
];

export interface NavigationMenu {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  featured: MenuLinkItem;
  columns: MenuColumn[];
  shortcut: { label: string; href: string };
}

export const navigationMenus: Record<string, NavigationMenu> = {
  Platform: {
    label: "Platform", eyebrow: "One connected workspace", title: "Built around your people.",
    description: "Explore the tools that keep your people, everyday work and compliance connected.",
    featured: platformMenu[0],
    columns: [
      { title: "People & workplace", items: [platformMenu[1], platformMenu[2], platformMenu[4], platformMenu[7]] },
      { title: "Work & compliance", items: [platformMenu[3], platformMenu[5], platformMenu[6]] },
    ],
    shortcut: { label: "Take the interactive product tour", href: "/#platform" },
  },
  Solutions: {
    label: "Solutions", eyebrow: "Find your fit", title: "For the way your team works.",
    description: "From client work to document renewals, find a clearer way to manage your day.",
    featured: solutionsMenu[0],
    columns: [
      { title: "By business type", items: solutionsMenu.slice(1) },
      { title: "Start with your team", items: [
        { label: "Free plan", description: "For teams of up to 10 employees", href: "/pricing", icon: Sparkles },
        { label: "Request a demo", description: "A walkthrough around your priorities", href: demoHref, icon: Mail },
      ] },
    ],
    shortcut: { label: "Compare plans and pricing", href: "/pricing" },
  },
  Resources: {
    label: "Resources", eyebrow: "A little more clarity", title: "Get to know Crewzy.",
    description: "Explore the platform, understand the safeguards and get your questions answered.",
    featured: resourcesMenu[0],
    columns: [
      { title: "Explore & understand", items: [resourcesMenu[4], resourcesMenu[1],
        { label: "Meet Crewzy & QR", description: "Browse and share at your own pace", href: "/meet", icon: QrCode },
        resourcesMenu[3],
      ] },
      { title: "Trust & support", items: [resourcesMenu[2],
        { label: "Data & privacy", description: "How website information is handled", href: "/privacy", icon: LockKeyhole },
        { label: "Contact Crewzy", description: "Talk directly with our team", href: "/contact", icon: Mail },
      ] },
    ],
    shortcut: { label: "Questions about staff access and security?", href: "/meet#questions" },
  },
};

export const footerGroups = [
  { title: "Platform", links: platformMenu.map(({ label, href }) => ({ label, href })) },
  { title: "Workflows", links: featureRoutes.map(feature => ({ label: feature.label, href: featurePath(feature.slug) })) },
  { title: "Solutions", links: [
    { label: "Agencies", href: "/solutions#agencies" },
    { label: "Consultancies", href: "/solutions#consultancies" },
    { label: "Document-led businesses", href: "/solutions#insurance" },
    { label: "Growing teams", href: "/solutions#growing" },
  ] },
  { title: "Resources", links: [
    { label: "Meet Crewzy & QR code", href: "/meet" },
    { label: "Practical guides", href: guidesPath },
    { label: "About Crewzy", href: "/about" },
    { label: "How modules work", href: "/resources#modules" },
    { label: "Security & trust", href: "/resources#security" },
    { label: "Compliance workflow", href: "/#compliance" },
    { label: "FAQs", href: "/#questions" },
  ] },
  { title: "Get started", links: [
    { label: "Pricing & plans", href: "/pricing" },
    { label: "Start free", href: appUrl("/signup") },
    { label: "Request a demo", href: demoHref },
    { label: "Sign in", href: appUrl("/login") },
    { label: "Contact us", href: "/contact" },
    { label: "Support", href: `mailto:${supportEmail}` },
  ] },
];
