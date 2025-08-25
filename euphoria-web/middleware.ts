import { NextRequest, NextResponse } from "next/server";
import { isJwtExpired } from "./utils";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  // ✅ If user visits /login but already has a valid token → redirect to "/"
  if (pathname.startsWith("/login")) {
    if (token && !isJwtExpired(token)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // ✅ Protect other routes
  if (!token) {
    console.log("Token not found, redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isJwtExpired(token)) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.set("accessToken", "", { expires: new Date(0) });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
