import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Owner",
  // Belt and braces with the robots.txt rule: this must never be indexed.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * The owner panel deliberately sits outside the `(site)` route group, so it
 * inherits the document shell but none of the marketing header, footer,
 * smooth-scroll or visitor tracking.
 */
export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-full flex-1 flex-col bg-sunken">{children}</div>;
}
