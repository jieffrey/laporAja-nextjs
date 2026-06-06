"use client"

import { Search } from "lucide-react"
import { REPORT_CATEGORIES } from "@/lib/constant"

export type SortTab = "terbaru" | "populer" | "terdekat"

type Props = {
    activeTab: SortTab
    onTabChange: (tab: SortTab) => void
    search: string
    onSearchChange: (v: string) => void
    category: string
    onCategoryChange: (v: string) => void
}

const TABS: { key: SortTab; label: string }[] = [
    { key: "terbaru", label: "Terbaru" },
    { key: "populer", label: "Populer" },
    { key: "terdekat", label: "Terdekat" },
]

export default function ExploreFilters({
    activeTab,
    onTabChange,
    search,
    onSearchChange,
    category,
    onCategoryChange,
}: Props) {
    return (
        <div className="space-y-3">
            {/* Search + Tabs row */}
            <div
                className="flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                {/* Search */}
                <div className="relative min-w-[180px] flex-1">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#9CA3AF" }}
                    />
                    <input
                        type="text"
                        placeholder="Cari laporan..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-xl py-2 pl-9 pr-3 text-[13px] outline-none transition-all focus:bg-white"
                        style={{
                            background: "#F8F6F0",
                            border: "1px solid #E8E4D9",
                            color: "#374151",
                        }}
                    />
                </div>

                {/* Tabs */}
                <div
                    className="flex gap-1 rounded-xl p-1"
                    style={{ background: "#F1EDE2" }}
                >
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => onTabChange(tab.key)}
                            className="rounded-lg px-3.5 py-1.5 text-[12px] font-bold transition-all"
                            style={
                                activeTab === tab.key
                                    ? {
                                        background: "#fff",
                                        color: "#0F766E",
                                        boxShadow:
                                            "0 1px 3px rgba(15,118,110,0.10)",
                                    }
                                    : {
                                        background: "transparent",
                                        color: "#6B7280",
                                    }
                            }
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category chips — horizontal scroll */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                <CategoryChip
                    label="Semua"
                    active={category === "Semua"}
                    onClick={() => onCategoryChange("Semua")}
                />
                {REPORT_CATEGORIES.map((c) => (
                    <CategoryChip
                        key={c}
                        label={c}
                        active={category === c}
                        onClick={() => onCategoryChange(c)}
                    />
                ))}
            </div>
        </div>
    )
}

function CategoryChip({
    label,
    active,
    onClick,
}: {
    label: string
    active: boolean
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="flex-shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all"
            style={
                active
                    ? {
                        background: "#0F766E",
                        color: "#fff",
                    }
                    : {
                        background: "#FCFBF8",
                        color: "#6B7280",
                        border: "1px solid #E8E4D9",
                    }
            }
        >
            {label}
        </button>
    )
}