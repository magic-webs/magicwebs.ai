import { after } from "next/server";
import { api } from "@/convex/_generated/api";
import { convexServerClient } from "@/lib/convex-server";
import { SITE_URL } from "@/lib/seo";
import {
  clamp,
  classifyBrowser,
  classifyDevice,
  classifyOs,
  classifySource,
  isBot,
  normalisePath,
  referrerHost,
} from "@/lib/visitor";

/** Every request carries fresh visitor state; nothing here may be cached. */
export const dynamic = "force-dynamic";

const SELF_HOST = new URL(SITE_URL).hostname;

/**
 * The browser beacon posts here rather than straight to Convex. Doing the work
 * server-side means the user agent, referer and the host's geo headers are the
 * real ones, and it keeps the Convex client out of the public bundle.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return new Response(null, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const sessionId = clamp(payload.sessionId, 64);
  const rawPath = clamp(payload.path, 512);
  if (!sessionId || !rawPath) return new Response(null, { status: 400 });

  const headers = request.headers;
  const userAgent = headers.get("user-agent") ?? "";

  // Accepted and dropped: a crawler should not move the owner's numbers, and
  // answering 204 stops it retrying.
  if (isBot(userAgent)) return new Response(null, { status: 204 });

  const path = normalisePath(rawPath);
  const device = classifyDevice(userAgent);
  const sessionField = sessionId;

  // `referrer` comes from the page (document.referrer); `referer` is the header
  // for this beacon, which would just be our own page.
  const referrer = clamp(payload.referrer, 512);
  const source = classifySource(referrer, SELF_HOST);

  // Populated by the host (Vercel, Cloudflare); absent when self-hosted.
  const country =
    clamp(headers.get("x-vercel-ip-country"), 8) ??
    clamp(headers.get("cf-ipcountry"), 8);
  const city =
    clamp(headers.get("x-vercel-ip-city"), 80) ??
    clamp(headers.get("cf-ipcity"), 80);

  const kind = payload.kind === "vital" ? "vital" : "pageview";
  const convex = convexServerClient();

  if (kind === "vital") {
    const metric = clamp(payload.metric, 16);
    const rating = clamp(payload.rating, 24) ?? "needs-improvement";
    const value = typeof payload.value === "number" ? payload.value : NaN;
    if (!metric || !Number.isFinite(value)) {
      return new Response(null, { status: 400 });
    }

    // The beacon fires during unload; do not make the browser wait on Convex.
    after(async () => {
      await convex.mutation(api.analytics.trackVital, {
        sessionId: sessionField,
        path,
        metric,
        value,
        rating,
        device,
      });
    });

    return new Response(null, { status: 204 });
  }

  after(async () => {
    await convex.mutation(api.analytics.track, {
      sessionId: sessionField,
      path,
      referrer,
      referrerHost: referrerHost(referrer),
      source,
      device,
      browser: classifyBrowser(userAgent),
      os: classifyOs(userAgent),
      country,
      city,
    });
  });

  return new Response(null, { status: 204 });
}
