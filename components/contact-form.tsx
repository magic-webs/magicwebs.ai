"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { cx } from "@/components/ui";
import { submitEnquiry, type ContactState } from "@/app/(site)/contact/actions";
import { platforms } from "@/lib/site";

const fieldWrap = "flex flex-col gap-2";
const labelClass = "font-mono text-xs tracking-wide text-muted uppercase";
const inputClass =
  "w-full rounded-lg border border-line-strong bg-paper px-4 py-3.5 font-display text-base text-ink transition-colors duration-150 ease-standard focus:border-ink focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill border border-ink bg-ink px-7 py-4 font-mono text-base font-medium tracking-wide whitespace-nowrap text-cream transition-[background-color,border-color,transform] duration-200 ease-standard hover:border-accent-hover hover:bg-accent-hover active:translate-y-px disabled:cursor-progress disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send enquiry"}
    </button>
  );
}

/**
 * Posts to a server action, which writes the enquiry to Convex and tags it
 * with where the visitor came from. The owner reads these at /owner/contacts.
 */
export function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitEnquiry,
    { status: "idle" },
  );

  /**
   * A server action cannot see which page the visitor was on, so the browser
   * attaches it at submit time. Read here rather than rendered into hidden
   * inputs: it keeps these values out of the server-rendered HTML, and there
   * is nothing to go stale. Without JavaScript they are simply absent and the
   * enquiry saves without the provenance.
   */
  const withPageContext = (formData: FormData) => {
    try {
      const sessionId = sessionStorage.getItem("mw_sid");
      if (sessionId) formData.set("sessionId", sessionId);
    } catch {
      // Storage blocked — the enquiry is still worth saving without it.
    }
    formData.set("pagePath", window.location.pathname);
    formData.set("pageReferrer", document.referrer);
    return formAction(formData);
  };

  if (state.status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-2xl border border-line bg-sunken p-8"
      >
        <h3 className="m-0 font-display text-xl leading-snug font-semibold tracking-tighter">
          Got it — thank you.
        </h3>
        <p className="m-0 font-mono text-sm leading-relaxed text-secondary">
          Your enquiry is with us and we reply the same day. If it is urgent,
          call 9999-064-055.
        </p>
      </div>
    );
  }

  return (
    <form action={withPageContext} className="flex flex-col gap-6">
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

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
          <select
            className={inputClass}
            id="interest"
            name="interest"
            defaultValue=""
          >
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

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="m-0 rounded-lg bg-danger/10 px-4 py-3 font-mono text-sm text-danger"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
        <p className="m-0 font-mono text-xs text-muted">
          We reply the same day.
        </p>
      </div>
    </form>
  );
}
