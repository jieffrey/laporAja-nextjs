import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getReportById } from "@/lib/report.api"
import { getCommentsByReport } from "@/lib/comment.api"
import ReportHeader from "@/components/admin/report-detail/ReportHeader"
import ReportDescription from "@/components/admin/report-detail/ReportDescription"
import ReportImages from "@/components/admin/report-detail/ReportImages"
import ReportLocation from "@/components/admin/report-detail/ReportLocation"
// import ReportComments from "@/components/admin/report-detail/ReportComments"
import CommentSection from "@/components/comment/CommentSection"
import AdminStatusUpdater from "@/components/admin/AdminStatusUpdater"
import DeleteReportButton from "@/components/admin/DeleteReportButton"

type Props = {
    params: Promise<{ id: string }>
}

export default async function AdminLaporanDetailPage({ params }: Props) {
    const { id } = await params
    const [report, comments] = await Promise.all([
        getReportById(Number(id)),
        getCommentsByReport(Number(id)),
    ])
    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === "admin"

    return (
        <div className="w-full space-y-5">
            <ReportHeader report={report} />

            <div className="grid gap-5 lg:grid-cols-3">
                {/* Left — detail sections */}
                <div className="space-y-5 lg:col-span-2">
                    <ReportDescription description={report.description} />

                    {/* cast props to any to satisfy differing prop types between pages */}
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

                {/* Right — action panel */}
                <div className="space-y-4">
                    {isAdmin && <AdminStatusUpdater report={report} />}
                    {isAdmin && <DeleteReportButton reportId={report.id} />}
                </div>
            </div>
        </div>
    )
}