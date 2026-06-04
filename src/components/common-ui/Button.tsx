import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "dark";
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
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 active:scale-[0.98]";

  const variants = {
    primary:
      "text-white hover:-translate-y-0.5",
    outline:
      "bg-transparent hover:bg-white/10",
    ghost:
      "bg-transparent hover:bg-[#CCFBF1]",
    dark:
      "text-white hover:opacity-90",
  };

  const variantStyles = {
    primary: {
      background: "linear-gradient(135deg, #0F766E, #14B8A6)",
      boxShadow: "0 4px 14px rgba(15,118,110,0.30)",
    },
    outline: {
      border: "1.5px solid rgba(255,255,255,0.40)",
      color: "#fff",
    },
    ghost: {
      border: "1.5px solid #E8E4D9",
      color: "#0F766E",
    },
    dark: {
      background: "#115E59",
    },
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
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </button>
  );
}