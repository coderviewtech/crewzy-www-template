import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

function evaluateNode(source, env) {
  return JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e", source], {
    cwd: projectRoot,
    env,
    encoding: "utf8",
  }));
}

test("Next captures the deployment context at build time, including preview exclusions", () => {
  for (const context of ["production", "deploy-preview", "branch-deploy", "dev", ""]) {
    const value = evaluateNode(`
      import config from "./next.config.js";
      delete process.env.CONTEXT;
      console.log(JSON.stringify(config.env.CREWZY_SITE_BUILD_CONTEXT));
    `, { ...process.env, CONTEXT: context });
    assert.equal(value, context);
  }
  const env = { ...process.env };
  delete env.CONTEXT;
  const fallback = evaluateNode(`
    import config from "./next.config.js";
    console.log(JSON.stringify(config.env.CREWZY_SITE_BUILD_CONTEXT));
  `, env);
  assert.equal(fallback, "local");
});

test("dynamic pricing inherits production indexing when runtime CONTEXT is absent", () => {
  const env = { ...process.env, CREWZY_SITE_BUILD_CONTEXT: "production" };
  delete env.CONTEXT;
  const metadata = evaluateNode(`
    import { indexingMetadata } from "./app/site-seo.ts";
    console.log(JSON.stringify(indexingMetadata()));
  `, env);
  assert.deepEqual(metadata, {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  });
});

test("a production runtime variable cannot make a preview build indexable", () => {
  for (const context of ["local", "branch-deploy", "deploy-preview"]) {
    const metadata = evaluateNode(`
      import { indexingMetadata } from "./app/site-seo.ts";
      console.log(JSON.stringify(indexingMetadata()));
    `, { ...process.env, CONTEXT: "production", CREWZY_SITE_BUILD_CONTEXT: context });
    assert.deepEqual(metadata, { index: false, follow: false });
  }
});
