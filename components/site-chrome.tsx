import { GrainDefs } from "@/components/grain-text";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";

/**
 * Header, footer and page-level effects for the public site.
 *
 * This lives outside the root layout so `/owner` can opt out of it. It is
 * shared by the `(site)` route group and by `not-found.tsx`, which renders
 * against the root layout and would otherwise lose the chrome entirely.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-pill bg-ink px-4 py-2 font-mono text-sm text-cream focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
      </a>
      <GrainDefs />
      <SmoothScroll />
      <SiteHeader />
      <main
        id="main"
        className="flex flex-1 flex-col px-(--gutter) pb-[clamp(1.5rem,3vw,2.5rem)]"
      >
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
