import Link from "next/link"
import {
    X,
    MapPin,
    Clock,
    MessageSquare,
    ArrowRight,
    Image as ImageIcon,
} from "lucide-react"
import type { Report } from "@/lib/report.api"
import StatusBadge from "@/components/common-ui/StatusBadge"
import PriorityBadge from "@/components/common-ui/PriorityBadge"

type Props = {
    report: Report
    nearbyReports: Report[]
    onClose: () => void
    onSelectReport: (r: Report) => void
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

export default function MapDetailPanel({
    report: r,
    nearbyReports,
    onClose,
    onSelectReport,
}: Props) {
    return (
        <div
            className="absolute bottom-0 right-0 top-0 z-[1000] flex w-[300px] flex-col overflow-hidden"
            style={{
                background: "#FCFBF8",
                borderLeft: "1px solid #E8E4D9",
                boxShadow: "-8px 0 32px rgba(15,118,110,0.10)",
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid #F1EDE2" }}
            >
                <p
                    className="text-[13px] font-bold"
                    style={{ color: "#111827" }}
                >
                    Detail Laporan
                </p>
                <button
                    onClick={onClose}
                    className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                    style={{ color: "#9CA3AF" }}
                >
                    <X size={16} />
                </button>
            </div>

            {/* Scrollable content */}
            <div
                className="flex-1 space-y-3 overflow-y-auto p-4"
                style={{ scrollbarWidth: "thin" }}
            >
                {/* Thumbnail */}
                <div
                    className="overflow-hidden rounded-xl"
                    style={{ border: "1px solid #E8E4D9" }}
                >
                    {r.image_before ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={r.image_before}
                            alt={r.title}
                            className="aspect-video w-full object-cover"
                        />
                    ) : (
                        <div
                            className="flex aspect-video items-center justify-center"
                            style={{
                                background:
                                    "linear-gradient(135deg, #CCFBF1, #F1EDE2, #FEF3C7)",
                            }}
                        >
                            <ImageIcon size={24} style={{ color: "#9CA3AF" }} />
                        </div>
                    )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                    <StatusBadge status={r.status} />
                    <PriorityBadge priority={r.priority} />
                </div>

                {/* Title + description */}
                <div>
                    <p
                        className="text-[14px] font-bold leading-snug"
                        style={{ color: "#111827" }}
                    >
                        {r.title}
                    </p>
                    <p
                        className="mt-1.5 line-clamp-3 text-[12px] leading-relaxed"
                        style={{ color: "#6B7280" }}
                    >
                        {r.description}
                    </p>
                </div>

                {/* Category chip */}
                <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{ background: "#CCFBF1", color: "#0F766E" }}
                >
                    {r.category}
                </span>

                {/* Meta info */}
                <div
                    className="space-y-2 rounded-xl px-3.5 py-3"
                    style={{
                        background: "#F8F6F0",
                        border: "1px solid #E8E4D9",
                    }}
                >
                    {[
                        {
                            icon: <MapPin size={12} />,
                            label: "Pelapor",
                            value: r.name,
                        },
                        {
                            icon: <Clock size={12} />,
                            label: "Tanggal",
                            value: formatDate(r.created_at),
                        },
                    ].map((m) => (
                        <div
                            key={m.label}
                            className="flex items-center justify-between gap-2 text-[11px]"
                        >
                            <span
                                className="flex items-center gap-1.5"
                                style={{ color: "#9CA3AF" }}
                            >
                                {m.icon} {m.label}
                            </span>
                            <span
                                className="truncate font-semibold"
                                style={{ color: "#374151" }}
                            >
                                {m.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    href={`/user/laporan/${r.id}`}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{
                        background:
                            "linear-gradient(135deg, #0F766E, #14B8A6)",
                        boxShadow: "0 4px 14px rgba(15,118,110,0.25)",
                    }}
                >
                    Lihat Detail <ArrowRight size={13} />
                </Link>

                {/* Nearby reports */}
                {nearbyReports.length > 0 && (
                    <div>
                        <p
                            className="mb-2 text-[11px] font-bold uppercase tracking-widest"
                            style={{ color: "#9CA3AF" }}
                        >
                            Laporan lain di sekitar
                        </p>
                        <div className="space-y-1.5">
                            {nearbyReports.map((nr) => (
                                <button
                                    key={nr.id}
                                    onClick={() => onSelectReport(nr)}
                                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors"
                                    style={{
                                        background: "#FCFBF8",
                                        border: "1px solid #E8E4D9",
                                    }}
                                >
                                    <span
                                        className="h-2 w-2 flex-shrink-0 rounded-full"
                                        style={{
                                            background:
                                                nr.status === "Resolved"
                                                    ? "#065F46"
                                                    : nr.status === "In Progress"
                                                        ? "#F59E0B"
                                                        : "#D1D5DB",
                                        }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="truncate text-[11px] font-semibold"
                                            style={{ color: "#111827" }}
                                        >
                                            {nr.title}
                                        </p>
                                        <p
                                            className="text-[10px]"
                                            style={{ color: "#9CA3AF" }}
                                        >
                                            {nr.category}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}