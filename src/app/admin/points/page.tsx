import { Trophy } from "lucide-react"
import { getUsers } from "@/lib/user.api"
import PointsLeaderboard from "@/components/admin/PointsLeaderboard"

export default async function AdminPointsPage() {
    const users = (await getUsers()).filter((u) => u.role === "user")

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

            <PointsLeaderboard users={users} />
        </div>
    )
}