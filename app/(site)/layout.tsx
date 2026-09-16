import { AnalyticsTracker } from "@/components/analytics-tracker";
import { SiteChrome } from "@/components/site-chrome";

/**
 * Wraps only the public marketing pages. `/owner` sits outside this group, so
 * the panel gets neither the marketing chrome nor the visitor tracker.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteChrome>
      <AnalyticsTracker />
      {children}
    </SiteChrome>
  );
}
