import { NextResponse, type NextRequest } from "next/server";
import { locales, type Locale } from "@/content/profile";

/** Pick "es" for Spanish browsers, "en" for everyone else. */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const first = header.split(",")[0]?.trim().slice(0, 2).toLowerCase();
  return first === "es" ? "es" : "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (PDF, images, robots.txt…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
