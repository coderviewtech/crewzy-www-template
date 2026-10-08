import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import sharp from "sharp";
import { company, founder } from "../app/company.ts";

const source = path => readFileSync(new URL(path, import.meta.url), "utf8");

test("company disclosure retains the registered name and official record", () => {
  assert.equal(company.displayName, "CoderView");
  assert.equal(company.legalName, "CODER VIEW LTD");
  assert.equal(company.number, "14561510");
  assert.equal(company.companiesHouseUrl, `https://find-and-update.company-information.service.gov.uk/company/${company.number}`);
  assert.equal(company.registeredOffice, "31 Little Dodden, Basildon, England, SS16 5TZ");
  assert.equal(company.incorporatedOn, "29 December 2022");
});

test("founder link uses the exact profile supplied by the founder", () => {
  assert.equal(founder.name, "Manohar Nunna");
  assert.equal(founder.linkedInUrl, "https://www.linkedin.com/in/manohar-nunna/");
});

test("founder section uses the supplied portrait with accessible, responsive sizing", async () => {
  const page = source("../app/about/page.tsx");
  assert.match(page, /src="\/images\/manohar-nunna\.jpeg"/);
  assert.ok(page.includes('alt={`${founder.name}, founder of Crewzy`}'));
  assert.match(page, /width=\{400\}/);
  assert.match(page, /height=\{400\}/);
  assert.match(page, /sizes="\(max-width: 760px\) 104px, 128px"/);
  assert.ok(!page.includes("s.monogram"));
  const photo = await sharp(readFileSync(new URL("../public/images/manohar-nunna.jpeg", import.meta.url))).metadata();
  assert.equal(photo.format, "jpeg");
  assert.equal(photo.width, 400);
  assert.equal(photo.height, 400);
  assert.equal(photo.exif, undefined);
  assert.equal(photo.xmp, undefined);
});

test("footer and structured data share the full legal company facts", () => {
  for (const path of ["../app/site-shell.tsx", "../app/layout.tsx"]) {
    const file = source(path);
    for (const field of ["legalName", "number", "registeredOffice", "companiesHouseUrl"]) {
      assert.ok(file.includes(`company.${field}`), `${path} must use company.${field}`);
    }
  }
});

test("About tells the supplied origin story and leaves full legal details in the footer", () => {
  const page = source("../app/about/page.tsx");
  for (const detail of ["passport expiry dates", "contractor renewal dates", "Overtime hours", "small and medium-sized businesses"]) {
    assert.ok(page.includes(detail), `Origin story must retain ${detail}`);
  }
  for (const field of ["legalName", "jurisdiction", "companiesHouseUrl"]) assert.ok(page.includes(`company.${field}`));
  assert.ok(!page.includes("company.registeredOffice"));
  assert.ok(!page.includes("company.incorporatedOn"));
  assert.ok(!page.includes("One employee record"));
  assert.ok(!page.includes("Connected workflows"));
  assert.match(page, /href="#story"/);
  assert.match(page, /id="story"/);
});

test("About is discoverable in navigation and sitemap with its own canonical", () => {
  assert.match(source("../app/site-navigation.ts"), /label: "About Crewzy"[^\n]+href: "\/about"/);
  assert.match(source("../app/sitemap.ts"), /path: "\/about"/);
  assert.match(source("../app/about/page.tsx"), /canonical: "\/about"/);
});

test("About Crewzy is a top-level link after Solutions, not a Resources dropdown item", () => {
  const shell = source("../app/site-shell.tsx");
  assert.match(shell, /dropdown\("Solutions"[^\n]+\n\s*<a href="\/about"[^>]+>\s*About Crewzy/);
  assert.match(shell, /href="\/about" aria-current=\{pathname === "\/about" \? "page" : undefined\} onClick=\{close\}/);
  const menus = source("../app/site-navigation.ts").split("export const footerGroups")[0];
  assert.ok(!menus.includes('href: "/about"'));
});

test("founder bio uses the supplied product-building and operational experience", () => {
  const page = source("../app/about/page.tsx");
  assert.ok(page.includes("A product builder."));
  assert.ok(page.includes("a decade of experience in DevOps, DevSecOps and platform engineering"));
  assert.ok(page.includes("small businesses to enterprises"));
  assert.ok(!page.includes("Manohar is an AI platform engineer"));
});

test("story illustration is scroll-controlled, cleaned up and has a static fallback", () => {
  const component = source("../app/about/workspace-illustration.tsx");
  const css = source("../app/about/workspace-illustration.module.css");
  assert.ok(component.includes("IntersectionObserver"));
  assert.ok(component.includes("observer?.disconnect()"));
  assert.ok(component.includes("preference.removeEventListener"));
  assert.ok(component.includes('window.removeEventListener("scroll", onScroll)'));
  assert.ok(component.includes('window.removeEventListener("resize", schedule)'));
  assert.ok(component.includes("window.cancelAnimationFrame(frame)"));
  assert.ok(component.includes("delete visual.dataset.scrollMotion"));
  assert.ok(!component.includes("Replay"));
  assert.ok(!component.includes("<button"));
  assert.ok(component.includes('aria-hidden="true"'));
  assert.ok(component.includes("figcaption"));
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /animation: none !important/);
  assert.equal((css.match(/both paused/g) || []).length, 5);
  assert.doesNotMatch(css.match(/@keyframes recordArrives[^\n]+/)?.[0] || "", /opacity:/);
  assert.match(css, /background: var\(--preview-page-background\)/);
  assert.ok(!css.includes("infinite"));
});

test("origin story explains the business challenge, opportunity and product direction", () => {
  const page = source("../app/about/page.tsx");
  assert.ok(page.includes("How Crewzy"));
  assert.ok(page.includes("took shape."));
  for (const heading of ["The challenge", "The opportunity", "That became Crewzy"]) {
    assert.ok(page.includes(`<h3>${heading}</h3>`));
  }
});
