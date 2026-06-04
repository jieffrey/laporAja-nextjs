import Link from "next/link"
import { RiMapPin2Line, RiTimeLine, RiArrowRightLine } from "react-icons/ri"
import type { Report } from "@/lib/report.api"
import StatusBadge from "@/components/common-ui/StatusBadge"
import PriorityBadge from "@/components/common-ui/PriorityBadge"

export default function ReportCard({ report }: { report: Report }) {
  return (
    <Link href={`/user/laporan/${report.id}`}
      className="group flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:shadow-sm transition-all">

      {/* Left — status indicator */}
      <div className="mt-0.5 flex-shrink-0">
        <div className="h-2 w-2 rounded-full mt-1.5"
          style={{
            background:
              report.status === "Resolved"    ? "#10B981" :
              report.status === "In Progress" ? "#F59E0B" :
              report.status === "Rejected"    ? "#EF4444" : "#94A3B8"
          }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-zinc-900 truncate">{report.title}</p>
            <p className="mt-0.5 text-[12px] text-zinc-400 line-clamp-1">{report.description}</p>
          </div>
          <RiArrowRightLine size={14} className="text-zinc-300 group-hover:text-zinc-500 transition-colors flex-shrink-0 mt-0.5" />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={report.status} />
          <PriorityBadge priority={report.priority} />
          <span className="text-zinc-300">·</span>
          <span className="flex items-center gap-1 text-[11px] text-zinc-400">
            <RiTimeLine size={11} />
            {new Date(report.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-zinc-400">
            <RiMapPin2Line size={11} />
            {report.category}
          </span>
        </div>
      </div>
    </Link>
  )
}