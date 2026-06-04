import { Building2, ArrowRight, ChevronRight } from "lucide-react";
import Button from "@/components/common-ui/Button";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-[5%] py-24">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #F59E0B 100%)",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Orb top-right */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-80px",
          right: "-80px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Orb bottom-left */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-60px",
          left: "-60px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <Building2 size={32} style={{ color: "#fff" }} />
        </div>

        <h2
          className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-[44px]"
        >
          Jadilah Bagian dari
          <br />
          <span style={{ color: "#FEF3C7" }}>Perubahan Kota</span>
        </h2>

        <p
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed md:text-[17px]"
          style={{ color: "rgba(255,255,255,0.80)" }}
        >
          Bergabung dengan ribuan warga aktif yang telah berkontribusi
          membangun kota yang lebih baik melalui LaporAja.
        </p>

        <div className="flex flex-wrap justify-center gap-3.5">
          {/* Solid white primary */}
          <a
            href="/auth/register"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[15px] font-bold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#FCFBF8",
              color: "#0F766E",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}
          >
            Mulai Sekarang
          </a>

          {/* Ghost outline */}
          <a
            href="#fitur"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:bg-white/10"
            style={{ border: "1.5px solid rgba(255,255,255,0.45)" }}
          >
            Pelajari Lebih Lanjut
          </a>
        </div>

        {/* Social proof strip */}
        <div
          className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-full px-5 py-2.5"
          style={{ background: "rgba(255,255,255,0.14)" }}
        >
          <div className="flex -space-x-2">
            {["#0F766E", "#14B8A6", "#F59E0B", "#EA580C"].map((c, i) => (
              <div
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ background: c, border: "2px solid rgba(255,255,255,0.3)" }}
              >
                {["JI", "RH", "SN", "AB"][i]}
              </div>
            ))}
          </div>
          <span className="text-[13px] font-medium text-white/90">
            5.102 warga sudah bergabung
          </span>
        </div>
      </div>
    </section>
  );
}