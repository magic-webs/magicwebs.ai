import Link from "next/link";
import { cx } from "@/components/ui";
import { RANGES, type Range } from "@/lib/owner-data";

/**
 * Plain links rather than a client-side control: the pages are server
 * rendered, so changing the window is a navigation and stays shareable and
 * back-button friendly.
 */
export function RangeTabs({
  active,
  basePath,
}: {
  active: Range;
  basePath: string;
}) {
  return (
    <div
      className="flex items-center gap-1 rounded-pill border border-line p-1"
      role="group"
      aria-label="Date range"
    >
      {RANGES.map((range) => (
        <Link
          key={range}
          href={`${basePath}?days=${range}`}
          aria-current={range === active ? "true" : undefined}
          className={cx(
            "rounded-pill px-3 py-1.5 font-mono text-xs no-underline transition-colors duration-150 ease-standard",
            range === active
              ? "bg-ink text-cream"
              : "text-secondary hover:bg-ink/5 hover:text-ink",
          )}
        >
          {range}d
        </Link>
      ))}
    </div>
  );
}
