import { NextRequest, NextResponse } from "next/server";
import { isJwtExpired } from "./utils";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  // 🔒 Protect only /cart
  if (pathname.startsWith("/cart")) {
    // ❌ No token → redirect to login
    if (!token) {
      console.log("No token found, redirecting to login...");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ❌ Expired token → clear + redirect
    if (isJwtExpired(token)) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.set("accessToken", "", { expires: new Date(0) });
      return res;
    }
  }

  // ✅ Everything else is public
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)", "/cart"],
};
