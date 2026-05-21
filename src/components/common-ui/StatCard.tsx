interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  color: string;
}

export default function StatCard({ icon, value, label, color }: StatCardProps) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-[14px] text-[22px]"
        style={{ background: `${color}18` }}
      >
        {icon}
      </div>
      <div>
        <div className="text-[26px] font-extrabold tracking-tight text-slate-900">
          {value}
        </div>
        <div className="mt-0.5 text-[13px] text-slate-500">{label}</div>
      </div>
    </div>
  );
}