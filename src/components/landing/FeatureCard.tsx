import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  bg?: string;
}

export default function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <>
      <style jsx>{`
        .feature-card {
          background: #FCFBF8;
          border: 1px solid #E8E4D9;
          box-shadow: 0 1px 3px rgba(15, 118, 110, 0.05);
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(15, 118, 110, 0.12);
          border-color: #5EEAD4;
        }
        .feature-card:hover .glow {
          opacity: 1;
        }
        .feature-card:hover .accent-line {
          width: 100%;
        }
        .glow {
          position: absolute;
          top: -2rem;
          left: -2rem;
          height: 8rem;
          width: 8rem;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .accent-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          border-radius: 9999px;
          background: linear-gradient(90deg, #0F766E, #14B8A6, #F59E0B);
          transition: width 0.3s ease;
        }
      `}</style>

      <div className="feature-card relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6">
        <div className="glow" />

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: "#CCFBF1", color: "#0F766E" }}
        >
          {icon}
        </div>

        <div>
          <h3 className="mb-2 text-[16px] font-bold" style={{ color: "#111827" }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
            {desc}
          </p>
        </div>

        <div className="accent-line" />
      </div>
    </>
  );
}