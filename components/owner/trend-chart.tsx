"use client";

import { useEffect, useRef, useState } from "react";

export type TrendPoint = { day: string; views: number; sessions: number };

const SERIES = [
  { key: "views", label: "Page views", color: "var(--viz-series-1)" },
  { key: "sessions", label: "Visitors", color: "var(--viz-series-2)" },
] as const;

const HEIGHT = 240;
const PAD = { top: 16, right: 16, bottom: 28, left: 40 };

function shortDay(day: string): string {
  const [, month, date] = day.split("-");
  const name = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ][Number(month) - 1];
  return `${date} ${name}`;
}

/** Nearest round number at or above `value`, so the axis tops out cleanly. */
function niceMax(value: number): number {
  if (value <= 4) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  for (const step of [1, 2, 2.5, 5, 10]) {
    const candidate = step * magnitude;
    if (candidate >= value) return candidate;
  }
  return 10 * magnitude;
}

/**
 * Daily views and visitors on a single shared axis — both are counts of the
 * same kind, so they belong on one scale. (Two y-axes would let any pair of
 * lines be made to cross wherever the author liked.)
 */
export function TrendChart({ data }: { data: TrendPoint[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const max = niceMax(
    Math.max(1, ...data.flatMap((d) => [d.views, d.sessions])),
  );
  const innerW = Math.max(0, width - PAD.left - PAD.right);
  const innerH = HEIGHT - PAD.top - PAD.bottom;

  const x = (i: number) =>
    PAD.left + (data.length <= 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
  const y = (value: number) => PAD.top + innerH - (value / max) * innerH;

  const path = (key: "views" | "sessions") =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d[key])}`).join(" ");

  const ticks = [0, 0.5, 1].map((t) => Math.round(max * t));
  // Enough labels to orient, never so many that they collide.
  const labelStep = Math.max(1, Math.ceil(data.length / 6));
  const active = hover !== null ? data[hover] : null;

  return (
    <div className="viz flex flex-col gap-4">
      <ul className="m-0 flex list-none flex-wrap items-center gap-5 p-0">
        {SERIES.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full"
              style={{ background: s.color }}
            />
            <span className="font-mono text-xs text-secondary">{s.label}</span>
          </li>
        ))}
      </ul>

      <div ref={wrapRef} className="relative w-full">
        {width > 0 ? (
          <svg
            width={width}
            height={HEIGHT}
            role="img"
            aria-label={`Daily page views and visitors over the last ${data.length} days`}
            onMouseLeave={() => setHover(null)}
            onMouseMove={(event) => {
              const box = event.currentTarget.getBoundingClientRect();
              const offset = event.clientX - box.left - PAD.left;
              const ratio = innerW > 0 ? offset / innerW : 0;
              const index = Math.round(ratio * (data.length - 1));
              setHover(Math.min(data.length - 1, Math.max(0, index)));
            }}
          >
            {ticks.map((tick) => (
              <g key={tick}>
                <line
                  x1={PAD.left}
                  x2={width - PAD.right}
                  y1={y(tick)}
                  y2={y(tick)}
                  stroke="var(--viz-grid)"
                  strokeWidth={1}
                />
                <text
                  x={PAD.left - 8}
                  y={y(tick)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-faint font-mono"
                  fontSize={10}
                >
                  {tick}
                </text>
              </g>
            ))}

            {data.map((d, i) =>
              i % labelStep === 0 || i === data.length - 1 ? (
                <text
                  key={d.day}
                  x={x(i)}
                  y={HEIGHT - 8}
                  textAnchor="middle"
                  className="fill-faint font-mono"
                  fontSize={10}
                >
                  {shortDay(d.day)}
                </text>
              ) : null,
            )}

            {SERIES.map((s) => (
              <path
                key={s.key}
                d={path(s.key)}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {hover !== null ? (
              <g>
                <line
                  x1={x(hover)}
                  x2={x(hover)}
                  y1={PAD.top}
                  y2={PAD.top + innerH}
                  stroke="var(--color-line-strong)"
                  strokeWidth={1}
                />
                {SERIES.map((s) => (
                  <circle
                    key={s.key}
                    cx={x(hover)}
                    cy={y(data[hover][s.key])}
                    r={4.5}
                    fill={s.color}
                    // A ring in the surface colour keeps the two dots readable
                    // on the days where the series touch.
                    stroke="var(--color-paper)"
                    strokeWidth={2}
                  />
                ))}
              </g>
            ) : null}
          </svg>
        ) : (
          <div style={{ height: HEIGHT }} />
        )}

        {active && hover !== null && width > 0 ? (
          <div
            className="pointer-events-none absolute top-0 z-10 flex min-w-32 flex-col gap-1 rounded-lg border border-line bg-paper px-3 py-2 shadow-md"
            style={{
              left: Math.min(Math.max(x(hover) - 64, 0), Math.max(0, width - 136)),
            }}
          >
            <span className="font-mono text-2xs tracking-wide text-muted uppercase">
              {shortDay(active.day)}
            </span>
            {SERIES.map((s) => (
              <span
                key={s.key}
                className="flex items-center justify-between gap-4 font-mono text-xs text-secondary"
              >
                <span className="flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full"
                    style={{ background: s.color }}
                  />
                  {s.label}
                </span>
                <span className="tabular-nums">{active[s.key]}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
