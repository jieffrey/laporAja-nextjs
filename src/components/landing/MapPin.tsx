interface MapPinProps {
  x: number;
  y: number;
  label: string;
  color: string;
}

export default function MapPin({ x, y, label, color }: MapPinProps) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 hover:scale-[1.3]"
      style={{ left: `${x}%`, top: `${y}%` }}
      title={label}
    >
      <div
        className="h-5 w-5 rounded-t-full rounded-br-full border-2 border-white shadow-md"
        style={{
          background: color,
          transform: "rotate(-45deg)",
          boxShadow: `0 2px 8px ${color}60`,
        }}
      />
    </div>
  );
}