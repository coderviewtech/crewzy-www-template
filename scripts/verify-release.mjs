import { execFileSync, spawn } from "node:child_process";
import { readdirSync } from "node:fs";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import { auditFetch } from "./audit-http.mjs";

const COMMAND_TIMEOUT_MS = 300_000;
const STARTUP_TIMEOUT_MS = 60_000;
const POLL_INTERVAL_MS = 300;
const nextCli = "node_modules/next/dist/bin/next";
const unitFiles = readdirSync("tests").filter(file => file.endsWith(".test.mjs")).sort().map(file => `tests/${file}`);

function run(args, env = process.env) {
  execFileSync(process.execPath, args, { stdio: "inherit", env, timeout: COMMAND_TIMEOUT_MS });
}

async function availablePort() {
  const socket = createServer();
  await new Promise((resolve, reject) => { socket.once("error", reject); socket.listen(0, "localhost", resolve); });
  const { port } = socket.address();
  await new Promise((resolve, reject) => socket.close(error => error ? reject(error) : resolve()));
  return port;
}

async function ready(server, origin) {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Preview server exited: ${server.exitCode}`);
    try {
      const response = await auditFetch(origin);
      if (response.ok) return;
    } catch (error) {
      if (!(error instanceof TypeError) && error.name !== "TimeoutError") throw error;
    }
    await delay(POLL_INTERVAL_MS);
  }
  throw new Error("Preview server did not become ready within the time limit");
}

async function auditContext(context) {
  // Exercise the enabled path with a synthetic public ID. Localhost is not an allowed tracking origin.
  const env = { ...process.env, CONTEXT: context, NEXT_TELEMETRY_DISABLED: "1", GA_MEASUREMENT_ID: "G-TEST123456" };
  run([nextCli, "build"], env);
  run(["--test", "tests/feature-prerender.test.mjs", "tests/guides-prerender.test.mjs", "tests/analytics-prerender.test.mjs", "tests/meetup-guide.test.mjs", "tests/menu-hierarchy.test.mjs"], { ...env, SEO_BUILD_DIR: ".next", CREWZY_MEETUP_BUILD_DIR: ".next" });
  if (context === "production") run(["--test", "tests/pricing-prerender.test.mjs", "tests/pricing-next-adapter.test.mjs"], { ...env, CREWZY_PRICING_BUILD_DIR: ".next" });
  const port = await availablePort();
  const origin = `http://localhost:${port}`;
  const server = spawn(process.execPath, [nextCli, "start", "--hostname", "localhost", "--port", String(port)], { env, stdio: "inherit" });
  let serverError;
  server.on("error", error => { serverError = error; });
  try {
    await ready(server, origin);
    if (serverError) throw serverError;
    run(["scripts/check-site-seo.mjs", origin, context === "production" ? "production" : "preview"], env);
    run(["scripts/check-site-links.mjs", origin], env);
    run(["--test", "tests/pricing-http.test.mjs"], { ...env, CREWZY_PRICING_TEST_ORIGIN: origin, CREWZY_PRICING_EXPECTED_MARKET: "unknown" });
  } finally {
    const closed = new Promise(resolve => server.once("close", resolve));
    server.kill("SIGTERM");
    await Promise.race([closed, delay(POLL_INTERVAL_MS * 10)]);
    if (server.exitCode === null && server.signalCode === null) server.kill("SIGKILL");
  }
}

if (Number(process.versions.node.split(".")[0]) !== 24) throw new Error("Release verification requires Node 24");
run(["node_modules/eslint/bin/eslint.js", "app", "proxy.ts", "next.config.js", "--max-warnings", "0"]);
run(["node_modules/typescript/bin/tsc", "--noEmit", "--incremental", "false"]);
run(["--test", ...unitFiles]);
for (const context of ["production", "deploy-preview"]) await auditContext(context);
console.log("Release checks passed for production and deploy-preview contexts.");
