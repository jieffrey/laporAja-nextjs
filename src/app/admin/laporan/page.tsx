import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ClipboardList, Search } from "lucide-react"
import { getReports } from "@/lib/report.api"
import AdminReportsList from "@/components/admin/AdminReportsList"
import EmptyState from "@/components/common-ui/Emptystate"

export default async function AdminLaporanPage() {
    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === "admin"
    const reports = await getReports()

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
                        style={{ background: "#CCFBF1", color: "#0F766E" }}
                    >
                        <ClipboardList size={20} />
                    </div>
                    <div>
                        <h1
                            className="text-[20px] font-extrabold tracking-tight"
                            style={{ color: "#111827" }}
                        >
                            Kelola Laporan
                        </h1>
                        <p className="mt-0.5 text-[13px]" style={{ color: "#6B7280" }}>
                            {reports.length} total laporan masuk
                        </p>
                    </div>
                </div>
            </div>
            <AdminReportsList reports={reports} isAdmin={isAdmin} />
        </div>
    )
}