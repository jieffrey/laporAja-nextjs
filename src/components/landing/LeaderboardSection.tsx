import SectionTag from "@/components/landing/SectionTag";
import LeaderboardRow from "@/components/landing/LeaderboardRow";

const leaderboard = [
  { rank: 1, name: "Budi Santoso", kelurahan: "Menteng", points: 1240, reports: 34, badge: "🏆" },
  { rank: 2, name: "Siti Rahayu", kelurahan: "Kebayoran", points: 1085, reports: 28, badge: "🥈" },
  { rank: 3, name: "Ahmad Fauzi", kelurahan: "Cempaka Putih", points: 960, reports: 25, badge: "🥉" },
  { rank: 4, name: "Dewi Lestari", kelurahan: "Tebet", points: 820, reports: 21, badge: "⭐" },
  { rank: 5, name: "Rizky Pratama", kelurahan: "Mampang", points: 745, reports: 19, badge: "⭐" },
];

const pointRules = [
  { icon: "📋", action: "Buat laporan", pts: "+10 poin" },
  { icon: "✅", action: "Laporan diterima", pts: "+25 poin" },
  { icon: "🔥", action: "Kontribusi aktif", pts: "+5 poin" },
];

export default function LeaderboardSection() {
  return (
    <section id="leaderboard" className="bg-white px-[5%] py-25">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <SectionTag icon="🏆" text="Leaderboard" />
          <h2 className="text-[40px] font-extrabold tracking-tight text-slate-900">
            Top Warga Aktif
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500">
            Raih poin setiap laporan diterima dan jadilah kontributor terbaik di kotamu.
          </p>
        </div>

        {/* Points Explainer */}
        <div className="mb-9 grid gap-3.5 md:grid-cols-3">
          {pointRules.map((p, i) => (
            <div
              key={p.action}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-slate-50 p-4"
            >
              <span className="text-[22px]">{p.icon}</span>
              <div>
                <div className="text-[13px] text-slate-600">{p.action}</div>
                <div className="text-[15px] font-bold text-blue-700">{p.pts}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
          {/* Header */}
          <div className="grid grid-cols-[50px_1fr_120px_80px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3">
            {["#", "Warga", "Kelurahan", "Poin"].map((h) => (
              <span
                key={h}
                className="text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                {h}
              </span>
            ))}
          </div>

          {leaderboard.map((user) => (
            <LeaderboardRow
              key={user.rank}
              rank={user.rank}
              name={user.name}
              kelurahan={user.kelurahan}
              points={user.points}
              reports={user.reports}
              badge={user.badge}
              isFirst={user.rank === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}