import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const contactStatus = v.union(
  v.literal("new"),
  v.literal("read"),
  v.literal("replied"),
  v.literal("archived"),
);

/** Where a visit came from, bucketed at write time so the panel never parses. */
export const trafficSource = v.union(
  v.literal("direct"),
  v.literal("search"),
  v.literal("social"),
  v.literal("referral"),
);

export const deviceKind = v.union(
  v.literal("mobile"),
  v.literal("tablet"),
  v.literal("desktop"),
);

export default defineSchema({
  /** Contact form submissions. */
  contacts: defineTable({
    name: v.string(),
    company: v.optional(v.string()),
    email: v.string(),
    phone: v.optional(v.string()),
    interest: v.optional(v.string()),
    message: v.string(),
    status: contactStatus,
    notes: v.optional(v.string()),
    day: v.string(),
    // Provenance, so the owner can see how a lead found the site.
    sessionId: v.optional(v.string()),
    path: v.optional(v.string()),
    referrer: v.optional(v.string()),
    source: v.optional(trafficSource),
    country: v.optional(v.string()),
    device: v.optional(deviceKind),
  })
    .index("by_status", ["status"])
    .index("by_day", ["day"]),

  /** One row per visitor session. Keeps the per-view table narrow. */
  sessions: defineTable({
    sessionId: v.string(),
    day: v.string(),
    entryPath: v.string(),
    referrer: v.optional(v.string()),
    source: trafficSource,
    device: deviceKind,
    browser: v.string(),
    os: v.string(),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    views: v.number(),
    lastSeen: v.number(),
  })
    .index("by_sessionId", ["sessionId"])
    .index("by_day", ["day"])
    .index("by_lastSeen", ["lastSeen"]),

  /** One row per page view. */
  pageviews: defineTable({
    sessionId: v.string(),
    path: v.string(),
    referrer: v.optional(v.string()),
    source: trafficSource,
    device: deviceKind,
    country: v.optional(v.string()),
    day: v.string(),
  })
    .index("by_day", ["day"])
    .index("by_path_and_day", ["path", "day"]),

  /** Core Web Vitals samples, one row per metric per page load. */
  vitals: defineTable({
    sessionId: v.string(),
    path: v.string(),
    metric: v.string(),
    value: v.number(),
    rating: v.string(),
    device: deviceKind,
    day: v.string(),
  })
    .index("by_day", ["day"])
    .index("by_metric_and_day", ["metric", "day"]),

  /**
   * Denormalised daily rollup. Convex has no count operator, so the dashboard
   * reads these rows instead of scanning `pageviews` (see the Convex query
   * guidelines on counting).
   */
  dailyStats: defineTable({
    day: v.string(),
    views: v.number(),
    sessions: v.number(),
    contacts: v.number(),
    // Breakdowns live as records on the rollup rather than as their own
    // tables. Every key set here is bounded at write time (paths are
    // normalised against the known routes, referrers are capped), so these
    // stay far below the 1024-entry record limit.
    sources: v.record(v.string(), v.number()),
    devices: v.record(v.string(), v.number()),
    paths: v.record(v.string(), v.number()),
    referrers: v.record(v.string(), v.number()),
  }).index("by_day", ["day"]),
});
