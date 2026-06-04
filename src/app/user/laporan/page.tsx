"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { getReports } from "@/lib/report.api"
import type { Report } from "@/lib/report.api"
import { REPORT_CATEGORIES, REPORT_STATUS } from "@/lib/constant"
import type { ReportStatus } from "@/lib/constant"
import ReportCard from "@/components/report/ReportCard"
import EmptyState from "@/components/common-ui/Emptystate"

export default function UserReportsPage() {
  const { data: session, status } = useSession()
  const [reports,  setReports]  = useState<Report[]>([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState("Semua")
  const [category, setCategory] = useState("Semua")
  const [search,   setSearch]   = useState("")

  useEffect(() => {
    if (status !== "authenticated") return
    getReports()
      .then(data => {
        const userId = Number(session?.user?.id)
        setReports(data.filter(r => r.user_id === userId))
      })
      .finally(() => setLoading(false))
  }, [status, session?.user?.id])

  const filtered = reports.filter(r => {
    const matchStatus   = filter   === "Semua" || r.status   === filter
    const matchCategory = category === "Semua" || r.category === category
    const matchSearch   = r.title.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchCategory && matchSearch
  })

  const STATUS_OPTIONS = ["Semua", ...Object.keys(REPORT_STATUS)]

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">Laporan Saya</h1>
          <p className="mt-0.5 text-[13px] text-slate-400">{reports.length} laporan ditemukan</p>
        </div>
        <Link href="/user/laporan/buat"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 transition-colors">
          <span>⊕</span> Buat Laporan
        </Link>
      </div>

      <div className="flex flex-wrap gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="relative flex-1 min-w-[180px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">🔍</span>
          <input type="text" placeholder="Cari laporan..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-[13px] outline-none focus:border-blue-300 focus:bg-white transition-all"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_OPTIONS.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-xl px-3 py-1.5 text-[12px] font-semibold transition-all border ${
                filter === s ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}>
              {s}
            </button>
          ))}
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-600 outline-none focus:border-blue-300 cursor-pointer">
          <option>Semua</option>
          {REPORT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="📋"
          title={reports.length === 0 ? "Belum ada laporan" : "Tidak ada hasil"}
          description={reports.length === 0 ? "Mulai buat laporan pertamamu" : "Coba ubah filter pencarian"}
          action={reports.length === 0 ? (
            <Link href="/user/laporan/buat"
              className="rounded-xl bg-blue-600 px-5 py-2 text-[13px] font-semibold text-white hover:bg-blue-700 transition-colors">
              Buat Laporan
            </Link>
          ) : undefined}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(r => <ReportCard key={r.id} report={r} />)}
        </div>
      )}
    </div>
  )
}