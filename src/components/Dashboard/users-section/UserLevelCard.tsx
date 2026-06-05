import { Trophy, ClipboardList, Loader, Flame } from "lucide-react"
import { POINTS_CONFIG } from "@/lib/constant"

type Props = {
    points: number
}

type Level = {
    label: string
    stars: number
    next: number
}

function getLevel(points: number): Level {
    if (points >= 500) return { label: "Warga Aktif", stars: 3, next: 1000 }
    if (points >= 200) return { label: "Kontributor", stars: 2, next: 500 }
    if (points >= 50) return { label: "Pemula", stars: 1, next: 200 }
    return { label: "Baru", stars: 0, next: 50 }
}

const POINT_RULES = [
    {
        icon: <ClipboardList size={14} />,
        label: "Buat laporan",
        key: "CREATE_REPORT" as const,
        color: "#0F766E",
    },
    {
        icon: <Loader size={14} />,
        label: "Laporan diproses",
        key: "IN_PROGRESS" as const,
        color: "#F59E0B",
    },
    {
        icon: <Flame size={14} />,
        label: "Laporan selesai",
        key: "RESOLVED" as const,
        color: "#EA580C",
    },
]

export default function UserLevelCard({ points }: Props) {
    const level = getLevel(points)
    const pct = Math.min(Math.round((points / level.next) * 100), 100)

    return (
        <div
            className="overflow-hidden rounded-2xl"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            {/* Level header */}
            <div className="px-5 pt-4 pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className="flex h-8 w-8 items-center justify-center rounded-xl"
                            style={{
                                background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                                boxShadow: "0 4px 10px rgba(245,158,11,0.25)",
                            }}
                        >
                            <Trophy size={15} style={{ color: "#fff" }} />
                        </div>
                        <div>
                            <p
                                className="text-[14px] font-bold"
                                style={{ color: "#111827" }}
                            >
                                Level: {level.label}
                            </p>
                            <p className="text-[11px]" style={{ color: "#F59E0B" }}>
                                {"★".repeat(level.stars)}
                                {"☆".repeat(3 - level.stars)}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p
                            className="text-[18px] font-extrabold"
                            style={{ color: "#F59E0B" }}
                        >
                            {points.toLocaleString("id-ID")}
                        </p>
                        <p className="text-[10px]" style={{ color: "#9CA3AF" }}>
                            poin
                        </p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                    <div className="mb-1 flex justify-between text-[10px]">
                        <span style={{ color: "#6B7280" }}>
                            Progress ke level berikutnya
                        </span>
                        <span
                            className="font-bold"
                            style={{ color: "#0F766E" }}
                        >
                            {pct}%
                        </span>
                    </div>
                    <div
                        className="h-2 w-full rounded-full"
                        style={{ background: "#E8E4D9" }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                                width: `${pct}%`,
                                background:
                                    "linear-gradient(90deg, #F59E0B, #EA580C)",
                                boxShadow:
                                    pct > 10
                                        ? "0 2px 6px rgba(245,158,11,0.30)"
                                        : "none",
                            }}
                        />
                    </div>
                    <p
                        className="mt-1 text-[10px]"
                        style={{ color: "#9CA3AF" }}
                    >
                        {points} / {level.next} poin
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #F1EDE2" }} />

            {/* Point rules */}
            <div className="px-5 py-3">
                <p
                    className="mb-2.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "#9CA3AF" }}
                >
                    Cara dapat poin
                </p>
                <div className="flex flex-wrap gap-2">
                    {POINT_RULES.map((p) => (
                        <div
                            key={p.label}
                            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                            style={{
                                background: "#F8F6F0",
                                border: "1px solid #E8E4D9",
                            }}
                        >
                            <span style={{ color: p.color }}>{p.icon}</span>
                            <span
                                className="text-[11px] font-bold"
                                style={{ color: p.color }}
                            >
                                +{POINTS_CONFIG[p.key]}
                            </span>
                            <span
                                className="text-[11px]"
                                style={{ color: "#6B7280" }}
                            >
                                {p.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}