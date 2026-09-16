import type { ReactNode } from "react";
import { cx } from "@/components/ui";

const numberFormat = new Intl.NumberFormat("en-IN");

export function formatCount(value: number): string {
  return numberFormat.format(value);
}

/** `1.2 s` / `340 ms` / `0.04` — vitals are read at very different scales. */
export function formatMetric(metric: string, value: number): string {
  if (metric === "CLS") return value.toFixed(3);
  if (value >= 1000) return `${(value / 1000).toFixed(2)} s`;
  return `${Math.round(value)} ms`;
}

export function PanelHeading({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="flex flex-col gap-2">
        <h1 className="m-0 font-display text-3xl leading-tight font-semibold tracking-tighter">
          {title}
        </h1>
        {description ? (
          <p className="m-0 font-mono text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {actions}
    </div>
  );
}

export function Panel({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx(
        "flex flex-col gap-5 rounded-2xl border border-line bg-paper p-6",
        className,
      )}
    >
      {title ? (
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div className="flex flex-col gap-1">
            <h2 className="m-0 font-display text-lg leading-snug font-semibold tracking-tight">
              {title}
            </h2>
            {description ? (
              <p className="m-0 font-mono text-xs text-muted">{description}</p>
            ) : null}
          </div>
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}

/**
 * A headline number. Deliberately not a one-bar chart — a single current
 * value belongs in a tile.
 */
export function StatTile({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string;
  delta?: number | null;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-line bg-paper p-6">
      <span className="font-mono text-xs tracking-wide text-muted uppercase">
        {label}
      </span>
      <span className="font-display text-4xl leading-none font-semibold tracking-display">
        {value}
      </span>
      <div className="flex min-h-5 flex-wrap items-baseline gap-2">
        {delta !== undefined && delta !== null ? <Delta value={delta} /> : null}
        {hint ? (
          <span className="font-mono text-xs text-faint">{hint}</span>
        ) : null}
      </div>
    </div>
  );
}

/** Direction is carried by the arrow glyph and the sign, never by colour alone. */
function Delta({ value }: { value: number }) {
  if (!Number.isFinite(value)) return null;
  const rounded = Math.round(value);
  if (rounded === 0) {
    return <span className="font-mono text-xs text-muted">no change</span>;
  }
  const up = rounded > 0;
  return (
    <span
      className={cx(
        "font-mono text-xs",
        up ? "text-success" : "text-danger",
      )}
    >
      {up ? "▲" : "▼"} {Math.abs(rounded)}%
    </span>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="m-0 rounded-lg bg-sunken px-4 py-6 text-center font-mono text-xs text-muted">
      {children}
    </p>
  );
}

/**
 * Ranked horizontal bars for nominal categories (pages, sources, devices).
 * Every bar takes the same hue: the length already encodes the value, so
 * spending the identity channel on it would say nothing extra.
 */
export function BarList({
  rows,
  emptyLabel,
}: {
  rows: { label: string; value: number; href?: string }[];
  emptyLabel: string;
}) {
  if (rows.length === 0) return <EmptyState>{emptyLabel}</EmptyState>;

  const max = Math.max(...rows.map((r) => r.value), 1);
  const total = rows.reduce((sum, r) => sum + r.value, 0);

  return (
    <ul className="viz m-0 flex list-none flex-col gap-2.5 p-0">
      {rows.map((row) => {
        const share = total > 0 ? Math.round((row.value / total) * 100) : 0;
        return (
          <li key={row.label} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="truncate font-mono text-xs text-secondary">
                {row.label}
              </span>
              {/* Direct labels, so the fill never has to carry the value. */}
              <span className="shrink-0 font-mono text-xs text-muted tabular-nums">
                {formatCount(row.value)}
                <span className="text-faint"> · {share}%</span>
              </span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-pill"
              style={{ background: "var(--viz-track)" }}
            >
              <div
                className="h-full rounded-pill"
                style={{
                  width: `${Math.max(2, (row.value / max) * 100)}%`,
                  background: "var(--viz-series-1)",
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Sorts a rollup record into ranked rows, largest first. */
export function rankRecord(
  record: Record<string, number>,
  limit: number,
  rename?: (key: string) => string,
): { label: string; value: number }[] {
  return Object.entries(record)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, value]) => ({ label: rename ? rename(key) : key, value }));
}
