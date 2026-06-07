import { Trophy, AlertTriangle } from "lucide-react"
import { getUsers } from "@/lib/user.api"
import PointsLeaderboard from "@/components/admin/PointsLeaderboard"

export default async function AdminPointsPage() {
    let users: Awaited<ReturnType<typeof getUsers>> = []
    let error: string | null = null

    try {
        users = (await getUsers()).filter((u) => u.role === "user")
    } catch (e: any) {
        error = e?.response?.data?.message ?? e?.message ?? "Gagal memuat data"
    }

    return (
        <div className="w-full space-y-5">
            {/* Page header */}
            <div
                className="flex flex-col gap-1 rounded-2xl px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
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
                                "linear-gradient(135deg, #F59E0B, #EA580C)",
                            boxShadow: "0 4px 12px rgba(245,158,11,0.25)",
                        }}
                    >
                        <Trophy size={20} style={{ color: "#fff" }} />
                    </div>
                    <div>
                        <h1
                            className="text-[20px] font-extrabold tracking-tight"
                            style={{ color: "#111827" }}
                        >
                            Poin &amp; Reward
                        </h1>
                        <p
                            className="mt-0.5 text-[13px]"
                            style={{ color: "#6B7280" }}
                        >
                            Peringkat dan poin pengguna aktif
                        </p>
                    </div>
                </div>
            </div>

            {error ? (
                <div
                    className="flex flex-col items-center gap-3 rounded-2xl px-5 py-12 text-center"
                    style={{
                        background: "#FCFBF8",
                        border: "1px solid #FECACA",
                    }}
                >
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ background: "#FEE2E2", color: "#991B1B" }}
                    >
                        <AlertTriangle size={24} />
                    </div>
                    <p
                        className="text-[14px] font-semibold"
                        style={{ color: "#991B1B" }}
                    >
                        {error}
                    </p>
                    <p className="text-[12px]" style={{ color: "#6B7280" }}>
                        Hubungi superadmin untuk akses fitur ini
                    </p>
                </div>
            ) : (
                <PointsLeaderboard users={users} />
            )}
        </div>
    )
}