interface ProgressBarProps {
  label: string;
  percentage: number;
  color: string;
}

export default function ProgressBar({ label, percentage, color }: ProgressBarProps) {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <span className="text-xs text-slate-400">{percentage}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-200">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, background: color }}
        />
      </div>
    </div>
  );
}