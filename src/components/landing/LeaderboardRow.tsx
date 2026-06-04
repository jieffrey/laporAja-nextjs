import { Trophy, Medal, Award, Star } from "lucide-react";
import { ReactNode } from "react";

interface LeaderboardRowProps {
  rank: number;
  name: string;
  kelurahan: string;
  points: number;
  reports: number;
  badge?: string; // legacy prop, no longer used (Lucide based on rank now)
  isFirst?: boolean;
}

function rankIcon(rank: number): ReactNode {
  if (rank === 1) return <Trophy size={16} style={{ color: "#F59E0B" }} />;
  if (rank === 2) return <Medal size={16} style={{ color: "#9CA3AF" }} />;
  if (rank === 3) return <Award size={16} style={{ color: "#D97706" }} />;
  return <Star size={14} style={{ color: "#9CA3AF" }} />;
}

export default function LeaderboardRow({
  rank,
  name,
  kelurahan,
  points,
  reports,
  isFirst = false,
}: LeaderboardRowProps) {
  return (
    <div
      className="grid grid-cols-[50px_1fr_120px_80px] items-center gap-4 px-5 py-4 transition-colors"
      style={{
        borderBottom: "1px solid #F1EDE2",
        background: isFirst
          ? "linear-gradient(90deg, rgba(245,158,11,0.10) 0%, rgba(245,158,11,0) 70%)"
          : "transparent",
      }}
    >
      {/* Rank */}
      <div className="flex items-center gap-2">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[12px] font-bold"
          style={
            isFirst
              ? {
                  background: "linear-gradient(135deg, #F59E0B, #EA580C)",
                  color: "#fff",
                  boxShadow: "0 4px 10px rgba(245,158,11,0.30)",
                }
              : {
                  background: "#F1EDE2",
                  color: "#5F5E5A",
                }
          }
        >
          {rank}
        </div>
      </div>

      {/* Name + reports */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
          style={{
            background: isFirst
              ? "linear-gradient(135deg, #0F766E, #14B8A6)"
              : "#CCFBF1",
            color: isFirst ? "#fff" : "#0F766E",
          }}
        >
          {name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className="truncate text-sm font-bold"
              style={{ color: "#111827" }}
            >
              {name}
            </span>
            {rankIcon(rank)}
          </div>
          <div className="text-[12px]" style={{ color: "#9CA3AF" }}>
            {reports} laporan
          </div>
        </div>
      </div>

      {/* Kelurahan */}
      <span className="text-[13px] truncate" style={{ color: "#6B7280" }}>
        {kelurahan}
      </span>

      {/* Points */}
      <div className="text-right">
        <div
          className="text-[15px] font-extrabold"
          style={{ color: isFirst ? "#F59E0B" : "#0F766E" }}
        >
          {points.toLocaleString("id-ID")}
        </div>
        <div className="text-[10px] uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
          poin
        </div>
      </div>
    </div>
  );
}