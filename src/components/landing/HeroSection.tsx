"use client";

import Button from "@/components/common-ui/Button";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{
        backgroundColor: "#1D4ED8",
        backgroundImage: `
          radial-gradient(circle at 25% 25%, #1E40AF 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, #1E3A8A 0%, transparent 50%),
          radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 28px 28px",
      }}
    >
      {/* Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 197, 253, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 197, 253, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Glow Blobs */}
      <div className="pointer-events-none absolute top-[15%] right-[8%] h-[300px] w-[300px] rounded-full bg-blue-400/12 blur-[60px]" />
      <div className="pointer-events-none absolute bottom-[10%] left-[5%] h-[250px] w-[250px] rounded-full bg-emerald-200/10 blur-[50px]" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-15 px-[5%] pt-28 pb-15 md:grid-cols-2">
        {/* Left Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-sm font-semibold text-white/90">
              Smart Geo Complaint System
            </span>
          </div>

          <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-[56px]">
            Laporkan Masalah
            <br />
            <span className="text-blue-300">Lingkungan</span>
            <br />
            Dengan Cepat & Transparan
          </h1>

          <p className="mb-9 max-w-[480px] text-base leading-relaxed text-white/75 md:text-[17px]">
            LaporAja adalah platform pengaduan masyarakat berbasis peta interaktif. Laporkan, pantau, dan selesaikan masalah kota bersama warga aktif.
          </p>

          <div className="mb-12 flex flex-wrap gap-3.5">
            <Button variant="primary" size="md">
              📋 Buat Laporan
            </Button>
            <Button variant="outline" size="md">
              🗺️ Lihat Peta
            </Button>
          </div>

          {/* Mini Stats */}
          <div className="flex gap-8">
            {[
              ["2.8K+", "Laporan Masuk"],
              ["94%", "Terselesaikan"],
              ["38", "Kota Aktif"],
            ].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-2xl font-extrabold text-white">{val}</div>
                <div className="text-[13px] text-white/60">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Dashboard Preview */}
        <div className="animate-float relative">
          <div className="rounded-[20px] bg-white/95 p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-4.5 flex items-center justify-between">
              <span className="text-[15px] font-bold text-slate-900">Dashboard Laporan</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
                Live
              </span>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3">
              {[
                ["2,847", "Total Laporan", "#3B82F6"],
                ["1,923", "Selesai", "#10B981"],
                ["654", "Diproses", "#F59E0B"],
                ["270", "Pending", "#94A3B8"],
              ].map(([val, lbl, clr]) => (
                <div
                  key={lbl}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3.5"
                >
                  <div
                    className="mb-0.5 text-[22px] font-extrabold"
                    style={{ color: clr }}
                  >
                    {val}
                  </div>
                  <div className="text-xs text-slate-500">{lbl}</div>
                </div>
              ))}
            </div>

            {/* Progress Bars */}
            <div className="space-y-2.5">
              {[
                ["Infrastruktur", 68, "#3B82F6"],
                ["Lingkungan", 45, "#10B981"],
                ["Kebersihan", 82, "#F59E0B"],
              ].map(([lbl, pct, clr]) => (
                <div key={lbl as string}>
                  <div className="mb-1 flex justify-between">
                    <span className="text-xs font-medium text-slate-600">{lbl}</span>
                    <span className="text-xs text-slate-400">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: clr as string }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -right-4 -bottom-4.5 flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 shadow-lg shadow-emerald-500/40">
            <span className="text-xl">✅</span>
            <div>
              <div className="text-[13px] font-bold text-white">Laporan #2847</div>
              <div className="text-[11px] text-white/80">Baru saja diselesaikan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}