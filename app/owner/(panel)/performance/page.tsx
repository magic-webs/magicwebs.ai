import {
  EmptyState,
  Panel,
  PanelHeading,
  formatCount,
  formatMetric,
} from "@/components/owner/panel-ui";
import { RangeTabs } from "@/components/owner/range-tabs";
import { loadVitals, parseRange } from "@/lib/owner-data";
import { cx } from "@/components/ui";

export const dynamic = "force-dynamic";

/**
 * Google's Core Web Vitals thresholds. `good` is the ceiling for a good score,
 * `poor` the floor for a bad one; anything between needs improvement.
 */
const THRESHOLDS: Record<string, { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

const EXPLAINER: Record<string, string> = {
  LCP: "Largest Contentful Paint — when the main content finished loading.",
  INP: "Interaction to Next Paint — how quickly the page answers a tap or click.",
  CLS: "Cumulative Layout Shift — how much the page jumps around while loading.",
  FCP: "First Contentful Paint — when the first thing appeared on screen.",
  TTFB: "Time to First Byte — how quickly the server started responding.",
};

type Rating = "good" | "needs-improvement" | "poor";

/** Word first, icon second, colour last — never colour on its own. */
const RATING_UI: Record<Rating, { label: string; icon: string; className: string; fill: string }> = {
  good: {
    label: "Good",
    icon: "●",
    className: "text-success",
    fill: "var(--color-success)",
  },
  "needs-improvement": {
    label: "Needs work",
    icon: "◐",
    className: "text-warning",
    fill: "var(--color-warning)",
  },
  poor: {
    label: "Poor",
    icon: "▲",
    className: "text-danger",
    fill: "var(--color-danger)",
  },
};

function rate(metric: string, value: number): Rating {
  const threshold = THRESHOLDS[metric];
  if (!threshold) return "needs-improvement";
  if (value <= threshold.good) return "good";
  if (value > threshold.poor) return "poor";
  return "needs-improvement";
}

export default async function OwnerPerformancePage(
  props: PageProps<"/owner/performance">,
) {
  const searchParams = await props.searchParams;
  const range = parseRange(searchParams.days);

  const summary = await loadVitals(range);

  return (
    <>
      <PanelHeading
        title="Performance"
        description="Measured on real visits, not a lab test. Scored at the 75th percentile, the way Google grades it."
        actions={<RangeTabs active={range} basePath="/owner/performance" />}
      />

      {range > 30 ? (
        <p className="m-0 rounded-lg bg-sunken px-4 py-3 font-mono text-xs text-muted">
          Performance samples are kept for 30 days, so this page shows the last
          30 even with the 90-day range selected.
        </p>
      ) : null}

      {summary.length === 0 ? (
        <Panel>
          <EmptyState>
            No measurements yet. These arrive from real visitors&apos; browsers
            as they use the site.
          </EmptyState>
        </Panel>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {summary.map((metric) => {
            const rating = rate(metric.metric, metric.p75);
            const ui = RATING_UI[rating];
            const total =
              metric.good + metric.needsImprovement + metric.poor || 1;

            const segments = [
              { key: "good" as const, count: metric.good },
              { key: "needs-improvement" as const, count: metric.needsImprovement },
              { key: "poor" as const, count: metric.poor },
            ].filter((s) => s.count > 0);

            return (
              <Panel key={metric.metric} title={metric.metric}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-display text-4xl leading-none font-semibold tracking-display">
                    {formatMetric(metric.metric, metric.p75)}
                  </span>
                  <span
                    className={cx("font-mono text-xs", ui.className)}
                  >
                    <span aria-hidden="true">{ui.icon}</span> {ui.label}
                  </span>
                  <span className="font-mono text-xs text-faint">
                    p75 · {formatCount(metric.samples)} samples
                  </span>
                </div>

                <p className="m-0 font-mono text-xs leading-relaxed text-muted">
                  {EXPLAINER[metric.metric]}
                </p>

                <div className="flex flex-col gap-2">
                  {/* 2px gaps keep adjacent fills from reading as one block. */}
                  <div className="flex h-2 w-full gap-0.5 overflow-hidden rounded-pill">
                    {segments.map((segment) => (
                      <div
                        key={segment.key}
                        className="h-full first:rounded-l-pill last:rounded-r-pill"
                        style={{
                          width: `${(segment.count / total) * 100}%`,
                          background: RATING_UI[segment.key].fill,
                        }}
                      />
                    ))}
                  </div>
                  <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0">
                    {segments.map((segment) => (
                      <li
                        key={segment.key}
                        className="flex items-center gap-1.5 font-mono text-2xs text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="size-2 rounded-full"
                          style={{ background: RATING_UI[segment.key].fill }}
                        />
                        {RATING_UI[segment.key].label}{" "}
                        <span className="tabular-nums text-faint">
                          {Math.round((segment.count / total) * 100)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="m-0 font-mono text-2xs text-faint">
                  Median {formatMetric(metric.metric, metric.p50)} · good is
                  under {formatMetric(metric.metric, THRESHOLDS[metric.metric]?.good ?? 0)}
                </p>
              </Panel>
            );
          })}
        </div>
      )}
    </>
  );
}
