import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, gateHref, isGatedPath, isPublicLessonPath } from "@/lib/mount";

function unitFromPath(pathname: string) {
  if (pathname.startsWith("/learn/")) return "8";
  if (pathname.startsWith("/mocks")) return "mock";
  if (pathname.startsWith("/practice")) return "practice";
  if (pathname.startsWith("/investigations")) return "lab";
  if (pathname.startsWith("/diagnostic")) return "8";
  return "8";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (request.cookies.get(SESSION_COOKIE)?.value) {
    return NextResponse.next();
  }
  if (!isGatedPath(pathname)) {
    return NextResponse.next();
  }
  if (isPublicLessonPath(pathname)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(gateHref(unitFromPath(pathname)));
}

export const config = {
  matcher: [
    "/plan",
    "/plan/:path*",
    "/practice",
    "/practice/:path*",
    "/investigations",
    "/investigations/:path*",
    "/mocks",
    "/mocks/:path*",
    "/notebook",
    "/notebook/:path*",
    "/progress",
    "/progress/:path*",
    "/ask",
    "/ask/:path*",
    "/cms",
    "/cms/:path*",
    "/instructor",
    "/instructor/:path*",
    "/parent",
    "/parent/:path*",
    "/expert",
    "/expert/:path*",
    "/session",
    "/session/:path*",
    "/resources",
    "/resources/:path*",
    "/learn/:path*",
  ],
};
