const columns = [
  { title: "Produk", links: ["Fitur", "Peta Laporan", "Dashboard", "API"] },
  { title: "Peran", links: ["Warga", "Admin", "Super Admin", "Developer"] },
  { title: "Dukungan", links: ["Panduan", "FAQ", "Kontak", "Status"] },
];

export default function Footer() {
  return (
    <footer
      className="px-[5%] pt-14 pb-7"
      style={{
        background: "linear-gradient(180deg, #115E59 0%, #0D4A45 100%)",
      }}
    >
      <style jsx>{`
        .footer-link {
          color: rgba(255, 255, 255, 0.45);
          transition: color 0.15s ease;
          cursor: pointer;
        }
        .footer-link:hover {
          color: #5EEAD4;
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-[10px] text-base font-extrabold text-white"
                style={{ background: "rgba(255, 255, 255, 0.18)" }}
              >
                L
              </div>
              <span className="text-lg font-extrabold text-white">LaporAja</span>
            </div>

            <p
              className="mb-5 max-w-xs text-sm leading-relaxed"
              style={{ color: "rgba(255, 255, 255, 0.55)" }}
            >
              Platform pengaduan masyarakat berbasis peta interaktif untuk kota yang lebih baik.
            </p>

            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
              style={{ background: "rgba(20, 184, 166, 0.2)", color: "#5EEAD4" }}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: "#14B8A6" }}
              />
              Semua sistem berjalan normal
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p
                className="mb-4 text-sm font-bold tracking-wide"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="footer-link text-sm">{link}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col items-center justify-between gap-4 pt-6 md:flex-row"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          <p className="text-[13px]" style={{ color: "rgba(255, 255, 255, 0.35)" }}>
            © 2025 LaporAja — Platform Pengaduan Warga Indonesia
          </p>
          <div className="flex gap-5">
            {["Privasi", "Terms", "Cookie"].map((l) => (
              <span key={l} className="footer-link text-[13px]">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}