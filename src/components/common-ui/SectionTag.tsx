interface SectionTagProps {
  icon: string;
  text: string;
}

export default function SectionTag({ icon, text }: SectionTagProps) {
  return (
    <div className="section-tag mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-[13px] font-semibold text-blue-700">
      <span>{icon}</span>
      {text}
    </div>
  );
}