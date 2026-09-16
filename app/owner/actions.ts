"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { convexServerClient, ownerToken } from "@/lib/convex-server";
import {
  OWNER_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
  verifySessionToken,
} from "@/lib/owner-auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Enter the password." };

  let ok: boolean;
  try {
    ok = await verifyPassword(password);
  } catch (error) {
    // A missing OWNER_PASSWORD is a deployment problem, not a wrong password —
    // say so rather than pretending the password was wrong.
    return {
      error: error instanceof Error ? error.message : "Login is misconfigured.",
    };
  }

  // Deliberately not "wrong password" — it says nothing about whether some
  // other password would have worked.
  if (!ok) return { error: "That password was not accepted." };

  const store = await cookies();
  store.set(
    OWNER_COOKIE,
    await createSessionToken(),
    sessionCookieOptions(SESSION_MAX_AGE_SECONDS),
  );

  // Outside the try/catch above: `redirect` signals by throwing.
  redirect("/owner");
}

export async function logout() {
  const store = await cookies();
  store.set(OWNER_COOKIE, "", sessionCookieOptions(0));
  redirect("/owner/login");
}

/**
 * Every mutation below re-checks the session itself. The panel layout already
 * guards the pages, but a server action is its own POST endpoint — it does not
 * inherit that check.
 */
async function requireSession() {
  const store = await cookies();
  const ok = await verifySessionToken(store.get(OWNER_COOKIE)?.value);
  if (!ok) redirect("/owner/login");
}

export async function setContactStatus(formData: FormData) {
  await requireSession();

  const id = String(formData.get("id") ?? "") as Id<"contacts">;
  const status = String(formData.get("status") ?? "");
  if (!id || !["new", "read", "replied", "archived"].includes(status)) return;

  await convexServerClient().mutation(api.contacts.setStatus, {
    token: ownerToken(),
    id,
    status: status as "new" | "read" | "replied" | "archived",
  });

  revalidatePath("/owner/contacts");
  revalidatePath("/owner");
}

export async function setContactNotes(formData: FormData) {
  await requireSession();

  const id = String(formData.get("id") ?? "") as Id<"contacts">;
  if (!id) return;

  await convexServerClient().mutation(api.contacts.setNotes, {
    token: ownerToken(),
    id,
    notes: String(formData.get("notes") ?? ""),
  });

  revalidatePath("/owner/contacts");
}

export async function deleteContact(formData: FormData) {
  await requireSession();

  const id = String(formData.get("id") ?? "") as Id<"contacts">;
  if (!id) return;

  await convexServerClient().mutation(api.contacts.remove, {
    token: ownerToken(),
    id,
  });

  revalidatePath("/owner/contacts");
  revalidatePath("/owner");
}
