export type GuideCategory = "start" | "features" | "trust";

export type GuideQuestion = {
  id: string;
  category: GuideCategory;
  question: string;
  answer: string;
  details?: string[];
  href: string;
  linkLabel: string;
};

export const guideCategories: { id: GuideCategory; label: string }[] = [
  { id: "start", label: "Getting started" },
  { id: "features", label: "Features" },
  { id: "trust", label: "Data & security" },
];

// Public product information only. Keep claims aligned with the linked pages;
// a published control is not evidence of staff permissions in production.
export const guideQuestions: GuideQuestion[] = [
  {
    id: "overview", category: "start", question: "What does Crewzy bring together?",
    answer: "People management, onboarding and offboarding, recruitment, time and projects, leave, documents and expiry, invoicing, expenses and Crewzy AI. These capabilities share the employee record, so you don’t need to keep reconnecting the same information.",
    href: "/platform", linkLabel: "Explore the platform",
  },
  {
    id: "explore", category: "start", question: "Can I explore without sharing my details?",
    answer: "Yes. Browse the site, take the interactive tour and read our public FAQs without sharing contact details. To start the chat, we ask for your name and email so the Crewzy team can follow up about your interest in the product. Submitting those details does not subscribe you to ongoing marketing. Your question choices stay in the page; the website host still handles normal request and connection information.",
    href: "/privacy", linkLabel: "Read the privacy policy",
  },
  {
    id: "fit", category: "start", question: "Is Crewzy suitable for my business?",
    answer: "Crewzy is designed for growing teams, agencies and consultancies, and businesses that need to keep employee documents and renewals in view. Explore the workflows to see how they fit your team’s people, projects and day-to-day administration.",
    href: "/solutions", linkLabel: "Find your business fit",
  },
  {
    id: "free", category: "start", question: "Can a small team start for free?",
    answer: "Yes. The free plan supports up to 10 employees with core records, documents, leave, basic projects, timesheets and audit history. No payment card is required.",
    href: "/pricing", linkLabel: "See plans and current pricing",
  },
  {
    id: "tour", category: "start", question: "Can I see it before signing up?",
    answer: "Yes. The interactive product tour uses illustrative records to show Crewzy’s connected workflows. You can explore it without signing in. A personal demo is optional and uses the contact details you choose to send us.",
    href: "/#platform", linkLabel: "Take the interactive tour",
  },
  {
    id: "compliance", category: "features", question: "How does Crewzy help with compliance?",
    answer: "Crewzy connects document expiry tracking with employee lifecycle workflows, permissions and audit history. It checks document dates, not document authenticity. It helps you see what needs attention and retain evidence of activity. It supports your compliance processes; it is not a guarantee of regulatory compliance.",
    href: "/#compliance", linkLabel: "Explore document workflows",
  },
  {
    id: "payroll", category: "features", question: "Does Crewzy run payroll or staff rotas?",
    answer: "Not yet. Crewzy covers people management, recruitment, time, projects, leave and financial administration, but it does not run a payroll cycle or build shift rotas today. Approved time and leave data can be exported for your payroll provider.",
    href: "/platform", linkLabel: "See the available features",
  },
  {
    id: "ai", category: "features", question: "What can Crewzy AI do?",
    answer: "Where enabled, Crewzy AI helps with workspace questions, document information and summaries. Workspace tools use company and role permissions to retrieve relevant information. Generated answers need human review. This website guide uses prepared answers and does not connect to your workspace or an AI provider.",
    href: "/resources#ai-safeguards", linkLabel: "Read the AI guidance",
  },
  {
    id: "staff-access", category: "trust", question: "Who at Crewzy can access customer data?",
    answer: "Crewzy personnel administer the AWS services that host the platform. Our published DPA describes limiting authorised personnel to necessary access under confidentiality obligations. This is not a promise that Crewzy is technically unable to view customer data. The specific staff roles, approval process and access records for your service need to be confirmed with us before onboarding.",
    href: "/dpa", linkLabel: "Read the data processing information",
  },
  {
    id: "support-controls", category: "trust", question: "How does Crewzy control staff access to customer data?",
    answer: "Crewzy uses the following controls to limit and monitor staff access to customer data.",
    details: [
      "Named staff accounts with mandatory multi-factor authentication (MFA), rather than shared logins or customer passwords.",
      "Only the permissions needed for a specific task, limited to the relevant customer and records; read-only access wherever possible.",
      "A recorded support reason, customer approval for routine support access to content, and separate internal approval where available.",
      "Temporary access that expires automatically and can be revoked earlier, including controls on direct database, document and backup access.",
      "Protected audit records of requests, approvals, denied attempts and data access, with regular access reviews and removal when staff leave.",
      "A separate emergency-access process with a recorded reason, limited duration, alerts and review after the incident.",
    ],
    href: "/contact", linkLabel: "Ask about current access controls",
  },
  {
    id: "security", category: "trust", question: "How is customer data protected?",
    answer: "Our Security & trust page describes HTTPS, encryption at rest, a private database network, protection against public document access, backups and infrastructure logging. Application controls include company-scoped permissions and optional multi-factor authentication. No service can promise zero risk; review the controls against the sensitivity of your data and your organisation’s requirements.",
    href: "/resources#security", linkLabel: "Review Security & trust",
  },
  {
    id: "location", category: "trust", question: "Where is customer data stored?",
    answer: "The primary database, its automated backups and document storage are hosted on AWS in London, UK. Other services, including AI, email, website hosting and security services, may process information elsewhere. London storage is not a commitment that all processing or support access stays in the UK.",
    href: "/subprocessors", linkLabel: "See service providers and locations",
  },
  {
    id: "customer-access", category: "trust", question: "Can everyone in my company see all records?",
    answer: "Workspace access is governed by roles, company permissions and record ownership checks. Access depends on the permissions assigned to each user and the feature involved. Your workspace administrator should review those permissions for your organisation.",
    href: "/resources#security", linkLabel: "Understand access controls",
  },
  {
    id: "ai-data", category: "trust", question: "Is customer data sent to an AI provider?",
    answer: "Enabled AI features use Amazon Bedrock to process prompts and relevant workspace information. Document extraction can include a complete image or extracted text, including personal information. Check the provider and processing arrangements before using those features. This product guide does not send data to an AI provider.",
    href: "/privacy", linkLabel: "Read about AI processing",
  },
  {
    id: "assurance", category: "trust", question: "How can I assess Crewzy’s security?",
    answer: "Start with our Security & trust page, privacy policy, provider list and data processing information. Ask us for current evidence of the controls and any independent certifications your organisation requires. This guide does not assert SOC 2 or ISO 27001 certification, or guarantee that Crewzy meets every organisation’s security requirements.",
    href: "/resources#security", linkLabel: "Review the security information",
  },
];

const homeQuestionIds = ["overview", "compliance", "payroll", "free", "security"];
export const homeQuestions = homeQuestionIds.map(id => guideQuestions.find(item => item.id === id)!);
export const trustQuestions = guideQuestions.filter(item => item.category === "trust");
