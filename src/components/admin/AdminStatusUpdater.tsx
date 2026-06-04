"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RiCheckLine, RiLoader4Line } from "react-icons/ri"
import type { Report, ReportStatus, ReportPriority } from "@/lib/report.api"
import { REPORT_STATUS, REPORT_PRIORITY } from "@/lib/constant"
import { updateReportStatus } from "@/lib/report.api"

type Props = { report: Report; onUpdate?: (r: Report) => void }

export default function AdminStatusUpdater({ report, onUpdate }: Props) {
  const router = useRouter()
  const [status,   setStatus]   = useState<ReportStatus>(report.status)
  const [priority, setPriority] = useState<ReportPriority>(report.priority)
  const [loading,  setLoading]  = useState(false)
  const [saved,    setSaved]    = useState(false)

  const hasChanged = status !== report.status || priority !== report.priority

  const handleSave = async () => {
    setLoading(true)
    try {
      // kirim status DAN priority sekaligus ke endpoint /reports/:id/status
      const updated = await updateReportStatus(report.id, { status, priority })
      onUpdate?.(updated)
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        router.push("/admin/laporan") // redirect setelah save
      }, 1200)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">

      {/* Status */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Status</p>
        <div className="space-y-1.5">
          {(Object.keys(REPORT_STATUS) as ReportStatus[]).map(s => {
            const cfg    = REPORT_STATUS[s]
            const active = status === s
            return (
              <button key={s} onClick={() => setStatus(s)}
                className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all ${
                  active ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                }`}>
                <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
                <span className="flex-1 text-left">{cfg.label}</span>
                {active && <RiCheckLine size={14} className="text-teal-400" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Priority */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">Priority</p>
        <div className="grid grid-cols-3 gap-1.5">
          {(Object.keys(REPORT_PRIORITY) as ReportPriority[]).map(p => {
            const active = priority === p
            return (
              <button key={p} onClick={() => setPriority(p)}
                className={`py-2 rounded-lg text-[12px] font-semibold transition-all ${
                  active ? `${REPORT_PRIORITY[p].tw} border border-transparent` : "bg-zinc-50 text-zinc-500 border border-zinc-200 hover:bg-zinc-100"
                }`}>
                {p}
              </button>
            )
          })}
        </div>
      </div>

      {/* Save */}
      <button onClick={handleSave} disabled={loading || !hasChanged || saved}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-semibold transition-all ${
          saved       ? "bg-teal-500 text-white" :
          hasChanged  ? "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98]" :
                        "bg-zinc-100 text-zinc-400 cursor-not-allowed"
        }`}>
        {loading ? <RiLoader4Line size={15} className="animate-spin" /> :
         saved    ? <><RiCheckLine size={15} /> Tersimpan</> :
                    "Simpan Perubahan"}
      </button>

      {/* Info */}
      <div className="rounded-xl bg-zinc-50 px-4 py-3 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Info</p>
        {[
          ["Pelapor",   report.name],
          ["Kategori",  report.category],
          ["Dibuat",    new Date(report.created_at).toLocaleDateString("id-ID")],
          ["Diupdate",  new Date(report.updated_at).toLocaleDateString("id-ID")],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-[12px]">
            <span className="text-zinc-500">{label}</span>
            <span className="font-medium text-zinc-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}