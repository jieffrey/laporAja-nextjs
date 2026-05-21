"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/common-ui/Button";

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
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          scrolled ? "pt-3" : "pt-4"
        }`}
      >
        <nav
          className={`relative flex items-center justify-between overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            scrolled
              ? "w-[min(90%,800px)] rounded-full border border-white/10 bg-blue-700/75 px-6 py-2.5 shadow-[0_8px_32px_rgba(29,78,216,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl"
              : "w-full max-w-6xl bg-transparent px-5 py-4"
          }`}
          style={{ height: 64 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white font-extrabold text-base text-blue-700 transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3">
              L
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              LaporAja
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.link)}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:text-white"
              >
                {item.name}
                <span className="absolute inset-0 rounded-full bg-white/0 transition-all duration-200 group-hover:bg-white/10" />
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <Button variant="outline" size="sm">
              Masuk
            </Button>
            <Button variant="primary" size="sm">
              Daftar
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex md:hidden flex-col items-center justify-center gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
                mobileMenuOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
                mobileMenuOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-blue-950/60 backdrop-blur-xl transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 rounded-3xl border border-white/10 bg-blue-800/90 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-5 opacity-0 scale-95"
          }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.link)}
                className="w-full rounded-2xl px-5 py-3.5 text-left text-base font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 30}ms` : "0ms",
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <Button variant="outline" className="w-full">
              Masuk
            </Button>
            <Button variant="primary" className="w-full text-blue-700">
              Daftar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}