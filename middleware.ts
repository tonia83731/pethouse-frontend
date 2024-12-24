import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = (await cookies()).get("staffToken");
  const protectedRoute = [
    "/dashboard/furkids",
    "/dashboard/supplies",
    "/dashboard/volunteers",
    "/dashboard/partners",
  ];

  const url = req.nextUrl.clone();

  const isProtectedRoute = protectedRoute.some((route) =>
    url.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/furkids",
    "/dashboard/supplies",
    "/dashboard/volunteers",
    "/dashboard/partners",
  ],
};
