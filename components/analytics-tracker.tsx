"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useReportWebVitals } from "next/web-vitals";

const SESSION_KEY = "mw_sid";
const ENDPOINT = "/api/track";

/**
 * A session is one browsing visit: it lives in `sessionStorage`, so it ends
 * when the tab closes and is never shared across tabs or visitors. No cookie,
 * no cross-site identifier, nothing that needs a consent banner.
 */
function sessionId(): string | null {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    // Private mode or blocked storage — skip tracking rather than break the page.
    return null;
  }
}

function send(payload: Record<string, unknown>) {
  const id = sessionId();
  if (!id) return;

  const body = JSON.stringify({ ...payload, sessionId: id });

  // `sendBeacon` survives the page being unloaded, which is exactly when the
  // final web-vitals values arrive.
  if (typeof navigator.sendBeacon === "function") {
    const ok = navigator.sendBeacon(
      ENDPOINT,
      new Blob([body], { type: "application/json" }),
    );
    if (ok) return;
  }

  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Analytics must never surface an error to a visitor.
  });
}

/**
 * The metrics worth storing. The App Router hands this hook a bare web-vitals
 * `Metric` — there is no `label` field to filter on (that only exists on the
 * Pages Router type), so the allowlist is what keeps Next's own custom
 * timings, such as `Next.js-hydration`, out of the data.
 */
const TRACKED = new Set(["LCP", "INP", "CLS", "FCP", "TTFB"]);

// Derived from the hook rather than importing `web-vitals`, which Next bundles
// but does not expose as a direct dependency.
type Metric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0];

function WebVitals({ path }: { path: string }) {
  // A metric can land after a client-side navigation, so the path is read
  // through a ref instead of being closed over. Updated in an effect, not
  // during render — metrics only ever arrive after paint, so the ref is
  // current by the time anything reads it.
  const pathRef = useRef(path);
  useEffect(() => {
    pathRef.current = path;
  }, [path]);

  // Which metrics have already been recorded, as `path:NAME`.
  //
  // Keyed by name rather than by `metric.id`: the hook can end up with more
  // than one web-vitals registration (React Strict Mode re-runs the effect in
  // development), and each registration mints its own id for the same
  // underlying measurement — so id-keying would let every value through
  // twice and quietly skew the percentiles. Each metric is reported once per
  // page load anyway, so one row per path and name is the correct grain.
  const seen = useRef<Set<string>>(new Set());

  // Stable identity: Next replays already-collected metrics to any newly
  // passed callback, so a fresh arrow on each render would re-report them.
  const report = useCallback((metric: Metric) => {
    if (!TRACKED.has(metric.name)) return;

    const key = `${pathRef.current}:${metric.name}`;
    if (seen.current.has(key)) return;
    seen.current.add(key);

    send({
      kind: "vital",
      path: pathRef.current,
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  }, []);

  useReportWebVitals(report);

  return null;
}

/**
 * Records a page view on first paint and on every client-side navigation.
 * Rendered from the site layout, so the owner panel is never tracked.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastSent.current === pathname) return;
    lastSent.current = pathname;

    send({
      kind: "pageview",
      path: pathname,
      referrer: document.referrer || undefined,
    });
  }, [pathname]);

  return <WebVitals path={pathname ?? "/"} />;
}
