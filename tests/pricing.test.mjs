import assert from "node:assert/strict";
import { test } from "node:test";
import { annualSavingPercent, calculateBusinessPrice, EURO_AREA_COUNTRIES, formatMoney, marketForCountry, parseEmployeeCount } from "../app/pricing/pricing-model.ts";

test("employee counts accept trimmed whole numbers within the supported range", () => {
  for (const [input, expected] of [["1", 1], [" 10 ", 10], ["0011", 11], ["100000", 100000]]) {
    assert.equal(parseEmployeeCount(input), expected, input);
  }
});

test("employee counts reject empty, fractional, negative and nonnumeric entries", () => {
  for (const input of ["", "   ", "0", "-1", "+10", "1.5", "10.0", "1e2", "1,000", "ten", "10 employees", "Infinity", "100001"]) {
    assert.equal(parseEmployeeCount(input), null, input);
  }
});

test("monthly Business pricing bills every employee, including the first ten", () => {
  assert.deepEqual(calculateBusinessPrice(10, "monthly", "UK"), {
    unitMonthly: 8,
    monthlyEquivalent: 80,
    invoiceTotal: 80,
    annualSaving: 240,
  });
  assert.equal(calculateBusinessPrice(1, "monthly", "UK").invoiceTotal, 8);
  assert.equal(calculateBusinessPrice(11, "monthly", "UK").invoiceTotal, 88);
});

test("annual Business pricing separates the monthly equivalent from the yearly invoice", () => {
  assert.deepEqual(calculateBusinessPrice(10, "annual", "UK"), {
    unitMonthly: 6,
    monthlyEquivalent: 60,
    invoiceTotal: 720,
    annualSaving: 240,
  });
  assert.equal(calculateBusinessPrice(1, "annual", "UK").invoiceTotal, 72);
  assert.equal(calculateBusinessPrice(11, "annual", "UK").invoiceTotal, 792);
});

test("annual savings compare twelve monthly invoices with one annual invoice", () => {
  for (const employeeCount of [1, 10, 25, 100000]) {
    const monthly = calculateBusinessPrice(employeeCount, "monthly", "UK");
    const annual = calculateBusinessPrice(employeeCount, "annual", "UK");
    assert.equal(annual.annualSaving, monthly.invoiceTotal * 12 - annual.invoiceTotal);
    assert.equal(monthly.annualSaving, annual.annualSaving);
  }
});

test("GBP totals use pound symbols, UK thousands separators and no decimal places", () => {
  assert.equal(formatMoney(80, "UK"), "£80");
  assert.equal(formatMoney(720, "UK"), "£720");
  assert.equal(formatMoney(calculateBusinessPrice(100000, "monthly", "UK").invoiceTotal, "UK"), "£800,000");
  assert.equal(formatMoney(calculateBusinessPrice(100000, "annual", "UK").invoiceTotal, "UK"), "£7,200,000");
});

test("price calculations reject unsupported employee counts", () => {
  for (const employeeCount of [0, -1, 1.5, NaN, Infinity, -Infinity, 100001, Number.MAX_SAFE_INTEGER]) {
    for (const cycle of ["monthly", "annual"]) {
      assert.throws(() => calculateBusinessPrice(employeeCount, cycle, "UK"), RangeError, `${employeeCount} / ${cycle}`);
    }
  }
});

test("price calculations reject unsupported billing cycles", () => {
  for (const cycle of ["", "yearly", "Monthly", "quarterly", null, undefined]) {
    assert.throws(() => calculateBusinessPrice(10, cycle, "UK"), RangeError, String(cycle));
  }
});


test("approved regional rates calculate independent local annual invoices", () => {
  for (const [market, monthly, annual, saving] of [["UK", 8, 6, 25], ["IN", 149, 119, 20], ["US", 10, 8, 20], ["EU", 9, 7, 22]]) {
    assert.equal(calculateBusinessPrice(1, "monthly", market).invoiceTotal, monthly);
    assert.equal(calculateBusinessPrice(20, "annual", market).invoiceTotal, 20 * annual * 12);
    assert.equal(calculateBusinessPrice(20, "annual", market).annualSaving, 20 * (monthly - annual) * 12);
    assert.equal(annualSavingPercent(market), saving);
  }
  assert.equal(calculateBusinessPrice(20, "monthly", "IN").invoiceTotal, 2980);
  assert.equal(calculateBusinessPrice(20, "annual", "IN").invoiceTotal, 28560);
});

test("country detection assigns only supported billing markets and euro-area members", () => {
  assert.equal(marketForCountry("GB"), "UK");
  assert.equal(marketForCountry(" in "), "IN");
  assert.equal(marketForCountry("US"), "US");
  assert.equal(EURO_AREA_COUNTRIES.length, 21);
  for (const country of EURO_AREA_COUNTRIES) assert.equal(marketForCountry(country), "EU");
  for (const country of [null, undefined, "", "EU", "EUR", "CA", "AU", "CH", "SE", "PL", "DK", "RO", "CZ", "HU", "India", "GB,IN"]) {
    assert.equal(marketForCountry(country), null, String(country));
  }
});

test("regional totals use the correct currency and Indian digit grouping", () => {
  assert.equal(formatMoney(149, "IN"), "₹149");
  assert.equal(formatMoney(142800, "IN"), "₹1,42,800");
  assert.equal(formatMoney(1200, "US"), "$1,200");
  assert.equal(formatMoney(1200, "EU"), "€1,200");
});

test("a caller cannot silently obtain a price for an unsupported market", () => {
  for (const market of [null, undefined, "", "GBP", "in", "GLOBAL", "toString", "constructor"]) {
    assert.throws(() => calculateBusinessPrice(10, "monthly", market), RangeError);
  }
});
