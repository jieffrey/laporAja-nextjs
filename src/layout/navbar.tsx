"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { name: "Beranda", link: "#beranda" },
  { name: "Fitur", link: "#fitur" },
  { name: "Peta", link: "#peta" },
  { name: "Leaderboard", link: "#leaderboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scoped CSS for hover effects — no DOM manipulation, no re-render loop */}
      <style jsx>{`
        .nav-link {
          color: #374151;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          background: #CCFBF1;
          color: #0F766E;
        }
        .nav-login {
          border: 1.5px solid #E8E4D9;
          color: #0F766E;
          background: transparent;
          transition: all 0.2s ease;
        }
        .nav-login:hover {
          background: #CCFBF1;
          border-color: #5EEAD4;
        }
        .nav-register {
          background: linear-gradient(135deg, #0F766E, #14B8A6);
          box-shadow: 0 4px 14px rgba(15, 118, 110, 0.3);
          color: #fff;
          transition: all 0.2s ease;
        }
        .nav-register:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(15, 118, 110, 0.4);
        }
        .mobile-link {
          color: #374151;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .mobile-link:hover {
          background: #CCFBF1;
          color: #0F766E;
        }
      `}</style>

      <div
        className={`fixed top-0 right-0 left-0 z-50 flex justify-center px-4 transition-all duration-500 ${
          scrolled ? "pt-3" : "pt-4"
        }`}
      >
        <nav
          className="relative flex items-center justify-between overflow-hidden transition-all duration-500"
          style={{
            height: 64,
            ...(scrolled
              ? {
                  width: "min(90%, 820px)",
                  borderRadius: "9999px",
                  border: "1px solid #E8E4D9",
                  background: "rgba(252, 251, 248, 0.88)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  boxShadow: "0 4px 24px rgba(15, 118, 110, 0.10)",
                  padding: "0 24px",
                }
              : {
                  width: "100%",
                  maxWidth: "1152px",
                  background: "transparent",
                  padding: "0 20px",
                }),
          }}
        >
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[10px] text-base font-extrabold text-white transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
            >
              L
            </div>
            <span className="text-lg font-extrabold tracking-tight text-gray-900">
              LaporAja
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.link)}
                className="nav-link rounded-full px-4 py-2 text-sm font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
            <Link
              href="/auth/login"
              className="nav-login rounded-full px-5 py-2 text-sm font-semibold"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="nav-register rounded-full px-5 py-2 text-sm font-bold"
            >
              Daftar
            </Link>
          </div>

          <button
            className="flex flex-col items-center justify-center gap-1.5 p-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-0.5 w-6 rounded-full transition-all duration-300"
                style={{
                  background: "#0F766E",
                  transform:
                    i === 0 && mobileMenuOpen
                      ? "translateY(8px) rotate(45deg)"
                      : i === 2 && mobileMenuOpen
                        ? "translateY(-8px) rotate(-45deg)"
                        : "none",
                  opacity: i === 1 && mobileMenuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ background: "rgba(15, 118, 110, 0.08)" }}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 right-4 left-4 p-6 shadow-2xl transition-all duration-300 ${
            mobileMenuOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-4 scale-95 opacity-0"
          }`}
          style={{
            borderRadius: "24px",
            border: "1px solid #E8E4D9",
            background: "rgba(252, 251, 248, 0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.link)}
                className="mobile-link w-full rounded-2xl px-5 py-3.5 text-left text-base font-semibold"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div
            className="mt-4 flex flex-col gap-3 pt-4"
            style={{ borderTop: "1px solid #E8E4D9" }}
          >
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-2xl px-5 py-3 text-center text-base font-semibold"
              style={{ border: "1.5px solid #E8E4D9", color: "#0F766E" }}
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-2xl px-5 py-3 text-center text-base font-bold text-white"
              style={{ background: "linear-gradient(135deg, #0F766E, #14B8A6)" }}
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}