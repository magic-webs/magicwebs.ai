"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Brandmark } from "@/components/brandmark";
import { Button, cx } from "@/components/ui";
import { navLinks, platforms } from "@/lib/site";

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 10 6"
      aria-hidden="true"
      focusable="false"
      className={cx(
        "size-2.5 transition-transform duration-200 ease-out",
        open && "rotate-180",
      )}
    >
      <path
        d="M1 1l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navLinkClass =
  "relative block w-full border-b border-line py-3 font-mono text-lg tracking-wide whitespace-nowrap lg:w-auto lg:border-0 lg:py-2 lg:text-sm";

// Animated underline, desktop only.
const underline =
  "lg:after:absolute lg:after:inset-x-0 lg:after:bottom-0 lg:after:h-px lg:after:origin-left lg:after:scale-x-0 lg:after:bg-current lg:after:transition-transform lg:after:duration-200 lg:after:ease-out lg:hover:after:scale-x-100 lg:aria-[current=page]:after:scale-x-100";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isScrolled() {
  return window.scrollY > 8;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelWrap = useRef<HTMLDivElement>(null);

  // Close everything on route change, derived during render rather than in an
  // effect so it lands in the same commit as the navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setPanelOpen(false);
  }

  const stuck = useSyncExternalStore(subscribeToScroll, isScrolled, () => false);

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Dismiss the platforms panel on outside click or Escape.
  useEffect(() => {
    if (!panelOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!panelWrap.current?.contains(e.target as Node)) setPanelOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [panelOpen]);

  const onPlatforms = pathname.startsWith("/platforms");

  return (
    <header
      className={cx(
        "sticky top-0 z-20 flex min-h-(--head-h) items-center justify-between gap-6 border-b bg-canvas/85 px-[clamp(1.25rem,3vw,2.5rem)] backdrop-blur-md backdrop-saturate-150 transition-colors duration-200 ease-standard",
        stuck ? "border-line" : "border-transparent",
      )}
    >
      <Brandmark />

      <button
        type="button"
        className="relative h-11 w-10 shrink-0 cursor-pointer border-0 bg-transparent p-0 text-ink lg:hidden"
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span
          className={cx(
            "absolute inset-x-2 h-px bg-current transition-transform duration-200 ease-out",
            menuOpen ? "top-5.25 rotate-45" : "top-4.25",
          )}
        />
        <span
          className={cx(
            "absolute inset-x-2 h-px bg-current transition-transform duration-200 ease-out",
            menuOpen ? "top-5.25 -rotate-45" : "top-6.25",
          )}
        />
      </button>

      <nav
        id="site-nav"
        aria-label="Primary"
        data-lenis-prevent
        className={cx(
          // mobile sheet
          "fixed inset-x-0 top-(--head-h) bottom-0 z-25 flex flex-col items-stretch gap-2 overflow-y-auto bg-canvas px-(--gutter) pt-6 pb-16 transition-[opacity,transform,visibility] duration-200 ease-out",
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
          // desktop bar
          "lg:visible lg:static lg:translate-y-0 lg:flex-row lg:items-center lg:gap-6 lg:overflow-visible lg:bg-transparent lg:p-0 lg:opacity-100",
        )}
      >
        <div className="lg:relative" ref={panelWrap}>
          <button
            type="button"
            className={cx(
              navLinkClass,
              underline,
              "flex cursor-pointer items-center justify-between gap-1.5 border-0 bg-transparent text-ink lg:justify-start",
              "border-b border-line lg:border-0",
            )}
            aria-expanded={panelOpen}
            aria-current={onPlatforms ? "page" : undefined}
            onClick={() => setPanelOpen((v) => !v)}
          >
            Platforms
            <Caret open={panelOpen} />
          </button>

          <div
            className={cx(
              // mobile: inline disclosure
              "py-3 lg:py-0",
              panelOpen ? "block" : "hidden",
              // desktop: floating panel
              "lg:absolute lg:top-[calc(100%+0.75rem)] lg:left-1/2 lg:block lg:w-150 lg:max-w-[calc(100vw-4rem)] lg:-translate-x-1/2 lg:rounded-2xl lg:border lg:border-line lg:bg-paper lg:p-3 lg:shadow-lg lg:transition-[opacity,transform,visibility] lg:duration-200 lg:ease-out",
              panelOpen
                ? "lg:visible lg:translate-y-0 lg:opacity-100"
                : "lg:invisible lg:-translate-y-1.5 lg:opacity-0",
            )}
          >
            <div className="grid w-full grid-cols-1 gap-x-3 gap-y-1 sm:grid-cols-2">
              {platforms.map((p) => (
                <Link
                  key={p.slug}
                  href={`/platforms/${p.slug}`}
                  className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-150 ease-standard hover:bg-ink/5"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-9.5 shrink-0 place-items-center rounded-md font-mono text-xs font-medium text-ink"
                    style={{ background: p.swatch }}
                  >
                    {p.initials}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="font-display text-base leading-snug font-semibold tracking-tight">
                      {p.name}
                    </span>
                    <span className="truncate font-mono text-2xs tracking-wide text-muted">
                      {p.kind}
                    </span>
                  </span>
                </Link>
              ))}
              <Link
                href="/platforms"
                className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-150 ease-standard hover:bg-ink/5"
              >
                <span
                  aria-hidden="true"
                  className="grid size-9.5 shrink-0 place-items-center rounded-md bg-inset font-mono text-xs font-medium text-ink"
                >
                  →
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-display text-base leading-snug font-semibold tracking-tight">
                    All platforms
                  </span>
                  <span className="truncate font-mono text-2xs tracking-wide text-muted">
                    Overview
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cx(navLinkClass, underline, "text-ink")}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}

        <Button href="/contact" size="sm" className="mt-4 lg:mt-0">
          Book a demo
        </Button>
      </nav>
    </header>
  );
}
