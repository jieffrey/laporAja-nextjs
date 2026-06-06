"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { MapPin, Locate, ArrowRight, Loader2 } from "lucide-react"
import type { Report } from "@/lib/report.api"
import StatusBadge from "@/components/common-ui/StatusBadge"

type Props = {
    reports: Report[]
}

type Coords = {
    lat: number
    lng: number
}

function getDistance(a: Coords, b: Coords): number {
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

function formatDistance(km: number): string {
    if (km < 1) return `${Math.round(km * 1000)}m`
    return `${km.toFixed(1)}km`
}

const STATUS_COLOR: Record<string, string> = {
    "Resolved": "#065F46",
    "In Progress": "#F59E0B",
    "Rejected": "#991B1B",
    "Pending": "#D1D5DB",
}

export default function NearbyReports({ reports }: Props) {
    const [userCoords, setUserCoords] = useState<Coords | null>(null)
    const [locating, setLocating] = useState(false)
    const [error, setError] = useState("")

    const requestLocation = () => {
        if (!navigator.geolocation) {
            setError("GPS tidak tersedia di perangkat ini")
            return
        }
        setLocating(true)
        setError("")
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setUserCoords({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                })
                setLocating(false)
            },
            () => {
                setError("Izin lokasi ditolak")
                setLocating(false)
            },
            { enableHighAccuracy: true, timeout: 10000 }
        )
    }

    useEffect(() => {
        requestLocation()
    }, [])

    const nearby = useMemo(() => {
        if (!userCoords) return []
        return reports
            .filter((r) => r.latitude && r.longitude)
            .map((r) => ({
                ...r,
                distance: getDistance(userCoords, {
                    lat: parseFloat(String(r.latitude)),
                    lng: parseFloat(String(r.longitude)),
                }),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 6)
    }, [reports, userCoords])

    return (
        <div
            className="overflow-hidden rounded-2xl"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid #F1EDE2" }}
            >
                <div className="flex items-center gap-2">
                    <div
                        className="flex h-7 w-7 items-center justify-center rounded-lg"
                        style={{ background: "#CCFBF1", color: "#0F766E" }}
                    >
                        <MapPin size={14} />
                    </div>
                    <p
                        className="text-[14px] font-bold"
                        style={{ color: "#111827" }}
                    >
                        Laporan Sekitar
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {userCoords && (
                        <Link
                            href="/user/peta"
                            className="flex items-center gap-1 text-[12px] font-semibold hover:underline"
                            style={{ color: "#0F766E" }}
                        >
                            Buka peta <ArrowRight size={12} />
                        </Link>
                    )}
                </div>
            </div>

            {/* Content */}
            {locating ? (
                <div className="flex items-center justify-center gap-2 py-12">
                    <Loader2
                        size={16}
                        className="animate-spin"
                        style={{ color: "#0F766E" }}
                    />
                    <p className="text-[13px]" style={{ color: "#6B7280" }}>
                        Mencari lokasimu...
                    </p>
                </div>
            ) : error ? (
                <div className="py-10 text-center">
                    <div
                        className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ background: "#FEF3C7", color: "#F59E0B" }}
                    >
                        <Locate size={22} />
                    </div>
                    <p
                        className="text-[13px] font-semibold"
                        style={{ color: "#374151" }}
                    >
                        {error}
                    </p>
                    <button
                        onClick={requestLocation}
                        className="mt-3 rounded-full px-4 py-1.5 text-[12px] font-bold text-white"
                        style={{
                            background:
                                "linear-gradient(135deg, #0F766E, #14B8A6)",
                        }}
                    >
                        Coba lagi
                    </button>
                </div>
            ) : nearby.length === 0 ? (
                <div className="py-10 text-center">
                    <p className="text-[13px]" style={{ color: "#9CA3AF" }}>
                        Belum ada laporan di sekitarmu
                    </p>
                </div>
            ) : (
                <div>
                    {nearby.map((r, idx) => (
                        <Link
                            key={r.id}
                            href={`/user/explore`}
                            className="group flex items-center gap-3 px-5 py-3 transition-colors"
                            style={{
                                borderBottom:
                                    idx < nearby.length - 1
                                        ? "1px solid #F1EDE2"
                                        : undefined,
                                background:
                                    idx % 2 !== 0 ? "#F8F6F0" : "#FCFBF8",
                            }}
                        >
                            {/* Status strip */}
                            <div
                                className="h-8 w-1 flex-shrink-0 rounded-full"
                                style={{
                                    background:
                                        STATUS_COLOR[r.status] ?? "#D1D5DB",
                                }}
                            />

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <p
                                    className="truncate text-[13px] font-bold"
                                    style={{ color: "#111827" }}
                                >
                                    {r.title}
                                </p>
                                <p
                                    className="mt-0.5 flex items-center gap-1.5 text-[11px]"
                                    style={{ color: "#9CA3AF" }}
                                >
                                    <MapPin size={10} />
                                    {formatDistance(r.distance)} ·{" "}
                                    {r.category}
                                </p>
                            </div>

                            <StatusBadge status={r.status} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}