import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import { guideQuestions, homeQuestions, trustQuestions } from "../app/product-guide/content.ts";

test("public discovery stays open and staff controls reflect the owner's implementation confirmation", () => {
  const ids = guideQuestions.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.includes("explore"));
  assert.ok(trustQuestions.some(item => item.id === "staff-access"));
  assert.ok(trustQuestions.some(item => item.id === "customer-access"));
  assert.match(guideQuestions.find(item => item.id === "staff-access").answer, /need to be confirmed/);
  assert.match(guideQuestions.find(item => item.id === "location").answer, /not a commitment/);
  assert.match(guideQuestions.find(item => item.id === "ai-data").answer, /complete image/);
  assert.match(guideQuestions.find(item => item.id === "explore").answer, /normal request/);
  assert.match(guideQuestions.find(item => item.id === "explore").answer, /ask for your name and email/);
  const controls = guideQuestions.find(item => item.id === "support-controls");
  assert.match(controls.answer, /Crewzy uses the following controls/);
  assert.doesNotMatch(`${controls.question} ${controls.answer}`, /proposed|still need to be implemented/);
  for (const safeguard of ["MFA", "customer approval", "expires automatically", "audit records", "emergency-access"]) {
    assert.ok(controls.details.join(" ").includes(safeguard));
  }
  for (const item of homeQuestions) assert.ok(guideQuestions.includes(item));
});

// Jenkins can run these against its production build without visiting the live site.
const buildDirectory = process.env.CREWZY_MEETUP_BUILD_DIR;
const buildFile = file => readFileSync(path.join(buildDirectory, file));
const visibleText = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ");

test("meetup and both QR downloads are prerendered, with no request-time data dependency", { skip: !buildDirectory }, () => {
  const manifest = JSON.parse(buildFile("prerender-manifest.json"));
  for (const route of ["/meet", "/meet/qr.png", "/meet/qr.svg"]) {
    assert.ok(manifest.routes[route], `${route} is built statically`);
    assert.equal(manifest.routes[route].initialRevalidateSeconds, false);
  }
});

test("meetup FAQs are public while the chat starts with required contact fields", { skip: !buildDirectory }, () => {
  const html = buildFile("server/app/meet.html").toString();
  const text = visibleText(html);
  assert.match(text, /Browse freely\. Share your details when you start a chat\./);
  assert.match(text, /Who at Crewzy can access customer data\?/);
  assert.match(text, /need to be confirmed with us before onboarding/);
  assert.match(html, /href="\/#platform"/);
  assert.match(html, /href="\/pricing"/);
  assert.match(html, /download="crewzy-meet\.png"/);
  assert.match(html, /download="crewzy-meet\.svg"/);
  assert.match(html, /rel="canonical" href="https:\/\/crewzy\.io\/meet"/);
  const publicContent = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(publicContent);
  assert.doesNotMatch(publicContent, /<(?:form|input|textarea)\b/i);
  assert.match(html, /id="crewzy-chat-name"[^>]*required/);
  assert.match(html, /id="crewzy-chat-email"[^>]*required/);
  assert.match(text, /Start chat/);
});

test("downloadable QR decodes to the canonical meetup URL without a tracking redirect", { skip: !buildDirectory }, () => {
  const png = PNG.sync.read(buildFile("server/app/meet/qr.png.body"));
  const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  assert.equal(decoded?.data, "https://crewzy.io/meet");
  assert.equal(png.width, 1024);
  assert.equal(png.height, 1024);
  assert.deepEqual([...png.data.subarray(0, 4)], [255, 255, 255, 255]);
  const svg = buildFile("server/app/meet/qr.svg.body").toString();
  assert.match(svg, /<svg\b/);
  assert.doesNotMatch(svg, /<script|<image|https?:\/\/(?!www\.w3\.org\/2000\/svg)/);
});
