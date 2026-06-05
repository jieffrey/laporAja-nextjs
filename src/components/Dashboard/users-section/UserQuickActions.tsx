import Link from "next/link"
import { PlusCircle, List, ArrowRight } from "lucide-react"

type Props = {
    totalReports: number
    resolvedReports: number
}

export default function UserQuickActions({
    totalReports,
    resolvedReports,
}: Props) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {/* Primary CTA — Buat Laporan */}
            <Link
                href="/user/laporan/buat"
                className="group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-1"
                style={{
                    background:
                        "linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)",
                    boxShadow: "0 8px 24px rgba(15,118,110,0.25)",
                }}
            >
                <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{
                        background: "rgba(255,255,255,0.20)",
                    }}
                >
                    <PlusCircle size={22} style={{ color: "#fff" }} />
                </div>
                <div>
                    <p className="text-[14px] font-bold text-white">
                        Buat Laporan Baru
                    </p>
                    <p
                        className="text-[12px]"
                        style={{ color: "rgba(255,255,255,0.80)" }}
                    >
                        Laporkan masalah di sekitarmu
                    </p>
                </div>
                <ArrowRight
                    size={16}
                    className="ml-auto flex-shrink-0 transition-transform group-hover:translate-x-1"
                    style={{ color: "rgba(255,255,255,0.80)" }}
                />
            </Link>

            {/* Secondary — Lihat Laporan */}
            <Link
                href="/user/laporan"
                className="group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "#CCFBF1", color: "#0F766E" }}
                >
                    <List size={20} />
                </div>
                <div>
                    <p
                        className="text-[14px] font-bold"
                        style={{ color: "#111827" }}
                    >
                        Lihat Laporan Saya
                    </p>
                    <p className="text-[12px]" style={{ color: "#9CA3AF" }}>
                        {totalReports} laporan · {resolvedReports} selesai
                    </p>
                </div>
                <ArrowRight
                    size={16}
                    className="ml-auto flex-shrink-0 transition-transform group-hover:translate-x-1"
                    style={{ color: "#0F766E" }}
                />
            </Link>
        </div>
    )
}