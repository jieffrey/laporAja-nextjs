"use client";

import { useState } from "react";
import Link from "next/link";
import { REPORT_CATEGORIES, REPORT_STATUS } from "@/lib/constant";
import type { Report } from "@/lib/report.api";
import EmptyState from "@/components/common-ui/Emptystate";
import ReportCard from "@/components/report/ReportCard";
import Button from "@/components/common-ui/Button";

type UserReportsListProps = {
  reports: Report[];
};

export default function UserReportsList({ reports }: UserReportsListProps) {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const filtered = reports.filter((r) => {
    const matchStatus = status ? r.status === status : true;
    const matchCategory = category ? r.category === category : true;
    return matchStatus && matchCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <select
            className="h-9 rounded-full border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none"
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
            className="h-9 rounded-full border border-slate-200 bg-white px-3 text-[13px] text-slate-700 outline-none"
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
        </div>

        <Link href="/user/laporan/buat">
          <Button variant="primary" size="sm">
            + Buat Laporan
          </Button>
        </Link>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Belum ada laporan"
          description="Kamu belum pernah membuat laporan. Mulai dengan membuat laporan pertama tentang lingkungan sekitarmu."
          action={
            <Link href="/user/laporan/buat">
              <Button variant="primary" size="md">
                Buat Laporan Pertama
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
