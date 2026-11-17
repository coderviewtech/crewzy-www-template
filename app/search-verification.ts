/** Optional public tokens. DNS verification in Search Console remains valid. */
const tokenPattern = /^[A-Za-z0-9_-]+$/;

function verificationToken(value: string | undefined, variable: string): string | undefined {
  if (!value) return undefined;
  if (tokenPattern.test(value)) return value;
  console.warn(`${variable} is invalid; ownership metadata was omitted.`);
  return undefined;
}

const google = verificationToken(process.env.GOOGLE_SITE_VERIFICATION, "GOOGLE_SITE_VERIFICATION");
const bing = verificationToken(process.env.BING_SITE_VERIFICATION, "BING_SITE_VERIFICATION");

export const searchVerification = {
  ...(google ? { google } : {}),
  ...(bing ? { other: { "msvalidate.01": bing } } : {}),
};
