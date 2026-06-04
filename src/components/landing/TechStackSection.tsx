const techs = [
  { name: "Next.js",      color: "#0F766E" },
  { name: "Hono",         color: "#EA580C" },
  { name: "Bun",          color: "#F59E0B" },
  { name: "PostgreSQL",   color: "#0F766E" },
  { name: "Tailwind CSS", color: "#14B8A6" },
  { name: "Expo",         color: "#0F766E" },
  { name: "Cloudinary",   color: "#14B8A6" },
  { name: "JWT",          color: "#F59E0B" },
];

export default function TechStackSection() {
  return (
    <section
      className="px-[5%] py-20"
      style={{
        background: "#F8F6F0",
        borderTop: "1px solid #E8E4D9",
        borderBottom: "1px solid #E8E4D9",
      }}
    >
      <div className="mx-auto max-w-6xl text-center">
        <p
          className="mb-8 text-[11px] font-bold uppercase tracking-[2px]"
          style={{ color: "#9CA3AF" }}
        >
          Dibangun dengan teknologi modern
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {techs.map((t, i) => (
            <div
              key={t.name}
              data-aos="fade-up"
              data-aos-delay={i * 50}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "#FCFBF8",
                border: "1px solid #E8E4D9",
                color: "#111827",
                boxShadow: "0 1px 3px rgba(15,118,110,0.04)",
              }}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: t.color }}
              />
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}