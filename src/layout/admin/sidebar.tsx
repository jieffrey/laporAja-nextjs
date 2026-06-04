"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { RiMapPin2Fill, RiLogoutBoxRLine, RiShieldFill } from "react-icons/ri"
import { USER_ROLE_LABELS } from "@/lib/constant"
import { adminMenus } from "@/hooks/AdminMenus"
import type { UserRole } from "@/lib/constant"

type Props = {
  role: UserRole
  name: string
}

// Accent per role (10% color usage)
const ACCENT: Record<UserRole, { active: string; dot: string; avatar: string; label: string }> = {
  user:       { active: "bg-teal-500/15 text-teal-300",   dot: "bg-teal-400",   avatar: "bg-teal-500",   label: "text-teal-400"   },
  admin:      { active: "bg-blue-500/20 text-blue-200",   dot: "bg-blue-300",   avatar: "bg-blue-600",   label: "text-blue-300"   },
  superadmin: { active: "bg-violet-500/15 text-violet-300", dot: "bg-violet-400", avatar: "bg-violet-600", label: "text-violet-300" },
}

export default function AdminSidebar({ role, name }: Props) {
  const pathname = usePathname()
  const ac       = ACCENT[role]
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

  const visibleMenus = adminMenus.filter(m =>
    !m.roles || m.roles.includes(role)
  )

  const isActive = (href: string) => {
    if (pathname === href) return true
    if (href === "/admin")  return false
    return pathname.startsWith(href)
  }

  return (
    <aside className="hidden lg:flex h-screen w-[220px] shrink-0 flex-col sticky top-0 bg-[#0F172A] border-r border-slate-800">

      {/* Logo */}
      <div className="flex items-center gap-2.5 border-b border-slate-800 px-5 py-[18px]">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-900/50">
          <RiMapPin2Fill size={15} className="text-white" />
        </div>
        <div>
          <p className="text-[14px] font-extrabold tracking-tight text-white leading-none">
            LaporAja
          </p>
          <p className="mt-0.5 text-[10px] leading-none text-slate-500">
            {USER_ROLE_LABELS[role]}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="mb-2.5 px-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
          Menu
        </p>
        {visibleMenus.map(({ href, label, Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-[13px] font-medium transition-all ${
                active
                  ? ac.active
                  : "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {active && (
                <span className={`h-1.5 w-1.5 rounded-full ${ac.dot}`} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User + logout */}
      <div className="border-t border-slate-800 p-3">
        {/* Role badge */}
        <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-slate-800/60 px-3 py-1.5">
          <RiShieldFill size={12} className={ac.label} />
          <span className={`text-[11px] font-bold uppercase tracking-wider ${ac.label}`}>
            {USER_ROLE_LABELS[role]}
          </span>
        </div>

        {/* User row */}
        <div className="flex items-center gap-2.5 rounded-xl px-2.5 py-2">
          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${ac.avatar} text-[11px] font-bold text-white`}>
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-slate-200">{name}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12px] font-medium text-slate-500 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <RiLogoutBoxRLine size={14} />
          Keluar
        </button>
      </div>
    </aside>
  )
}