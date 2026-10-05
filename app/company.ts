/**
 * Company facts checked against Companies House on 30 September 2026.
 * Keep legal disclosures separate from the product's display branding.
 * The founder role and product relationship were supplied by the founder;
 * The founder supplied the LinkedIn biography after its public view was blocked.
 */
export const company = {
  displayName: "CoderView",
  legalName: "CODER VIEW LTD",
  number: "14561510",
  jurisdiction: "England and Wales",
  incorporatedOn: "29 December 2022",
  registeredOffice: "31 Little Dodden, Basildon, England, SS16 5TZ",
  companiesHouseUrl: "https://find-and-update.company-information.service.gov.uk/company/14561510",
} as const;

export const founder = {
  name: "Manohar Nunna",
  role: "Founder of Crewzy",
  linkedInUrl: "https://www.linkedin.com/in/manohar-nunna/",
} as const;
