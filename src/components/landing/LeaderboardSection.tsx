import { Trophy, ClipboardList, CheckCircle2, Flame } from "lucide-react";
import SectionTag from "@/components/landing/SectionTag";
import LeaderboardRow from "@/components/landing/LeaderboardRow";

const leaderboard = [
  { rank: 1, name: "Budi Santoso",   kelurahan: "Menteng",         points: 1240, reports: 34, badge: "" },
  { rank: 2, name: "Siti Rahayu",    kelurahan: "Kebayoran",       points: 1085, reports: 28, badge: "" },
  { rank: 3, name: "Ahmad Fauzi",    kelurahan: "Cempaka Putih",   points: 960,  reports: 25, badge: "" },
  { rank: 4, name: "Dewi Lestari",   kelurahan: "Tebet",           points: 820,  reports: 21, badge: "" },
  { rank: 5, name: "Rizky Pratama",  kelurahan: "Mampang",         points: 745,  reports: 19, badge: "" },
];

const pointRules = [
  { icon: <ClipboardList size={20} />, action: "Buat laporan",        pts: "+10 poin", color: "#0F766E" },
  { icon: <CheckCircle2 size={20} />,  action: "Laporan diterima",    pts: "+25 poin", color: "#F59E0B" },
  { icon: <Flame size={20} />,         action: "Kontribusi aktif",    pts: "+5 poin",  color: "#EA580C" },
];

export default function LeaderboardSection() {
  return (
    <section
      id="leaderboard"
      className="px-[5%] py-24"
      style={{ background: "#FCFBF8" }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <SectionTag text="Leaderboard" />
          <h2
            className="mt-4 text-[38px] font-extrabold leading-tight tracking-tight md:text-[42px]"
            style={{ color: "#111827" }}
          >
            Top{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Warga Aktif
            </span>
          </h2>
          <p
            className="mx-auto mt-3 max-w-lg text-base leading-relaxed"
            style={{ color: "#6B7280" }}
          >
            Raih poin setiap laporan diterima dan jadilah kontributor terbaik di kotamu.
          </p>
        </div>

        {/* Point rules */}
        <div className="mb-8 grid gap-3 md:grid-cols-3">
          {pointRules.map((p, i) => (
            <div
              key={p.action}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="flex items-center gap-3 rounded-2xl p-4"
              style={{
                background: "#F8F6F0",
                border: "1px solid #E8E4D9",
              }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "#FCFBF8",
                  color: p.color,
                  border: `1px solid ${p.color}30`,
                }}
              >
                {p.icon}
              </div>
              <div>
                <div className="text-[13px]" style={{ color: "#6B7280" }}>
                  {p.action}
                </div>
                <div
                  className="text-[15px] font-extrabold"
                  style={{ color: p.color }}
                >
                  {p.pts}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div
          data-aos="fade-up"
          className="overflow-hidden rounded-2xl"
          style={{
            background: "#FCFBF8",
            border: "1px solid #E8E4D9",
            boxShadow: "0 4px 20px rgba(15,118,110,0.06)",
          }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-[50px_1fr_120px_80px] gap-4 px-5 py-3"
            style={{
              background: "#F1EDE2",
              borderBottom: "1px solid #E8E4D9",
            }}
          >
            {["#", "Warga", "Kelurahan", "Poin"].map((h, i) => (
              <span
                key={h}
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{
                  color: "#6B7280",
                  textAlign: i === 3 ? "right" : "left",
                }}
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

          {/* Footer hint */}
          <div
            className="flex items-center justify-center gap-2 px-5 py-3 text-[12px]"
            style={{
              background: "#F8F6F0",
              color: "#6B7280",
            }}
          >
            <Trophy size={12} style={{ color: "#F59E0B" }} />
            Update setiap minggu — terus laporkan untuk naik peringkat
          </div>
        </div>
      </div>
    </section>
  );
}