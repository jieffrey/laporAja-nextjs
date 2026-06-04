import { getReportById } from "@/lib/report.api";
import { getCommentsByReport } from "@/lib/comment.api";
import StatusBadge from "@/components/common-ui/StatusBadge";
import PriorityBadge from "@/components/common-ui/PriorityBadge";
import AdminStatusUpdater from "@/components/admin/AdminStatusUpdater";

type Props = { params: Promise<{ id: string }> };

export default async function AdminLaporanDetailPage({ params }: Props) {
  const { id } = await params;
  const [report, comments] = await Promise.all([
    getReportById(Number(id)),
    getCommentsByReport(Number(id)),
  ]);

  return (
    <div className="space-y-5 max-w-4xl">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-[12px] font-medium text-slate-400">#{report.id}</span>
            <StatusBadge status={report.status} />
            <PriorityBadge priority={report.priority} />
          </div>
          <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">{report.title}</h1>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap text-[12px] text-slate-400">
            <span>📂 {report.category}</span>
            <span>•</span>
            <span>👤 {report.name}</span>
            <span>•</span>
            <span>🕐 {new Date(report.created_at).toLocaleDateString("id-ID", { dateStyle: "long" })}</span>
          </div>
        </div>
        <a href="/admin/laporan" className="flex-shrink-0 text-[12px] text-slate-400 hover:text-slate-600 transition-colors whitespace-nowrap">
          ← Kembali
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">

        {/* Left — detail */}
        <div className="lg:col-span-2 space-y-5">

          {/* Description */}
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Deskripsi</p>
            <p className="text-[14px] text-slate-700 leading-relaxed">{report.description}</p>
          </div>

          {/* Images */}
          {(report.image_before || report.image_after) && (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Foto Bukti</p>
              <div className="grid grid-cols-2 gap-3">
                {report.image_before && (
                  <div>
                    <p className="text-[11px] font-medium text-slate-500 mb-1.5">Sebelum</p>
                    <img src={report.image_before} alt="Before" className="w-full rounded-xl object-cover aspect-video border border-slate-200" />
                  </div>
                )}
                {report.image_after && (
                  <div>
                    <p className="text-[11px] font-medium text-slate-500 mb-1.5">Sesudah</p>
                    <img src={report.image_after} alt="After" className="w-full rounded-xl object-cover aspect-video border border-slate-200" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Location */}
          {report.latitude && report.longitude && (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Lokasi</p>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
                <span className="text-lg">📍</span>
                <div>
                  <p className="text-[13px] font-medium text-slate-700">{report.latitude}, {report.longitude}</p>
                  <p className="text-[11px] text-slate-400">Koordinat GPS</p>
                </div>
              </div>
              {/* TODO: tambah LeafletMap dynamic import */}
            </div>
          )}

          {/* Comments */}
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Komentar ({comments.length})
            </p>
            {comments.length === 0 ? (
              <p className="text-[13px] text-slate-400 text-center py-4">Belum ada komentar</p>
            ) : (
              <div className="space-y-3">
                {comments.map((c, i) => (
                  <div key={`${c.id}-${i}`} className="flex gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-700">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 rounded-xl bg-slate-50 px-3 py-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[12px] font-semibold text-slate-700">{c.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {new Date(c.created_at).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                      <p className="text-[13px] text-slate-600">{c.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right — action panel */}
        <div className="space-y-4">
          <AdminStatusUpdater report={report} />
        </div>
      </div>

    </div>
  );
}