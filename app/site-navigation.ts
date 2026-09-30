import {
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  FileCheck2,
  Layers,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { appUrl, demoHref, moduleHref, supportEmail } from "./site-config";

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

export const platformColumns: MenuColumn[] = [
  {
    title: "Core Platform",
    items: [
      { label: "Platform overview", description: "One workspace, connected around your people", href: "/platform", icon: Layers },
      { label: "People", description: "Employee records and onboarding", href: moduleHref(0), icon: UsersRound },
      { label: "Recruitment", description: "Candidates, interviews and hiring", href: moduleHref(1), icon: BriefcaseBusiness },
      { label: "Crewzy AI", description: "Source-linked workspace answers", href: "/#crewzy-ai", icon: BrainCircuit },
    ],
  },
  {
    title: "Workflows & Operations",
    items: [
      { label: "Time & projects", description: "Projects, timesheets and approvals", href: moduleHref(2), icon: Clock3 },
      { label: "Leave", description: "Requests, balances and policies", href: moduleHref(3), icon: CalendarDays },
      { label: "Finance", description: "Invoices, expenses and reminders", href: moduleHref(4), icon: WalletCards },
      { label: "Compliance", description: "Documents, reviews and evidence", href: "/#compliance", icon: ShieldCheck },
    ],
  },
  {
    title: "Tours & Experience",
    items: [
      { label: "Interactive tour", description: "Step through connected modules live", href: "/#platform", icon: Layers },
      { label: "Compliance workspace", description: "Real-time document audit verification", href: "/#compliance", icon: ShieldCheck },
      { label: "Customer stories", description: "How teams streamline everyday admin", href: "/customers", icon: UsersRound },
    ],
  },
];

export const solutionsColumns: MenuColumn[] = [
  {
    title: "By Business Type",
    items: [
      { label: "All solutions", description: "Find the right fit for your business", href: "/solutions", icon: Layers },
      { label: "Agencies & consultancies", description: "Connect people, projects and client work", href: "/solutions#agencies", icon: BriefcaseBusiness },
      { label: "Document-led businesses", description: "Keep renewals and reviews in view", href: "/solutions#insurance", icon: FileCheck2 },
      { label: "Growing teams", description: "Move beyond disconnected spreadsheets", href: "/solutions#growing", icon: UsersRound },
    ],
  },
  {
    title: "Scale & Team Size",
    items: [
      { label: "Customer spotlights", description: "See how teams streamline day-to-day work", href: "/customers", icon: UsersRound },
      { label: "Forever free tier", description: "Start free for up to 10 employees", href: appUrl("/signup"), icon: Sparkles },
      { label: "Book a demo", description: "Personalized walkthrough with specialists", href: demoHref, icon: Mail },
    ],
  },
];

export const resourcesColumns: MenuColumn[] = [
  {
    title: "Guides & Trust",
    items: [
      { label: "Resource centre", description: "Understand the platform before you start", href: "/resources", icon: BookOpen },
      { label: "How modules work", description: "Shared records, context and permissions", href: "/resources#modules", icon: Layers },
      { label: "Security & trust", description: "Access controls and audit history", href: "/resources#security", icon: ShieldCheck },
    ],
  },
  {
    title: "Support & Answers",
    items: [
      { label: "FAQs", description: "Straight answers to common questions", href: "/#questions", icon: Mail },
      { label: "Compliance workflow", description: "Permissions, reviews and evidence trails", href: "/#compliance", icon: ShieldCheck },
      { label: "Contact us", description: "Talk directly with our team", href: "/contact", icon: Mail },
    ],
  },
];

export const platformMenu: MenuLinkItem[] = [
  { label: "Platform overview", description: "One workspace, connected around your people", href: "/platform", icon: Layers },
  { label: "People", description: "Employee records and onboarding", href: moduleHref(0), icon: UsersRound },
  { label: "Recruitment", description: "Candidates, interviews and hiring", href: moduleHref(1), icon: BriefcaseBusiness },
  { label: "Time & projects", description: "Projects, timesheets and approvals", href: moduleHref(2), icon: Clock3 },
  { label: "Leave", description: "Requests, balances and policies", href: moduleHref(3), icon: CalendarDays },
  { label: "Finance", description: "Invoices, expenses and reminders", href: moduleHref(4), icon: WalletCards },
  { label: "Compliance", description: "Documents, reviews and evidence", href: "/#compliance", icon: ShieldCheck },
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
  { label: "Security & trust", description: "Access controls and audit history", href: "/resources#security", icon: ShieldCheck },
  { label: "FAQs", description: "Straight answers to common questions", href: "/#questions", icon: Mail },
];

export const footerGroups = [
  { title: "Platform", links: platformMenu.map(({ label, href }) => ({ label, href })) },
  { title: "Solutions", links: [
    { label: "Agencies", href: "/solutions#agencies" },
    { label: "Consultancies", href: "/solutions#consultancies" },
    { label: "Document-led businesses", href: "/solutions#insurance" },
    { label: "Growing teams", href: "/solutions#growing" },
    { label: "Customers", href: "/customers" },
  ] },
  { title: "Resources", links: [
    { label: "About Crewzy", href: "/about" },
    { label: "How modules work", href: "/resources#modules" },
    { label: "Security & trust", href: "/resources#security" },
    { label: "Compliance workflow", href: "/#compliance" },
    { label: "FAQs", href: "/#questions" },
  ] },
  { title: "Get started", links: [
    { label: "Start free", href: appUrl("/signup") },
    { label: "Book a demo", href: demoHref },
    { label: "Sign in", href: appUrl("/login") },
    { label: "Contact us", href: "/contact" },
    { label: "Support", href: `mailto:${supportEmail}` },
  ] },
];
