import { getReports } from "@/lib/report.api";
import AdminReportsList from "./AdminReportsList";

export default async function AdminReportsPage() {
  const reports = await getReports();

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">
          Kelola Laporan
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Lihat semua laporan dan masuk ke detail untuk update status/priority.
        </p>
      </section>

      <AdminReportsList reports={reports} />
    </div>
  );
}

