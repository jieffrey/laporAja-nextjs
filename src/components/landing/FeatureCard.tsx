interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  bg: string;
}

export default function FeatureCard({ icon, title, desc, bg }: FeatureCardProps) {
  return (
    <div
      data-aos="fade-up"
      className="group cursor-default rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
    >
      <div
        className="mb-4.5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] text-2xl"
        style={{ background: bg }}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-[17px] font-bold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
    </div>
  );
}