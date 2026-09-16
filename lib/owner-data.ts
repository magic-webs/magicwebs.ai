import "server-only";

import { api } from "@/convex/_generated/api";
import { convexServerClient, ownerToken } from "@/lib/convex-server";

export type DayStats = {
  day: string;
  views: number;
  sessions: number;
  contacts: number;
  sources: Record<string, number>;
  devices: Record<string, number>;
  paths: Record<string, number>;
  referrers: Record<string, number>;
};

export const RANGES = [7, 30, 90] as const;
export type Range = (typeof RANGES)[number];

/** Reads `?days=` and refuses anything that is not one of the offered ranges. */
export function parseRange(value: string | string[] | undefined): Range {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return (RANGES as readonly number[]).includes(n) ? (n as Range) : 30;
}

/**
 * Fetches the window plus the window before it, so every headline number can
 * carry an honest period-over-period delta.
 */
export async function loadTrend(range: Range) {
  const daily = (await convexServerClient().query(api.analytics.overview, {
    token: ownerToken(),
    now: Date.now(),
    days: Math.min(range * 2, 90),
  })) as DayStats[];

  const current = daily.slice(-range);
  const previous = daily.slice(0, Math.max(0, daily.length - range));

  return { current, previous };
}

/**
 * Core Web Vitals percentiles for the window.
 *
 * Like `loadTrend`, the clock is read here rather than in the page body: a
 * server component is still a render, and `Date.now()` in one is impure.
 */
export async function loadVitals(range: Range) {
  return await convexServerClient().query(api.analytics.vitalsSummary, {
    token: ownerToken(),
    now: Date.now(),
    // The Convex query caps at 30 days; without this the 90d tab would
    // silently narrow and the heading would be lying.
    days: Math.min(range, 30),
  });
}

export function sum(days: DayStats[], key: "views" | "sessions" | "contacts") {
  return days.reduce((total, day) => total + day[key], 0);
}

/** Percentage change, or null when there is no baseline to compare against. */
export function percentChange(
  current: number,
  previous: number,
): number | null {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

/** Merges a record field across days into one ranked total. */
export function mergeRecords(
  days: DayStats[],
  key: "sources" | "devices" | "paths" | "referrers",
): Record<string, number> {
  const merged: Record<string, number> = {};
  for (const day of days) {
    for (const [name, count] of Object.entries(day[key])) {
      merged[name] = (merged[name] ?? 0) + count;
    }
  }
  return merged;
}
