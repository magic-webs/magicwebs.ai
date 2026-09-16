"use server";

import { headers } from "next/headers";
import { api } from "@/convex/_generated/api";
import { convexServerClient } from "@/lib/convex-server";
import { SITE_URL } from "@/lib/seo";
import {
  clamp,
  classifyDevice,
  classifySource,
  normalisePath,
} from "@/lib/visitor";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message?: string;
};

const SELF_HOST = new URL(SITE_URL).hostname;

// Deliberately loose: the point is to catch a typo, not to adjudicate RFC 5322.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitEnquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // A field no human sees. Bots fill everything in, so anything here is spam.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "sent" };
  }

  const name = clamp(formData.get("name"), 120);
  const email = clamp(formData.get("email"), 200);
  const message = clamp(formData.get("message"), 5000);

  if (!name) return { status: "error", message: "Please tell us your name." };
  if (!email || !EMAIL.test(email)) {
    return { status: "error", message: "That email address does not look right." };
  }
  if (!message) {
    return { status: "error", message: "Tell us what keeps repeating." };
  }

  const head = await headers();
  const userAgent = head.get("user-agent") ?? "";
  const referrer = clamp(formData.get("pageReferrer"), 512);

  try {
    await convexServerClient().mutation(api.contacts.submit, {
      name,
      company: clamp(formData.get("company"), 160),
      email,
      phone: clamp(formData.get("phone"), 40),
      interest: clamp(formData.get("interest"), 120),
      message,
      sessionId: clamp(formData.get("sessionId"), 64),
      path: normalisePath(clamp(formData.get("pagePath"), 512) ?? "/contact"),
      referrer,
      source: classifySource(referrer, SELF_HOST),
      country:
        clamp(head.get("x-vercel-ip-country"), 8) ??
        clamp(head.get("cf-ipcountry"), 8),
      device: classifyDevice(userAgent),
    });
  } catch {
    // The visitor should never see a stack trace, and they still have the
    // phone number and email address on the page.
    return {
      status: "error",
      message:
        "We could not save that just now. Please email contact@magicwebs.in or call us.",
    };
  }

  return { status: "sent" };
}
