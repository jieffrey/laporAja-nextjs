import Link from "next/link"
import { Inbox, ArrowRight } from "lucide-react"
import type { Report } from "@/lib/report.api"
import StatusBadge from "@/components/common-ui/StatusBadge"
import PriorityBadge from "@/components/common-ui/PriorityBadge"

type Props = {
    reports: Report[]
}

const TABLE_HEADERS = [
    { label: "Laporan", className: "px-5 py-3" },
    { label: "Kategori", className: "hidden px-4 py-3 sm:table-cell" },
    { label: "Priority", className: "px-4 py-3" },
    { label: "Status", className: "px-4 py-3" },
    { label: "Pelapor", className: "hidden px-4 py-3 md:table-cell" },
    { label: "Tanggal", className: "hidden px-4 py-3 lg:table-cell" },
    { label: "", className: "px-4 py-3" },
]

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

export default function RecentReportsTable({ reports }: Props) {
    return (
        <div
            className="overflow-hidden rounded-2xl"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            {/* Header bar */}
            <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid #F1EDE2" }}
            >
                <p className="text-[14px] font-bold" style={{ color: "#111827" }}>
                    Laporan Terbaru
                </p>
                <Link
                    href="/admin/laporan"
                    className="flex items-center gap-1 text-[12px] font-semibold hover:underline"
                    style={{ color: "#0F766E" }}
                >
                    Lihat semua <ArrowRight size={12} />
                </Link>
            </div>

            {reports.length === 0 ? <EmptyState /> : <ReportsTable reports={reports} />}
        </div>
    )
}

/* ── Empty state ── */
function EmptyState() {
    return (
        <div className="py-14 text-center">
            <div
                className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: "#CCFBF1", color: "#0F766E" }}
            >
                <Inbox size={28} />
            </div>
            <p className="text-[14px] font-semibold" style={{ color: "#374151" }}>
                Belum ada laporan masuk
            </p>
            <p className="mt-1 text-[12px]" style={{ color: "#9CA3AF" }}>
                Laporan dari warga akan muncul di sini
            </p>
        </div>
    )
}

/* ── Table ── */
function ReportsTable({ reports }: { reports: Report[] }) {
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
                        {TABLE_HEADERS.map((h, i) => (
                            <th key={i} className={h.className}>
                                {h.label}
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

/* ── Row ── */
type RowProps = {
    report: Report
    isLast: boolean
    isAlt: boolean
}

function ReportRow({ report: r, isLast, isAlt }: RowProps) {
    return (
        <tr
            className="group transition-colors"
            style={{
                borderBottom: !isLast ? "1px solid #F1EDE2" : undefined,
                background: isAlt ? "#F8F6F0" : "#FCFBF8",
            }}
        >
            {/* Title + description */}
            <td className="max-w-[200px] px-5 py-3.5">
                <p className="truncate font-bold" style={{ color: "#111827" }}>
                    {r.title}
                </p>
                <p
                    className="mt-0.5 truncate text-[11px]"
                    style={{ color: "#9CA3AF" }}
                >
                    {r.description}
                </p>
            </td>

            {/* Category */}
            <td className="hidden px-4 py-3.5 sm:table-cell">
                <span
                    className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{ background: "#CCFBF1", color: "#0F766E" }}
                >
                    {r.category}
                </span>
            </td>

            {/* Priority */}
            <td className="px-4 py-3.5">
                <PriorityBadge priority={r.priority} />
            </td>

            {/* Status */}
            <td className="px-4 py-3.5">
                <StatusBadge status={r.status} />
            </td>

            {/* Reporter */}
            <td className="hidden px-4 py-3.5 md:table-cell">
                <div className="flex items-center gap-2">
                    <div
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{
                            background: "linear-gradient(135deg, #0F766E, #14B8A6)",
                        }}
                    >
                        {r.name.charAt(0).toUpperCase()}
                    </div>
                    <span
                        className="max-w-[100px] truncate text-[12px]"
                        style={{ color: "#374151" }}
                    >
                        {r.name}
                    </span>
                </div>
            </td>

            {/* Date */}
            <td
                className="hidden whitespace-nowrap px-4 py-3.5 text-[12px] lg:table-cell"
                style={{ color: "#9CA3AF" }}
            >
                {formatDate(r.created_at)}
            </td>

            {/* Action */}
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