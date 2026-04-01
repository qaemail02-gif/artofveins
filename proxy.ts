import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/app/i18n/locales";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path already starts with a supported locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return NextResponse.next();

  // Redirect to the default locale
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    "/((?!_next|favicon.ico|.*\\..*).*)",
  ],
};
