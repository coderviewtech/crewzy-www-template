const REQUEST_TIMEOUT_MS = 15_000;

/** Bounded read-only requests used by the release audits. */
export function auditFetch(url, options = {}) {
  return fetch(url, { ...options, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
}
