const techs = [
  { name: "Hono", icon: "🔥" },
  { name: "Bun", icon: "🧅" },
  { name: "Next.js", icon: "▲" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Cloudinary", icon: "☁️" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "Expo", icon: "📱" },
  { name: "JWT", icon: "🔐" },
];

export default function TechStackSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 px-[5%] py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-8 text-xs font-bold uppercase tracking-[2px] text-slate-400">
          Dibangun dengan teknologi modern
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((t, i) => (
            <div
              key={t.name}
              data-aos="zoom-in"
              data-aos-delay={i * 50}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4.5 py-2.5 text-sm font-semibold text-slate-900"
            >
              <span className="text-base">{t.icon}</span>
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}