import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { POINTS_CONFIG } from "@/lib/constant";

// mock data
const MOCK_STATS = { total: 0, resolved: 0, inProgress: 0, points: 0 };

const RECENT_ACTIVITY = [
  { icon: "📋", text: "Belum ada laporan", sub: "Mulai buat laporan pertamamu", time: "" },
];

export default async function UserDashboardPage() {
  const session = await getServerSession(authOptions);
  const name = session?.user.name?.split(" ")[0] ?? "Pengguna";

  const stats = [
    { icon: "📋", label: "Total Laporan",   value: MOCK_STATS.total,      color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100" },
    { icon: "✅", label: "Laporan Selesai", value: MOCK_STATS.resolved,   color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { icon: "⏳", label: "Sedang Diproses", value: MOCK_STATS.inProgress, color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100" },
    { icon: "⭐", label: "Poin Kamu",       value: MOCK_STATS.points,     color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-100" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-5 text-white shadow-lg shadow-blue-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-200 text-[13px] font-medium">Selamat datang kembali 👋</p>
            <h1 className="mt-0.5 text-[22px] font-extrabold tracking-tight">{name}</h1>
            <p className="mt-2 text-blue-100 text-[13px] max-w-md">
              Pantau laporan lingkunganmu, lihat progres penyelesaian, dan kumpulkan poin kontribusi.
            </p>
          </div>
          <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">
            🏙️
          </div>
        </div>

        {/* Points info */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 w-fit">
          <span className="text-lg">⭐</span>
          <span className="text-[13px] font-semibold">{MOCK_STATS.points} poin terkumpul</span>
          <span className="text-blue-200 text-[12px]">• +{POINTS_CONFIG.RESOLVED} per laporan selesai</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className={`rounded-2xl border ${s.border} bg-white p-4 shadow-sm`}>
            <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${s.bg} text-lg`}>
              {s.icon}
            </div>
            <p className={`text-[26px] font-extrabold tracking-tight ${s.color}`}>{s.value}</p>
            <p className="mt-0.5 text-[12px] text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 sm:grid-cols-2">
        <a href="/user/laporan/buat" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl group-hover:bg-blue-100 transition-colors">✚</div>
          <div>
            <p className="text-[14px] font-semibold text-slate-900">Buat Laporan Baru</p>
            <p className="text-[12px] text-slate-400">Laporkan masalah di sekitarmu</p>
          </div>
          <span className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors">→</span>
        </a>
        <a href="/user/laporan" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xl group-hover:bg-slate-100 transition-colors">📋</div>
          <div>
            <p className="text-[14px] font-semibold text-slate-900">Lihat Laporan Saya</p>
            <p className="text-[12px] text-slate-400">Pantau status semua laporan</p>
          </div>
          <span className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors">→</span>
        </a>
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <p className="text-[14px] font-bold text-slate-900">Aktivitas Terbaru</p>
          <a href="/user/laporan" className="text-[12px] text-blue-600 hover:underline">Lihat semua</a>
        </div>
        <div className="divide-y divide-slate-50">
          {RECENT_ACTIVITY.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3.5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 text-sm">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-800 truncate">{item.text}</p>
                <p className="text-[11px] text-slate-400">{item.sub}</p>
              </div>
              {item.time && <span className="text-[11px] text-slate-400">{item.time}</span>}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}