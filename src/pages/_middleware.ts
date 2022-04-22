// Next
import type { NextMiddleware, NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

type NextMiddlewareResult = NextResponse | Response;

const Middleware: NextMiddleware = (request: NextRequest, event: NextFetchEvent): NextMiddlewareResult | Promise<NextMiddlewareResult> => {
  const { cookies } = request;
  const { pathname, origin } = request.nextUrl;
  const url = request.url;

  if (cookies?.session) {
    if (url.includes("/auth/sign-in") || url.includes("/auth/forgot-password") || url.includes("/auth/reset-password")) {
      return NextResponse.rewrite(origin + "/");
    }
  } else {
    if (url.includes("/auth/profile")) {
      return NextResponse.rewrite(origin + "/auth/sign-in");
    }
  }

  return NextResponse.next();
};

export default Middleware;
