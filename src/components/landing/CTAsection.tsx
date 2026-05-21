import Button from "@/components/common-ui/Button";

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden px-[5%] py-25"
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

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="mb-5 text-[52px]">🏙️</div>
        <h2 className="mb-4.5 text-4xl font-extrabold tracking-tight text-white md:text-[44px]">
          Jadilah Bagian dari
          <br />
          <span className="text-blue-300">Perubahan Kota</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/75 md:text-[17px]">
          Bergabung dengan ribuan warga aktif yang telah berkontribusi membangun kota yang lebih baik melalui LaporAja.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button variant="primary" size="lg">
            Mulai Sekarang
          </Button>
          <Button variant="outline" size="lg">
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </section>
  );
}