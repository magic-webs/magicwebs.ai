import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Brandmark } from "@/components/brandmark";
import { OwnerNav } from "@/components/owner/owner-nav";
import { logout } from "@/app/owner/actions";
import { OWNER_COOKIE, verifySessionToken } from "@/lib/owner-auth";

/**
 * The authoritative session check. `proxy.ts` already redirected anonymous
 * traffic, but a proxy runs apart from rendering and can be bypassed by a
 * misconfigured matcher, so the check that actually guards the data happens
 * here — and again inside every server action.
 */
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  if (!(await verifySessionToken(store.get(OWNER_COOKIE)?.value))) {
    redirect("/owner/login");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-wide flex-wrap items-center gap-x-8 gap-y-4 px-(--gutter) py-4">
          <Brandmark href="/owner" />
          <OwnerNav />
          <form action={logout} className="ml-auto">
            <button
              type="submit"
              className="cursor-pointer rounded-pill border border-line-strong px-4 py-2 font-mono text-xs tracking-wide text-secondary transition-colors duration-150 ease-standard hover:border-ink hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-wide flex-1 flex-col gap-10 px-(--gutter) py-10">
        {children}
      </main>
    </div>
  );
}
