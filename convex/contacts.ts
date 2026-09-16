import { paginationOptsValidator, paginationResultValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import schema, { contactStatus, deviceKind, trafficSource } from "./schema";
import { countContact, uncountContact } from "./analytics";
import { requireOwner } from "./lib/owner";
import { clamp, dayKey } from "./lib/visit";

/**
 * Contact form submission. Public because the site posts to it, but it is
 * write-only and returns nothing but an id — a scraper gains nothing by
 * calling it. The caller is the `submitEnquiry` server action, which
 * validates the fields and attaches the request-derived provenance.
 */
export const submit = mutation({
  args: {
    name: v.string(),
    company: v.optional(v.string()),
    email: v.string(),
    phone: v.optional(v.string()),
    interest: v.optional(v.string()),
    message: v.string(),
    sessionId: v.optional(v.string()),
    path: v.optional(v.string()),
    referrer: v.optional(v.string()),
    source: v.optional(trafficSource),
    country: v.optional(v.string()),
    device: v.optional(deviceKind),
  },
  returns: v.id("contacts"),
  handler: async (ctx, args) => {
    const name = clamp(args.name, 120);
    const email = clamp(args.email, 200);
    const message = clamp(args.message, 5000);

    if (!name || !email || !message) {
      throw new Error("Name, email and message are required.");
    }

    const day = dayKey(Date.now());
    const id = await ctx.db.insert("contacts", {
      name,
      company: clamp(args.company, 160),
      email,
      phone: clamp(args.phone, 40),
      interest: clamp(args.interest, 120),
      message,
      status: "new",
      day,
      sessionId: args.sessionId,
      path: args.path,
      referrer: args.referrer,
      source: args.source,
      country: args.country,
      device: args.device,
    });

    await countContact(ctx, day);
    return id;
  },
});

/* ------------------------------------------------------------------ */
/* Owner-only                                                          */
/* ------------------------------------------------------------------ */

const contactDoc = schema.doc("contacts");

/** Paginated contact list, newest first, optionally filtered by status. */
export const list = query({
  args: {
    token: v.string(),
    status: v.optional(contactStatus),
    paginationOpts: paginationOptsValidator,
  },
  returns: paginationResultValidator(contactDoc),
  handler: async (ctx, args) => {
    requireOwner(args.token);

    if (args.status) {
      const status = args.status;
      return await ctx.db
        .query("contacts")
        .withIndex("by_status", (q) => q.eq("status", status))
        .order("desc")
        .paginate(args.paginationOpts);
    }

    return await ctx.db
      .query("contacts")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

/** Counts per status, for the filter chips. */
export const statusCounts = query({
  args: { token: v.string() },
  returns: v.object({
    new: v.number(),
    read: v.number(),
    replied: v.number(),
    archived: v.number(),
    total: v.number(),
  }),
  handler: async (ctx, args) => {
    requireOwner(args.token);

    const counts = { new: 0, read: 0, replied: 0, archived: 0 };
    for (const status of ["new", "read", "replied", "archived"] as const) {
      // Capped: past this many the exact number stops mattering for a chip.
      const rows = await ctx.db
        .query("contacts")
        .withIndex("by_status", (q) => q.eq("status", status))
        .take(1000);
      counts[status] = rows.length;
    }

    return {
      ...counts,
      total: counts.new + counts.read + counts.replied + counts.archived,
    };
  },
});

export const get = query({
  args: { token: v.string(), id: v.id("contacts") },
  returns: v.union(contactDoc, v.null()),
  handler: async (ctx, args) => {
    requireOwner(args.token);
    return await ctx.db.get("contacts", args.id);
  },
});

export const setStatus = mutation({
  args: { token: v.string(), id: v.id("contacts"), status: contactStatus },
  returns: v.null(),
  handler: async (ctx, args) => {
    requireOwner(args.token);
    await ctx.db.patch("contacts", args.id, { status: args.status });
    return null;
  },
});

export const setNotes = mutation({
  args: { token: v.string(), id: v.id("contacts"), notes: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    requireOwner(args.token);
    await ctx.db.patch("contacts", args.id, {
      notes: clamp(args.notes, 5000),
    });
    return null;
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("contacts") },
  returns: v.null(),
  handler: async (ctx, args) => {
    requireOwner(args.token);

    // Read the day before deleting, so the daily rollup can be corrected.
    const contact = await ctx.db.get("contacts", args.id);
    if (!contact) return null;

    await ctx.db.delete("contacts", args.id);
    await uncountContact(ctx, contact.day);
    return null;
  },
});
