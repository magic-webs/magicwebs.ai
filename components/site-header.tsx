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
        "size-2.5 shrink-0 transition-transform duration-200 ease-out",
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

/** One platform row, shared by the desktop panel and the mobile sheet. */
function PlatformRow({
  slug,
  name,
  kind,
  swatch,
  initials,
  onNavigate,
}: {
  slug: string;
  name: string;
  kind: string;
  swatch: string;
  initials: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={`/platforms/${slug}`}
      onClick={onNavigate}
      className="flex items-center gap-3 rounded-lg p-2 no-underline transition-colors duration-150 ease-standard hover:bg-ink/5"
    >
      <span
        aria-hidden="true"
        className="grid size-9.5 shrink-0 place-items-center rounded-md font-mono text-xs font-medium text-ink"
        style={{ background: swatch }}
      >
        {initials}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-display text-base leading-snug font-semibold tracking-tight">
          {name}
        </span>
        <span className="truncate font-mono text-2xs tracking-wide text-muted">
          {kind}
        </span>
      </span>
    </Link>
  );
}

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
  const [mobilePlatformsOpen, setMobilePlatformsOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelWrap = useRef<HTMLDivElement>(null);

  // Close everything on route change, derived during render rather than in an
  // effect so it lands in the same commit as the navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setPanelOpen(false);
    setMobilePlatformsOpen(false);
  }

  const stuck = useSyncExternalStore(subscribeToScroll, isScrolled, () => false);

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Dismiss the desktop panel on outside click or Escape.
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

  // Escape also closes the mobile sheet.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const onPlatforms = pathname.startsWith("/platforms");
  const closeMenu = () => setMenuOpen(false);

  const deskLink =
    "relative py-2 font-mono text-sm tracking-wide whitespace-nowrap no-underline after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100 aria-[current=page]:after:scale-x-100";

  const mobileLink =
    "border-b border-line py-3.5 font-mono text-base tracking-wide text-ink no-underline";

  return (
    <>
      <header
        className={cx(
          "sticky top-0 z-30 flex min-h-(--head-h) items-center justify-between gap-6 border-b bg-canvas/85 px-[clamp(1.25rem,3vw,2.5rem)] backdrop-blur-md backdrop-saturate-150 transition-colors duration-200 ease-standard",
          stuck || menuOpen ? "border-line" : "border-transparent",
        )}
      >
        <Brandmark />

        {/* ---------------- desktop ---------------- */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          <div className="relative" ref={panelWrap}>
            <button
              type="button"
              className={cx(
                deskLink,
                "flex cursor-pointer items-center gap-1.5 border-0 bg-transparent text-ink",
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
                "absolute top-[calc(100%+0.75rem)] left-1/2 w-150 max-w-[calc(100vw-4rem)] -translate-x-1/2 rounded-2xl border border-line bg-paper p-3 shadow-lg transition-[opacity,transform,visibility] duration-200 ease-out",
                panelOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1.5 opacity-0",
              )}
            >
              <div className="grid w-full grid-cols-2 gap-x-3 gap-y-1">
                {platforms.map((p) => (
                  <PlatformRow
                    key={p.slug}
                    slug={p.slug}
                    name={p.name}
                    kind={p.kind}
                    swatch={p.swatch}
                    initials={p.initials}
                  />
                ))}
                <Link
                  href="/platforms"
                  className="flex items-center gap-3 rounded-lg p-2 no-underline transition-colors duration-150 ease-standard hover:bg-ink/5"
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

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cx(deskLink, "text-ink")}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}

          <Button href="/contact" size="sm">
            Book a demo
          </Button>
        </nav>

        {/* ---------------- mobile trigger ---------------- */}
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
              "absolute inset-x-2 h-0.5 rounded bg-current transition-transform duration-200 ease-out",
              menuOpen ? "top-5.25 rotate-45" : "top-4",
            )}
          />
          <span
            className={cx(
              "absolute inset-x-2 h-0.5 rounded bg-current transition-transform duration-200 ease-out",
              menuOpen ? "top-5.25 -rotate-45" : "top-6.5",
            )}
          />
        </button>
      </header>

      {/*
        Sibling of <header>, not a child. The header sets `backdrop-filter`,
        which makes it the containing block for fixed descendants — nested
        inside it this sheet inherited the header's 88px box rather than
        filling the viewport.
      */}
      <div
        id="site-nav"
        data-lenis-prevent
        aria-hidden={!menuOpen}
        className={cx(
          "fixed inset-x-0 top-(--head-h) bottom-0 z-20 overflow-y-auto overscroll-contain bg-canvas px-(--gutter) pt-4 pb-10 transition-[opacity,transform,visibility] duration-200 ease-out lg:hidden",
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-between border-0 border-b border-line bg-transparent py-3.5 font-mono text-base tracking-wide text-ink"
            aria-expanded={mobilePlatformsOpen}
            onClick={() => setMobilePlatformsOpen((v) => !v)}
          >
            Platforms
            <Caret open={mobilePlatformsOpen} />
          </button>

          {mobilePlatformsOpen && (
            <div className="flex flex-col gap-1 border-b border-line py-2">
              {platforms.map((p) => (
                <PlatformRow
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  kind={p.kind}
                  swatch={p.swatch}
                  initials={p.initials}
                  onNavigate={closeMenu}
                />
              ))}
              <Link
                href="/platforms"
                onClick={closeMenu}
                className="px-2 py-2 font-mono text-xs tracking-wide text-muted uppercase no-underline"
              >
                All platforms →
              </Link>
            </div>
          )}

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              aria-current={pathname === l.href ? "page" : undefined}
              className={cx(mobileLink, "aria-[current=page]:text-muted")}
            >
              {l.label}
            </Link>
          ))}

          <Link href="/contact" onClick={closeMenu} className={mobileLink}>
            Contact
          </Link>

          <Button href="/contact" size="lg" className="mt-6 w-full">
            Book a demo
          </Button>
        </nav>
      </div>
    </>
  );
}
