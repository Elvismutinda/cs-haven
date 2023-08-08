import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function to handle authentication and redirection
export async function middleware(req: NextRequest) {
  // Get the authentication token from the request
  const token = await getToken({ req });

  // Paths that require authentication
  const protectedPaths = [
    "/c/:path*/submit",
    "/c/create",
    "/sign-in",
    "/sign-up",
  ];

  // Check if the current path is an authentication page
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/sign-in") ||
    req.nextUrl.pathname.startsWith("/sign-up");

  // If the current path requires authentication
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // If user is not authenticated, redirect to sign-in page with original URL as parameter
    if (!token) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/sign-in?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  } else if (isAuthPage && token) {
    // If user is authenticated and trying to access an authentication page, redirect to home page
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if (!token) {
  //   return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  // }
}

export const config = {
  matcher: ["/c/:path*/submit", "/c/create", "/sign-in", "/sign-up"],
};
