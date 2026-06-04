"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { getReports } from "@/lib/report.api"
import type { Report } from "@/lib/report.api"
import { POINTS_CONFIG } from "@/lib/constant"
import StatusBadge from "@/components/common-ui/StatusBadge"

export default function UserDashboardPage() {
  const { data: session, status } = useSession()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
    if (status !== "authenticated") return
    getReports()
      .then(data => {
        const userId = Number(session?.user?.id)
        setReports(data.filter(r => r.user_id === userId))
      })
      .finally(() => setLoading(false))
  }, [status, session?.user?.id])

  const name       = session?.user?.name?.split(" ")[0] ?? "Pengguna"
  const points     = session?.user?.points ?? 0
  const total      = reports.length
  const resolved   = reports.filter(r => r.status === "Resolved").length
  const inProgress = reports.filter(r => r.status === "In Progress").length
  const pending    = reports.filter(r => r.status === "Pending").length
  const recent     = [...reports]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  const STATS = [
    { label: "Total Laporan",   value: total,      icon: "📋", color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100"    },
    { label: "Selesai",         value: resolved,   icon: "✅", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "Sedang Diproses", value: inProgress, icon: "⏳", color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100"   },
    { label: "Pending",         value: pending,    icon: "🕐", color: "text-slate-500",   bg: "bg-slate-50",   border: "border-slate-200"   },
  ]

  return (
    <div className="space-y-5 max-w-4xl">

      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-5 shadow-lg shadow-blue-200">
        <div className="absolute right-0 top-0 h-full w-64 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-blue-200 text-[13px] font-medium">Selamat datang kembali 👋</p>
            <h1 className="mt-0.5 text-[22px] font-extrabold tracking-tight text-white">{name}</h1>
            <p className="mt-1.5 text-blue-100 text-[13px] max-w-sm">
              {total === 0
                ? "Belum ada laporan. Yuk mulai kontribusi untuk lingkunganmu!"
                : `Kamu sudah membuat ${total} laporan. Terus semangat! 💪`}
            </p>
          </div>
          <div className="hidden sm:flex flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-white/15 px-4 py-3 border border-white/20">
            <p className="text-white font-extrabold text-[28px] leading-none">{points}</p>
            <p className="text-blue-200 text-[11px] mt-1 font-medium">Poin Kamu</p>
          </div>
        </div>
        <div className="relative mt-4 flex flex-wrap gap-2">
          {[
            { label: "Buat laporan", pts: `+${POINTS_CONFIG.CREATE_REPORT}` },
            { label: "In Progress",  pts: `+${POINTS_CONFIG.IN_PROGRESS}`   },
            { label: "Resolved",     pts: `+${POINTS_CONFIG.RESOLVED}`      },
          ].map(p => (
            <div key={p.label} className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1">
              <span className="text-white font-bold text-[12px]">{p.pts}</span>
              <span className="text-blue-200 text-[11px]">{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map(s => (
          <div key={s.label} className={`rounded-2xl border ${s.border} bg-white px-4 py-4 shadow-sm`}>
            <div className={`mb-2.5 inline-flex h-8 w-8 items-center justify-center rounded-xl ${s.bg} text-base`}>{s.icon}</div>
            <p className={`text-[24px] font-extrabold tracking-tight ${s.color}`}>
              {loading ? <span className="inline-block h-6 w-8 animate-pulse rounded bg-slate-200" /> : s.value}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/user/laporan/buat" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl group-hover:bg-blue-100 transition-colors">⊕</div>
          <div>
            <p className="text-[14px] font-semibold text-slate-900">Buat Laporan Baru</p>
            <p className="text-[12px] text-slate-400">Laporkan masalah di sekitarmu</p>
          </div>
          <span className="ml-auto text-slate-300 group-hover:text-blue-500 transition-colors text-lg">→</span>
        </Link>
        <Link href="/user/laporan" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xl group-hover:bg-slate-100 transition-colors">◫</div>
          <div>
            <p className="text-[14px] font-semibold text-slate-900">Lihat Laporan Saya</p>
            <p className="text-[12px] text-slate-400">{total} laporan · {resolved} selesai</p>
          </div>
          <span className="ml-auto text-slate-300 group-hover:text-blue-500 transition-colors text-lg">→</span>
        </Link>
      </div>

      {/* Recent */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <p className="text-[14px] font-bold text-slate-900">Laporan Terbaru</p>
          <Link href="/user/laporan" className="text-[12px] text-blue-600 hover:underline">Lihat semua →</Link>
        </div>
        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>
        ) : recent.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-3xl mb-2">📭</p>
            <p className="text-[13px] text-slate-400">Belum ada laporan</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {recent.map(r => (
              <Link key={r.id} href={`/user/laporan/${r.id}`}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-800 truncate">{r.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{r.category} · {new Date(r.created_at).toLocaleDateString("id-ID")}</p>
                </div>
                <StatusBadge status={r.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}