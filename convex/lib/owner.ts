import { env } from "../_generated/server";

/**
 * Compares without an early exit so a wrong token takes the same time to
 * reject regardless of how many leading characters it got right. The length
 * check leaks the token length, which is not secret.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Every owner-only function starts with this. These are public Convex
 * functions (the Next.js server calls them over the network), so the token is
 * the only thing standing between the open internet and the contact list —
 * never pass it to the browser.
 */
export function requireOwner(token: string): void {
  const expected = env.OWNER_API_TOKEN;
  if (!expected) {
    throw new Error(
      "OWNER_API_TOKEN is not set on this deployment. Run: npx convex env set OWNER_API_TOKEN <token>",
    );
  }
  if (!timingSafeEqual(token, expected)) {
    throw new Error("Not authorised.");
  }
}
