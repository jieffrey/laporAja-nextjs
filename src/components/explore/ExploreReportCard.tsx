import Link from "next/link"
import { MapPin, Clock, MessageSquare, Image as ImageIcon } from "lucide-react"
import type { Report } from "@/lib/report.api"
import StatusBadge from "@/components/common-ui/StatusBadge"
import PriorityBadge from "@/components/common-ui/PriorityBadge"

type Props = {
    report: Report & { distance?: number; comment_count?: number }
}

function formatDistance(km: number): string {
    if (km < 1) return `${Math.round(km * 1000)}m`
    return `${km.toFixed(1)}km`
}

function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60_000)
    if (mins < 1) return "Baru saja"
    if (mins < 60) return `${mins}m lalu`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}j lalu`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days}h lalu`
    return new Date(iso).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
    })
}

export default function ExploreReportCard({ report: r }: Props) {
    return (
        <Link
            href={`/user/laporan/${r.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            {/* Thumbnail */}
            <div
                className="relative h-36 overflow-hidden"
                style={{ background: "#F1EDE2" }}
            >
                {r.image_before ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={r.image_before}
                        alt={r.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div
                        className="flex h-full w-full items-center justify-center"
                        style={{
                            background:
                                "linear-gradient(135deg, #CCFBF1 0%, #F1EDE2 50%, #FEF3C7 100%)",
                        }}
                    >
                        <ImageIcon size={28} style={{ color: "#9CA3AF" }} />
                    </div>
                )}

                {/* Top badges overlay */}
                <div className="absolute left-2.5 top-2.5 flex gap-1.5">
                    <StatusBadge status={r.status} showDot={false} />
                </div>

                {/* Distance chip */}
                {r.distance !== undefined && (
                    <div
                        className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{
                            background: "rgba(252,251,248,0.92)",
                            backdropFilter: "blur(4px)",
                            color: "#0F766E",
                        }}
                    >
                        <MapPin size={9} />
                        {formatDistance(r.distance)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col px-4 py-3">
                {/* Title */}
                <p
                    className="line-clamp-2 text-[14px] font-bold leading-snug"
                    style={{ color: "#111827" }}
                >
                    {r.title}
                </p>

                {/* Description snippet */}
                <p
                    className="mt-1 line-clamp-2 text-[12px] leading-relaxed"
                    style={{ color: "#9CA3AF" }}
                >
                    {r.description}
                </p>

                {/* Meta row */}
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                    {/* Category */}
                    <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{ background: "#CCFBF1", color: "#0F766E" }}
                    >
                        {r.category}
                    </span>

                    <PriorityBadge priority={r.priority} />

                    <div className="flex-1" />

                    {/* Time */}
                    <span
                        className="flex items-center gap-1 text-[10px]"
                        style={{ color: "#9CA3AF" }}
                    >
                        <Clock size={10} />
                        {timeAgo(r.created_at)}
                    </span>

                    {/* Comment count */}
                    {r.comment_count !== undefined && r.comment_count > 0 && (
                        <span
                            className="flex items-center gap-1 text-[10px]"
                            style={{ color: "#9CA3AF" }}
                        >
                            <MessageSquare size={10} />
                            {r.comment_count}
                        </span>
                    )}
                </div>
            </div>

            {/* Reporter row */}
            <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                    borderTop: "1px solid #F1EDE2",
                    background: "#F8F6F0",
                }}
            >
                <div
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{
                        background:
                            "linear-gradient(135deg, #0F766E, #14B8A6)",
                    }}
                >
                    {r.name?.charAt(0).toUpperCase() ?? "?"}
                </div>
                <span
                    className="truncate text-[11px] font-medium"
                    style={{ color: "#374151" }}
                >
                    {r.name}
                </span>
            </div>
        </Link>
    )
}