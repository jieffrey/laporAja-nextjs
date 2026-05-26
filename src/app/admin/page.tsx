import { getReports } from "@/lib/report.api";
import StatCard from "@/components/common-ui/StatCard";

export default async function AdminDashboardPage() {
  const reports = await getReports();

  const total = reports.length;
  const pending = reports.filter((r) => r.status === "Pending").length;
  const inProgress = reports.filter((r) => r.status === "In Progress").length;
  const resolved = reports.filter((r) => r.status === "Resolved").length;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <h1 className="text-[24px] font-extrabold tracking-tight text-slate-900">
          Dashboard Admin
        </h1>
        <p className="mt-1 text-[14px] text-slate-500">
          Ringkasan laporan dari seluruh pengguna.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <StatCard icon="📋" value={String(total)} label="Total Laporan" color="#3B82F6" />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <StatCard icon="⏳" value={String(pending)} label="Pending" color="#94A3B8" />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <StatCard icon="🛠️" value={String(inProgress)} label="In Progress" color="#F59E0B" />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <StatCard icon="✅" value={String(resolved)} label="Resolved" color="#10B981" />
        </div>
      </section>
    </div>
  );
}

