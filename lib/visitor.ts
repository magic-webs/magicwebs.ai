import "server-only";

import { routes } from "@/lib/seo";
import { platforms } from "@/lib/site";

export type TrafficSource = "direct" | "search" | "social" | "referral";
export type DeviceKind = "mobile" | "tablet" | "desktop";

const SEARCH = /google|bing|duckduckgo|yahoo|yandex|baidu|ecosia|brave/i;
const SOCIAL =
  /facebook|instagram|linkedin|twitter|t\.co|x\.com|youtube|whatsapp|pinterest|reddit|telegram/i;

/**
 * The set of paths allowed into the daily rollup's `paths` record.
 *
 * Crawlers probe made-up URLs constantly, and each distinct one would become
 * another key on a single document. Anything not a real route collapses into
 * `/other`, which keeps that record small and bounded forever.
 */
const KNOWN_PATHS = new Set<string>([
  ...routes.map((r) => r.path),
  ...platforms.map((p) => `/platforms/${p.slug}`),
]);

export function normalisePath(rawPath: string): string {
  let path = rawPath.split("?")[0].split("#")[0];
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (!path.startsWith("/")) path = `/${path}`;
  return KNOWN_PATHS.has(path) ? path : "/other";
}

export function classifySource(
  referrer: string | undefined,
  selfHost: string,
): TrafficSource {
  if (!referrer) return "direct";
  let host: string;
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return "direct";
  }
  // Moving between our own pages is not a new source.
  if (host === selfHost || host.endsWith(`.${selfHost}`)) return "direct";
  if (SEARCH.test(host)) return "search";
  if (SOCIAL.test(host)) return "social";
  return "referral";
}

/** Referrer reduced to a bare hostname — enough to group by, no query strings. */
export function referrerHost(referrer: string | undefined): string | undefined {
  if (!referrer) return undefined;
  try {
    return new URL(referrer).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

export function classifyDevice(ua: string): DeviceKind {
  if (/ipad|tablet|playbook|silk|android(?!.*mobile)/i.test(ua)) return "tablet";
  if (/mobi|iphone|ipod|android|blackberry|iemobile|opera mini/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

export function classifyBrowser(ua: string): string {
  // Order matters: every Chromium browser also claims "Chrome", and all of
  // them also claim "Safari".
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\/|opera/i.test(ua)) return "Opera";
  if (/samsungbrowser/i.test(ua)) return "Samsung Internet";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/safari/i.test(ua)) return "Safari";
  return "Other";
}

export function classifyOs(ua: string): string {
  if (/windows nt/i.test(ua)) return "Windows";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/mac os x/i.test(ua)) return "macOS";
  if (/android/i.test(ua)) return "Android";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
}

/**
 * Obvious automated traffic. Not exhaustive — it only has to keep the
 * dashboard's numbers from being dominated by crawlers.
 */
export function isBot(ua: string): boolean {
  return /bot|crawler|spider|crawling|slurp|bingpreview|headlesschrome|lighthouse|pingdom|gtmetrix|semrush|ahrefs|facebookexternalhit|preview|monitor/i.test(
    ua,
  );
}

/** Trims and length-caps a field before it reaches the database. */
export function clamp(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}
