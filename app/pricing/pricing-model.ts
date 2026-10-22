export type BillingCycle = "monthly" | "annual";
export type PricingMarket = "UK" | "IN" | "US" | "EU";

// Approved launch prices, 21 October 2026. Marketing estimates only: the app
// independently chooses the purchasable catalogue from its stored billing country.
export const PRICING_MARKETS = {
  UK: { label: "UK", currency: "GBP", symbol: "£", locale: "en-GB", monthly: 8, annual: 6 },
  IN: { label: "India", currency: "INR", symbol: "₹", locale: "en-IN", monthly: 149, annual: 119 },
  US: { label: "US", currency: "USD", symbol: "$", locale: "en-US", monthly: 10, annual: 8 },
  EU: { label: "Euro area", currency: "EUR", symbol: "€", locale: "en-IE", monthly: 9, annual: 7 },
} as const;

// EU euro-area members as of 2026, including Bulgaria. Other European countries
// are not silently assigned euro billing. Keep in step with the app's country map.
export const EURO_AREA_COUNTRIES = ["AT", "BE", "BG", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES"] as const;
export const FREE_EMPLOYEE_ALLOWANCE = 10;
const MAX_EMPLOYEES = 100_000;

export function isPricingMarket(value: unknown): value is PricingMarket {
  return typeof value === "string" && Object.hasOwn(PRICING_MARKETS, value);
}

export function marketForCountry(value: string | null | undefined): PricingMarket | null {
  const country = value?.trim().toUpperCase();
  if (country === "GB") return "UK";
  if (country === "IN" || country === "US") return country;
  return EURO_AREA_COUNTRIES.some(item => item === country) ? "EU" : null;
}

export function parseEmployeeCount(value: string): number | null {
  const trimmed = value.trim();
  if (!/^[0-9]+$/.test(trimmed)) return null;
  const count = Number(trimmed);
  return Number.isSafeInteger(count) && count >= 1 && count <= MAX_EMPLOYEES ? count : null;
}

export function calculateBusinessPrice(employeeCount: number, cycle: BillingCycle, market: PricingMarket) {
  if (!Number.isSafeInteger(employeeCount) || employeeCount < 1 || employeeCount > MAX_EMPLOYEES) {
    throw new RangeError("Employee count must be a whole number from 1 to 100,000.");
  }
  if (cycle !== "monthly" && cycle !== "annual") throw new RangeError("Unknown billing cycle.");
  if (!isPricingMarket(market)) throw new RangeError("Unknown pricing market.");
  const rates = PRICING_MARKETS[market];
  const unitMonthly = rates[cycle];
  const includedEmployees = Math.min(employeeCount, FREE_EMPLOYEE_ALLOWANCE);
  const billableEmployees = Math.max(0, employeeCount - FREE_EMPLOYEE_ALLOWANCE);
  const monthlyEquivalent = billableEmployees * unitMonthly;
  return {
    unitMonthly,
    includedEmployees,
    billableEmployees,
    monthlyEquivalent,
    invoiceTotal: monthlyEquivalent * (cycle === "annual" ? 12 : 1),
    annualSaving: billableEmployees * (rates.monthly - rates.annual) * 12,
  };
}

// Round down so the advertised saving never overstates the actual discount.
export function annualSavingPercent(market: PricingMarket): number {
  const { monthly, annual } = PRICING_MARKETS[market];
  return Math.floor((monthly - annual) * 100 / monthly);
}

export function formatMoney(amount: number, market: PricingMarket): string {
  const { locale, currency } = PRICING_MARKETS[market];
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}
