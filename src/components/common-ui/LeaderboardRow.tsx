interface LeaderboardRowProps {
  rank: number;
  name: string;
  kelurahan: string;
  points: number;
  reports: number;
  badge: string;
  isFirst?: boolean;
}

export default function LeaderboardRow({
  rank,
  name,
  kelurahan,
  points,
  reports,
  badge,
  isFirst = false,
}: LeaderboardRowProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      data-aos="fade-right"
      data-aos-delay={rank * 80}
      className={`grid grid-cols-[50px_1fr_120px_80px] items-center gap-4 px-5 py-3.5 transition-colors ${
        isFirst ? "bg-amber-50" : "bg-white"
      } border-b border-slate-100 last:border-b-0 hover:bg-slate-50`}
    >
      <span className="text-xl">{badge}</span>
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
          style={{
            background: `hsl(${rank * 60}, 70%, 90%)`,
            color: `hsl(${rank * 60}, 60%, 35%)`,
          }}
        >
          {initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">{name}</div>
          <div className="text-xs text-slate-400">{reports} laporan</div>
        </div>
      </div>
      <span className="text-[13px] text-slate-500">{kelurahan}</span>
      <span className="text-base font-extrabold text-blue-700">
        {points.toLocaleString()}
      </span>
    </div>
  );
}