import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Report } from "@/lib/report.api"
import StatusBadge from "@/components/common-ui/StatusBadge"
import PriorityBadge from "@/components/common-ui/PriorityBadge"

type Props = {
    reports: Report[]
}

const HEADERS = ["Laporan", "Kategori", "Priority", "Status", "Pelapor", "Tanggal", ""]

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

export default function ReportsTable({ reports }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
                <thead>
                    <tr
                        className="text-left text-[11px] font-bold uppercase tracking-wider"
                        style={{
                            background: "#F1EDE2",
                            color: "#6B7280",
                            borderBottom: "1px solid #E8E4D9",
                        }}
                    >
                        {HEADERS.map((h, i) => (
                            <th
                                key={i}
                                className={i === 0 ? "px-5 py-3" : "px-4 py-3"}
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {reports.map((r, idx) => (
                        <ReportRow
                            key={r.id}
                            report={r}
                            isLast={idx === reports.length - 1}
                            isAlt={idx % 2 !== 0}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function ReportRow({
    report: r,
    isLast,
    isAlt,
}: {
    report: Report
    isLast: boolean
    isAlt: boolean
}) {
    return (
        <tr
            className="group transition-colors"
            style={{
                borderBottom: !isLast ? "1px solid #F1EDE2" : undefined,
                background: isAlt ? "#F8F6F0" : "#FCFBF8",
            }}
        >
            <td className="px-5 py-3.5">
                <p
                    className="max-w-[220px] truncate font-bold"
                    style={{ color: "#111827" }}
                >
                    {r.title}
                </p>
                <p
                    className="mt-0.5 max-w-[220px] truncate text-[11px]"
                    style={{ color: "#9CA3AF" }}
                >
                    {r.description}
                </p>
            </td>

            <td className="px-4 py-3.5">
                <span
                    className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{ background: "#CCFBF1", color: "#0F766E" }}
                >
                    {r.category}
                </span>
            </td>

            <td className="px-4 py-3.5">
                <PriorityBadge priority={r.priority} />
            </td>

            <td className="px-4 py-3.5">
                <StatusBadge status={r.status} />
            </td>

            <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                    <div
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{
                            background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                        }}
                    >
                        {r.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[12px]" style={{ color: "#374151" }}>
                        {r.name}
                    </span>
                </div>
            </td>

            <td
                className="whitespace-nowrap px-4 py-3.5 text-[12px]"
                style={{ color: "#9CA3AF" }}
            >
                {formatDate(r.created_at)}
            </td>

            <td className="px-4 py-3.5">
                <Link
                    href={`/admin/laporan/${r.id}`}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold opacity-0 transition-all group-hover:opacity-100"
                    style={{
                        background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                        color: "#fff",
                        boxShadow: "0 2px 8px rgba(15,118,110,0.30)",
                    }}
                >
                    Review <ArrowRight size={12} />
                </Link>
            </td>
        </tr>
    )
}