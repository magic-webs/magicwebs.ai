import type { Doc } from "@/convex/_generated/dataModel";
import { cx } from "@/components/ui";
import {
  deleteContact,
  setContactNotes,
  setContactStatus,
} from "@/app/owner/actions";

const STATUSES = ["new", "read", "replied", "archived"] as const;

const SOURCE_LABELS: Record<string, string> = {
  direct: "typed the address in",
  search: "found us on search",
  social: "came from social",
  referral: "came from another site",
};

/**
 * One enquiry, with everything needed to act on it: how to reply, where the
 * lead came from, and the status controls. Status and notes post through
 * server actions, so the card works without client JavaScript.
 */
export function ContactCard({ contact }: { contact: Doc<"contacts"> }) {
  const received = new Date(contact._creationTime).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <article
      className={cx(
        "flex flex-col gap-5 rounded-2xl border bg-paper p-6",
        contact.status === "new" ? "border-ink/25" : "border-line",
        contact.status === "archived" && "opacity-70",
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="m-0 font-display text-xl leading-snug font-semibold tracking-tight">
              {contact.name}
            </h2>
            <StatusBadge status={contact.status} />
          </div>
          {contact.company ? (
            <p className="m-0 font-mono text-xs text-muted">{contact.company}</p>
          ) : null}
        </div>
        <time className="shrink-0 font-mono text-xs text-faint">{received}</time>
      </header>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <a
          className="font-mono text-sm text-secondary no-underline hover:text-ink hover:underline hover:underline-offset-[3px]"
          href={`mailto:${contact.email}?subject=${encodeURIComponent(
            `Re: your enquiry to Magic Webs`,
          )}`}
        >
          {contact.email}
        </a>
        {contact.phone ? (
          <a
            className="font-mono text-sm text-secondary no-underline hover:text-ink hover:underline hover:underline-offset-[3px]"
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
          >
            {contact.phone}
          </a>
        ) : null}
        {contact.interest ? (
          <span className="font-mono text-sm text-muted">
            Interested in {contact.interest}
          </span>
        ) : null}
      </div>

      <p className="m-0 rounded-lg bg-sunken px-4 py-3.5 font-display text-base leading-relaxed whitespace-pre-wrap">
        {contact.message}
      </p>

      <p className="m-0 font-mono text-2xs leading-relaxed text-faint">
        {contact.source ? SOURCE_LABELS[contact.source] : "source unknown"}
        {contact.path ? ` · enquired from ${contact.path}` : ""}
        {contact.device ? ` · on ${contact.device}` : ""}
        {contact.country ? ` · ${contact.country}` : ""}
      </p>

      <form action={setContactNotes} className="flex flex-col gap-2">
        <input type="hidden" name="id" value={contact._id} />
        <label
          className="font-mono text-2xs tracking-wide text-muted uppercase"
          htmlFor={`notes-${contact._id}`}
        >
          Private notes
        </label>
        <textarea
          id={`notes-${contact._id}`}
          name="notes"
          rows={2}
          defaultValue={contact.notes ?? ""}
          placeholder="What you agreed, what to follow up on…"
          className="w-full resize-y rounded-lg border border-line-strong bg-canvas px-3.5 py-2.5 font-mono text-xs text-ink transition-colors duration-150 ease-standard focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          className="self-start cursor-pointer rounded-pill border border-line-strong px-4 py-1.5 font-mono text-2xs tracking-wide text-secondary transition-colors duration-150 ease-standard hover:border-ink hover:text-ink"
        >
          Save notes
        </button>
      </form>

      <footer className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
        {STATUSES.filter((s) => s !== contact.status).map((status) => (
          <form key={status} action={setContactStatus}>
            <input type="hidden" name="id" value={contact._id} />
            <input type="hidden" name="status" value={status} />
            <button
              type="submit"
              className="cursor-pointer rounded-pill border border-line-strong px-3.5 py-1.5 font-mono text-2xs tracking-wide text-secondary transition-colors duration-150 ease-standard hover:border-ink hover:text-ink"
            >
              Mark {status}
            </button>
          </form>
        ))}

        <form action={deleteContact} className="ml-auto">
          <input type="hidden" name="id" value={contact._id} />
          <button
            type="submit"
            className="cursor-pointer rounded-pill px-3.5 py-1.5 font-mono text-2xs tracking-wide text-danger transition-colors duration-150 ease-standard hover:bg-danger/10"
          >
            Delete
          </button>
        </form>
      </footer>
    </article>
  );
}

/** Status reads from the word; the tint is only a second cue. */
function StatusBadge({ status }: { status: Doc<"contacts">["status"] }) {
  const tint: Record<string, string> = {
    new: "bg-info/12 text-deep-teal",
    read: "bg-ink/6 text-secondary",
    replied: "bg-success/12 text-success",
    archived: "bg-ink/5 text-faint",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-pill px-2.5 py-1 font-mono text-2xs tracking-wide uppercase",
        tint[status],
      )}
    >
      {status}
    </span>
  );
}
