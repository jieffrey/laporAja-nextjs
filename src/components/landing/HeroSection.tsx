"use client";

import { ClipboardList, Map, Trophy, CheckCircle } from "lucide-react";
import Button from "@/components/common-ui/Button";

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: "#F8F6F0" }}
    >
      {/* Subtle page background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #CCFBF1 0%, #F8F6F0 55%, #FEF3C7 100%)",
          opacity: 0.55,
        }}
      />

      {/* Decorative SVG dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, #0F766E22 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
      />

      {/* Large decorative orb — top right */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-120px",
          right: "-120px",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #14B8A640 0%, #0F766E18 50%, transparent 70%)",
        }}
      />

      {/* Small decorative orb — bottom left */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-80px",
          left: "-80px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #F59E0B28 0%, #EA580C10 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-[5%] pt-28 pb-16 md:grid-cols-2">
        {/* ── Left Content ── */}
        <div>
          {/* Eyebrow pill */}
          <div
            className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: "#CCFBF1",
              border: "1px solid #5EEAD4",
            }}
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ background: "#0F766E" }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "#0F766E" }}
            >
              Platform Pengaduan Warga
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-[54px]"
            style={{ color: "#111827" }}
          >
            Laporkan Masalah
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #F59E0B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Lingkungan
            </span>
            <br />
            <span style={{ color: "#111827" }}>
              Cepat &amp; Transparan
            </span>
          </h1>

          <p
            className="mb-9 max-w-[480px] text-base leading-relaxed md:text-[17px]"
            style={{ color: "#4B5563" }}
          >
            LaporAja adalah platform pengaduan masyarakat berbasis peta
            interaktif. Laporkan, pantau, dan selesaikan masalah kota
            bersama warga aktif.
          </p>

          {/* CTAs */}
          <div className="mb-12 flex flex-wrap gap-3.5">
            <Button variant="primary" size="md">
              <ClipboardList size={16} /> Buat Laporan
            </Button>
            <Button variant="ghost" size="md">
              <Map size={16} /> Lihat Peta
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
                <div
                  className="text-2xl font-extrabold"
                  style={{ color: "#0F766E" }}
                >
                  {val}
                </div>
                <div className="text-[13px]" style={{ color: "#6B7280" }}>
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Dashboard Preview Card ── */}
        <div className="animate-float relative">
          {/* Gradient border wrapper */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #0F766E, #14B8A6 50%, #F59E0B)",
              borderRadius: "24px",
              padding: "2px",
              boxShadow: "0 24px 64px rgba(15,118,110,0.18)",
            }}
          >
            <div
              className="rounded-[22px] p-6"
              style={{ background: "#FCFBF8" }}
            >
              {/* Card header */}
              <div className="mb-5 flex items-center justify-between">
                <span
                  className="text-[15px] font-bold"
                  style={{ color: "#111827" }}
                >
                  Dashboard Laporan
                </span>
                <span
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: "#D1FAE5", color: "#065F46" }}
                >
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full"
                    style={{ background: "#059669" }}
                  />
                  Live
                </span>
              </div>

              {/* Stat mini cards */}
              <div className="mb-5 grid grid-cols-2 gap-3">
                {[
                  ["2,847", "Total Laporan", "#0F766E", "#CCFBF1"],
                  ["1,923", "Selesai", "#065F46", "#D1FAE5"],
                  ["654", "Diproses", "#92400E", "#FEF3C7"],
                  ["270", "Menunggu", "#5F5E5A", "#F1EDE2"],
                ].map(([val, lbl, textClr, bgClr]) => (
                  <div
                    key={lbl}
                    className="rounded-xl p-3.5"
                    style={{
                      background: bgClr as string,
                      border: `1px solid ${bgClr as string}`,
                    }}
                  >
                    <div
                      className="mb-0.5 text-[22px] font-extrabold"
                      style={{ color: textClr as string }}
                    >
                      {val}
                    </div>
                    <div
                      className="text-xs font-medium"
                      style={{ color: textClr as string, opacity: 0.75 }}
                    >
                      {lbl}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              <div className="space-y-2.5">
                {[
                  ["Infrastruktur", 68, "#0F766E", "#CCFBF1"],
                  ["Lingkungan", 45, "#14B8A6", "#CCFBF1"],
                  ["Kebersihan", 82, "#F59E0B", "#FEF3C7"],
                ].map(([lbl, pct, trackClr, bgClr]) => (
                  <div key={lbl as string}>
                    <div className="mb-1 flex justify-between">
                      <span
                        className="text-xs font-medium"
                        style={{ color: "#374151" }}
                      >
                        {lbl}
                      </span>
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>
                        {pct}%
                      </span>
                    </div>
                    <div
                      className="h-2 w-full rounded-full"
                      style={{ background: bgClr as string }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: trackClr as string,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating notification badge */}
          <div
            className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-2xl px-4 py-2.5"
            style={{
              background: "linear-gradient(135deg, #0F766E, #14B8A6)",
              boxShadow: "0 8px 24px rgba(15,118,110,0.35)",
            }}
          >
            <CheckCircle size={18} style={{ color: "#fff" }} />
            <div>
              <div
                className="text-[13px] font-bold"
                style={{ color: "#fff" }}
              >
                Laporan #2847
              </div>
              <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.8)" }}>
                Baru saja diselesaikan
              </div>
            </div>
          </div>

          {/* Floating points badge */}
          <div
            className="absolute -top-4 -left-4 flex items-center gap-2 rounded-2xl px-3.5 py-2"
            style={{
              background: "linear-gradient(135deg, #F59E0B, #EA580C)",
              boxShadow: "0 8px 20px rgba(245,158,11,0.35)",
            }}
          >
            <Trophy size={16} style={{ color: "#fff" }} />
            <div>
              <div
                className="text-[12px] font-bold"
                style={{ color: "#fff" }}
              >
                +50 Poin
              </div>
              <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.8)" }}>
                Laporan diterima
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}