/** Search intent belongs to a useful page, not a hidden list of ranking keywords. */
export const featureRoutes = [
  {
    slug: "hr-software-small-business",
    label: "HR for small businesses",
    title: "HR Software for Small Businesses",
    description: "Organise employee records, documents, onboarding and leave in Crewzy. HR software for small businesses, with a free plan for up to 10 employees.",
  },
  {
    slug: "document-expiry-tracking",
    label: "Document expiry tracking",
    title: "Employee Document Expiry Tracking Software",
    description: "Track employee document expiry dates, organise renewal reviews and retain an audit history with Crewzy. Keep upcoming renewals connected to employee records.",
  },
  {
    slug: "timesheets-and-invoicing",
    label: "Timesheets and invoicing",
    title: "Timesheet and Invoicing Software for Agencies",
    description: "Connect client projects, timesheet approvals and invoicing in Crewzy. Help your agency or consultancy carry approved work through to billing without re-keying.",
  },
  {
    slug: "leave-management",
    label: "Leave management",
    title: "Leave Management Software for Small Teams",
    description: "Manage annual leave requests, balances, policies and approvals in Crewzy. Keep staff holiday administration connected to employee records, with a free plan.",
  },
] as const;

export type FeatureSlug = typeof featureRoutes[number]["slug"];
export const featurePath = (slug: FeatureSlug): string => `/platform/${slug}`;
export const findFeature = (slug: string) => featureRoutes.find(feature => feature.slug === slug);

export const guideRoutes = [
  {
    slug: "employee-document-expiry-tracking",
    title: "How to Track Employee Document Expiry Dates",
    description: "Build an employee document renewal process with a practical tracking template, review checklist and worked example for small teams.",
    category: "Document renewals",
    feature: "document-expiry-tracking",
  },
  {
    slug: "timesheets-to-client-invoices",
    title: "From Approved Timesheets to Client Invoices",
    description: "A practical timesheet-to-invoice workflow for agencies and consultancies, with a worked billing example and checks before sending an invoice.",
    category: "Time and invoicing",
    feature: "timesheets-and-invoicing",
  },
  {
    slug: "employee-records-spreadsheet-migration",
    title: "Moving Employee Records Out of Spreadsheets",
    description: "Plan a small-business HR data migration with a field-mapping example, reconciliation checklist and a clear handover from spreadsheets.",
    category: "Small-business HR",
    feature: "hr-software-small-business",
  },
  {
    slug: "leave-requests-and-approvals",
    title: "Setting Up Leave Requests and Approvals",
    description: "Set up a clear staff holiday request process for a small team. Review balances, approval responsibilities, changes and a worked leave example.",
    category: "Leave management",
    feature: "leave-management",
  },
] as const satisfies ReadonlyArray<{ slug: string; title: string; description: string; category: string; feature: FeatureSlug }>;

export type GuideSlug = typeof guideRoutes[number]["slug"];
export const guidesPath = "/resources/guides";
export const guidePath = (slug: GuideSlug): string => `${guidesPath}/${slug}`;
export const findGuide = (slug: string) => guideRoutes.find(guide => guide.slug === slug);

/** The sitemap and rendered-page audits share one inventory. */
export const marketingPaths = [
  "/", "/platform", "/solutions", "/pricing", "/resources", "/customers", "/contact", "/about",
  ...featureRoutes.map(feature => featurePath(feature.slug)),
  guidesPath,
  ...guideRoutes.map(guide => guidePath(guide.slug)),
];
export const legalPaths = ["/privacy", "/terms", "/dpa", "/subprocessors"];
