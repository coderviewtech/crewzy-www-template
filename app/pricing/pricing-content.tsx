"use client";

import { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FileClock,
  Layers,
  Minus,
  Plus,
  ListChecks,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { Eyebrow, Footer, Header, useScrollMotion } from "../chrome";
import { appUrl, demoHref } from "../site-config";
import base from "../landing.module.css";
import secondary from "../secondary-page.module.css";
import typography from "../content-typography.module.css";
import s from "./pricing.module.css";
import { annualSavingPercent, calculateBusinessPrice, formatMoney, parseEmployeeCount, PRICING_MARKETS, type BillingCycle, type PricingMarket } from "./pricing-model";

const FEATURES = [
  {
    icon: UsersRound,
    title: "People & employee lifecycle",
    description: "Keep the employee record at the centre of your everyday work.",
    items: ["Employee records in one workspace", "Onboarding and offboarding workflows", "Role-based access to your team’s information"],
  },
  {
    icon: FileClock,
    title: "Documents & expiry tracking",
    description: "Keep document dates and compliance evidence in view.",
    items: ["Documents linked to employee records", "Document date checks and expiry tracking", "Renewal activity and compliance records"],
  },
  {
    icon: CalendarDays,
    title: "Leave & approvals",
    description: "Bring requests, decisions and balances together.",
    items: ["Employee leave requests", "Manager review and approvals", "Leave balances in the same workspace"],
  },
  {
    icon: Clock3,
    title: "Time & projects",
    description: "Connect the time your team records with the work it belongs to.",
    items: ["Clients and project records", "Timesheets and time approvals", "Default timesheet codes included"],
  },
  {
    icon: WalletCards,
    title: "Invoices & expenses",
    description: "Keep financial records alongside the people and work behind them.",
    items: ["Invoice records", "Expense records and approvals", "Shared client and project context"],
  },
  {
    icon: ListChecks,
    title: "Reports & audit activity",
    description: "See recorded activity and review the information in your workspace.",
    items: ["Standard reports", "Audit activity with actors and timestamps", "Audit history, with visibility based on your plan"],
  },
];

const LIMITS = [
  { label: "Managed employees", free: "Up to 10", business: "Pay per employee seat" },
  { label: "Clients & projects", free: "10 of each", business: "No plan record caps" },
  { label: "Invoice records", free: "50 total", business: "No plan record cap" },
  { label: "Expense records", free: "100 total", business: "No plan record cap" },
  { label: "Crewzy AI", free: "30 weighted actions / month", business: "300 weighted actions / month" },
  { label: "Visible audit history", free: "Rolling 30 days", business: "Full available history" },
  { label: "Timesheet codes", free: "Default codes", business: "Default & custom codes" },
  { label: "Recruitment workflows", free: "Not included", business: "Included" },
];

const QUESTIONS = [
  {
    question: "How does annual billing work?",
    answer: "Annual billing is paid for the year upfront at a lower monthly equivalent. Contact us to confirm the price for your company’s billing country. Prices exclude applicable taxes.",
  },
  {
    question: "Does Business charge only for employees above the free 10?",
    answer: "No. Free and Business are separate plans. Free supports up to 10 managed employees within its allowances. Business charges for every managed employee seat in your workspace, including the first 10, with no minimum seat purchase or separate platform fee.",
  },
  {
    question: "Who counts as a managed employee?",
    answer: "Invited employees, people onboarding and suspended employees count towards your seats. Someone marked as resigned or terminated stops counting once their access is disabled. The same definition applies to Free and Business.",
  },
  {
    question: "What happens when our employee numbers change?",
    answer: "Business pricing is based on managed employee count, whether or not every paid seat is used. The intended policy does not give discretionary refunds for unused time or seats; statutory cancellation and refund rights still apply. Online payments and provider-specific seat adjustments are not yet connected. The calculator estimates a steady team size before applicable taxes.",
  },
  {
    question: "Do invoice, expense and AI allowances reset monthly?",
    answer: "Free includes 50 total invoice records and 100 total expense records. These are total workspace allowances, and deleting records does not restore them. Business has no plan caps on these records. Only AI allowances reset monthly: 30 weighted actions on Free and 300 on Business, per workspace at the start of each calendar month (UTC). Tasks can use different amounts of that allowance. AI stops when the allowance is reached, with no automatic overage charge.",
  },
  {
    question: "What does document expiry tracking cover?",
    answer: "Crewzy checks recorded document dates and tracks expiry. It helps your team organise documents, follow up on renewals and keep compliance evidence together. It does not authenticate documents or replace your team’s compliance decisions.",
  },
  {
    question: "How do we get started with Business?",
    answer: "Create a free workspace, then contact us about Business for your team. Online payments are not currently integrated. The calculator shows the planned monthly or annual price before you get in touch.",
  },
];

export default function PricingContent({ market }: { market: PricingMarket | null }) {
  const root = useRef<HTMLDivElement>(null);
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [employees, setEmployees] = useState("10");
  const employeeCount = parseEmployeeCount(employees);
  const estimate = employeeCount === null || !market ? null : calculateBusinessPrice(employeeCount, cycle, market);
  const annual = cycle === "annual";
  const rates = market ? PRICING_MARKETS[market] : null;
  const unitPrice = market ? calculateBusinessPrice(1, cycle, market).unitMonthly : 0;
  const money = (amount: number) => market ? formatMoney(amount, market) : "";
  const countLabel = (count: number) => count.toLocaleString(rates?.locale ?? "en-GB");
  const questions = QUESTIONS.map(item => item.question === "How does annual billing work?" && market && rates ? {
    ...item,
    answer: `Business costs ${money(rates.monthly)} per employee seat per month on monthly billing. Annual billing costs ${money(rates.annual)} per employee per month, paid as ${money(rates.annual * 12)} per employee for the year upfront. That saves ${annualSavingPercent(market)}% compared with 12 monthly payments. For 10 employees, that is ${money(rates.monthly * 10)} per month or ${money(rates.annual * 120)} per year, excluding applicable taxes.`,
  } : item);
  useScrollMotion(root, base.revealed, base.motionReady);

  return (
    <div ref={root} className={`${base.page} ${secondary.page} ${typography.page} ${s.page}`}>
      <Header />
      <main>
        <section className={s.hero} aria-labelledby="pricing-title">
          <div className={s.heroInner}>
            <div className={`${s.heroCopy} ${typography.hero}`} data-reveal>
              <Eyebrow icon={Sparkles}>Simple pricing. Room to grow.</Eyebrow>
              <h1 id="pricing-title">One connected workspace.<br /><span>A plan for your team.</span></h1>
              <p>Start free with up to 10 employees. Choose Business for more capacity, recruitment and the complete set of Crewzy services.</p>
            </div>
            {market && rates ? <div className={s.planControls} data-reveal>
              <div className={s.billingToggle} role="group" aria-label="Billing period">
                <button type="button" aria-pressed={!annual} onClick={() => setCycle("monthly")}>Pay monthly</button>
                <button type="button" aria-pressed={annual} onClick={() => setCycle("annual")}>Pay annually</button>
              </div>
              <span className={s.saving}>Save {annualSavingPercent(market)}% annually</span>
              <span className={s.currency}>{rates.label} pricing · {rates.currency} ({rates.symbol})</span>
            </div> : <p className={s.regionNotice} data-reveal>Local pricing for India, the UK, the US and the euro area. <a href={demoHref}>Confirm pricing for your company <ArrowRight size={14} aria-hidden="true" /></a></p>}
            <div className={s.plans}>
              <article className={`${s.planCard} ${s.freeCard}`} aria-labelledby="free-plan-title" data-reveal>
                <div className={s.planLabel}><h2 id="free-plan-title">Free</h2><span className={s.planBadge}>Up to 10 employees</span></div>
                <p className={s.planDescription}>A connected start for a small team.</p>
                <div className={s.priceLine}><strong>{market ? money(0) : "Free"}</strong><span>for your workspace</span></div>
                <p className={s.billingNote}>No payment card required.</p>
                <a className={`${secondary.button} ${s.signup} ${s.freeSignup}`} href={appUrl("/signup")}>Start free for up to 10 employees <ArrowRight size={17} aria-hidden="true" /></a>
                <div className={s.cardDivider} />
                <p className={s.listTitle}>Your everyday essentials</p>
                <ul className={s.planList}>
                  <li><Check size={16} aria-hidden="true" />People, onboarding, documents and leave</li>
                  <li><Check size={16} aria-hidden="true" />Time, projects, invoices and expenses</li>
                  <li><Check size={16} aria-hidden="true" />Document expiry and compliance records</li>
                  <li><Check size={16} aria-hidden="true" />10 clients and 10 projects</li>
                  <li><Check size={16} aria-hidden="true" />50 invoice and 100 expense records</li>
                  <li><Check size={16} aria-hidden="true" />30 weighted AI actions / workspace / month</li>
                  <li><Check size={16} aria-hidden="true" />Rolling 30-day view of audit history</li>
                </ul>
                <p className={s.cardFinePrint}>Invoice and expense allowances are total records, not monthly limits. Recruitment is available on Business.</p>
                <a className={s.exploreLink} href="#limits">Compare the plans <ArrowDown size={15} aria-hidden="true" /></a>
              </article>

              <article className={`${s.planCard} ${s.businessCard}`} aria-labelledby="business-plan-title" data-reveal data-reveal-delay="1">
                <div className={s.planLabel}><h2 id="business-plan-title">Business</h2><span className={s.planBadge}>All available services</span></div>
                <p className={s.planDescription}>More capacity. Your whole team connected.</p>
                <div className={s.priceLine}><strong className={!market ? s.pricePending : undefined}>{market ? money(unitPrice) : "Let’s talk"}</strong>{market && <span>per employee<br />per month</span>}</div>
                <p className={s.billingNote}>{!rates ? "Get the price for your company’s billing country." : annual ? `${money(rates.annual * 12)} per employee / year. Billed annually upfront.` : "Billed monthly. No minimum seat purchase."}</p>
                {market && rates && <div className={s.calculator}>
                  <div className={s.calculatorInput}>
                    <div><label htmlFor="employees">How big is your team?</label><p>All managed employees</p></div>
                    <div className={s.stepper}>
                      <button type="button" aria-label="Remove one employee" disabled={employeeCount === null || employeeCount <= 1} onClick={() => employeeCount !== null && setEmployees(String(employeeCount - 1))}><Minus size={15} aria-hidden="true" /></button>
                      <input id="employees" name="employees" type="number" min="1" max="100000" step="1" inputMode="numeric" value={employees} onChange={event => setEmployees(event.target.value)} aria-invalid={employeeCount === null} aria-describedby={employeeCount === null ? "employee-count-error" : "seat-definition"} />
                      <button type="button" aria-label="Add one employee" disabled={employeeCount === null || employeeCount >= 100000} onClick={() => employeeCount !== null && setEmployees(String(employeeCount + 1))}><Plus size={15} aria-hidden="true" /></button>
                    </div>
                  </div>
                  <div aria-live="polite" aria-atomic="true" className={s.estimate}>
                    {estimate && employeeCount !== null ? <>
                      <div className={s.estimateTotal}><span>Your team of {countLabel(employeeCount)}</span><strong>{money(estimate.invoiceTotal)}<small> / {annual ? "year" : "month"}</small></strong></div>
                      <p>{annual ? `${money(estimate.monthlyEquivalent)} monthly equivalent · billed annually` : `${countLabel(employeeCount)} ${employeeCount === 1 ? "employee" : "employees"} × ${money(unitPrice)} per month`}</p>
                      {annual && <p className={s.annualSaving}>Save {money(estimate.annualSaving)} per year compared with monthly billing.</p>}
                    </> : <p id="employee-count-error" className={s.inputError}>Enter a whole number from 1 to 100,000 to calculate your price.</p>}
                  </div>
                  <p className={s.taxNote}>{rates.currency} ({rates.symbol}), excluding applicable taxes.</p>
                </div>}
                <p className={s.seatNote} id="seat-definition">Business charges for every managed employee, including the first 10. <a href="#pricing-questions">How seats work <ArrowDown size={12} aria-hidden="true" /></a></p>
                <a className={`${secondary.button} ${s.signup}`} href={demoHref}>Get Business <ArrowRight size={17} aria-hidden="true" /></a>
                <p className={s.cardNote}>Online payments are not connected yet. Contact us about Business for your billing country.</p>
                <div className={s.cardDivider} />
                <p className={s.listTitle}>Everything in Free, with more room</p>
                <ul className={`${s.planList} ${s.businessList}`}>
                  <li><Check size={16} aria-hidden="true" />Recruitment workflows</li>
                  <li><Check size={16} aria-hidden="true" />Custom timesheet codes</li>
                  <li><Check size={16} aria-hidden="true" />300 weighted AI actions / month</li>
                  <li><Check size={16} aria-hidden="true" />Full available audit history</li>
                  <li><Check size={16} aria-hidden="true" />No client or project record caps</li>
                  <li><Check size={16} aria-hidden="true" />No invoice or expense record caps</li>
                </ul>
                <p className={s.cardFinePrint}>AI allowance is shared per workspace. No separate module fees or automatic AI overage charges.</p>
              </article>
            </div>
            <div className={s.underPlans}><ShieldCheck size={16} aria-hidden="true" /><span>People management, everyday work and compliance evidence. Connected in both plans.</span></div>
          </div>
        </section>

        <section className={s.section} id="included" aria-labelledby="included-title">
          <div className={`${s.sectionHeading} ${typography.heading}`} data-reveal>
            <Eyebrow icon={Layers}>Included in both plans</Eyebrow>
            <h2 id="included-title">The essentials, <span>already connected.</span></h2>
            <p>The same shared records and connected workflows, with allowances that fit the way your team works.</p>
          </div>
          <div className={s.featureGrid}>
            {FEATURES.map(({ icon: Icon, title, description, items }, index) => (
              <article className={s.featureCard} key={title} data-reveal data-reveal-delay={String(index % 3 + 1)}>
                <span className={s.featureIcon}><Icon size={22} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>{items.map(item => <li key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></li>)}</ul>
              </article>
            ))}
          </div>
          <aside className={s.aiCard} data-reveal aria-labelledby="ai-included-title">
            <span className={s.aiIcon}><BrainCircuit size={26} aria-hidden="true" /></span>
            <div className={s.aiCopy}><h3 id="ai-included-title">A little help from Crewzy AI.</h3><p>Ask questions about workspace information you’re authorised to access. Free includes 30 weighted AI actions per workspace each month; Business includes 300.</p></div>
            <a href="#limits">Compare the allowances <ArrowRight size={16} aria-hidden="true" /></a>
          </aside>
        </section>

        <section className={`${s.section} ${s.limitsSection}`} id="limits" aria-labelledby="limits-title">
          <div className={`${s.sectionHeading} ${typography.heading}`} data-reveal>
            <Eyebrow icon={ListChecks}>Compare the plans</Eyebrow>
            <h2 id="limits-title">Clear plans. <span>Clear allowances.</span></h2>
            <p>Start with what you need today. Move to Business when your team needs more.</p>
          </div>
          <div className={s.limitTableWrap} data-reveal>
            <table className={s.limitTable}>
              <caption className={s.srOnly}>Crewzy Free and Business plan comparison</caption>
              <thead><tr><th scope="col">In your workspace</th><th scope="col">Free</th><th scope="col">Business</th></tr></thead>
              <tbody>{LIMITS.map(({ label, free, business }) => <tr key={label}><th scope="row">{label}</th><td>{free}</td><td>{business}</td></tr>)}</tbody>
            </table>
            <p className={s.uploadNote}>Invoice and expense allowances on Free are total record limits, not monthly allowances. AI allowances reset monthly (UTC) and stop at the limit, with no automatic overage charge. File uploads are subject to file type, size and workspace storage limits.</p>
          </div>
        </section>

        <section className={`${s.section} ${s.faqSection}`} id="pricing-questions" aria-labelledby="pricing-questions-title">
          <div className={`${s.sectionHeading} ${typography.heading}`} data-reveal>
            <Eyebrow icon={ListChecks}>A few useful answers</Eyebrow>
            <h2 id="pricing-questions-title">Before you <span>get started.</span></h2>
          </div>
          <div className={s.faqList} data-reveal>{questions.map(({ question, answer }) => <details key={question}><summary>{question}<ChevronDown size={19} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
          <p className={s.termsNote}>Read the <a href="/terms#consumer-rights">cancellation and consumer rights</a> in our Terms and conditions.</p>
        </section>

        <section className={s.closing} aria-labelledby="start-free-title" data-reveal>
          <div className={typography.closing}><h2 id="start-free-title">Less everyday admin.<br /><span>More of your work connected.</span></h2><p>Start free with up to 10 employees, or talk to us about Business.</p></div>
          <div className={s.closingActions}><a className={secondary.button} href={appUrl("/signup")}>Start free for up to 10 employees <ArrowRight size={17} aria-hidden="true" /></a><a className={s.demoLink} href={demoHref}>Request a demo <ArrowRight size={16} aria-hidden="true" /></a></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
