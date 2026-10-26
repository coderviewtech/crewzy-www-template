import Link from "next/link";
import { company } from "../company";
import { privacyEmail } from "../site-config";
import { LegalPage, LegalTable } from "../legal-page";
import { createLegalMetadata } from "../site-seo";

export const metadata = createLegalMetadata({
  title: "Subprocessors and service providers",
  description: "The hosting, AI, signup protection, email, website and advertising services Crewzy uses, and the information involved.",
  canonical: "/subprocessors",
});

const providers = [
  {
    name: "Amazon RDS",
    purpose: "Database hosting and automated database backups in London, UK.",
    information: "Account and workspace records, including relevant people, workflow, expense, invoice and activity information.",
  },
  {
    name: "Amazon S3",
    purpose: "Document storage in London, UK.",
    information: "Uploaded workspace documents and associated information, depending on the features used and content supplied.",
  },
  {
    name: "Cloudflare Turnstile",
    purpose: "Protecting signup against automated abuse.",
    information: "Technical security signals such as IP addresses and browser and connection information, plus challenge tokens used for verification.",
  },
  {
    name: "Amazon Bedrock",
    purpose: "AI processing for enabled Crewzy features.",
    information: "Prompts, relevant workspace context, document images or extracted text, and generated outputs, depending on the feature used.",
  },
  {
    name: "Zoho",
    purpose: "Hosting Crewzy’s email inboxes for correspondence.",
    information: "Email addresses, message content, attachments supplied in correspondence and delivery information. This entry covers Crewzy mailboxes, rather than application notification delivery.",
  },
  {
    name: "Twilio SendGrid",
    purpose: "Delivering Crewzy application emails, including account, security and workflow notifications.",
    information: "Recipient email addresses, message content and relevant account or workspace details included in notifications, together with delivery and error information.",
  },
  {
    name: "Netlify",
    purpose: "Hosting the public Crewzy website.",
    information: "Website request and connection information, including the approximate country signal used for regional pricing where available.",
  },
];

export default function SubprocessorsPage() {
  return (
    <LegalPage title="Subprocessors and service providers" summary="The services supporting Crewzy and the information involved." updatedOn={{ iso: "2026-10-26", label: "26 October 2026" }}>
      <section>
        <h2>Services we use</h2>
        <p>Crewzy uses the following services for database and document storage, AI, signup protection, email and the public website. The information involved depends on the features used and the content supplied.</p>
        <LegalTable label="Crewzy service providers, purposes and information">
          <table>
            <caption>Services supporting Crewzy</caption>
            <thead><tr><th scope="col">Service</th><th scope="col">Purpose</th><th scope="col">Information involved</th></tr></thead>
            <tbody>{providers.map(provider => <tr key={provider.name}>
              <th scope="row">{provider.name}</th>
              <td>{provider.purpose}</td>
              <td>{provider.information}</td>
            </tr>)}</tbody>
          </table>
        </LegalTable>
        <p>Online payment providers are not currently connected.</p>
        <p>For Cloudflare’s handling of signup security signals, see its <a href="https://www.cloudflare.com/turnstile-privacy-policy/">Turnstile Privacy Addendum</a>.</p>
      </section>

      <section>
        <h2>Advertising</h2>
        <p>We also use Google Ads to promote Crewzy. <a href="https://policies.google.com/privacy">Google’s privacy policy</a> explains how Google processes information in its advertising services. See our <Link href="/privacy#storage">privacy information about cookies and third-party services</Link>.</p>
      </section>

      <section>
        <h2>Data locations and processing terms</h2>
        <p>Our primary database, its automated backups and document storage are hosted on AWS in London, United Kingdom. This does not establish where other services or AI processing take place. Read our <Link href="/privacy#locations">data location and international processing information</Link> for the scope of this statement.</p>
        <p>For organisational customers, the written <Link href="/dpa">data processing agreement</Link> identifies the applicable processing arrangements, including subprocessor authorisation and notification terms. A provider’s role depends on the service and information involved.</p>
      </section>

      <section>
        <h2>Contact us</h2>
        <p>For provider enquiries, email <a href={`mailto:${privacyEmail}`}><strong>{privacyEmail}</strong></a> or write to Privacy enquiries, {company.legalName}, {company.registeredOffice}.</p>
        <p>Related information: <Link href="/privacy">privacy policy</Link> and <Link href="/resources#security">security and trust</Link>.</p>
      </section>
    </LegalPage>
  );
}
