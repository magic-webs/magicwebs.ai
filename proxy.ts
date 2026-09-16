import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { OWNER_COOKIE, verifySessionToken } from "@/lib/owner-auth";

/**
 * Turns an unauthenticated hit on `/owner/*` into a redirect before the page
 * renders. This is a fast reject, not the security boundary — the panel layout
 * re-checks the session, and every server action checks it again, because a
 * proxy runs separately from the render and must not be the only gate.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/owner/login") {
    // Already signed in? Skip the form.
    const token = request.cookies.get(OWNER_COOKIE)?.value;
    if (await verifySessionToken(token)) {
      return NextResponse.redirect(new URL("/owner", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(OWNER_COOKIE)?.value;
  if (await verifySessionToken(token)) return NextResponse.next();

  const login = new URL("/owner/login", request.url);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: "/owner/:path*",
};
