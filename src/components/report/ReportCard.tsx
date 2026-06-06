import Link from "next/link"
import { MapPin, Clock, ArrowRight } from "lucide-react"
import type { Report } from "@/lib/report.api"
import StatusBadge from "@/components/common-ui/StatusBadge"
import PriorityBadge from "@/components/common-ui/PriorityBadge"

const STATUS_COLOR: Record<string, string> = {
    "Resolved":    "#065F46",
    "In Progress": "#F59E0B",
    "Rejected":    "#991B1B",
    "Pending":     "#D1D5DB",
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

export default function ReportCard({ report }: { report: Report }) {
    return (
        <Link
            href={`/user/laporan/${report.id}`}
            className="group flex items-start gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            {/* Status accent strip */}
            <div
                className="mt-1 h-10 w-1 flex-shrink-0 rounded-full"
                style={{
                    background: STATUS_COLOR[report.status] ?? "#D1D5DB",
                }}
            />

            {/* Content */}
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p
                            className="truncate text-[14px] font-bold"
                            style={{ color: "#111827" }}
                        >
                            {report.title}
                        </p>
                        <p
                            className="mt-0.5 line-clamp-1 text-[12px]"
                            style={{ color: "#9CA3AF" }}
                        >
                            {report.description}
                        </p>
                    </div>
                    <ArrowRight
                        size={14}
                        className="mt-1 flex-shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                        style={{ color: "#0F766E" }}
                    />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={report.status} />
                    <PriorityBadge priority={report.priority} />
                    <span style={{ color: "#E8E4D9" }}>·</span>
                    <span
                        className="flex items-center gap-1 text-[11px]"
                        style={{ color: "#9CA3AF" }}
                    >
                        <Clock size={11} />
                        {formatDate(report.created_at)}
                    </span>
                    <span
                        className="flex items-center gap-1 text-[11px]"
                        style={{ color: "#9CA3AF" }}
                    >
                        <MapPin size={11} />
                        {report.category}
                    </span>
                </div>
            </div>
        </Link>
    )
}