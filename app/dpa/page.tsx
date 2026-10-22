import Link from "next/link";
import { company } from "../company";
import { privacyEmail } from "../site-config";
import { LegalPage, LegalTable } from "../legal-page";
import { createLegalMetadata } from "../site-seo";

export const metadata = createLegalMetadata({
  title: "Data processing agreement",
  description: "Crewzy data processing terms for organisational customers, including security, subprocessors, data rights and return or deletion.",
  canonical: "/dpa",
});

const protections = [
  ["Instructions", "Process personal data on documented lawful instructions and identify instructions that may breach data protection law."],
  ["Confidentiality", "Limit authorised personnel to necessary access and require confidentiality."],
  ["Security", "Set out measures appropriate to risk, including access, availability, recovery and regular assessment."],
  ["Subprocessors", "Require prior written authorisation, equivalent obligations and Crewzy’s continuing responsibility. General authorisation includes advance notice of changes and an opportunity to object."],
  ["Individual rights", "Assist with applicable access, correction, deletion, portability and other rights requests."],
  ["Incidents and assistance", "Notify the customer without undue delay after awareness of a personal data breach, and assist with security, impact assessments and regulatory consultation."],
  ["Return or deletion", "At the customer’s choice, return or delete personal data and copies when services end, subject to legally required retention."],
  ["Accountability", "Provide relevant compliance information and allow and contribute to customer audits and inspections."],
] as const;

export default function DpaPage() {
  return (
    <LegalPage title="Data processing agreement" summary="Processing terms for organisations that use Crewzy to manage personal information.">
      <section>
        <h2>When a DPA applies</h2>
        <p>Crewzy is a product of {company.legalName}. Where an organisation or sole trader decides how and why workspace personal data is used, it generally acts as controller and Crewzy processes the agreed data on its documented instructions. A customer acting for another controller must have authority to appoint Crewzy.</p>
        <p>A private individual using Crewzy solely for personal or household purposes does not need an organisational DPA merely because they open an account. The relationship depends on how the information is used. Our <Link href="/privacy">privacy policy</Link> and <Link href="/terms">terms and conditions</Link> explain personal use and Crewzy’s separate responsibilities for account and service information.</p>
      </section>

      <section>
        <h2>Scope of the agreement</h2>
        <p>The DPA identifies the customer, agreed services, processing purposes and activities, duration, categories of personal data and people concerned. It also records the relevant security, provider, international-transfer and return or deletion arrangements.</p>
        <p>The scope can include people management and employee lifecycle workflows, document expiry tracking, leave, time and projects, expenses, invoices, recruitment, compliance evidence and audit history. AI processing is included where agreed for the service.</p>
        <p>See the <Link href="/privacy#information">information categories in our privacy policy</Link> and the <Link href="/subprocessors">service provider page</Link>. Retention and account closure are explained in our <Link href="/privacy#retention">retention information</Link>; the DPA records the arrangements for the agreed service.</p>
      </section>

      <section>
        <h2>What the processing terms cover</h2>
        <LegalTable label="Data processing agreement protections">
          <table>
            <caption>Core protections covered by the written agreement</caption>
            <thead><tr><th scope="col">Area</th><th scope="col">Protection</th></tr></thead>
            <tbody>{protections.map(([area, protection]) => <tr key={area}><th scope="row">{area}</th><td>{protection}</td></tr>)}</tbody>
          </table>
        </LegalTable>
        <p>These protections reflect the <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/contracts-and-liabilities-between-controllers-and-processors-multi/what-needs-to-be-included-in-the-contract/">ICO’s Article 28 contract guidance</a>.</p>
      </section>

      <section>
        <h2>Agree processing terms</h2>
        <p>A written DPA covering the agreed service must be in place before Crewzy processes live personal data on an organisation’s behalf. This page explains the agreement; viewing it does not execute one.</p>
        <p>To request processing terms, email <a href={`mailto:${privacyEmail}`}><strong>{privacyEmail}</strong></a> with your organisation’s name, intended services and contact details. Please do not send employee records or identity documents with an initial enquiry.</p>
        <p>You can also write to Privacy enquiries, {company.legalName}, {company.registeredOffice}.</p>
      </section>
    </LegalPage>
  );
}
