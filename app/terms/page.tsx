import Link from "next/link";
import { company } from "../company";
import { privacyEmail, supportEmail } from "../site-config";
import { LegalPage } from "../legal-page";
import { createLegalMetadata } from "../site-seo";
import { inactiveWorkspaceRetentionDays } from "../legal-policy";

export const metadata = createLegalMetadata({
  title: "Terms and conditions",
  description: "Crewzy service terms for individual and organisational customers, including subscriptions, cancellation, consumer rights and responsible use.",
  canonical: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms and conditions" updatedOn={{ iso: "2026-10-22", label: "22 October 2026" }} summary="Clear terms for using Crewzy, choosing a subscription and managing your account.">
      <section id="agreement">
        <h2>1. Who provides Crewzy</h2>
        <p>Crewzy is provided by {company.legalName}, registered in England and Wales under company number {company.number}, at {company.registeredOffice} (“we” or “us”). Contact <a href={`mailto:${supportEmail}`}>{supportEmail}</a> or write to that address.</p>
        <p>These terms cover personal use, including personal expenses, and organisational use. They apply when presented and accepted during registration, checkout or an agreed order; viewing this website does not purchase a subscription. A written order may add service-specific terms, subject to mandatory rights.</p>
        <p>You are a consumer when buying wholly or mainly outside your trade, business, craft or profession, as applicable law defines it. Paying personally does not alone determine that status. The consumer protections below apply whenever you qualify.</p>
      </section>
      <section id="accounts">
        <h2>2. Accounts and workspaces</h2>
        <p>You must be at least 18, able to enter a contract and authorised to act for any organisation you represent. Signup creates a company-style workspace with an owner account and asks for a workspace or company name; this does not require the owner to be an incorporated company.</p>
        <p>Keep account and billing details accurate, protect credentials and report suspected unauthorised access promptly. Never send passwords or authentication codes in chat or support messages. Owners manage invitations, permissions and authorised use. You must have authority and a lawful reason to manage other people’s records; this does not remove Crewzy’s own legal duties.</p>
      </section>
      <section id="service">
        <h2>3. The service</h2>
        <p>Crewzy supports people management, employee lifecycle workflows, recruitment, time and projects, leave, expenses, invoices, document expiry tracking and compliance evidence. Availability depends on your <Link href="/pricing">plan</Link> and enabled features. <strong>Expiry tracking checks dates, not document authenticity.</strong> Reminders and activity records do not guarantee legal, employment, tax or regulatory compliance.</p>
        <p>Check AI outputs and extracted information before acting, particularly in decisions affecting people. Generated scores do not replace a fair decision process. Integrations have their own terms and availability. We provide paid services with reasonable care and skill; any specific uptime, recovery or support commitment must be separately agreed, without limiting mandatory service rights.</p>
      </section>
      <section id="billing">
        <h2>4. Plans and billing</h2>
        <p><strong>Online payments are not currently integrated into the live service.</strong> The paid-plan terms below apply when a subscription is offered and agreed. Creating a free account or viewing prices does not authorise a charge or renewal.</p>
        <p>Free supports up to 10 employees. Your first 10 managed employees remain included on Business. Charges apply only to managed employees above 10, whether or not those employees sign in. Monthly plans renew monthly. Annual plans are paid for 12 months upfront and renew annually; the displayed monthly equivalent is not a monthly payment option.</p>
        <p>Before payment, your order will identify the plan, employee quantity, currency, billing period, applicable taxes, total and renewal terms. It will also explain when employee-count changes affect charges, including any authorised mid-period adjustment.</p>
        <p>Regional pricing uses INR for India, GBP for the UK, USD for the US and EUR for supported euro-area countries. Eligibility uses an accurate declared billing country and available payment checks. Do not misrepresent your country or organisation to obtain another market’s rate. Contact support to change billing country; these checks are not incorporation verification.</p>
        <p>Price changes apply only to future renewals, with advance notice and an opportunity to cancel before renewal. We do not retrospectively alter an agreed paid period or impose undisclosed charges.</p>
      </section>
      <section id="cancellation">
        <h2>5. Cancellation and account closure</h2>
        <p>To stop renewal, send a clear request to <a href={`mailto:${supportEmail}`}>{supportEmail}</a> or our registered office, identifying your account or workspace and subscription. Do not include credentials or card details. Ordinary cancellation takes effect at the end of the current paid period; you do not need to delete the workspace.</p>
        <p>We do not offer discretionary refunds for unused time or seats, reduced employee numbers, or a change of mind outside an applicable cancellation period. Statutory cancellation, refund and faulty-service remedies always take priority.</p>
        <p>Cancelling renewal and deleting data are separate. Arrange any necessary return or export before closing a workspace. Our intended retention period is {inactiveWorkspaceRetentionDays} days from workspace deactivation, including deactivation following non-payment, rather than from the first missed payment. See <Link href="/privacy#retention">retention information</Link> and your applicable processing agreement for scope, lawful exceptions and return or deletion arrangements. This is not a guarantee that every copy is automatically purged at the end of that period.</p>
      </section>
      <section id="consumer-rights">
        <h2>6. Consumer rights and refunds</h2>
        <p>UK and EU consumers generally have 14 days after entering a qualifying distance service contract to cancel without a reason. Longer periods, including extensions for missing cancellation information, and additional local rights apply where required by law. Send a clear cancellation statement to our support email or registered office before the deadline; the optional form below is not compulsory.</p>
        <p>Signing in or using Crewzy does not itself waive this right. A proportionate charge for service supplied during the cancellation period is payable only where legally permitted and you validly requested an early start after receiving the required information. Any loss of cancellation rights requires the specific legal conditions; these terms are not a blanket waiver.</p>
        <p>Before qualifying EU online consumer sales open, we will provide any legally required online withdrawal function, including confirmation and a durable acknowledgement. Email and postal cancellation remain available and do not replace that function where required.</p>
        <p>A statutory cancellation refund will be paid without undue delay within the applicable legal period, generally 14 days after we are informed, using the original payment method unless otherwise agreed and without a refund fee. Faulty, misdescribed or improperly supplied services may also entitle you to correction, repeat performance, a price reduction, termination or refund. Customers in India, the US and elsewhere retain applicable mandatory service, renewal and cancellation protections.</p>
        <article aria-label="Optional consumer cancellation form">
          <h3>Optional cancellation form</h3>
          <p>To: {company.legalName}, {company.registeredOffice}; <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.</p>
          <p>I give notice that I cancel my contract for the following Crewzy service:</p>
          <ul>
            <li>Service or subscription, and order reference if available</li>
            <li>Date ordered</li>
            <li>Consumer’s name and address</li>
            <li>Account email or workspace reference</li>
            <li>Date of notice</li>
            <li>Signature, only if sent on paper</li>
          </ul>
        </article>
      </section>
      <section id="data">
        <h2>7. Your information and content</h2>
        <p>You retain your rights in your content and permit Crewzy to store, process and transmit it to provide the agreed service, follow lawful instructions and meet legal duties. You must have the rights and permissions to supply it.</p>
        <p>Our <Link href="/privacy">privacy policy</Link> explains data use, AI and recipients; the <Link href="/subprocessors">provider page</Link> covers AWS, Amazon Bedrock, Zoho and Netlify. Organisational processing requires an agreed <Link href="/dpa">DPA</Link> with completed schedules. A personal purchase does not automatically require an organisational DPA, and viewing this page does not execute one.</p>
      </section>
      <section id="acceptable-use">
        <h2>8. Responsible use and intellectual property</h2>
        <p>Do not use Crewzy unlawfully, upload malware, bypass permissions, access another workspace without authority, interfere with the service or misuse personal information. Do not use it for unlawful or discriminatory decisions.</p>
        <p>Crewzy and its licensors retain rights in the software, design and service materials. Your subscription permits authorised use for its agreed purpose, without transferring software ownership or restricting rights the law gives you.</p>
      </section>
      <section id="suspension">
        <h2>9. Changes, suspension and termination</h2>
        <p>We may reasonably update the service to maintain, secure or improve it. Material changes to paid services or agreed terms require appropriate notice and an explanation of your choices before taking effect, except for urgent legal or security action. Changes cannot remove mandatory rights.</p>
        <p>Proportionate restrictions may be necessary for serious security threats, unlawful activity, material breach or unpaid charges. Where practical, we will explain and allow a reasonable opportunity to resolve the issue. Refund and data protection duties continue.</p>
        <p>If we discontinue a paid service or cannot supply a material agreed feature or appropriate remedy, termination and unused-period refunds will follow the agreement and applicable law. We cannot retain payment for an unprovided service where the law requires a refund.</p>
      </section>
      <section id="liability">
        <h2>10. Responsibility for loss</h2>
        <p>Nothing limits liability for fraud, fraudulent misrepresentation, death or personal injury caused by negligence, or anything else the law prevents us from limiting.</p>
        <p>For consumers, we are responsible for reasonably foreseeable losses caused by our breach, subject to applicable law. Mandatory digital-service, consumer and data protection remedies remain. Any additional organisational liability limit must be lawfully and expressly agreed; these terms impose no general financial cap or “as is” exclusion.</p>
      </section>
      <section id="contact">
        <h2>11. Contact and governing law</h2>
        <p>Send service enquiries, cancellations and complaints to <a href={`mailto:${supportEmail}`}>{supportEmail}</a>; privacy enquiries to <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>; or write to our registered office above. Describe the issue and requested outcome without credentials or full card details.</p>
        <p>English and Welsh law applies, subject to mandatory local protections and any lawful written agreement with an organisation. Consumers retain mandatory home-country protections and access to courts or competent dispute bodies available under their local law; no exclusive English jurisdiction removes those rights.</p>
        <p>Any unenforceable provision leaves the rest effective so far as lawful. The date above identifies this version; later website updates do not silently replace agreed terms without the required notice and agreement.</p>
      </section>
    </LegalPage>
  );
}
