import type { GuideSlug } from "./site-routes";

export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  checklist?: string[];
  table?: { caption: string; columns: string[]; rows: string[][] };
};
type GuideContent = {
  introduction: string;
  takeaway: string;
  sections: GuideSection[];
  crewzy: string;
  sources: { label: string; href: string }[];
};

// An editorial revision date, not an invented publication or customer-review date.
export const guideUpdated = "2026-11-17";
export const guideUpdatedLabel = "17 November 2026";
export const guideAuthor = { name: "Crewzy", href: "/about" };

export const guideContent: Record<GuideSlug, GuideContent> = {
  "employee-document-expiry-tracking": {
    introduction: "An expiry tracker is useful only when it leads to a completed review. This guide explains how a small team can connect an employee document, its recorded dates and the person responsible for the next action. Use the example fields and checklist to review your current process before choosing software.",
    takeaway: "Keep the expiry date, internal review date and review decision separate. A replacement upload is the start of a check, not proof that the renewal is complete.",
    sections: [
      { id: "define-the-record", title: "1. Decide what you are tracking", paragraphs: [
        "Start with the documents your business has a reason to maintain. For each document type, agree what the evidence is used for, who needs access and who decides whether it is acceptable. Avoid collecting extra personal information simply because a spreadsheet has room for another column.",
        "Distinguish a date printed on the document from an internal review deadline. Some records have no expiry date. Leave that field empty and record a review date where your process requires one; do not invent a statutory expiry or assume every certificate follows the same renewal cycle.",
      ] },
      { id: "tracking-template", title: "2. Use a tracking record with a clear owner", paragraphs: [
        "The table is a process template, not an import format for Crewzy. Adapt it to the evidence and responsibilities in your business. Use a stable internal employee reference so two people with the same name cannot be confused. Keep the document itself in an access-controlled location rather than embedding private files in a broadly shared tracker.",
      ], table: { caption: "Suggested fields for an employee document renewal tracker", columns: ["Field", "What to record"], rows: [
        ["Employee reference", "The internal record this document belongs to"],
        ["Document type and evidence link", "What the evidence is and where authorised reviewers can find it"],
        ["Recorded expiry date", "The date on the evidence, or blank when none applies"],
        ["Internal review date", "When your team should begin its review"],
        ["Review owner", "The person accountable for checking and following up"],
        ["Progress and next action", "What is outstanding, who must act and by when"],
        ["Decision and history", "The reviewer, outcome, date and relevant notes"],
      ] } },
      { id: "worked-renewal", title: "3. Walk through one renewal", paragraphs: [
        "Illustrative example: an employee's equipment-training certificate records an expiry of 31 January. Your team chooses 2 January as its internal review date. These dates are examples, not a recommended legal interval. The reviewer checks whether replacement evidence is needed, and the employee arranges the relevant next step.",
        "When a replacement arrives, the reviewer checks that it belongs to the correct employee and meets the business's requirements. They record the outcome and any new date from the evidence. If it is incomplete or unsuitable, the record stays unresolved with a named next action. Do not change the old expiry simply to make an overdue item disappear.",
        "If the reviewer is absent, a designated backup should be able to find the evidence and understand the outstanding action. That handover is much easier when the decision history lives with the record instead of only in an inbox.",
      ] },
      { id: "renewal-checklist", title: "4. Check the renewal before closing it", paragraphs: ["Use this checklist during a review. An internal completion check does not replace any independent verification your business needs."], checklist: [
        "Confirm the employee and document type are correct.",
        "Check the source evidence and recorded dates.",
        "Identify who must review the replacement and who follows up.",
        "Record missing information and the next action.",
        "Record the review outcome, reviewer and date.",
        "Set the next relevant review or expiry date from the evidence.",
        "Handle superseded evidence under your retention and access policy.",
      ] },
      { id: "review-the-process", title: "5. Review overdue work, not just dates", paragraphs: [
        "At a regular review, look for records without an owner, replacements awaiting a decision and overdue actions. A dashboard can show recorded information, but somebody still needs to resolve the outstanding work. Agree the review cadence with the people who carry out the process.",
        "Expiry tracking does not establish authenticity or guarantee legal compliance. Decide which checks your business needs, obtain appropriate advice where necessary, and check how employment records should be collected, retained and protected. The ICO guidance below is a starting point for UK data-protection responsibilities.",
      ] },
    ],
    crewzy: "Crewzy connects employee documents, recorded expiry dates, renewal reviews and activity history. Use the document-expiry workflow page to explore the fit, then check your specific evidence and review requirements in a demo. Crewzy does not verify document authenticity.",
    sources: [{ label: "ICO: collecting and keeping employment records", href: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/employment-practices-and-data-protection-keeping-employment-records/collecting-and-keeping-employment-records/" }],
  },
  "timesheets-to-client-invoices": {
    introduction: "A timesheet records time spent on work during a period. For an agency or consultancy, the difficult part of invoicing is often the handover: hours are recorded in one place, approval arrives somewhere else and finance has to reconstruct what can be billed. This guide gives you a repeatable path from submitted time to a checked client invoice.",
    takeaway: "Recorded hours, approved hours and billable hours are different measures. Keep the client agreement and approval evidence with the billing decision.",
    sections: [
      { id: "agree-billing", title: "1. Agree the billing context before work starts", paragraphs: [
        "Confirm the client, project, billing period, rate or fixed-fee arrangement, currency and required purchase-order reference. Identify who can approve work and who checks the final invoice. A timesheet is evidence of recorded work; the client agreement determines what you can charge.",
        "Make project names easy to distinguish. If several projects belong to one client, the person entering time should know which one to use. Agree how corrections and non-billable work will be handled so finance does not need to guess at month end.",
      ] },
      { id: "close-the-period", title: "2. Close the timesheet period deliberately", paragraphs: [
        "Give the team a consistent submission routine. Before preparing invoices, identify missing submissions, return unclear entries for correction and complete the relevant approvals. Keep unresolved time visible rather than quietly treating it as zero.",
        "Use a clear cut-off and reconciliation step. If somebody corrects a previously reviewed timesheet, make sure the billing owner knows whether the correction affects an invoice already prepared or sent. A second copy of the same approved work must not become a second invoice charge.",
      ] },
      { id: "worked-billing-example", title: "3. Reconcile approved time to the bill", paragraphs: [
        "Illustrative example: a consultancy has an agreed hourly rate of £75 for a client project. Its team records 12 hours. The reviewer approves 10; 2 need clarification. Of the approved hours, 1 is an agreed non-billable internal review. The invoice calculation therefore uses 9 hours, not 12 or 10.",
      ], table: { caption: "Illustrative reconciliation before tax or other charges", columns: ["Measure", "Example"], rows: [
        ["Recorded time", "12 hours"], ["Approved time", "10 hours"], ["Awaiting clarification", "2 hours"], ["Approved but non-billable", "1 hour"], ["Billable time", "9 hours"], ["Agreed hourly rate", "£75"], ["Time-based charge", "9 × £75 = £675"],
      ] } },
      { id: "check-the-invoice", title: "4. Review the invoice before sending it", paragraphs: [
        "Check the draft against the client agreement and approved work. Confirm the billed period, descriptions, purchase-order reference and any expenses or adjustments. Tax treatment and whether a VAT invoice is needed depend on the business and transaction; the example above makes no assumption about them.",
        "UK invoice requirements include identifying the invoice, supplier and customer, describing the supply, showing the relevant dates and stating the amounts due. GOV.UK explains the requirements and the additional rules for different business types and VAT invoices. Use that guidance or your accountant when checking your template.",
      ], checklist: [
        "Client, project, currency and billing period match the agreement.",
        "Missing and disputed time is accounted for.",
        "Approved non-billable work is excluded from the charge.",
        "Rates, expenses and adjustments have been checked.",
        "The same work has not already been invoiced.",
        "Invoice identifiers, dates, descriptions and tax details are correct.",
        "Payment terms and the client's submission channel are confirmed.",
      ] },
      { id: "complete-the-handover", title: "5. Keep the handover traceable", paragraphs: [
        "Retain the connection between the invoice and the approved work it covers. Record who checked it and where it was sent. When a client questions a charge, the team should be able to explain the period, rate and approval without rebuilding the calculation from emails.",
        "Track later corrections through your agreed invoicing process. Keep the original record and the reason for the adjustment clear. This workflow covers client billing; it does not calculate contractor payroll, employment deductions or pay-and-bill obligations.",
      ] },
    ],
    crewzy: "Crewzy connects projects, timesheet approvals and invoicing so approved work can retain its client and project context. Compare the plans for the financial features you need. Crewzy does not run payroll, and this guide does not promise an accounting integration.",
    sources: [{ label: "GOV.UK: what invoices must include", href: "https://www.gov.uk/invoicing-and-taking-payment-from-customers/invoices-what-they-must-include" }],
  },
  "employee-records-spreadsheet-migration": {
    introduction: "Moving employee records into HR software is a reconciliation exercise before it is a data-entry task. A small, checked migration is easier to trust than a large upload nobody can explain. Use this guide to establish a clean starting point and a controlled handover.",
    takeaway: "Decide which source is authoritative, map fields deliberately and reconcile the result before retiring the old process. Do not assume Crewzy accepts a particular spreadsheet import format.",
    sections: [
      { id: "inventory-records", title: "1. Find the records and choose an owner", paragraphs: [
        "List the spreadsheets, folders and other systems that hold employee information. Identify who maintains each source, when it was last checked and which records overlap. Choose an owner to resolve disagreements rather than allowing two different versions of the same fact to migrate.",
        "Separate current employees from former staff, candidates and other contacts. Decide the intended scope before moving data. Keep information only for a defined business purpose and apply your access and retention policies. The ICO guidance below explains the UK employment-record responsibilities that should inform those decisions.",
      ] },
      { id: "clean-and-map", title: "2. Clean the source and map the meaning", paragraphs: [
        "Use an internal employee reference to find duplicates. Check names, start dates, teams and managers with the responsible owner. Ambiguous dates deserve particular attention: 03/04 can mean different things in different formats. Agree an unambiguous representation and check the destination's accepted format.",
        "The following is an illustrative mapping exercise, not a Crewzy CSV specification. Verify the supported destination fields and the available setup method before preparing an import file or arranging manual entry.",
      ], table: { caption: "Example migration decisions to resolve before transferring records", columns: ["Source issue", "Decision to document"], rows: [
        ["Two rows for one person", "Which internal employee reference and source record are authoritative"],
        ["Department names differ", "The agreed team names and how old labels map to them"],
        ["Manager listed by first name only", "The correct manager's employee reference"],
        ["Dates use mixed formats", "The checked date and the destination's required format"],
        ["Document paths point to private folders", "Who can transfer the evidence and verify access"],
        ["Leave balance has no effective date", "The date and adjustments behind the opening balance"],
      ] } },
      { id: "pilot-migration", title: "3. Test a small, representative group", paragraphs: [
        "Choose a small group that includes the differences your process must handle: for example, different teams, a manager relationship and an employee with existing documents. Use authorised records and transfer them through the agreed method. Confirm that a successful transfer means the information is usable, not merely that a screen reported completion.",
        "Check each selected record against the agreed source. Verify the employee reference, relationships, dates and document access. Ask the people who maintain the information to review the result. Resolve mapping problems in the source or process before repeating the transfer for the remaining group.",
      ] },
      { id: "reconcile-and-handover", title: "4. Reconcile the full transfer", paragraphs: [
        "Compare the number of expected records with the number created, but do not rely on counts alone. Two duplicate records can hide a missing employee. Reconcile by employee reference and inspect exceptions. Record which items need follow-up and who owns them.",
        "Set a clear handover point after reconciliation. Explain where new changes should be made and who can edit the old files. Preserve or dispose of the original material according to your retention policy; do not leave a second writable master in circulation by accident.",
      ], checklist: [
        "Scope, record owner and authoritative sources are agreed.",
        "Duplicates and ambiguous fields are resolved.",
        "Supported fields and the transfer method are confirmed.",
        "A representative pilot has been checked by the record owner.",
        "Records reconcile by employee reference, not just total count.",
        "Document and role access have been reviewed.",
        "Outstanding exceptions have owners and next actions.",
        "The handover date and treatment of old files are communicated.",
      ] },
      { id: "keep-records-current", title: "5. Maintain the record after migration", paragraphs: [
        "Assign ownership for future corrections and establish how employees can report inaccurate information. Review the first few changes after the handover: a new joiner, a manager change or a document update can reveal a process gap that a bulk count misses.",
        "Keep access proportionate to each person's responsibilities. A shared HR workspace does not mean every user should see every employee's information. Review the actual role controls and your team's working practices together.",
      ] },
    ],
    crewzy: "Crewzy provides connected employee records, documents and HR workflows. Discuss your current data and required transfer method before planning a migration; this guide does not claim a bulk spreadsheet importer or an automatic transfer from your existing HR system.",
    sources: [{ label: "ICO: collecting and keeping employment records", href: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/employment-practices-and-data-protection-keeping-employment-records/collecting-and-keeping-employment-records/" }],
  },
  "leave-requests-and-approvals": {
    introduction: "A staff holiday process needs a clear request, a reliable balance and a recorded decision. A shared calendar alone cannot explain whether time off is pending or approved. This guide helps a small team agree the process before putting it into software.",
    takeaway: "Separate the policy, the balance and the request's status. Make it clear who decides, how changes are handled and where an employee can raise a question.",
    sections: [
      { id: "agree-policy", title: "1. Confirm the policy and opening balance", paragraphs: [
        "Start with the leave policy that applies to the person, including the leave year, working pattern and how different leave types are handled. Check the opening balance and the date it represents. If spreadsheets disagree, resolve that difference before employees start relying on a new screen.",
        "This is a workflow guide, not an entitlement calculator. Do not use a single example to decide statutory holiday, holiday pay, part-time entitlements or carry-over. UK employers should check the applicable rules and their contracts; the Acas guidance below is a useful starting point.",
      ] },
      { id: "request-and-review", title: "2. Define a request and its reviewer", paragraphs: [
        "Explain what employees should submit, where to submit it and who normally reviews it. Decide who provides cover when that reviewer is away. Make the status visible so an employee can distinguish an informal conversation from a recorded approval.",
        "The reviewer should check the relevant balance, policy and operational context before deciding. Agree how the employee will hear the outcome and how to ask about it. Keep explanations relevant to the decision and avoid putting sensitive personal details into a widely visible calendar or note.",
      ] },
      { id: "worked-leave-example", title: "3. Test the process with a simple example", paragraphs: [
        "Illustrative example: an employee has a confirmed available balance of 10 days at the point of the check and requests 2 working days. In this example there are no other pending requests, adjustments or special rules. If the request is approved and deducted, 8 days remain. The example tests the handover; it does not establish anyone's entitlement.",
      ], table: { caption: "Questions to resolve at each step of a holiday request", columns: ["Step", "What the team should be able to explain"], rows: [
        ["Before submission", "Which balance and policy apply to this employee"],
        ["Request submitted", "Whether pending time is shown or reserved in the balance"],
        ["Review completed", "Who decided, the outcome and how the employee is informed"],
        ["After approval", "How the two approved days affect the available balance"],
        ["Dates change", "How the old request is corrected or cancelled and the balance reconciled"],
      ] } },
      { id: "handle-changes", title: "4. Plan for changes and exceptions", paragraphs: [
        "A request may be amended, withdrawn or entered incorrectly. Agree how to correct it without leaving the original dates marked as approved. Recheck the balance after a change and keep the reason and decision traceable. Confirm the actual workflow supported by your chosen system instead of assuming every status has the same effect.",
        "If leave information is passed to payroll, identify the responsible person and the cut-off. Confirm that approved changes reached the provider. A leave request, a payroll adjustment and a payment are separate events; do not treat one as proof that the others are complete.",
      ] },
      { id: "launch-checklist", title: "5. Use a small-team launch checklist", paragraphs: ["Walk through one request and one correction before making the process routine. Ask both the employee and the reviewer to explain what happens next."], checklist: [
        "The applicable policy, leave year and working pattern are checked.",
        "Opening balances have an agreed effective date.",
        "Employees know where to request holiday and how to check its status.",
        "The reviewer and backup responsibilities are clear.",
        "Pending and approved time are understood correctly.",
        "Corrections and cancellations are reconciled.",
        "Employees know how to question an inaccurate balance or decision.",
        "Any payroll handover has a named owner and confirmation step.",
      ] },
    ],
    crewzy: "Crewzy brings leave requests, balances, policies and approvals together with employee records. Confirm the policy configuration and any special requirements before relying on the balances. Crewzy supports the administrative workflow; your business remains responsible for the applicable employment rules and payroll process.",
    sources: [{ label: "Acas: asking for and taking holiday", href: "https://www.acas.org.uk/checking-holiday-entitlement/asking-for-and-taking-holiday" }],
  },
};
