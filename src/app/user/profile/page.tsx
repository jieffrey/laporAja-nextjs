import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getReports } from "@/lib/report.api";
import { USER_ROLE_LABELS } from "@/lib/constant";
import StatCard from "@/components/common-ui/StatCardNew";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "user") {
    redirect("/auth/login");
  }

  const userId = Number(session.user.id);

  const reports = await getReports();
  const myReports = reports.filter((r) => r.user_id === userId);
  const totalReports = myReports.length;
  const resolvedReports = myReports.filter((r) => r.status === "Resolved").length;

  const points = session.user.points ?? 0;

  const roleLabel = USER_ROLE_LABELS[session.user.role] ?? "User";

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
            {session.user.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <div>
            <h1 className="text-[18px] font-extrabold tracking-tight text-slate-900">
              {session.user.name}
            </h1>
            <p className="text-[13px] text-slate-500">{session.user.email}</p>
            <p className="mt-1 text-[12px] font-semibold text-blue-700">
              {roleLabel}
            </p>
          </div>
        </div>

        <div className="grid gap-4 text-right sm:grid-cols-2 md:text-left">
          <div className="text-[13px] text-slate-500">
            <p className="font-semibold text-slate-700">Total poin</p>
            <p className="mt-0.5 text-[20px] font-extrabold text-amber-500">
              {points}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <StatCard
            icon="📋"
            value={String(totalReports)}
            label="Total laporan saya"
            color="#3B82F6"
          />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <StatCard
            icon="✅"
            value={String(resolvedReports)}
            label="Laporan selesai"
            color="#10B981"
          />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <StatCard
            icon="⭐"
            value={String(points)}
            label="Poin kontribusi"
            color="#F59E0B"
          />
        </div>
      </section>
    </div>
  );
}

