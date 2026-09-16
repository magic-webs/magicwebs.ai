"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/components/ui";

const links = [
  { href: "/owner", label: "Overview" },
  { href: "/owner/contacts", label: "Enquiries" },
  { href: "/owner/analytics", label: "Traffic" },
  { href: "/owner/performance", label: "Performance" },
];

export function OwnerNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Owner panel">
      <ul className="m-0 flex list-none flex-wrap items-center gap-1 p-0">
        {links.map((link) => {
          // Only `/owner` itself is an exact match; the rest own their subtree.
          const active =
            link.href === "/owner"
              ? pathname === "/owner"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "inline-flex rounded-pill px-3.5 py-2 font-mono text-xs tracking-wide no-underline transition-colors duration-150 ease-standard",
                  active
                    ? "bg-ink text-cream"
                    : "text-secondary hover:bg-ink/5 hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
