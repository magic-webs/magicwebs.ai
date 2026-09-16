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

function timeAgo(at: number): string {
  const minutes = Math.round((Date.now() - at) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export default async function OwnerAnalyticsPage(
  props: PageProps<"/owner/analytics">,
) {
  const searchParams = await props.searchParams;
  const range = parseRange(searchParams.days);

  const [{ current, previous }, sessions] = await Promise.all([
    loadTrend(range),
    convexServerClient().query(api.analytics.recentSessions, {
      token: ownerToken(),
      limit: 25,
    }),
  ]);

  const views = sum(current, "views");
  const visitors = sum(current, "sessions");

  return (
    <>
      <PanelHeading
        title="Traffic"
        description={`Who visited in the last ${range} days, and how they got here.`}
        actions={<RangeTabs active={range} basePath="/owner/analytics" />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile
          label="Page views"
          value={formatCount(views)}
          delta={percentChange(views, sum(previous, "views"))}
          hint={`vs previous ${range}d`}
        />
        <StatTile
          label="Visitors"
          value={formatCount(visitors)}
          delta={percentChange(visitors, sum(previous, "sessions"))}
          hint={`vs previous ${range}d`}
        />
        <StatTile
          label="Views per visitor"
          value={visitors > 0 ? (views / visitors).toFixed(1) : "—"}
          hint="how far people go"
        />
      </div>

      <Panel title="Daily traffic">
        {views > 0 ? (
          <TrendChart data={current} />
        ) : (
          <EmptyState>No visits recorded in this window.</EmptyState>
        )}
      </Panel>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Top pages">
          <BarList
            rows={rankRecord(mergeRecords(current, "paths"), 12, (path) =>
              path === "/other" ? "Other / not a real page" : path,
            )}
            emptyLabel="No page views yet."
          />
        </Panel>

        <div className="flex flex-col gap-6">
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
      </div>

      <Panel
        title="Referring sites"
        description="Sites that linked to you, by hostname."
      >
        <BarList
          rows={rankRecord(mergeRecords(current, "referrers"), 12)}
          emptyLabel="No inbound links recorded yet."
        />
      </Panel>

      <Panel
        title="Recent visitors"
        description="The last 25 sessions. A session ends when the tab closes."
      >
        {sessions.length === 0 ? (
          <EmptyState>No sessions recorded yet.</EmptyState>
        ) : (
          <div className="-mx-6 overflow-x-auto px-6">
            <table className="w-full min-w-3xl border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  {["When", "Landed on", "Source", "Device", "Where", "Views"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="py-2 pr-6 font-mono text-2xs tracking-wide text-muted uppercase"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session._id} className="border-b border-line last:border-0">
                    <td className="py-2.5 pr-6 font-mono text-xs whitespace-nowrap text-secondary">
                      {timeAgo(session.lastSeen)}
                    </td>
                    <td className="py-2.5 pr-6 font-mono text-xs text-secondary">
                      {session.entryPath}
                    </td>
                    <td className="py-2.5 pr-6 font-mono text-xs text-muted">
                      {SOURCE_LABELS[session.source] ?? session.source}
                    </td>
                    <td className="py-2.5 pr-6 font-mono text-xs text-muted">
                      {DEVICE_LABELS[session.device] ?? session.device} ·{" "}
                      {session.browser}
                    </td>
                    <td className="py-2.5 pr-6 font-mono text-xs text-muted">
                      {[session.city, session.country].filter(Boolean).join(", ") ||
                        "—"}
                    </td>
                    <td className="py-2.5 pr-6 font-mono text-xs tabular-nums text-secondary">
                      {session.views}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  );
}
