import StatCard from "@/components/common-ui/StatCard";
import { FileText, CheckCircle, Clock, MapPin } from "lucide-react";
 
const stats = [
  {
    label: "Total Laporan",
    value: "2,847",
    icon: <FileText size={20} />,
    trend: "↑ 12% bulan ini",
  },
  {
    label: "Selesai",
    value: "1,923",
    icon: <CheckCircle size={20} />,
    trend: "↑ 18% total",
  },
  {
    label: "Sedang Diproses",
    value: "654",
    icon: <Clock size={20} />,
    trend: "↑ 5% minggu ini",
  },
  {
    label: "Kota Aktif",
    value: "38",
    icon: <MapPin size={20} />,
    trend: "Tersebar nasional",
  },
];


export default function StatsBar() {
  return (
    <section
      className="border-y"
      style={{
        background: "#FCFBF8",
        borderColor: "#E8E4D9",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-aos="fade-up"
            data-aos-delay={i * 80}
            className="px-6 py-7"
            style={{
              borderRight:
                i < stats.length - 1 ? "1px solid #E8E4D9" : undefined,
            }}
          >
            <StatCard
              icon={s.icon}
              value={s.value}
              label={s.label}
              trend={s.trend}
            />
          </div>
        ))}
      </div>
    </section>
  );
}