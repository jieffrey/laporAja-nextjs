import { ClipboardList, Camera, Activity, ArrowRight } from "lucide-react";
import SectionTag from "@/components/landing/SectionTag";

const steps = [
  {
    num: "01",
    icon: <ClipboardList size={28} />,
    title: "Buat Laporan",
    desc: "Isi formulir laporan, pilih kategori, dan tentukan lokasi masalah di peta.",
    accent: false,
  },
  {
    num: "02",
    icon: <Camera size={28} />,
    title: "Upload Bukti",
    desc: "Lampirkan foto kondisi masalah sebagai bukti laporan yang kuat.",
    accent: true,
  },
  {
    num: "03",
    icon: <Activity size={28} />,
    title: "Pantau Progress",
    desc: "Ikuti perkembangan laporan dari pending hingga selesai secara real-time.",
    accent: false,
  },
];

const statuses = [
  { label: "Menunggu",  color: "#5F5E5A", bg: "#F1EDE2" },
  { label: "Diterima",  color: "#1E40AF", bg: "#DBEAFE" },
  { label: "Diproses",  color: "#92400E", bg: "#FEF3C7" },
  { label: "Selesai",   color: "#065F46", bg: "#D1FAE5" },
  { label: "Ditolak",   color: "#991B1B", bg: "#FEE2E2" },
];

export default function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      className="px-[5%] py-24"
      style={{ background: "#FCFBF8" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <SectionTag icon={undefined} text="Cara Kerja" />
          <h2
            className="mt-4 text-[38px] font-extrabold leading-tight tracking-tight md:text-[42px]"
            style={{ color: "#111827" }}
          >
            Lapor dalam{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #0F766E 0%, #14B8A6 60%, #F59E0B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              3 Langkah
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connector line */}
          <div
            className="absolute top-9 left-[22%] right-[22%] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, #5EEAD4 0%, #14B8A6 50%, #F59E0B 100%)",
              opacity: 0.4,
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.num}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className="relative z-10 text-center"
            >
              {/* Icon circle */}
              <div
                className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full"
                style={
                  step.accent
                    ? {
                        background:
                          "linear-gradient(135deg, #0F766E, #14B8A6)",
                        color: "#fff",
                        boxShadow: "0 8px 24px rgba(15,118,110,0.30)",
                      }
                    : {
                        background: "#FCFBF8",
                        color: "#0F766E",
                        border: "1.5px solid #E8E4D9",
                        boxShadow: "0 2px 8px rgba(15,118,110,0.08)",
                      }
                }
              >
                {step.icon}
              </div>

              {/* Step number */}
              <div
                className="mb-2 text-xs font-bold tracking-widest"
                style={{ color: "#0F766E" }}
              >
                {step.num}
              </div>

              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#111827" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Status flow */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mt-14 rounded-2xl p-6 md:px-8"
          style={{
            background: "#F8F6F0",
            border: "1px solid #E8E4D9",
          }}
        >
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#9CA3AF" }}
          >
            Alur Status Laporan
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {statuses.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <span
                  className="rounded-full px-4 py-1.5 text-[13px] font-semibold"
                  style={{
                    background: s.bg,
                    color: s.color,
                  }}
                >
                  {s.label}
                </span>
                {i < statuses.length - 1 && (
                  <ArrowRight
                    size={14}
                    style={{ color: "#D1D5DB", flexShrink: 0 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}