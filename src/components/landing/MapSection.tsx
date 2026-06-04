import MapPin from "@/components/landing/MapPin";

const mapPoints = [
  { x: 22, y: 35, label: "Jalan Rusak", color: "#EF4444" },
  { x: 45, y: 20, label: "Sampah Menumpuk", color: "#F59E0B" },
  { x: 68, y: 55, label: "Lampu Mati", color: "#EF4444" },
  { x: 30, y: 65, label: "Banjir Lokal", color: "#3B82F6" },
  { x: 75, y: 30, label: "Pohon Tumbang", color: "#10B981" },
  { x: 55, y: 75, label: "Drainase Mampet", color: "#3B82F6" },
  { x: 15, y: 55, label: "Trotoar Rusak", color: "#EF4444" },
  { x: 85, y: 65, label: "Vandalisme", color: "#8B5CF6" },
];

const categories = [
  { dot: "#EF4444", label: "Infrastruktur", count: "847 laporan" },
  { dot: "#3B82F6", label: "Lingkungan", count: "624 laporan" },
  { dot: "#F59E0B", label: "Kebersihan", count: "538 laporan" },
  { dot: "#8B5CF6", label: "Keamanan", count: "312 laporan" },
  { dot: "#10B981", label: "Taman Kota", count: "248 laporan" },
];

export default function MapSection() {
  return (
    <section id="peta" className="bg-slate-50 px-[5%] py-25">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-15 md:grid-cols-[1fr_1.6fr]">
          {/* Left Content */}
          <div>
            <div className="section-tag mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-[13px] font-semibold text-blue-700">
              🗺️ Geo Complaint Map
            </div>
            <h2 className="mb-4 text-[38px] font-extrabold tracking-tight text-slate-900">
              Setiap Masalah
              <br />
              <span className="text-blue-700">Punya Koordinatnya</span>
            </h2>
            <p className="mb-8 text-base leading-relaxed text-slate-500">
              Laporan dipetakan secara akurat dengan GPS. Admin dapat melihat clustering masalah dan memprioritaskan penanganan berdasarkan lokasi.
            </p>

            <div className="flex flex-col gap-3">
              {categories.map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ background: c.dot }}
                  />
                  <span className="flex-1 text-sm font-medium text-slate-900">
                    {c.label}
                  </span>
                  <span className="text-[13px] text-slate-400">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fake Map */}
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-lg">
            {/* Map Header */}
            <div className="flex items-center gap-2.5 border-b border-slate-200 bg-[#FAFAFA] px-4.5 py-3.5">
              <div className="flex gap-1.5">
                {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                  <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-400">
                <span>🔍</span> Cari lokasi...
              </div>
            </div>

            {/* Map Canvas */}
            <div className="relative h-[360px] overflow-hidden bg-blue-50">
              <svg className="absolute inset-0 h-full w-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#BFDBFE" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <line x1="0" y1="180" x2="100%" y2="180" stroke="#DBEAFE" strokeWidth="8" />
                <line x1="200" y1="0" x2="200" y2="100%" stroke="#DBEAFE" strokeWidth="6" />
                <line x1="400" y1="0" x2="350" y2="100%" stroke="#DBEAFE" strokeWidth="4" />
                <rect x="20" y="20" width="80" height="60" rx="4" fill="#BFDBFE" fillOpacity="0.4" />
                <rect x="120" y="20" width="60" height="50" rx="4" fill="#BFDBFE" fillOpacity="0.4" />
                <rect x="250" y="30" width="80" height="70" rx="4" fill="#BFDBFE" fillOpacity="0.4" />
                <rect x="20" y="210" width="70" height="80" rx="4" fill="#BFDBFE" fillOpacity="0.4" />
                <rect x="250" y="220" width="100" height="60" rx="4" fill="#BFDBFE" fillOpacity="0.4" />
                <rect x="420" y="50" width="60" height="80" rx="4" fill="#BFDBFE" fillOpacity="0.4" />
                <rect x="420" y="200" width="70" height="60" rx="4" fill="#BFDBFE" fillOpacity="0.4" />
              </svg>

              {/* Map Pins */}
              {mapPoints.map((pt, i) => (
                <MapPin key={i} x={pt.x} y={pt.y} label={pt.label} color={pt.color} />
              ))}

              {/* Heatmap Circles */}
              <div className="absolute left-[20%] top-[30%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/12" />
              <div className="absolute left-[65%] top-[55%] h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/12" />

              {/* Zoom Controls */}
              <div className="absolute top-3 right-3 overflow-hidden rounded-[10px] border border-slate-200 bg-white">
                {["+", "−"].map((c) => (
                  <div
                    key={c}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center text-lg text-slate-600 transition-colors hover:bg-slate-50"
                    style={{ borderBottom: c === "+" ? "1px solid #E2E8F0" : "none" }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}