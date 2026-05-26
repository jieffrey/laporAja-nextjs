"use client";

import StatCard from "@/components/common-ui/StatCard";

export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <h1 className="text-[24px] font-extrabold tracking-tight text-slate-900">
          Selamat datang di panel laporanmu
        </h1>
        <p className="mt-1 text-[14px] text-slate-500">
          Pantau semua laporan lingkungan yang kamu buat, progres penyelesaian,
          dan poin kontribusi.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <StatCard
            icon="📋"
            value="0"
            label="Total Laporan Saya"
            color="#3B82F6"
          />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <StatCard
            icon="✅"
            value="0"
            label="Laporan Selesai"
            color="#10B981"
          />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <StatCard
            icon="⭐"
            value="0"
            label="Total Poin"
            color="#F59E0B"
          />
        </div>
      </section>
    </div>
  );
}

