import { getReports } from "@/lib/report.api";
import UserReportsList from "../../../components/report/UserReportsList";

export default async function UserReportsPage() {
  const reports = await getReports();

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">
          Laporan Saya
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Lihat dan filter semua laporan yang sudah kamu kirimkan.
        </p>
      </section>

      <UserReportsList reports={reports} />
    </div>
  );
}
