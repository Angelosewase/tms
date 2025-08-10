import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Protect selected routes by checking for a valid NextAuth token
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = Boolean(token);
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");

  if (isAuthPage && isAuth) {
    // Already logged in, redirect away from login
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // For protected routes, require auth
  const protectedPaths = [
    "/admin",
    "/employee",
    "/manager",
    "/sys",
    "/dashboard",
  ];

  if (protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
    if (!isAuth) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/admin/:path*",
    "/employee/:path*",
    "/manager/:path*",
    "/sys/:path*",
    "/dashboard/:path*",
  ],
};
