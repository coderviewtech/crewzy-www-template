/**
 * Source-reviewed capabilities, not a claim that every customer uses each field.
 * Evidence and decisions: docs/privacy-review.md.
 */
export const customerDataCategories = [
  {
    category: "Accounts and access",
    data: "User email and identifiers, company membership, roles, account status, password hashes, optional MFA and recovery information, verification and session metadata.",
    purpose: "Authenticate users and administer access to the customer workspace.",
  },
  {
    category: "People and employee lifecycle",
    data: "Names, contact and address details, employee identifiers, optional birth date and gender, job and team details, managers, employment dates, onboarding, compensation, contracts, professional certifications/licences and their identifiers/dates, performance notes and offboarding records.",
    purpose: "Maintain people records and support employee lifecycle workflows.",
  },
  {
    category: "Additional onboarding details",
    data: "Where supplied: emergency contacts, bank details, national or tax identifiers (including PAN, Aadhaar, passport and UAN), nationality, marital status and blood group.",
    purpose: "Support customer-configured onboarding and recordkeeping.",
  },
  {
    category: "Documents and compliance evidence",
    data: "Uploaded files and versions, document numbers, issue and expiry dates, extracted fields, review records, acknowledgements and approval history.",
    purpose: "Store documents, track dates and renewals, and retain evidence of customer activity.",
  },
  {
    category: "Time, leave and projects",
    data: "Assignments, dated hours, task descriptions, leave types, dates, balances, reasons, supporting attachments and approval comments.",
    purpose: "Coordinate everyday work, leave, time approval and reporting.",
  },
  {
    category: "Expenses, invoices and client contacts",
    data: "Expense descriptions, amounts, receipts, invoice and contact details, and payment or bank references where supplied.",
    purpose: "Support expense and invoicing workflows. This does not mean Crewzy runs payroll.",
  },
  {
    category: "Recruitment",
    data: "Candidate contact and career details, CVs, skills, application stages, interview feedback, assessments, scores, uploaded recordings and transcripts, and customer client contacts.",
    purpose: "Manage applications, matching, shortlists, interviews and customer-authorised client sharing.",
  },
  {
    category: "AI inputs and derived outputs",
    data: "Prompts, relevant workspace results, document images or extracted text, CV and transcript content, summaries, extracted skills and candidate-fit assessments where those features are used.",
    purpose: "Generate workspace answers, extract document information and assist recruitment review.",
  },
  {
    category: "Workspace activity",
    data: "User and company identifiers, actors, roles, actions, outcomes, timestamps and related security metadata, which can include IP addresses and browser information.",
    purpose: "Operate access controls, maintain activity evidence and investigate issues.",
  },
] as const;
