import { NextRequest, NextResponse } from "next/server";
import { isJwtExpired } from "./utils";
import { ROUTES } from "./constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: ${
      process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
    };
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  if (pathname === ROUTES.LOGIN) {
    // If user already has a valid token → redirect to home
    if (token && !isJwtExpired(token)) {
      return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
    }
    return response;
  }

  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
  }

  // Expired token → clear + redirect
  if (isJwtExpired(token)) {
    const res = NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    res.cookies.set("accessToken", "", { expires: new Date(0) });
    return res;
  }
  //Everything else is public
  return response;
}

export const config = {
  matcher: ["/login", "/order", "/cart"],
};
