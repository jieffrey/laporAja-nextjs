"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { USER_ROLE_LABELS } from "@/lib/constant";
import type { UserRole } from "@/lib/constant";

type SidebarProps = {
  role: UserRole;
  name: string;
};

const userMenu = [
  { href: "/user",              label: "Dashboard",      icon: "⊞" },
  { href: "/user/laporan",      label: "Laporan Saya",   icon: "📋" },
  { href: "/user/laporan/buat", label: "Buat Laporan",   icon: "✚" },
  { href: "/user/profile",      label: "Profil",         icon: "◎" },
];

const adminMenu = [
  { href: "/admin",             label: "Dashboard",      icon: "⊞" },
  { href: "/admin/laporan",     label: "Kelola Laporan", icon: "📋" },
];

const superAdminExtra = [
  { href: "/admin/users",       label: "Kelola Pengguna", icon: "👥" },
];

export default function Sidebar({ role, name }: SidebarProps) {
  const pathname = usePathname();
  const isUser   = role === "user";

  const items = isUser
    ? userMenu
    : [...adminMenu, ...(role === "superadmin" ? superAdminExtra : [])];

  const isActive = (href: string) =>
    href === "/user" || href === "/admin"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <aside className="hidden lg:flex h-screen w-64 flex-shrink-0 flex-col sticky top-0 border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white shadow-sm shadow-blue-200 group-hover:bg-blue-700 transition-colors">
            L
          </div>
          <div>
            <p className="text-[14px] font-extrabold tracking-tight text-slate-900">LaporAja</p>
            <p className="text-[11px] text-slate-400">{isUser ? "Panel Warga" : USER_ROLE_LABELS[role]}</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {isUser ? "Menu" : "Manajemen"}
        </p>
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150
                ${active
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <span className="text-[15px] leading-none">{item.icon}</span>
              <span>{item.label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/60" />}
            </Link>
          );
        })}
      </nav>

      {/* User info + logout */}
      <div className="px-3 py-4 border-t border-slate-100">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-[12px] font-bold text-white">
            {name?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-slate-800">{name}</p>
            <p className="text-[11px] text-slate-400">{USER_ROLE_LABELS[role]}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-1.5 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <span className="text-[14px]">⏻</span>
          Keluar
        </button>
      </div>
    </aside>
  );
}