import { v } from "convex/values";
import { mutation, query, type MutationCtx } from "./_generated/server";
import { deviceKind, trafficSource } from "./schema";
import { requireOwner } from "./lib/owner";
import { dayKey, recentDays } from "./lib/visit";

/** Referrer hosts are attacker-controlled; cap how many we will ever store. */
const MAX_REFERRER_KEYS = 100;

function bump(
  record: Record<string, number>,
  key: string,
  maxKeys = Number.POSITIVE_INFINITY,
) {
  if (record[key] === undefined && Object.keys(record).length >= maxKeys) {
    record.other = (record.other ?? 0) + 1;
    return;
  }
  record[key] = (record[key] ?? 0) + 1;
}

/** Reads the rollup row for a day, creating it on that day's first event. */
async function rollupFor(ctx: MutationCtx, day: string) {
  const existing = await ctx.db
    .query("dailyStats")
    .withIndex("by_day", (q) => q.eq("day", day))
    .unique();
  if (existing) return existing;

  const id = await ctx.db.insert("dailyStats", {
    day,
    views: 0,
    sessions: 0,
    contacts: 0,
    sources: {},
    devices: {},
    paths: {},
    referrers: {},
  });
  const created = await ctx.db.get("dailyStats", id);
  if (!created) throw new Error("dailyStats row vanished after insert");
  return created;
}

/** Called by the contacts mutation so the dashboard can show leads per day. */
export async function countContact(ctx: MutationCtx, day: string) {
  const rollup = await rollupFor(ctx, day);
  await ctx.db.patch("dailyStats", rollup._id, {
    contacts: rollup.contacts + 1,
  });
}

/**
 * Undoes `countContact` when an enquiry is deleted, so the dashboard's
 * "Enquiries" figure always agrees with the list the owner can actually see.
 * Clamped at zero: a rollup row trimmed by retention must not go negative.
 */
export async function uncountContact(ctx: MutationCtx, day: string) {
  const rollup = await ctx.db
    .query("dailyStats")
    .withIndex("by_day", (q) => q.eq("day", day))
    .unique();
  if (!rollup) return;

  await ctx.db.patch("dailyStats", rollup._id, {
    contacts: Math.max(0, rollup.contacts - 1),
  });
}

/**
 * Page view ingest. Public because a browser visit triggers it, but it is
 * write-only — nothing here reads anything back to the caller. Every field
 * is normalised and length-capped by `/api/track` before it arrives.
 */
export const track = mutation({
  args: {
    sessionId: v.string(),
    path: v.string(),
    referrer: v.optional(v.string()),
    referrerHost: v.optional(v.string()),
    source: trafficSource,
    device: deviceKind,
    browser: v.string(),
    os: v.string(),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const now = Date.now();
    const day = dayKey(now);

    const session = await ctx.db
      .query("sessions")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .unique();

    const isNewSession = session === null;
    if (session) {
      await ctx.db.patch("sessions", session._id, {
        views: session.views + 1,
        lastSeen: now,
      });
    } else {
      await ctx.db.insert("sessions", {
        sessionId: args.sessionId,
        day,
        entryPath: args.path,
        referrer: args.referrer,
        source: args.source,
        device: args.device,
        browser: args.browser,
        os: args.os,
        country: args.country,
        city: args.city,
        views: 1,
        lastSeen: now,
      });
    }

    await ctx.db.insert("pageviews", {
      sessionId: args.sessionId,
      path: args.path,
      referrer: args.referrer,
      source: args.source,
      device: args.device,
      country: args.country,
      day,
    });

    const rollup = await rollupFor(ctx, day);
    const sources = { ...rollup.sources };
    const devices = { ...rollup.devices };
    const paths = { ...rollup.paths };
    const referrers = { ...rollup.referrers };

    bump(sources, args.source);
    bump(devices, args.device);
    bump(paths, args.path);
    if (args.referrerHost) bump(referrers, args.referrerHost, MAX_REFERRER_KEYS);

    await ctx.db.patch("dailyStats", rollup._id, {
      views: rollup.views + 1,
      sessions: rollup.sessions + (isNewSession ? 1 : 0),
      sources,
      devices,
      paths,
      referrers,
    });

    return null;
  },
});

/** Core Web Vitals sample. Write-only, same as `track`. */
export const trackVital = mutation({
  args: {
    sessionId: v.string(),
    path: v.string(),
    metric: v.string(),
    value: v.number(),
    rating: v.string(),
    device: deviceKind,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    if (!Number.isFinite(args.value)) return null;
    await ctx.db.insert("vitals", {
      sessionId: args.sessionId,
      path: args.path,
      metric: args.metric,
      value: args.value,
      rating: args.rating,
      device: args.device,
      day: dayKey(Date.now()),
    });
    return null;
  },
});

/* ------------------------------------------------------------------ */
/* Owner-only reads                                                    */
/* ------------------------------------------------------------------ */

const dayStatsValidator = v.object({
  day: v.string(),
  views: v.number(),
  sessions: v.number(),
  contacts: v.number(),
  sources: v.record(v.string(), v.number()),
  devices: v.record(v.string(), v.number()),
  paths: v.record(v.string(), v.number()),
  referrers: v.record(v.string(), v.number()),
});

const EMPTY_DAY = {
  views: 0,
  sessions: 0,
  contacts: 0,
  sources: {} as Record<string, number>,
  devices: {} as Record<string, number>,
  paths: {} as Record<string, number>,
  referrers: {} as Record<string, number>,
};

/**
 * `now` is an argument rather than a clock read: Convex queries are not re-run
 * merely because time advanced, so a `Date.now()` in here would go stale and
 * would also cost the query cache.
 */
export const overview = query({
  args: { token: v.string(), now: v.number(), days: v.number() },
  returns: v.array(dayStatsValidator),
  handler: async (ctx, args) => {
    requireOwner(args.token);
    const span = Math.min(Math.max(Math.trunc(args.days), 1), 90);

    return await Promise.all(
      recentDays(args.now, span).map(async (day) => {
        const row = await ctx.db
          .query("dailyStats")
          .withIndex("by_day", (q) => q.eq("day", day))
          .unique();
        if (!row) return { day, ...EMPTY_DAY };
        return {
          day,
          views: row.views,
          sessions: row.sessions,
          contacts: row.contacts,
          sources: row.sources,
          devices: row.devices,
          paths: row.paths,
          referrers: row.referrers,
        };
      }),
    );
  },
});

/** Most recently active visitor sessions, newest first. */
export const recentSessions = query({
  args: { token: v.string(), limit: v.number() },
  returns: v.array(
    v.object({
      _id: v.id("sessions"),
      sessionId: v.string(),
      entryPath: v.string(),
      source: trafficSource,
      device: deviceKind,
      browser: v.string(),
      os: v.string(),
      country: v.optional(v.string()),
      city: v.optional(v.string()),
      views: v.number(),
      lastSeen: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    requireOwner(args.token);
    const limit = Math.min(Math.max(Math.trunc(args.limit), 1), 100);
    const rows = await ctx.db
      .query("sessions")
      .withIndex("by_lastSeen")
      .order("desc")
      .take(limit);

    return rows.map((r) => ({
      _id: r._id,
      sessionId: r.sessionId,
      entryPath: r.entryPath,
      source: r.source,
      device: r.device,
      browser: r.browser,
      os: r.os,
      country: r.country,
      city: r.city,
      views: r.views,
      lastSeen: r.lastSeen,
    }));
  },
});

const VITAL_METRICS = ["LCP", "INP", "CLS", "FCP", "TTFB"] as const;

/**
 * Percentiles per metric over the window. Web Vitals are conventionally
 * judged at p75, which an average would flatter.
 */
export const vitalsSummary = query({
  args: { token: v.string(), now: v.number(), days: v.number() },
  returns: v.array(
    v.object({
      metric: v.string(),
      samples: v.number(),
      p50: v.number(),
      p75: v.number(),
      good: v.number(),
      needsImprovement: v.number(),
      poor: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    requireOwner(args.token);
    const span = Math.min(Math.max(Math.trunc(args.days), 1), 30);
    const days = recentDays(args.now, span);

    const out = [];
    for (const metric of VITAL_METRICS) {
      const values: number[] = [];
      let good = 0;
      let needsImprovement = 0;
      let poor = 0;

      for (const day of days) {
        // Bounded per day so one busy day cannot blow the read limit.
        const rows = await ctx.db
          .query("vitals")
          .withIndex("by_metric_and_day", (q) =>
            q.eq("metric", metric).eq("day", day),
          )
          .take(500);
        for (const r of rows) {
          values.push(r.value);
          if (r.rating === "good") good++;
          else if (r.rating === "needs-improvement") needsImprovement++;
          else poor++;
        }
      }

      if (values.length === 0) continue;
      values.sort((a, b) => a - b);
      const at = (p: number) =>
        values[Math.min(values.length - 1, Math.floor(values.length * p))];

      out.push({
        metric,
        samples: values.length,
        p50: at(0.5),
        p75: at(0.75),
        good,
        needsImprovement,
        poor,
      });
    }

    return out;
  },
});
