import SectionTag from "@/components/common-ui/SectionTag";

const steps = [
  { num: "01", icon: "📝", title: "Buat Laporan", desc: "Isi formulir laporan, pilih kategori, dan tentukan lokasi masalah di peta." },
  { num: "02", icon: "📷", title: "Upload Bukti", desc: "Lampirkan foto kondisi masalah sebagai bukti laporan yang kuat." },
  { num: "03", icon: "🚀", title: "Pantau Progress", desc: "Ikuti perkembangan laporan dari pending hingga selesai secara real-time." },
];

const statuses = [
  { label: "pending", color: "#94A3B8", bg: "#F1F5F9" },
  { label: "approved", color: "#3B82F6", bg: "#EFF6FF" },
  { label: "on_progress", color: "#F59E0B", bg: "#FFFBEB" },
  { label: "completed", color: "#10B981", bg: "#F0FDF4" },
  { label: "rejected", color: "#EF4444", bg: "#FEF2F2" },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white px-[5%] py-25">
      <div className="mx-auto max-w-6xl">
        <div className="mb-15 text-center">
          <SectionTag icon="📋" text="Cara Kerja" />
          <h2 className="text-[40px] font-extrabold tracking-tight text-slate-900">
            Lapor dalam 3 Langkah
          </h2>
        </div>

        <div className="relative grid gap-10 md:grid-cols-3">
          {/* Connector Line */}
          <div className="absolute top-9 left-[20%] right-[20%] hidden h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 md:block" />

          {steps.map((step, i) => (
            <div
              key={step.num}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="relative z-10 text-center"
            >
              <div
                className={`mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-blue-200 text-[28px] ${
                  i === 1
                    ? "bg-blue-700 text-white shadow-lg shadow-blue-700/30"
                    : "bg-white shadow-md"
                }`}
              >
                {step.icon}
              </div>
              <div className="mb-2 text-xs font-bold tracking-widest text-blue-700">
                {step.num}
              </div>
              <h3 className="mb-2.5 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Status Flow */}
        <div data-aos="zoom-in" data-aos-delay="400" className="mt-16 rounded-[20px] bg-slate-50 p-7 md:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Alur Status Laporan
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {statuses.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span
                  className="rounded-full px-4 py-1.5 text-[13px] font-bold"
                  style={{
                    background: s.bg,
                    color: s.color,
                    border: `1.5px solid ${s.color}40`,
                  }}
                >
                  {s.label}
                </span>
                {i < statuses.length - 1 && (
                  <span className="text-lg text-slate-300">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}