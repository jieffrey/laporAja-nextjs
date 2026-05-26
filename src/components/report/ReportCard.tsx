import Link from "next/link";
import type { Report } from "@/lib/report.api";
import StatusBadge from "@/components/common-ui/StatusBadge";
import PriorityBadge from "@/components/common-ui/PriorityBadge";

type ReportCardProps = {
  report: Report;
};

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <Link
      href={`/user/laporan/${report.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">
            {report.title}
          </h3>
          <p className="mt-1 text-[13px] text-slate-500 line-clamp-2">
            {report.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
            <span>{report.category}</span>
            <span>•</span>
            <span>Dibuat {new Date(report.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={report.status} />
          <PriorityBadge priority={report.priority} />
        </div>
      </div>
    </Link>
  );
}

