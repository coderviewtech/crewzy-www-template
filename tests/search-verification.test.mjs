import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { test } from "node:test";

function metadata(google, bing) {
  return JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e", `
    import { searchVerification } from "./app/search-verification.ts";
    console.log(JSON.stringify(searchVerification));
  `], {
    cwd: new URL("../", import.meta.url),
    env: { GOOGLE_SITE_VERIFICATION: google, BING_SITE_VERIFICATION: bing },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }));
}

test("unset verification tokens produce no ownership claims", () => {
  assert.deepEqual(metadata("", ""), {});
});

test("independent public tokens retain the provider's exact metadata keys", () => {
  assert.deepEqual(metadata("example-google_token", "EXAMPLE123"), {
    google: "example-google_token", other: { "msvalidate.01": "EXAMPLE123" },
  });
  assert.deepEqual(metadata("", "EXAMPLE123"), { other: { "msvalidate.01": "EXAMPLE123" } });
});

test("a pasted HTML tag or whitespace cannot become a verification token", () => {
  assert.deepEqual(metadata('<meta content="wrong">', " bad token "), {});
});
