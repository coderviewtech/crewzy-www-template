import type { FeatureSlug } from "./site-routes";

type Section = { title: string; text: string };
type FeatureContent = {
  heading: string;
  introduction: string;
  sections: Section[];
  workflowTitle: string;
  steps: Section[];
  questions: { question: string; answer: string }[];
  fit: string;
};

/** Product scope checked against the existing platform, pricing and trust pages. */
export const featureContent: Record<FeatureSlug, FeatureContent> = {
  "hr-software-small-business": {
    heading: "HR software for small businesses, built around one employee record.",
    introduction: "When a small team grows, employee information often spreads across spreadsheets, shared folders and email. Crewzy connects people records, documents, leave and everyday work so the same information does not have to be maintained in several places.",
    sections: [
      { title: "Keep the employee record at the centre", text: "Start with the people who work in your business. Keep their details and supporting documents together, then use that shared context in connected workflows. An employee record becomes a place to return to when a request, document review or change needs attention." },
      { title: "Follow the employee lifecycle", text: "Onboarding and offboarding involve more than creating or removing a name in a spreadsheet. Crewzy brings lifecycle workflows into the same workspace as employee records. Your team can keep the work connected as people join, change roles or leave, while retaining the relevant activity history." },
      { title: "Connect HR with the working day", text: "Leave requests, timesheets and document renewals depend on accurate people information. Keeping them in the same workspace reduces the need to reconcile separate lists. Access depends on the user's role and permissions; sharing one record does not mean giving every employee access to everything." },
    ],
    workflowTitle: "A practical starting point for a small team",
    steps: [
      { title: "Start with current employee records", text: "Confirm who should be in the workspace and which information your team needs to maintain. Resolve duplicate or outdated records before relying on them." },
      { title: "Choose the first workflow", text: "Begin with the recurring task causing the most administration, such as leave requests or document reviews. Agree who submits, who reviews and who follows up." },
      { title: "Review access and responsibilities", text: "Use the available role and permission controls and check that each person can access the work they need. Keep responsibility for approving changes clear." },
      { title: "Expand when the process is working", text: "Add connected timesheets, projects or financial administration when they address a real need. Compare the current plans before depending on a particular capability." },
    ],
    questions: [
      { question: "Is there a free HR plan?", answer: "Yes. Crewzy's free plan supports up to 10 employees and includes core records, documents, leave, basic projects, timesheets and audit history. No payment card is required. The pricing page explains the current plan scope." },
      { question: "Does Crewzy replace payroll software?", answer: "No. Crewzy does not run a payroll cycle. Approved time and leave data can be exported for your payroll provider, which remains responsible for payroll processing." },
      { question: "Is Crewzy only for HR teams?", answer: "No. It is designed for the people doing the administration, including owners and managers in small businesses, agencies and consultancies. A dedicated HR department is not required." },
    ],
    fit: "Crewzy fits teams that want employee administration and operational work in one workspace. If you need payroll processing or shift-rota planning, discuss those requirements with us before choosing a plan.",
  },
  "document-expiry-tracking": {
    heading: "Employee document expiry tracking, with renewal work kept in context.",
    introduction: "A folder stores a certificate, but it does not explain who owns the next renewal. Crewzy connects documents and their recorded expiry dates to the employee, the review workflow and the history of decisions.",
    sections: [
      { title: "See which recorded dates need attention", text: "Keep employee documents together and track their expiry dates in the same workspace. A central view helps your team identify approaching renewals instead of searching individual folders. The accuracy of that view depends on the information entered and reviewed by your team." },
      { title: "Keep renewal reviews with the document", text: "Assign a reviewer, follow renewal progress and retain the decisions with the document. When someone submits updated evidence, the responsible person has the context needed to review it rather than reconstructing an email conversation." },
      { title: "Retain a history of activity", text: "Audit history shows who took an action and when. It supports internal review of the process and helps explain how a document was handled. A timestamped record is evidence of recorded activity; it is not independent proof that a document is authentic or legally sufficient." },
    ],
    workflowTitle: "A document renewal process your team can follow",
    steps: [
      { title: "Record the document and its dates", text: "Connect the evidence to the correct employee and check the recorded expiry date. Keep the document type and intended purpose clear to the person reviewing it." },
      { title: "Agree who owns the review", text: "Identify the person who needs to check the replacement evidence and the person who follows up. Decide your internal review timetable before the expiry date approaches." },
      { title: "Review the replacement evidence", text: "Use the renewal workflow to keep progress and decisions together. A new upload should be checked by an authorised person before your business relies on it." },
      { title: "Retain the decision history", text: "Keep the recorded actions available for later review. Periodically check whether dates, responsibilities and the documents your business requires are still current." },
    ],
    questions: [
      { question: "Does Crewzy verify document authenticity?", answer: "No. Crewzy tracks document dates and supports reviews and audit history. It does not establish whether a certificate, licence or identity document is genuine." },
      { question: "Does expiry tracking guarantee compliance?", answer: "No. It helps organise your compliance process. Your business remains responsible for deciding which evidence is required, performing the appropriate checks and acting on the results." },
      { question: "Who is this useful for?", answer: "Teams that need visibility of employee documents and renewals, including agencies, consultancies and document-led businesses. Discuss your specific review requirements in a demo and check the current plan scope." },
    ],
    fit: "Use Crewzy to organise recorded dates, renewal reviews and evidence of activity. It is not a legal advice service, an identity-verification service or a substitute for your industry's required checks.",
  },
  "timesheets-and-invoicing": {
    heading: "Timesheet and invoicing software for agencies and consultancies.",
    introduction: "Client work, approved hours and invoices describe the same work from different angles. Crewzy connects them so your team can carry the context from a project into time approval and billing.",
    sections: [
      { title: "Log time against the client project", text: "Hours recorded without a project are difficult to reconcile at month end. Crewzy keeps time connected to the project it belongs to, giving the team reviewing the work a clearer starting point than a separate spreadsheet of totals." },
      { title: "Review the work before billing", text: "Timesheet approvals provide a review step between recorded activity and financial administration. Managers can follow submitted time and identify incomplete weeks while there is still time to ask for clarification. Agree your internal submission and approval routine with the people doing the work." },
      { title: "Carry approved work through to invoices", text: "Approved work can become an invoice without re-keying client or rate details. The connected workflow helps agencies reduce the manual handover between project administration and finance. Your team still needs to check the invoice, the agreed commercial terms and the relevant billing details." },
    ],
    workflowTitle: "From client work to a reviewed invoice",
    steps: [
      { title: "Set the project context", text: "Keep the client and project details clear before the team starts recording time. Make sure people know which project their work belongs to." },
      { title: "Submit time consistently", text: "Use a regular submission routine so missing time can be followed up before the billing period closes. Keep the work associated with its original project." },
      { title: "Approve and review", text: "Review submitted work through the timesheet approval process. Resolve questions while the people involved can still explain the activity." },
      { title: "Prepare and check the invoice", text: "Carry approved work into invoicing, then check the commercial details before issuing it. Crewzy also supports recurring invoices and reminders for overdue invoices; compare plans for the financial features your team needs." },
    ],
    questions: [
      { question: "Who is this workflow designed for?", answer: "Agencies, consultancies and other service businesses that track project time and bill clients for their work. It is particularly relevant when time and invoice administration currently live in separate tools." },
      { question: "Are timesheets available on the free plan?", answer: "The free plan includes timesheets and basic projects for up to 10 employees. Do not assume that every financial or invoicing capability is included; compare the current plans on the pricing page." },
      { question: "Does this process contractor payroll?", answer: "No. Crewzy connects people, time, projects and financial administration, but it does not run payroll. Payroll calculations and payments require your payroll provider." },
    ],
    fit: "Crewzy is a fit when the problem is keeping people, time and invoicing connected. Confirm any required accounting integrations or specialist pay-and-bill requirements with us before adopting it.",
  },
  "leave-management": {
    heading: "Leave management software that keeps requests and employee records together.",
    introduction: "When staff holiday requests live in email and balances live in a spreadsheet, a simple request can create several follow-up tasks. Crewzy brings annual leave requests, balances, policies and approvals into the same workspace as your people.",
    sections: [
      { title: "Give requests a consistent place to live", text: "Use the leave workflow to keep a request with the employee it concerns. A shared process makes it easier to distinguish a submitted request from an informal conversation and helps the person reviewing it work from the same record." },
      { title: "Review balances and policy context", text: "Leave requests carry the balance and policy information the approver needs. Your business defines and maintains its leave policies; the software supports the workflow rather than deciding which employment rules apply to your team." },
      { title: "Keep approvals connected to everyday work", text: "Leave and timesheets rely on the same people information. Bringing them together helps managers see the relevant context without maintaining another employee list. Role and permission controls determine who can perform the available actions." },
    ],
    workflowTitle: "Move leave administration out of scattered messages",
    steps: [
      { title: "Review your current records", text: "Check employee details and the balances your business intends to use. Resolve differences in existing spreadsheets before adopting a shared process." },
      { title: "Agree the policy and reviewer", text: "Confirm the applicable policy and who handles requests. Make the process clear to employees, including how to raise a question about their balance." },
      { title: "Use the request and approval workflow", text: "Keep requests and decisions in Crewzy rather than making email the only record. Review the relevant balance and policy context before approving a request." },
      { title: "Reconcile with payroll where needed", text: "Approved time and leave data can be exported for your payroll provider. Crewzy does not replace the provider's payroll calculation or payment process." },
    ],
    questions: [
      { question: "Is leave management included in the free plan?", answer: "Yes. Crewzy's free plan includes leave management for up to 10 employees, alongside core records, documents, basic projects, timesheets and audit history." },
      { question: "Does Crewzy decide our holiday entitlement?", answer: "Your business is responsible for its policies and the employment rules that apply. Crewzy supports leave balances, policies, requests and approvals; it does not provide legal advice." },
      { question: "Can we use leave management alongside timesheets?", answer: "Yes. Both are part of the connected workspace and use employee context. If you have a specialist scheduling or payroll requirement, confirm it in a demo rather than assuming it is included." },
    ],
    fit: "A practical fit for small businesses moving beyond email requests and disconnected employee lists. Review policy setup with the person responsible for HR before relying on balances or approvals.",
  },
};
