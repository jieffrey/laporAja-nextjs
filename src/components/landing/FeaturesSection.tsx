import SectionTag from "@/components/landing/SectionTag";
import FeatureCard from "@/components/landing/FeatureCard";

const features = [
  {
    icon: "📍",
    title: "Geo Complaint System",
    desc: "Laporan berbasis peta interaktif dengan latitude & longitude. Visualisasi heatmap untuk monitoring smart city.",
    bg: "#EFF6FF",
  },
  {
    icon: "📷",
    title: "Upload Bukti Foto",
    desc: "Sertakan foto before & after sebagai bukti laporan. Bukti visual mempercepat penanganan masalah.",
    bg: "#F0FDF4",
  },
  {
    icon: "🚦",
    title: "Tracking Status Real-Time",
    desc: "Pantau status laporan dari pending hingga completed. Notifikasi setiap ada perubahan status.",
    bg: "#FFFBEB",
  },
  {
    icon: "🎮",
    title: "Gamification Points",
    desc: "Kumpulkan poin setiap laporan diterima. Masuk leaderboard Top Warga Aktif kota Anda.",
    bg: "#F5F3FF",
  },
  {
    icon: "💬",
    title: "Diskusi & Update",
    desc: "Ruang diskusi antara warga dan admin. Update transparan di setiap tahap penanganan laporan.",
    bg: "#FDF2F8",
  },
  {
    icon: "🔒",
    title: "Multi-Role System",
    desc: "Sistem role User, Admin, dan Super Admin yang terstruktur untuk pengelolaan laporan yang efisien.",
    bg: "#F0F9FF",
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="bg-slate-50 px-[5%] py-25">
      <div className="mx-auto max-w-6xl">
        <div className="mb-15 text-center">
          <SectionTag icon="✨" text="Fitur Unggulan" />
          <h2 className="mb-3.5 text-[40px] font-extrabold tracking-tight text-slate-900">
            Lebih dari Sekedar
            <br />
            <span className="text-blue-700">Website Pengaduan</span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-500 md:text-[17px]">
            Platform civic tech modern yang menggabungkan smart map, gamification, dan dashboard real-time.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} data-aos="fade-up" data-aos-delay={i * 100}>
              <FeatureCard
                icon={f.icon}
                title={f.title}
                desc={f.desc}
                bg={f.bg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}