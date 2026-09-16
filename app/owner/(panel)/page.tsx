import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { convexServerClient, ownerToken } from "@/lib/convex-server";
import {
  BarList,
  EmptyState,
  Panel,
  PanelHeading,
  StatTile,
  formatCount,
  rankRecord,
} from "@/components/owner/panel-ui";
import { RangeTabs } from "@/components/owner/range-tabs";
import { TrendChart } from "@/components/owner/trend-chart";
import {
  loadTrend,
  mergeRecords,
  parseRange,
  percentChange,
  sum,
} from "@/lib/owner-data";

/** Always live: a cached dashboard would quietly show yesterday's numbers. */
export const dynamic = "force-dynamic";

const SOURCE_LABELS: Record<string, string> = {
  direct: "Direct / typed in",
  search: "Search engines",
  social: "Social",
  referral: "Other sites",
};

const DEVICE_LABELS: Record<string, string> = {
  mobile: "Mobile",
  tablet: "Tablet",
  desktop: "Desktop",
};

export default async function OwnerOverviewPage(
  props: PageProps<"/owner">,
) {
  const searchParams = await props.searchParams;
  const range = parseRange(searchParams.days);

  const [{ current, previous }, contacts] = await Promise.all([
    loadTrend(range),
    convexServerClient().query(api.contacts.list, {
      token: ownerToken(),
      paginationOpts: { numItems: 5, cursor: null },
    }),
  ]);

  const views = sum(current, "views");
  const sessions = sum(current, "sessions");
  const enquiries = sum(current, "contacts");

  const hasTraffic = views > 0;

  return (
    <>
      <PanelHeading
        title="Overview"
        description={`Last ${range} days, Indian Standard Time.`}
        actions={<RangeTabs active={range} basePath="/owner" />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Page views"
          value={formatCount(views)}
          delta={percentChange(views, sum(previous, "views"))}
          hint={`vs previous ${range}d`}
        />
        <StatTile
          label="Visitors"
          value={formatCount(sessions)}
          delta={percentChange(sessions, sum(previous, "sessions"))}
          hint={`vs previous ${range}d`}
        />
        <StatTile
          label="Enquiries"
          value={formatCount(enquiries)}
          delta={percentChange(enquiries, sum(previous, "contacts"))}
          hint={`vs previous ${range}d`}
        />
        <StatTile
          label="Views per visitor"
          value={sessions > 0 ? (views / sessions).toFixed(1) : "—"}
          hint="how far people go"
        />
      </div>

      <Panel
        title="Traffic"
        description="Page views and distinct visitors per day."
      >
        {hasTraffic ? (
          <TrendChart data={current} />
        ) : (
          <EmptyState>
            No visits recorded yet. Numbers appear here as soon as the site is
            live and someone loads a page.
          </EmptyState>
        )}
      </Panel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Top pages">
          <BarList
            rows={rankRecord(mergeRecords(current, "paths"), 8, (path) =>
              path === "/other" ? "Other / not a real page" : path,
            )}
            emptyLabel="No page views yet."
          />
        </Panel>

        <Panel title="Where they came from">
          <BarList
            rows={rankRecord(
              mergeRecords(current, "sources"),
              4,
              (key) => SOURCE_LABELS[key] ?? key,
            )}
            emptyLabel="No visits yet."
          />
        </Panel>

        <Panel title="Device">
          <BarList
            rows={rankRecord(
              mergeRecords(current, "devices"),
              3,
              (key) => DEVICE_LABELS[key] ?? key,
            )}
            emptyLabel="No visits yet."
          />
        </Panel>
      </div>

      <Panel
        title="Latest enquiries"
        actions={
          <Link
            href="/owner/contacts"
            className="font-mono text-xs text-secondary no-underline hover:text-ink hover:underline hover:underline-offset-[3px]"
          >
            All enquiries →
          </Link>
        }
      >
        {contacts.page.length === 0 ? (
          <EmptyState>
            Nothing yet. Submissions from the contact form land here.
          </EmptyState>
        ) : (
          <ul className="m-0 flex list-none flex-col p-0">
            {contacts.page.map((contact) => (
              <li
                key={contact._id}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3 last:border-0 last:pb-0 first:pt-0"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-display text-base font-semibold tracking-tight">
                    {contact.name}
                    {contact.company ? (
                      <span className="font-mono text-xs font-normal text-muted">
                        {" "}
                        · {contact.company}
                      </span>
                    ) : null}
                  </span>
                  <span className="line-clamp-1 font-mono text-xs text-muted">
                    {contact.message}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-xs text-faint">
                  {new Date(contact._creationTime).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}
