import "server-only";

import { ConvexHttpClient } from "convex/browser";

/**
 * Server-side Convex client.
 *
 * The owner-only Convex functions are public endpoints guarded by a shared
 * token, so that token must never reach the browser. `server-only` makes an
 * accidental client import a build error rather than a leak.
 */
export function convexServerClient(): ConvexHttpClient {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set.");
  return new ConvexHttpClient(url);
}

/** The bearer token for owner-only Convex functions. */
export function ownerToken(): string {
  const token = process.env.CONVEX_OWNER_TOKEN;
  if (!token) {
    throw new Error(
      "CONVEX_OWNER_TOKEN is not set. It must match OWNER_API_TOKEN on the Convex deployment — see .env.example.",
    );
  }
  return token;
}
