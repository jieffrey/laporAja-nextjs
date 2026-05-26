import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { UserRole } from "@/types/user";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role as UserRole | undefined;

    // Sudah login, akses halaman auth → redirect ke dashboard
    if (pathname.startsWith("/auth") && role) {
      return NextResponse.redirect(
        new URL(role === "user" ? "/user" : "/admin", req.url),
      );
    }

    // Superadmin khusus untuk route tertentu
    if (pathname.startsWith("/admin/users")) {
      if (role !== "superadmin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }

    // User biasa coba akses /admin → redirect ke /user
    if (pathname.startsWith("/admin") && role === "user") {
      return NextResponse.redirect(new URL("/user", req.url));
    }

    // Tidak punya role (unauthenticated) coba akses protected route
    if (
      (pathname.startsWith("/user") || pathname.startsWith("/admin")) &&
      !role
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Jalankan middleware untuk semua route yang di-match
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/auth/:path*"],
};

