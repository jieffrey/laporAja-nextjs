import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "rounded-full font-bold transition-all duration-200 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-white text-blue-700 shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-px",
    outline:
      "border border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-6 py-2.5 text-[15px]",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}