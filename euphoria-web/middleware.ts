import { NextRequest, NextResponse } from "next/server";
import { isJwtExpired } from "./utils";
import { ROUTES } from "./constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  if (pathname === ROUTES.LOGIN) {
    // If user already has a valid token → redirect to home
    if (token && !isJwtExpired(token)) {
      return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
    }
    return NextResponse.next();
  }

  if (pathname === ROUTES.CART) {
    if (!token) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }

    // Expired token → clear + redirect
    if (isJwtExpired(token)) {
      const res = NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
      res.cookies.set("accessToken", "", { expires: new Date(0) });
      return res;
    }
  }

  //Everything else is public
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/cart/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
