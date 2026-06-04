import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                // 60% — Surface
                surface: {
                    warm: "#FCFBF8",
                    cream: "#F8F6F0",
                    sand: "#F1EDE2",
                    border: "#E8E4D9",
                },
                // 30% — Emerald/Teal
                brand: {
                    50: "#CCFBF1",
                    100: "#5EEAD4",
                    200: "#2DD4BF",
                    DEFAULT: "#14B8A6",
                    600: "#0F766E",
                    700: "#115E59",
                    800: "#065F46",
                },
                // 10% — Amber/Orange
                accent: {
                    50: "#FEF3C7",
                    100: "#FCD34D",
                    DEFAULT: "#F59E0B",
                    600: "#D97706",
                    orange: "#EA580C",
                },
                // Semantic Status
                status: {
                    waiting: { bg: "#F1EDE2", text: "#5F5E5A" },
                    received: { bg: "#DBEAFE", text: "#1E40AF" },
                    process: { bg: "#FEF3C7", text: "#92400E" },
                    done: { bg: "#D1FAE5", text: "#065F46" },
                    rejected: { bg: "#FEE2E2", text: "#991B1B" },
                },
            },
            fontFamily: {
                sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
                display: ["Poppins", "Inter", "sans-serif"],
            },
            fontSize: {
                page: ["32px", { lineHeight: "1.2", fontWeight: "500" }],
                section: ["22px", { lineHeight: "1.3", fontWeight: "500" }],
                card: ["17px", { lineHeight: "1.4", fontWeight: "500" }],
                body: ["15px", { lineHeight: "1.7", fontWeight: "400" }],
                caption: ["13px", { lineHeight: "1.5", fontWeight: "400" }],
                label: [
                    "11px",
                    { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.07em" },
                ],
            },
            borderRadius: {
                sm: "4px",
                md: "8px",
                lg: "12px",
                xl: "16px",
                "2xl": "24px",
            },
            boxShadow: {
                card: "0 1px 3px rgba(15,118,110,0.06), 0 1px 2px rgba(15,118,110,0.04)",
                lifted:
                    "0 4px 12px rgba(15,118,110,0.10), 0 2px 4px rgba(15,118,110,0.06)",
                modal: "0 20px 60px rgba(15,118,110,0.15)",
            },
            backgroundImage: {
                "brand-hero":
                    "linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #F59E0B 100%)",
                "brand-sidebar": "linear-gradient(180deg, #115E59 0%, #0F766E 100%)",
                "brand-accent": "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)",
                "brand-teal": "linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%)",
                "page-bg":
                    "linear-gradient(160deg, #CCFBF1 0%, #F8F6F0 60%, #FEF3C7 100%)",
                "brand-success": "linear-gradient(135deg, #0F766E 0%, #065F46 100%)",
            },
        },
    },
    plugins: [],
};

export default config;
