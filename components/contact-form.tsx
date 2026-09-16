"use client";

import { useState } from "react";
import { cx } from "@/components/ui";
import { company, platforms } from "@/lib/site";

const fieldWrap = "flex flex-col gap-2";
const labelClass =
  "font-mono text-xs tracking-wide text-muted uppercase";
const inputClass =
  "w-full rounded-lg border border-line-strong bg-paper px-4 py-3.5 font-display text-base text-ink transition-colors duration-150 ease-standard focus:border-ink focus:outline-none";

/**
 * No backend is wired up yet, so the form hands off to the visitor's mail
 * client with everything already filled in. Swap `onSubmit` for a server
 * action once an inbox or CRM endpoint exists.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const subject = `Demo request — ${get("interest") || "Magic Webs"}`;
    const body = [
      `Name: ${get("name")}`,
      `Company: ${get("company")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Interested in: ${get("interest")}`,
      "",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className={fieldWrap}>
          <label className={labelClass} htmlFor="name">
            Your name
          </label>
          <input
            className={inputClass}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
          />
        </div>

        <div className={fieldWrap}>
          <label className={labelClass} htmlFor="company">
            Company
          </label>
          <input
            className={inputClass}
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
          />
        </div>

        <div className={fieldWrap}>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            className={inputClass}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className={fieldWrap}>
          <label className={labelClass} htmlFor="phone">
            Phone / WhatsApp
          </label>
          <input
            className={inputClass}
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
          />
        </div>

        <div className={cx(fieldWrap, "sm:col-span-2")}>
          <label className={labelClass} htmlFor="interest">
            What are you interested in?
          </label>
          <select className={inputClass} id="interest" name="interest" defaultValue="">
            <option value="">Not sure yet</option>
            {platforms.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name} — {p.kind}
              </option>
            ))}
            <option value="Services">Websites, e-commerce or marketing</option>
          </select>
        </div>

        <div className={cx(fieldWrap, "sm:col-span-2")}>
          <label className={labelClass} htmlFor="message">
            What keeps repeating?
          </label>
          <textarea
            className={cx(inputClass, "min-h-37.5 resize-y")}
            id="message"
            name="message"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill border border-ink bg-ink px-7 py-4 font-mono text-base font-medium tracking-wide whitespace-nowrap text-cream transition-[background-color,border-color,transform] duration-200 ease-standard hover:border-accent-hover hover:bg-accent-hover active:translate-y-px"
        >
          Send enquiry
        </button>
        <p className="m-0 font-mono text-xs text-muted" role="status">
          {sent
            ? "Your mail client should be open — send it and we will reply the same day."
            : "Opens in your mail client, pre-filled."}
        </p>
      </div>
    </form>
  );
}
