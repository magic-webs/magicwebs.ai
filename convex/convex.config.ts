import { defineApp } from "convex/server";
import { v } from "convex/values";

/**
 * Declared as optional so a deployment that has not had the token set yet
 * still pushes — the public site (contact form, analytics ingest) keeps
 * working. `requireOwner` treats a missing token as "deny", so the owner
 * panel fails closed rather than failing open.
 *
 * Set it with:  npx convex env set OWNER_API_TOKEN <token>
 */
const app = defineApp({
  env: {
    OWNER_API_TOKEN: v.optional(v.string()),
  },
});

export default app;
