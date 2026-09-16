/**
 * Session handling for the owner panel.
 *
 * There is exactly one operator, so there is no user table: the password lives
 * in the environment and a successful login mints an HMAC-signed cookie. Web
 * Crypto only — `proxy.ts` verifies the same cookie on the Edge runtime, where
 * `node:crypto` is unavailable.
 */

export const OWNER_COOKIE = "mw_owner";

/** How long a login lasts before the owner has to type the password again. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

/** A wrong password should never be cheap to test at scale. */
const FAILED_LOGIN_DELAY_MS = 400;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. The owner panel refuses to run without it — see .env.example.`,
    );
  }
  return value;
}

const encoder = new TextEncoder();

function base64url(bytes: ArrayBuffer): string {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

/** Compares without an early exit, so a near-miss is indistinguishable. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Checks the typed password against `OWNER_PASSWORD`. Failures are delayed:
 * with no shared store to rate-limit against across serverless instances, a
 * fixed cost per attempt is what actually blunts an online guessing attack.
 */
export async function verifyPassword(candidate: string): Promise<boolean> {
  const expected = requireEnv("OWNER_PASSWORD");
  const ok = timingSafeEqual(candidate, expected);
  if (!ok) {
    await new Promise((resolve) => setTimeout(resolve, FAILED_LOGIN_DELAY_MS));
  }
  return ok;
}

/** Mints a cookie value that is valid until `SESSION_MAX_AGE_SECONDS` from now. */
export async function createSessionToken(now = Date.now()): Promise<string> {
  const secret = requireEnv("OWNER_SESSION_SECRET");
  const expiresAt = Math.floor(now / 1000) + SESSION_MAX_AGE_SECONDS;
  const payload = String(expiresAt);
  return `${payload}.${await sign(payload, secret)}`;
}

/**
 * True only for a cookie this server signed that has not expired. Safe to call
 * from the Edge runtime.
 */
export async function verifySessionToken(
  token: string | undefined,
  now = Date.now(),
): Promise<boolean> {
  if (!token) return false;

  const separator = token.indexOf(".");
  if (separator <= 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  const expiresAt = Number(payload);
  if (!Number.isSafeInteger(expiresAt) || expiresAt * 1000 <= now) return false;

  let expected: string;
  try {
    expected = await sign(payload, requireEnv("OWNER_SESSION_SECRET"));
  } catch {
    // Missing secret means nothing can be trusted — deny rather than throw
    // inside the proxy, where a throw would surface as a 500 on every route.
    return false;
  }

  return timingSafeEqual(signature, expected);
}

/** Cookie attributes shared by the login and logout paths. */
export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}
