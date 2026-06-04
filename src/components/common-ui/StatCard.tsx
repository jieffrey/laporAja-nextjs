import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  trend?: string;
  color?: string;
}

export default function StatCard({
  icon,
  value,
  label,
  trend,
  color = "#0F766E",
}: StatCardProps) {
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-xl"
          style={{ color }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
        </div>
      </div>
      {trend ? (
        <p className="text-xs text-slate-500">{trend}</p>
      ) : null}
    </div>
  );
}
