"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Report, ReportStatus, ReportPriority } from "@/lib/report.api";
import { REPORT_STATUS, REPORT_PRIORITY } from "@/lib/constant";
import { updateReportStatus } from "@/lib/report.api"
import StatusBadge from "@/components/common-ui/StatusBadge";
import PriorityBadge from "@/components/common-ui/PriorityBadge";

type Props = { report: Report };

export default function AdminStatusUpdater({ report }: Props) {
  const router = useRouter();
  const [status,   setStatus]   = useState<ReportStatus>(report.status);
  const [priority, setPriority] = useState<ReportPriority>(report.priority);
  const [loading,  setLoading]  = useState(false);
  const [saved,    setSaved]    = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      await updateReportStatus(report.id, { status, priority });
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const hasChanged = status !== report.status || priority !== report.priority;

  return (
    <div className="space-y-4">

      {/* Status card */}
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-4">Update Status</p>

        <div className="space-y-2">
          {(Object.keys(REPORT_STATUS) as ReportStatus[]).map(s => {
            const cfg    = REPORT_STATUS[s];
            const active = status === s;
            return (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition-all border
                  ${active
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-white"
                  }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: cfg.dot }} />
                {cfg.label}
                {active && <span className="ml-auto text-blue-400">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Priority card */}
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-4">Priority</p>
        <div className="flex gap-2">
          {(Object.keys(REPORT_PRIORITY) as ReportPriority[]).map(p => {
            const active = priority === p;
            return (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 rounded-xl py-2 text-[12px] font-semibold transition-all border
                  ${active
                    ? REPORT_PRIORITY[p].tw + " border-transparent"
                    : "border-slate-100 bg-slate-50 text-slate-500 hover:bg-white"
                  }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={loading || !hasChanged}
        className={`w-full rounded-xl py-3 text-[14px] font-bold transition-all
          ${hasChanged
            ? "bg-blue-600 text-white shadow-sm shadow-blue-200 hover:bg-blue-700 active:scale-[0.98]"
            : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Menyimpan...
          </span>
        ) : saved ? (
          "✓ Tersimpan!"
        ) : (
          "Simpan Perubahan"
        )}
      </button>

      {/* Info */}
      <div className="rounded-xl bg-slate-50 px-4 py-3 space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Info Laporan</p>
        <div className="flex justify-between text-[12px]">
          <span className="text-slate-500">Pelapor</span>
          <span className="font-medium text-slate-700">{report.name}</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-slate-500">Kategori</span>
          <span className="font-medium text-slate-700">{report.category}</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-slate-500">Dibuat</span>
          <span className="font-medium text-slate-700">
            {new Date(report.created_at).toLocaleDateString("id-ID")}
          </span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-slate-500">Diperbarui</span>
          <span className="font-medium text-slate-700">
            {new Date(report.updated_at).toLocaleDateString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}