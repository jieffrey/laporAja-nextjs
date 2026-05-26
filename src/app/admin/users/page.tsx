import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUsers } from "@/lib/user.api";
import AdminUsersTable from "./usersTable";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (!session || role !== "superadmin") {
    redirect("/admin");
  }

  const users = await getUsers();

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">
          Kelola Pengguna
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Ubah role user atau hapus user. (Superadmin only)
        </p>
      </section>

      <AdminUsersTable users={users} />
    </div>
  );
}

