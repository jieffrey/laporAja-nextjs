const columns = [
  { title: "Produk", links: ["Fitur", "Peta Laporan", "Dashboard", "API"] },
  { title: "Peran", links: ["Warga", "Admin", "Super Admin", "Developer"] },
  { title: "Dukungan", links: ["Panduan", "FAQ", "Kontak", "Status"] },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 px-[5%] pt-15 pb-7.5">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-blue-700 text-base font-extrabold text-white">
                L
              </div>
              <span className="text-lg font-extrabold text-white">LaporAja</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              Smart Geo Complaint System untuk masyarakat yang lebih terlibat dalam pengelolaan kota.
            </p>
          </div>

          {/* Links */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-bold text-white">{col.title}</p>
              {col.links.map((link) => (
                <p
                  key={link}
                  className="mb-2.5 cursor-pointer text-sm text-slate-500 transition-colors hover:text-slate-400"
                >
                  {link}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 md:flex-row">
          <p className="text-[13px] text-slate-600">
            © 2025 LaporAja — Smart Geo Complaint System
          </p>
          <div className="flex gap-4">
            {["Privasi", "Terms", "Cookie"].map((l) => (
              <span key={l} className="cursor-pointer text-[13px] text-slate-600 hover:text-slate-500">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}