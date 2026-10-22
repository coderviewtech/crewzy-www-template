/** Public portal destination; local or preview builds may override the origin. */
const appOrigin = (process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.crewzy.io").replace(/\/+$/, "");
export const appUrl = (path: string) => `${appOrigin}/${path.replace(/^\/+/, "")}`;

export const siteCaption = "People, work and compliance. Connected.";
export const demoHref = "/contact#demo";
export const salesEmail = "sales@crewzy.io";
export const supportEmail = "support@crewzy.io";
/** Crewzy address selected; Zoho hosts mailboxes. Provisioning/monitoring of this address is not yet verified. */
export const privacyEmail = "privacy@crewzy.io";
export const demoEmailHref = `mailto:${salesEmail}?subject=${encodeURIComponent("Crewzy demo request")}`;

export const moduleSlugs = ["people", "recruitment", "time-projects", "leave", "finance", "compliance"] as const;
export const moduleHref = (index: number) => `/#module-${moduleSlugs[index]}`;

export function resolveHomeHash(hash: string): { section: string; moduleIndex?: number } | null {
  const slug = hash.replace(/^#module-/, "");
  const moduleIndex = moduleSlugs.findIndex(item => item === slug);
  if (hash.startsWith("#module-") && moduleIndex >= 0) return { section: "platform", moduleIndex };
  if (hash === "#module-crewzy-ai") return { section: "crewzy-ai" };
  if (hash === "#features") return { section: "platform" };
  if (hash === "#faq") return { section: "questions" };
  const section = hash.slice(1);
  return ["top", "main", "platform", "compliance", "teams", "questions", "crewzy-ai"].includes(section) ? { section } : null;
}
