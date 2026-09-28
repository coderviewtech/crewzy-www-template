import { BookOpen, BrainCircuit, BriefcaseBusiness, CalendarDays, Clock3, FileCheck2, Layers, Mail, ShieldCheck, UsersRound, WalletCards } from "lucide-react";
import { appUrl, demoHref, moduleHref, supportEmail } from "./site-config";

export const platformMenu = [
  { label: "Platform overview", description: "One workspace, connected around your people", href: "/platform", icon: Layers },
  { label: "People", description: "Employee records and onboarding", href: moduleHref(0), icon: UsersRound },
  { label: "Recruitment", description: "Candidates, interviews and hiring", href: moduleHref(1), icon: BriefcaseBusiness },
  { label: "Time & projects", description: "Projects, timesheets and approvals", href: moduleHref(2), icon: Clock3 },
  { label: "Leave", description: "Requests, balances and policies", href: moduleHref(3), icon: CalendarDays },
  { label: "Finance", description: "Invoices, expenses and reminders", href: moduleHref(4), icon: WalletCards },
  { label: "Compliance", description: "Documents, reviews and evidence", href: "/#compliance", icon: ShieldCheck },
  { label: "Crewzy AI", description: "Source-linked workspace answers", href: "/#crewzy-ai", icon: BrainCircuit },
];
export const solutionsMenu = [
  { label: "All solutions", description: "Find the right fit for your business", href: "/solutions", icon: Layers },
  { label: "Agencies & consultancies", description: "Connect people, projects and client work", href: "/solutions#agencies", icon: BriefcaseBusiness },
  { label: "Document-led businesses", description: "Keep renewals and reviews in view", href: "/solutions#insurance", icon: FileCheck2 },
  { label: "Growing teams", description: "Move beyond disconnected spreadsheets", href: "/solutions#growing", icon: UsersRound },
];
export const resourcesMenu = [
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
