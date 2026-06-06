import { Search } from "lucide-react"
import { REPORT_CATEGORIES } from "@/lib/constant"

type Props = {
    search: string
    onSearchChange: (v: string) => void
    category: string
    onCategoryChange: (v: string) => void
    totalCount: number
}

const CATEGORY_COLORS: Record<string, string> = {
    Semua: "#0F766E",
    Infrastruktur: "#EA580C",
    Lingkungan: "#0F766E",
    Kebersihan: "#F59E0B",
    Keamanan: "#991B1B",
    "Fasilitas Umum": "#14B8A6",
    Lainnya: "#5F5E5A",
}

export default function MapFilters({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    totalCount,
}: Props) {
    return (
        <div className="absolute left-3 right-3 top-3 z-[1000] flex flex-wrap items-start gap-2">
            {/* Search bar */}
            <div
                className="flex min-w-[200px] flex-1 items-center gap-2 rounded-xl px-3 py-2.5 sm:max-w-[280px]"
                style={{
                    background: "rgba(252,251,248,0.95)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 4px 16px rgba(15,118,110,0.10)",
                }}
            >
                <Search size={14} style={{ color: "#9CA3AF" }} />
                <input
                    type="text"
                    placeholder="Cari laporan..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-transparent text-[13px] outline-none"
                    style={{ color: "#374151" }}
                />
                {totalCount > 0 && (
                    <span
                        className="flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{ background: "#CCFBF1", color: "#0F766E" }}
                    >
                        {totalCount}
                    </span>
                )}
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-1.5">
                {["Semua", ...REPORT_CATEGORIES].map((c) => {
                    const active = category === c
                    const dotColor = CATEGORY_COLORS[c] ?? "#9CA3AF"
                    return (
                        <button
                            key={c}
                            onClick={() => onCategoryChange(c)}
                            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all"
                            style={{
                                background: active
                                    ? "#0F766E"
                                    : "rgba(252,251,248,0.95)",
                                color: active ? "#fff" : "#374151",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                border: active
                                    ? "1px solid #0F766E"
                                    : "1px solid #E8E4D9",
                                boxShadow: "0 2px 8px rgba(15,118,110,0.06)",
                            }}
                        >
                            {!active && (
                                <span
                                    className="h-2 w-2 rounded-full"
                                    style={{ background: dotColor }}
                                />
                            )}
                            {c}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}