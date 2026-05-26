import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "@/layout/sidebar";
import Appbar from "@/layout/appbar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  if (!session || !["admin", "superadmin"].includes(role ?? "")) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-6xl gap-0">
        <Sidebar role={role as "admin" | "superadmin"} />
        <main className="flex min-h-screen flex-1 flex-col">
          <Appbar session={session} />
          <div className="flex-1 px-4 pb-8 pt-4">{children}</div>
        </main>
      </div>
    </div>
  );
}

