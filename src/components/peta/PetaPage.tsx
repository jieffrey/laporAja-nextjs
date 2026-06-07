"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { useSession } from "next-auth/react"
import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Tooltip,
    useMap,
} from "react-leaflet"
import { Locate } from "lucide-react"
import "leaflet/dist/leaflet.css"
import { getReports } from "@/lib/report.api"
import type { Report } from "@/lib/report.api"
import MapFilters from "@/components/peta/MapFilters"
import MapDetailPanel from "@/components/peta/MapDetailPanel"

// Category → pin color
const CAT_COLOR: Record<string, string> = {
    Infrastruktur: "#EA580C",
    Lingkungan: "#0F766E",
    Kebersihan: "#F59E0B",
    Keamanan: "#991B1B",
    "Fasilitas Umum": "#14B8A6",
    Lainnya: "#5F5E5A",
}

const DEFAULT_CENTER: [number, number] = [-6.4, 106.816666]

function getColor(category: string): string {
    return CAT_COLOR[category] ?? "#9CA3AF"
}

function haversine(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
): number {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLng / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Sub-component: fly to location
function FlyTo({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap()
    useEffect(() => {
        map.flyTo([lat, lng], 15, { duration: 0.8 })
    }, [map, lat, lng])
    return null
}

// Sub-component: locate me button
function LocateButton() {
    const map = useMap()

    const handleLocate = () => {
        if (!navigator.geolocation) return
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                map.flyTo(
                    [pos.coords.latitude, pos.coords.longitude],
                    15,
                    { duration: 0.8 }
                )
            },
            () => {},
            { enableHighAccuracy: true, timeout: 10000 }
        )
    }

    return (
        <button
            onClick={handleLocate}
            className="absolute bottom-3 left-3 z-[1000] flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-105"
            style={{
                background: "rgba(252,251,248,0.95)",
                backdropFilter: "blur(8px)",
                border: "1px solid #E8E4D9",
                boxShadow: "0 2px 8px rgba(15,118,110,0.10)",
                color: "#0F766E",
            }}
            aria-label="Lokasi saya"
        >
            <Locate size={16} />
        </button>
    )
}

export default function PetaPage() {
    const { status } = useSession()
    const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("Semua")
    const [selected, setSelected] = useState<Report | null>(null)

    useEffect(() => {
        if (status !== "authenticated") return
        const fetchReports = async () => {
            try {
                const data = await getReports()
                setReports(data)
            } catch (e) {
                console.warn(e)
            }

            setLoading(false)
        }

        void fetchReports()
    }, [status])

    // Reports with valid coords
    const geoReports = useMemo(
        () => reports.filter((r) => r.latitude && r.longitude),
        [reports]
    )

    // Filtered
    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return geoReports.filter(
            (r) =>
                (category === "Semua" || r.category === category) &&
                (r.title.toLowerCase().includes(q) ||
                    r.name.toLowerCase().includes(q))
        )
    }, [geoReports, search, category])

    // Nearby to selected
    const nearbyToSelected = useMemo(() => {
        if (!selected || !selected.latitude || !selected.longitude) return []
        const sLat = parseFloat(String(selected.latitude))
        const sLng = parseFloat(String(selected.longitude))
        return filtered
            .filter((r) => r.id !== selected.id)
            .map((r) => ({
                ...r,
                dist: haversine(
                    sLat,
                    sLng,
                    parseFloat(String(r.latitude)),
                    parseFloat(String(r.longitude))
                ),
            }))
            .sort((a, b) => a.dist - b.dist)
            .slice(0, 4)
    }, [selected, filtered])

    const handleSelect = useCallback((r: Report) => {
        setSelected(r)
    }, [])

    if (loading) {
        return (
            <div
                className="flex h-[calc(100vh-56px)] items-center justify-center"
                style={{ background: "#F8F6F0" }}
            >
                <div
                    className="h-8 w-8 animate-spin rounded-full"
                    style={{
                        border: "3px solid #CCFBF1",
                        borderTopColor: "#0F766E",
                    }}
                />
            </div>
        )
    }

    return (
        <div
            className="relative overflow-hidden"
            style={{
                height: "calc(100vh - 56px)",
                borderRadius: "16px",
                border: "1px solid #E8E4D9",
            }}
        >
            {/* Filters overlay */}
            <MapFilters
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                totalCount={filtered.length}
            />

            {/* Map */}
            <MapContainer
                center={DEFAULT_CENTER}
                zoom={12}
                className="h-full w-full"
                scrollWheelZoom
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                <LocateButton />

                {/* Fly to selected */}
                {selected && selected.latitude && selected.longitude && (
                    <FlyTo
                        lat={parseFloat(String(selected.latitude))}
                        lng={parseFloat(String(selected.longitude))}
                    />
                )}

                {/* Pins */}
                {filtered.map((r) => {
                    const lat = parseFloat(String(r.latitude))
                    const lng = parseFloat(String(r.longitude))
                    const color = getColor(r.category)
                    const isSelected = selected?.id === r.id

                    return (
                        <CircleMarker
                            key={r.id}
                            center={[lat, lng]}
                            radius={isSelected ? 10 : 7}
                            pathOptions={{
                                color: "#FCFBF8",
                                weight: 2,
                                fillColor: color,
                                fillOpacity: isSelected ? 1 : 0.85,
                            }}
                            eventHandlers={{
                                click: () => handleSelect(r),
                            }}
                        >
                            <Tooltip direction="top" offset={[0, -10]}>
                                <div style={{ maxWidth: 180 }}>
                                    <p
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: "#111827",
                                            marginBottom: 2,
                                        }}
                                    >
                                        {r.title}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 11,
                                            color: "#6B7280",
                                        }}
                                    >
                                        {r.category} · {r.name}
                                    </p>
                                </div>
                            </Tooltip>
                        </CircleMarker>
                    )
                })}
            </MapContainer>

            {/* Detail panel */}
            {selected && (
                <MapDetailPanel
                    report={selected}
                    nearbyReports={nearbyToSelected}
                    onClose={() => setSelected(null)}
                    onSelectReport={handleSelect}
                />
            )}
        </div>
    )
}