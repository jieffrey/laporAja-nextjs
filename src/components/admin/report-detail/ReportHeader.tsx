import Link from "next/link"
import { ArrowLeft, Folder, User, Clock } from "lucide-react"
import type { Report } from "@/lib/report.api"
import StatusBadge from "@/components/common-ui/StatusBadge"
import PriorityBadge from "@/components/common-ui/PriorityBadge"

type Props = {
    report: Report
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", { dateStyle: "long" })

export default function ReportHeader({ report }: Props) {
    return (
        <div
            className="flex items-start justify-between gap-4 rounded-2xl px-5 py-4"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            <div className="min-w-0">
                {/* Badges row */}
                <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                        className="rounded-md px-2 py-0.5 text-[11px] font-bold"
                        style={{ background: "#F1EDE2", color: "#5F5E5A" }}
                    >
                        #{report.id}
                    </span>
                    <StatusBadge status={report.status} />
                    <PriorityBadge priority={report.priority} />
                </div>

                {/* Title */}
                <h1
                    className="text-[20px] font-extrabold tracking-tight"
                    style={{ color: "#111827" }}
                >
                    {report.title}
                </h1>

                {/* Meta row */}
                <div
                    className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]"
                    style={{ color: "#9CA3AF" }}
                >
                    <span className="flex items-center gap-1">
                        <Folder size={12} /> {report.category}
                    </span>
                    <span style={{ color: "#D1D5DB" }}>•</span>
                    <span className="flex items-center gap-1">
                        <User size={12} /> {report.name}
                    </span>
                    <span style={{ color: "#D1D5DB" }}>•</span>
                    <span className="flex items-center gap-1">
                        <Clock size={12} /> {formatDate(report.created_at)}
                    </span>
                </div>
            </div>

            {/* Back link */}
            <Link
                href="/admin/laporan"
                className="flex flex-shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all"
                style={{
                    background: "#F8F6F0",
                    border: "1px solid #E8E4D9",
                    color: "#0F766E",
                }}
            >
                <ArrowLeft size={12} /> Kembali
            </Link>
        </div>
    )
}