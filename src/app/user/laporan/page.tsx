import { Suspense } from "react";
import { REPORT_CATEGORIES, REPORT_STATUS } from "@/lib/constant";
import { getReports, type Report } from "@/lib/report.api";
import EmptyState from "@/components/common-ui/Emptystate";
import ReportCard from "@/components/report/ReportCard";

function Filters({
  status,
  category,
  onChange,
}: {
  status: string;
  category: string;
  onChange: (next: { status: string; category: string }) => void;
}) {
  "use client";

  return (
    <div className="flex flex-wrap gap-3">
      <select
        className="h-9 rounded-full border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none"
        value={status}
        onChange={(e) => onChange({ status: e.target.value, category })}
      >
        <option value="">Semua status</option>
        {Object.keys(REPORT_STATUS).map((key) => (
          <option key={key} value={key}>
            {REPORT_STATUS[key as keyof typeof REPORT_STATUS].label}
          </option>
        ))}
      </select>

      <select
        className="h-9 rounded-full border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none"
        value={category}
        onChange={(e) => onChange({ status, category: e.target.value })}
      >
        <option value="">Semua kategori</option>
        {REPORT_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

function ClientList({ reports }: { reports: Report[] }) {
  "use client";

  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const filtered = reports.filter((r) => {
    const matchStatus = status ? r.status === status : true;
    const matchCategory = category ? r.category === category : true;
    return matchStatus && matchCategory;
  });

  return (
    <div className="space-y-4">
      <Filters
        status={status}
        category={category}
        onChange={({ status: s, category: c }) => {
          setStatus(s);
          setCategory(c);
        }}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="Belum ada laporan"
          description="Kamu belum pernah membuat laporan. Mulai dengan membuat laporan pertama tentang lingkungan sekitarmu."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function UserReportsPage() {
  const reports = await getReports();

  return (
    <div className="space-y-5">
      <section className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div>
          <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">
            Laporan Saya
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Lihat dan filter semua laporan yang sudah kamu kirimkan.
          </p>
        </div>
      </section>

      <Suspense fallback={<div>Memuat laporan...</div>}>
        <ClientList reports={reports} />
      </Suspense>
    </div>
  );
}

