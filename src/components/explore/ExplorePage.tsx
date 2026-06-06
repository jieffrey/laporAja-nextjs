"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { useSession } from "next-auth/react"
import { Compass } from "lucide-react"
import { getReports } from "@/lib/report.api"
import type { Report } from "@/lib/report.api"
import ExploreFilters, {
    type SortTab,
} from "@/components/explore/ExploreFilters"
import ExploreGrid from "@/components/explore/ExploreGrid"

type Coords = { lat: number; lng: number }

type EnrichedReport = Report & {
    distance?: number
    comment_count?: number
}

function haversine(a: Coords, b: Coords): number {
    const R = 6371
    const dLat = ((b.lat - a.lat) * Math.PI) / 180
    const dLng = ((b.lng - a.lng) * Math.PI) / 180
    const x =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((a.lat * Math.PI) / 180) *
        Math.cos((b.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
}

export default function ExplorePage() {
    const { status } = useSession()
    const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<SortTab>("terbaru")
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("Semua")
    const [userCoords, setUserCoords] = useState<Coords | null>(null)

    // Fetch reports
    useEffect(() => {
        if (status !== "authenticated") return
        getReports()
            .then(setReports)
            .finally(() => setLoading(false))
    }, [status])

    // Request GPS when switching to "terdekat"
    useEffect(() => {
        if (activeTab !== "terdekat" || userCoords) return
        if (!navigator.geolocation) return
        navigator.geolocation.getCurrentPosition(
            (pos) =>
                setUserCoords({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                }),
            () => { },
            { enableHighAccuracy: true, timeout: 10000 }
        )
    }, [activeTab, userCoords])

    // Enrich reports with distance
    const enriched: EnrichedReport[] = useMemo(
        () =>
            reports.map((r) => ({
                ...r,
                distance:
                    userCoords && r.latitude && r.longitude
                        ? haversine(userCoords, {
                            lat: parseFloat(String(r.latitude)),
                            lng: parseFloat(String(r.longitude)),
                        })
                        : undefined,
            })),
        [reports, userCoords]
    )

    // Filter
    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return enriched.filter(
            (r) =>
                (category === "Semua" || r.category === category) &&
                (r.title.toLowerCase().includes(q) ||
                    r.description.toLowerCase().includes(q) ||
                    r.name.toLowerCase().includes(q))
        )
    }, [enriched, search, category])

    // Sort
    const sorted = useMemo(() => {
        const arr = [...filtered]
        switch (activeTab) {
            case "terbaru":
                return arr.sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                )
            case "populer":
                return arr.sort(
                    (a, b) =>
                        (b.comment_count ?? 0) - (a.comment_count ?? 0)
                )
            case "terdekat":
                return arr
                    .filter((r) => r.distance !== undefined)
                    .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
            default:
                return arr
        }
    }, [filtered, activeTab])

    const hasFilters = search !== "" || category !== "Semua"

    return (
        <div className="space-y-5">
            {/* Header */}
            <div
                className="flex items-center justify-between rounded-2xl px-5 py-4"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                            background:
                                "linear-gradient(135deg, #14B8A6, #5EEAD4)",
                            color: "#fff",
                            boxShadow: "0 4px 12px rgba(20,184,166,0.25)",
                        }}
                    >
                        <Compass size={20} />
                    </div>
                    <div>
                        <h1
                            className="text-[20px] font-extrabold tracking-tight"
                            style={{ color: "#111827" }}
                        >
                            Jelajahi Laporan
                        </h1>
                        <p
                            className="mt-0.5 text-[13px]"
                            style={{ color: "#6B7280" }}
                        >
                            {reports.length} laporan dari seluruh warga
                        </p>
                    </div>
                </div>

                {/* Result count */}
                {!loading && hasFilters && (
                    <span
                        className="rounded-full px-3 py-1 text-[12px] font-bold"
                        style={{ background: "#F1EDE2", color: "#5F5E5A" }}
                    >
                        {sorted.length} hasil
                    </span>
                )}
            </div>

            {/* Filters */}
            <ExploreFilters
                activeTab={activeTab}
                onTabChange={setActiveTab}
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
            />

            {/* Grid */}
            <ExploreGrid
                reports={sorted}
                loading={loading}
                hasFilters={hasFilters}
            />
        </div>
    )
}