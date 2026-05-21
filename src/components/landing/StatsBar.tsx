import StatCard from "@/components/common-ui/StatCard";

const stats = [
  { label: "Total Laporan", value: "2,847", icon: "📋", color: "#3B82F6" },
  { label: "Selesai", value: "1,923", icon: "✅", color: "#10B981" },
  { label: "Sedang Diproses", value: "654", icon: "⏳", color: "#F59E0B" },
  { label: "Kota Aktif", value: "38", icon: "🏙️", color: "#8B5CF6" },
];

export default function StatsBar() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            className={`px-6 py-7 ${i < 3 ? "md:border-r md:border-slate-200" : ""}`}
          >
            <StatCard icon={s.icon} value={s.value} label={s.label} color={s.color} />
          </div>
        ))}
      </div>
    </section>
  );
}