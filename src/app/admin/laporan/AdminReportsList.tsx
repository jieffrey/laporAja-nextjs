"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  REPORT_CATEGORIES,
  REPORT_PRIORITY,
  REPORT_STATUS,
} from "@/lib/constant";
import type { Report } from "@/lib/report.api";
import StatusBadge from "@/components/common-ui/StatusBadge";
import PriorityBadge from "@/components/common-ui/PriorityBadge";
import EmptyState from "@/components/common-ui/Emptystate";

type AdminReportsListProps = {
  reports: Report[];
};

const inputClass =
  "h-9 rounded-full border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none";

export default function AdminReportsList({ reports }: AdminReportsListProps) {
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const matchStatus = status ? r.status === status : true;
      const matchCategory = category ? r.category === category : true;
      const matchPriority = priority ? r.priority === priority : true;
      return matchStatus && matchCategory && matchPriority;
    });
  }, [reports, status, category, priority]);

  if (reports.length === 0) {
    return (
      <EmptyState
        title="Belum ada laporan"
        description="Belum ada laporan yang masuk."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <select
          className={inputClass}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Semua status</option>
          {Object.keys(REPORT_STATUS).map((key) => (
            <option key={key} value={key}>
              {REPORT_STATUS[key as keyof typeof REPORT_STATUS].label}
            </option>
          ))}
        </select>

        <select
          className={inputClass}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Semua kategori</option>
          {REPORT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className={inputClass}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Semua priority</option>
          {Object.keys(REPORT_PRIORITY).map((key) => (
            <option key={key} value={key}>
              {REPORT_PRIORITY[key as keyof typeof REPORT_PRIORITY].label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Tidak ada hasil"
          description="Coba ubah filter status/kategori/priority."
        />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1fr_140px_120px_140px] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-[12px] font-semibold text-slate-600 md:grid">
            <span>Judul</span>
            <span>Status</span>
            <span>Priority</span>
            <span className="text-right">Dibuat</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filtered.map((r) => (
              <Link
                key={r.id}
                href={`/admin/laporan/${r.id}`}
                className="block px-6 py-4 transition-colors hover:bg-slate-50"
              >
                <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_140px_120px_140px] md:items-center md:gap-4">
                  <div>
                    <div className="text-[14px] font-semibold text-slate-900">
                      {r.title}
                    </div>
                    <div className="mt-0.5 text-[12px] text-slate-500">
                      {r.category} • oleh {r.name}
                    </div>
                  </div>

                  <div>
                    <StatusBadge status={r.status} />
                  </div>

                  <div>
                    <PriorityBadge priority={r.priority} />
                  </div>

                  <div className="text-left text-[12px] text-slate-500 md:text-right">
                    {new Date(r.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

