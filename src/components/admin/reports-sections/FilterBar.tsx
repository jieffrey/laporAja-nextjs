import { Search } from "lucide-react"
import { REPORT_CATEGORIES } from "@/lib/constant"

const STATUS_OPTIONS = ["Semua", "Pending", "In Progress", "Resolved", "Rejected"] as const
const PRIORITY_OPTIONS = ["Semua", "Low", "Medium", "High"] as const

type Props = {
    search: string
    statusFilter: string
    priorityFilter: string
    categoryFilter: string
    onSearchChange: (v: string) => void
    onStatusChange: (v: string) => void
    onPriorityChange: (v: string) => void
    onCategoryChange: (v: string) => void
    filteredCount: number
    totalCount: number
}

const inputStyle = {
    background: "#F8F6F0",
    border: "1px solid #E8E4D9",
    color: "#374151",
}

export default function FilterBar({
    search,
    statusFilter,
    priorityFilter,
    categoryFilter,
    onSearchChange,
    onStatusChange,
    onPriorityChange,
    onCategoryChange,
    filteredCount,
    totalCount,
}: Props) {
    const isFiltered = filteredCount !== totalCount

    return (
        <div
            className="rounded-2xl px-4 py-3"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            <div className="flex flex-wrap gap-3">
                {/* Search */}
                <div className="relative min-w-[200px] flex-1">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#9CA3AF" }}
                    />
                    <input
                        type="text"
                        placeholder="Cari judul atau pelapor..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-xl py-2 pl-9 pr-3 text-[13px] outline-none transition-all focus:bg-white"
                        style={inputStyle}
                    />
                </div>

                {/* Status */}
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="cursor-pointer rounded-xl px-3 py-2 text-[13px] outline-none"
                    style={inputStyle}
                >
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>

                {/* Priority */}
                <select
                    value={priorityFilter}
                    onChange={(e) => onPriorityChange(e.target.value)}
                    className="cursor-pointer rounded-xl px-3 py-2 text-[13px] outline-none"
                    style={inputStyle}
                >
                    {PRIORITY_OPTIONS.map((p) => (
                        <option key={p}>{p}</option>
                    ))}
                </select>

                {/* Category */}
                <select
                    value={categoryFilter}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="cursor-pointer rounded-xl px-3 py-2 text-[13px] outline-none"
                    style={inputStyle}
                >
                    <option>Semua</option>
                    {REPORT_CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Active filter indicator */}
            {isFiltered && (
                <p className="mt-2 text-[12px]" style={{ color: "#9CA3AF" }}>
                    Menampilkan{" "}
                    <span className="font-bold" style={{ color: "#0F766E" }}>
                        {filteredCount}
                    </span>{" "}
                    dari {totalCount} laporan
                </p>
            )}
        </div>
    )
}