import Link from "next/link";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { convexServerClient, ownerToken } from "@/lib/convex-server";
import { cx } from "@/components/ui";
import {
  EmptyState,
  Panel,
  PanelHeading,
  formatCount,
} from "@/components/owner/panel-ui";
import { ContactCard } from "@/components/owner/contact-card";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "read", "replied", "archived"] as const;
type Status = (typeof STATUSES)[number];

function parseStatus(value: string | string[] | undefined): Status | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return STATUSES.includes(raw as Status) ? (raw as Status) : undefined;
}

export default async function OwnerContactsPage(
  props: PageProps<"/owner/contacts">,
) {
  const searchParams = await props.searchParams;
  const status = parseStatus(searchParams.status);

  const convex = convexServerClient();
  const token = ownerToken();

  const [result, counts] = await Promise.all([
    convex.query(api.contacts.list, {
      token,
      status,
      paginationOpts: { numItems: 50, cursor: null },
    }),
    convex.query(api.contacts.statusCounts, { token }),
  ]);

  const contacts = result.page as Doc<"contacts">[];

  return (
    <>
      <PanelHeading
        title="Enquiries"
        description={`${formatCount(counts.total)} total · ${formatCount(counts.new)} unread`}
      />

      <nav
        aria-label="Filter by status"
        className="flex flex-wrap items-center gap-2"
      >
        <FilterChip
          href="/owner/contacts"
          label="All"
          count={counts.total}
          active={status === undefined}
        />
        {STATUSES.map((value) => (
          <FilterChip
            key={value}
            href={`/owner/contacts?status=${value}`}
            label={value[0].toUpperCase() + value.slice(1)}
            count={counts[value]}
            active={status === value}
          />
        ))}
      </nav>

      {contacts.length === 0 ? (
        <Panel>
          <EmptyState>
            {status
              ? `No enquiries marked "${status}".`
              : "No enquiries yet. Submissions from the contact form land here."}
          </EmptyState>
        </Panel>
      ) : (
        <div className="flex flex-col gap-4">
          {contacts.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))}
        </div>
      )}

      {!result.isDone ? (
        <p className="m-0 text-center font-mono text-xs text-faint">
          Showing the {contacts.length} most recent. Filter by status to reach
          older ones.
        </p>
      ) : null}
    </>
  );
}

function FilterChip({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={cx(
        "inline-flex items-center gap-2 rounded-pill border px-3.5 py-2 font-mono text-xs no-underline transition-colors duration-150 ease-standard",
        active
          ? "border-ink bg-ink text-cream"
          : "border-line-strong text-secondary hover:border-ink hover:text-ink",
      )}
    >
      {label}
      <span className={active ? "text-cream/70" : "text-faint"}>{count}</span>
    </Link>
  );
}
