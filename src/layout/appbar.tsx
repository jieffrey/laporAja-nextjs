"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { USER_ROLE_LABELS } from "@/lib/constant";

type AppbarProps = { session: Session };

const userMenu = [
  { href: "/user",              label: "Dashboard",      icon: "⊞" },
  { href: "/user/laporan",      label: "Laporan Saya",   icon: "📋" },
  { href: "/user/laporan/buat", label: "Buat Laporan",   icon: "✚" },
  { href: "/user/profile",      label: "Profil",         icon: "◎" },
];

const adminMenu = [
  { href: "/admin",             label: "Dashboard",      icon: "⊞" },
  { href: "/admin/laporan",     label: "Kelola Laporan", icon: "📋" },
  { href: "/admin/users",       label: "Kelola Pengguna",icon: "👥" },
];

function pageTitle(pathname: string): string {
  if (pathname === "/user")                     return "Dashboard";
  if (pathname.startsWith("/user/laporan/buat"))return "Buat Laporan";
  if (pathname.startsWith("/user/laporan"))     return "Laporan Saya";
  if (pathname.startsWith("/user/profile"))     return "Profil";
  if (pathname === "/admin")                    return "Dashboard";
  if (pathname.startsWith("/admin/users"))      return "Kelola Pengguna";
  if (pathname.startsWith("/admin/laporan"))    return "Kelola Laporan";
  return "Dashboard";
}

export default function Appbar({ session }: AppbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const name  = session.user.name ?? "Pengguna";
  const role  = session.user.role;
  const isUser = role === "user";
  const title = pageTitle(pathname);
  const menu  = isUser ? userMenu : adminMenu;

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4">

          {/* Left: hamburger + title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 lg:hidden hover:bg-slate-50 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`h-0.5 w-4.5 rounded-full bg-slate-600 transition-all duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-4.5 rounded-full bg-slate-600 transition-all duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-4.5 rounded-full bg-slate-600 transition-all duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>

            <div>
              <p className="text-[14px] font-bold text-slate-900">{title}</p>
              <p className="text-[11px] text-slate-400">{isUser ? "Panel Warga" : USER_ROLE_LABELS[role]}</p>
            </div>
          </div>

          {/* Right: name + avatar */}
          <div className="flex items-center gap-2.5">
            <span className="hidden text-[13px] text-slate-500 sm:block">
              Hai, <span className="font-semibold text-slate-800">{name.split(" ")[0]}</span>
            </span>
            <Link
              href={isUser ? "/user/profile" : "/admin"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[12px] font-bold text-white shadow-sm shadow-blue-200 hover:bg-blue-700 transition-colors"
            >
              {name.charAt(0).toUpperCase()}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" />
          <div
            className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header drawer */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white">L</div>
                <p className="text-[14px] font-extrabold text-slate-900">LaporAja</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
              {menu.map(item => {
                const active = item.href === (isUser ? "/user" : "/admin")
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all
                      ${active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                  >
                    <span className="text-[15px]">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* User + logout */}
            <div className="px-3 py-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[12px] font-bold text-white">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-800">{name}</p>
                  <p className="text-[11px] text-slate-400">{USER_ROLE_LABELS[role]}</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <span>⏻</span> Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}