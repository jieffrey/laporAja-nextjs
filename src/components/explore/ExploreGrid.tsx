import { Compass, Search as SearchIcon } from "lucide-react"
import type { Report } from "@/lib/report.api"
import ExploreReportCard from "@/components/explore/ExploreReportCard"

type EnrichedReport = Report & {
    distance?: number
    comment_count?: number
}

type Props = {
    reports: EnrichedReport[]
    loading: boolean
    hasFilters: boolean
}

export default function ExploreGrid({ reports, loading, hasFilters }: Props) {
    if (loading) return <LoadingSkeleton />

    if (reports.length === 0) {
        return hasFilters ? <NoResultsState /> : <EmptyExploreState />
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((r) => (
                <ExploreReportCard key={r.id} report={r} />
            ))}
        </div>
    )
}

function LoadingSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="overflow-hidden rounded-2xl"
                    style={{
                        background: "#FCFBF8",
                        border: "1px solid #E8E4D9",
                    }}
                >
                    {/* Thumbnail skeleton */}
                    <div className="skeleton h-36 rounded-none" />

                    {/* Content skeleton */}
                    <div className="space-y-2.5 px-4 py-3">
                        <div className="skeleton h-4 w-4/5 rounded" />
                        <div className="skeleton h-3 w-full rounded" />
                        <div className="skeleton h-3 w-2/3 rounded" />
                        <div className="flex gap-2 pt-1">
                            <div className="skeleton h-5 w-16 rounded-full" />
                            <div className="skeleton h-5 w-12 rounded-full" />
                        </div>
                    </div>

                    {/* Footer skeleton */}
                    <div
                        className="flex items-center gap-2 px-4 py-2.5"
                        style={{ borderTop: "1px solid #F1EDE2" }}
                    >
                        <div className="skeleton h-6 w-6 rounded-full" />
                        <div className="skeleton h-3 w-20 rounded" />
                    </div>
                </div>
            ))}
        </div>
    )
}

function NoResultsState() {
    return (
        <div
            className="rounded-2xl py-16 text-center"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
            }}
        >
            <div
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: "#FEF3C7", color: "#F59E0B" }}
            >
                <SearchIcon size={24} />
            </div>
            <p
                className="text-[14px] font-bold"
                style={{ color: "#374151" }}
            >
                Tidak ada hasil
            </p>
            <p className="mt-1 text-[13px]" style={{ color: "#9CA3AF" }}>
                Coba ubah filter atau kata kunci pencarian
            </p>
        </div>
    )
}

function EmptyExploreState() {
    return (
        <div
            className="rounded-2xl py-16 text-center"
            style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
            }}
        >
            <div
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: "#CCFBF1", color: "#0F766E" }}
            >
                <Compass size={24} />
            </div>
            <p
                className="text-[14px] font-bold"
                style={{ color: "#374151" }}
            >
                Belum ada laporan
            </p>
            <p className="mt-1 text-[13px]" style={{ color: "#9CA3AF" }}>
                Laporan dari seluruh warga akan muncul di sini
            </p>
        </div>
    )
}