import { ClipboardList, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import FeatureCard from "@/components/landing/FeatureCard";

const features = [
  {
    icon: <ClipboardList size={24} />,
    title: "Laporan mudah dibuat",
    desc: "Isi formulir lengkap, pilih kategori, dan unggah foto untuk dokumentasi laporan.",
  },
  {
    icon: <MapPin size={24} />,
    title: "Peta interaktif",
    desc: "Tandai lokasi masalah dengan tepat dan pantau status lewat dashboard peta.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Transparansi proses",
    desc: "Pantau pergerakan laporan dari pending hingga selesai secara real-time.",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Komunitas aktif",
    desc: "Bergabung dengan warga aktif yang ikut mengawasi dan melaporkan masalah kota.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="px-[5%] py-24 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">
            Fitur Unggulan
          </p>
          <h2 className="text-[38px] font-extrabold tracking-tight text-slate-900 md:text-[44px]">
            Solusi pengaduan cepat, transparan, dan mudah diakses.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            LaporAja memberikan pengalaman pelaporan yang sederhana bagi warga, admin, dan semua pihak yang ingin menciptakan lingkungan lebih baik.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
