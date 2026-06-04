import { getReports } from "@/lib/report.api";
import AdminReportsList from "@/components/admin/AdminReportsList";

export default async function AdminLaporanPage() {
  const reports = await getReports();

  return (
    <div className="space-y-5 w-full">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div>
          <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">Kelola Laporan</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">{reports.length} total laporan masuk</p>
        </div>
      </div>

      <AdminReportsList reports={reports} />
    </div>
  );
}