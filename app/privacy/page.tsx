import Link from "next/link";
import { company } from "../company";
import { privacyEmail } from "../site-config";
import { LegalPage, LegalTable } from "../legal-page";
import { createLegalMetadata } from "../site-seo";
import { customerDataCategories } from "../privacy-data";
import { inactiveWorkspaceRetentionDays } from "../legal-policy";
import styles from "../legal-page.module.css";

export const metadata = createLegalMetadata({
  title: "Privacy policy",
  description: "How Crewzy uses and protects account and workspace information, including service providers, AI, retention and your privacy rights.",
  canonical: "/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy policy" summary="How your information is used, who is involved and the choices available to you." updatedOn={{ iso: "2026-10-26", label: "26 October 2026" }}>
      <article aria-label="Privacy at a glance">
        <h2>Privacy at a glance</h2>
        <ul>
          <li>Crewzy supports personal expenses, business expenses and connected people workflows.</li>
          <li>Organisations control their workspace records. Crewzy has separate responsibilities for account information and personal-use workspaces.</li>
          <li>Our primary database and document storage are hosted on AWS in London, United Kingdom.</li>
          <li>For privacy questions or requests, contact <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>.</li>
        </ul>
      </article>

      <section id="responsibility">
        <h2>1. Who we are</h2>
        <p>Crewzy is a product of {company.legalName}, registered in England and Wales under company number {company.number}. Our registered office is {company.registeredOffice}. In this policy, “Crewzy”, “we” and “us” mean that company.</p>
        <p>We act as controller for our account administration, enquiries, customer relationships, billing and service security. For organisational workspace records, the customer generally decides the purposes and acts as controller; Crewzy processes the agreed information on its instructions. See our <Link href="/dpa">data processing information</Link>.</p>
        <p>For a workspace used solely for personal or household purposes, Crewzy is responsible as controller for processing information to provide that service. An employer or recruiter using Crewzy has its own responsibilities and privacy notice. Customers use Crewzy as SaaS and do not need access to our AWS accounts. Crewzy personnel administer the AWS services; providing the service still involves processing information.</p>
      </section>

      <section id="information">
        <h2>2. Information we handle</h2>
        <p>We handle account and contact details, workspace records, enquiries and support correspondence. Website and security information can include IP addresses, browser details, requested pages and event times. The information within a workspace depends on its features, settings and what users supply.</p>
        <details className={styles.disclosure}>
          <summary>View workspace data categories</summary>
          <LegalTable label="Information supported by Crewzy and its purpose">
            <table>
              <caption>Information supported by the service</caption>
              <thead><tr><th scope="col">Area</th><th scope="col">Information</th><th scope="col">Purpose</th></tr></thead>
              <tbody>{customerDataCategories.map(item => <tr key={item.category}><th scope="row">{item.category}</th><td>{item.data}</td><td>{item.purpose}</td></tr>)}</tbody>
            </table>
          </LegalTable>
        </details>
        <p>Information comes from you, workspace administrators and users, candidates, recruitment clients, imports and enabled integrations. Crewzy also generates workflow status, extracted fields, summaries and activity records.</p>
        <p>For relevant business outreach, limited prospect information may come from public business websites, professional directories or direct introductions, such as a name, work contact details, role and company. When we obtain personal details from another source, we provide privacy information, including the source, by our first contact or any earlier applicable legal deadline.</p>
        <p>Health information may appear in leave evidence, blood-group fields or documents. Supply sensitive information only where necessary, permitted for the service and supported by the required legal grounds. Do not add unrelated sensitive records or put passwords and authentication codes in documents or chat.</p>
      </section>

      <section id="purposes">
        <h2>3. Why we use information</h2>
        <p>For information Crewzy controls, our purposes and applicable UK or EU legal grounds include:</p>
        <ul>
          <li><strong>Providing a service to an individual:</strong> performing our contract, or taking steps requested before a contract, where the information is necessary.</li>
          <li><strong>Enquiries, organisational contacts and support:</strong> legitimate interests in responding and managing customer relationships.</li>
          <li><strong>Security and abuse prevention:</strong> legitimate interests in protecting people, accounts and the service, balanced against individual rights.</li>
          <li><strong>Billing, records and legal matters:</strong> contract performance for individual customers, legitimate interests for organisational administration, and applicable legal obligations.</li>
          <li><strong>Consent-based activities:</strong> consent where required and obtained, with the ability to withdraw it.</li>
        </ul>
        <p>For ordinary information about others supplied for lawful personal use, our basis is our legitimate interests in providing the requested workspace, balanced against their rights. Sensitive information requires any additional applicable legal condition. Organisational customers determine the purposes and legal grounds for records they control; their contract does not itself establish a legal ground for every employee record.</p>
        <p>Some account and security details are necessary to provide access. Workspace administrators should explain which other information they require and the consequences of not supplying it.</p>
        <section id="contact">
          <h3>How we contact you</h3>
          <p>We use account and enquiry contact details to respond to you, arrange demos or calls you request, provide support and send essential account, security and service messages.</p>
          <p>We may also use business contact details for relevant Crewzy product information and sales follow-up where lawful. We rely on consent where required, or on assessed legitimate interests in relevant business outreach where applicable rules allow. Creating an account, providing a phone number or accepting our Terms does not itself give marketing consent.</p>
          <p>You can stop marketing by replying to a marketing email, telling the caller or emailing <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>. You can specify email or phone contact, or ask us to stop all marketing; no account or sign-in is required. This does not stop essential account, security and service messages.</p>
          <p>We do not use employee, candidate, expense-contact or other records uploaded to customer workspaces as a prospect list for Crewzy sales.</p>
        </section>
      </section>

      <section id="ai">
        <h2>4. AI and document expiry tracking</h2>
        <p>Enabled AI features use Amazon Bedrock to process prompts and relevant workspace information. Features can include workspace answers, document extraction, CV summaries and recruitment assessments. Document extraction can involve a complete image or extracted text, including personal information in it—not only dates.</p>
        <p>Generated information, matches and scores can be inaccurate or incomplete. They need meaningful human review before decisions affecting people. <strong>Crewzy tracks document dates and expiry; it does not verify document authenticity or guarantee regulatory compliance.</strong></p>
        <p>Read our <Link href="/resources#ai-safeguards">AI guidance</Link> and <Link href="/subprocessors">service provider information</Link> before supplying information through these features.</p>
      </section>

      <section id="sharing">
        <h2>5. Who receives information</h2>
        <p>Information may be available to authorised workspace participants, service providers supporting Crewzy, and recipients selected by a customer, such as recruitment clients or connected communication services. A provider’s role depends on its purpose and the information involved.</p>
        <p>We use AWS RDS for the database and its automated backups, Amazon S3 for documents, Amazon Bedrock for AI, Cloudflare Turnstile for signup protection, Zoho for Crewzy mailboxes, Twilio SendGrid for application email delivery and Netlify for the public website. See the <Link href="/subprocessors">provider list</Link>. Online payment providers are not currently connected.</p>
        <p>Information may also be disclosed where legally required or necessary for professional advice or a genuine business transaction, with appropriate protections. Customer-selected sharing and integrations should be limited to the intended recipients and purpose.</p>
      </section>

      <section id="locations">
        <h2>6. Data locations</h2>
        <p>Our primary PostgreSQL database and document storage are hosted on AWS in London, United Kingdom. Other services, including AI, email, website and security services, may process information elsewhere. The primary storage location is not a UK-only processing commitment.</p>
        <p>Any required international-transfer safeguards must be established for the processing concerned. Contact <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a> about locations and transfer arrangements for your service.</p>
      </section>

      <section id="retention">
        <h2>7. Retention and account closure</h2>
        <p>Workspace information is kept for the active service and according to lawful customer instructions. Our intended inactive-workspace retention period is <strong>{inactiveWorkspaceRetentionDays} days from workspace deactivation</strong>, including deactivation after non-payment. The period does not start at the first missed payment, and cancelling renewal alone does not deactivate a workspace.</p>
        <p>The {inactiveWorkspaceRetentionDays}-day period is a retention policy, not a guarantee of automatic erasure of every copy. Complete deletion coverage across systems and backups still needs verification. Earlier valid return or deletion requests and legally required retention are handled separately.</p>
        <p>Account and financial records, support correspondence and security records may need different periods to meet their purpose, applicable duties, investigations or legal holds. Provider and backup copies are subject to the applicable deletion or overwrite arrangements. A document’s expiry date does not itself trigger deletion.</p>
        <p>After a marketing objection, we may keep the minimum contact details and restriction record needed to honour it for as long as necessary to prevent further unwanted marketing. This record is used to respect your choice, not to send promotions.</p>
      </section>

      <section id="rights">
        <h2>8. Your rights and privacy contact</h2>
        <p>Depending on the law and circumstances, you may request access, correction, erasure, restriction or a portable copy of your information, withdraw consent, or challenge qualifying automated decisions. Rights have legal conditions and exceptions.</p>
        <h3>Your right to object</h3>
        <p>Where UK or EU data protection law applies, you may object to processing based on legitimate interests for reasons relating to your situation. You may object to direct marketing at any time.</p>
        <p>For employer or recruiter-controlled records, contact that organisation first; Crewzy assists under its processing agreement. For Crewzy-controlled information, email <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a> or write to Privacy, {company.legalName}, {company.registeredOffice}. We may need proportionate identity information; do not send credentials or complete identity documents with an initial enquiry.</p>
        <p>You may complain to the <a href="https://ico.org.uk/make-a-complaint/">UK Information Commissioner’s Office</a> or another competent authority. Applicable mandatory local rights remain available.</p>
      </section>

      <section id="india">
        <h2>9. Information for people in India</h2>
        <p>Indian privacy requirements and legal grounds are assessed separately. The DPDP Act and Rules commence in phases; not every provision is operational at once. Where applicable, the customer deciding purposes acts as Data Fiduciary and Crewzy as its Data Processor, with separate responsibility for Crewzy’s own purposes.</p>
        <p>Use the privacy contact above for India-related enquiries or grievances. Rights, consent or other permitted-use requirements and protections for children depend on the applicable provisions. See the <a href="https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf">official commencement notification</a>.</p>
      </section>

      <section id="storage">
        <h2>10. Cookies, security and updates</h2>
        <p>The application uses authentication cookies and browser storage for sessions and interface preferences. Remembered-account details may remain after sign-out; the different-account action clears them, and hints older than 90 days are not used.</p>
        <p>Cloudflare Turnstile helps protect signup against automated abuse. It processes technical signals such as IP addresses and browser and connection information. See <a href="https://www.cloudflare.com/turnstile-privacy-policy/">Cloudflare’s Turnstile Privacy Addendum</a> for details.</p>
        <p>Enabled Google sign-in, external email resources and the application’s ipapi.co country-lookup fallback can involve provider scripts or connection information. Netlify’s approximate country signal supports public regional pricing where available; it does not request GPS access or establish a paid billing country.</p>
        <p>We use Google Ads to promote Crewzy. <a href="https://policies.google.com/privacy">Google’s privacy policy</a> explains how Google processes information in its advertising services.</p>
        <p>Our <Link href="/resources#security">security page</Link> explains hosting and application safeguards. Account eligibility is covered by our <Link href="/terms">Terms</Link>; organisations handling young workers’ or apprentices’ information must consider relevant protections.</p>
        <p>The date above identifies this policy version. We will update it when data uses change and provide appropriate notice of material changes where required.</p>
      </section>
    </LegalPage>
  );
}
