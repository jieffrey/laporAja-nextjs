import Link from "next/link"
import { ArrowLeft, Folder, Clock } from "lucide-react"
import { getReportById } from "@/lib/report.api"
import { getCommentsByReport } from "@/lib/comment.api"
import StatusBadge from "@/components/common-ui/StatusBadge"
import PriorityBadge from "@/components/common-ui/PriorityBadge"
import ReportDescription from "@/components/admin/report-detail/ReportDescription"
import ReportImages from "@/components/admin/report-detail/ReportImages"
import ReportLocation from "@/components/admin/report-detail/ReportLocation"
import CommentSection from "@/components/comment/CommentSection"

type Props = {
    params: Promise<{ id: string }>
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", { dateStyle: "long" })

export default async function UserReportDetailPage({ params }: Props) {
    const { id } = await params
    const [report, comments] = await Promise.all([
        getReportById(Number(id)),
        getCommentsByReport(Number(id)),
    ])

    return (
        <div className="w-full space-y-5">
            {/* Header */}
            <div
                className="rounded-2xl px-5 py-4"
                style={{
                    background: "#FCFBF8",
                    border: "1px solid #E8E4D9",
                    boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
                }}
            >
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className="rounded-md px-2 py-0.5 text-[11px] font-bold"
                            style={{ background: "#F1EDE2", color: "#5F5E5A" }}
                        >
                            #{report.id}
                        </span>
                        <StatusBadge status={report.status} />
                        <PriorityBadge priority={report.priority} />
                    </div>
                    <Link
                        href="/user/laporan"
                        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all"
                        style={{
                            background: "#F8F6F0",
                            border: "1px solid #E8E4D9",
                            color: "#0F766E",
                        }}
                    >
                        <ArrowLeft size={12} /> Kembali
                    </Link>
                </div>

                <h1
                    className="text-[20px] font-extrabold tracking-tight"
                    style={{ color: "#111827" }}
                >
                    {report.title}
                </h1>

                <div
                    className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]"
                    style={{ color: "#9CA3AF" }}
                >
                    <span className="flex items-center gap-1">
                        <Folder size={12} /> {report.category}
                    </span>
                    <span style={{ color: "#D1D5DB" }}>·</span>
                    <span className="flex items-center gap-1">
                        <Clock size={12} /> {formatDate(report.created_at)}
                    </span>
                </div>
            </div>

            {/* Content sections */}
            <ReportDescription description={report.description} />

            <ReportImages {...({ 
                images: report.images, 
                imageBefore: report.image_before, 
                imageAfter: report.image_after 
                })} />

            <ReportLocation
                latitude={report.latitude}
                longitude={report.longitude}
            />

            <CommentSection reportId={Number(id)} initialComments={comments} />
        </div>
    )
}