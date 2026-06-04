"use client";

import { useState } from "react";
import Link from "next/link";
import type { Report, ReportStatus } from "@/lib/report.api";
import { REPORT_STATUS, REPORT_PRIORITY, REPORT_CATEGORIES } from "@/lib/constant";
import StatusBadge from "@/components/common-ui/StatusBadge";
import PriorityBadge from "@/components/common-ui/PriorityBadge";
import EmptyState from "@/components/common-ui/Emptystate";

type Props = { reports: Report[] };

const STATUS_OPTIONS = ["Semua", "Pending", "In Progress", "Resolved", "Rejected"] as const;
const PRIORITY_OPTIONS = ["Semua", "Low", "Medium", "High"] as const;

export default function AdminReportsList({ reports }: Props) {
  const [statusFilter,   setStatusFilter]   = useState("Semua");
  const [priorityFilter, setPriorityFilter] = useState("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = reports.filter(r => {
    const matchStatus   = statusFilter   === "Semua" || r.status   === statusFilter;
    const matchPriority = priorityFilter === "Semua" || r.priority === priorityFilter;
    const matchCategory = categoryFilter === "Semua" || r.category === categoryFilter;
    const matchSearch   = r.title.toLowerCase().includes(search.toLowerCase()) ||
                          r.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchPriority && matchCategory && matchSearch;
  });

  return (
    <div className="space-y-4">

      {/* Filter bar */}
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex flex-wrap gap-3">

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[14px]">🔍</span>
            <input
              type="text"
              placeholder="Cari judul atau pelapor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-[13px] text-slate-700 outline-none focus:border-blue-300 focus:bg-white transition-all"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-blue-300 cursor-pointer"
          >
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-blue-300 cursor-pointer"
          >
            {PRIORITY_OPTIONS.map(p => <option key={p}>{p}</option>)}
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-blue-300 cursor-pointer"
          >
            <option>Semua</option>
            {REPORT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Active filter count */}
        {filtered.length !== reports.length && (
          <p className="mt-2 text-[12px] text-slate-400">
            Menampilkan <span className="font-semibold text-slate-700">{filtered.length}</span> dari {reports.length} laporan
          </p>
        )}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon="🔍" title="Tidak ada laporan" description="Coba ubah filter atau kata kunci pencarian" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-50 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  <th className="px-5 py-3">Laporan</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Pelapor</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-slate-900 truncate max-w-[220px]">{r.title}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[220px] mt-0.5">{r.description}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                        {r.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <PriorityBadge priority={r.priority} />
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
                          {r.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-slate-600">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/laporan/${r.id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-[12px] font-semibold text-blue-600 hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}