\"use client\";

import Link from \"next/link\";
import { usePathname } from \"next/navigation\";
import { USER_ROLE_LABELS } from \"@/lib/constant\";
import type { UserRole } from \"@/lib/constant\";

type SidebarProps = {
  role: UserRole;
};

const userMenu = [
  { href: \"/user\", label: \"Dashboard\" },
  { href: \"/user/laporan\", label: \"Laporan Saya\" },
  { href: \"/user/laporan/buat\", label: \"Buat Laporan\" },
  { href: \"/user/profile\", label: \"Profil\" },
];

const adminMenu = [
  { href: \"/admin\", label: \"Dashboard\" },
  { href: \"/admin/laporan\", label: \"Kelola Laporan\" },
];

const superAdminExtra = [
  { href: \"/admin/users\", label: \"Kelola Pengguna\" },
];

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const isUser = role === \"user\";
  const isAdmin = role === \"admin\" || role === \"superadmin\";

  const items = isUser
    ? userMenu
    : [...adminMenu, ...(role === \"superadmin\" ? superAdminExtra : [])];

  return (
    <aside className=\"hidden h-full w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white/80 px-4 py-6 shadow-sm lg:flex\">
      <div className=\"mb-8\">
        <Link href=\"/\" className=\"flex items-center gap-2.5\">
          <div className=\"flex h-9 w-9 items-center justify-center rounded-[10px] bg-blue-600 text-sm font-extrabold text-white\">
            L
          </div>
          <div className=\"flex flex-col\">
            <span className=\"text-[15px] font-extrabold tracking-tight text-slate-900\">
              LaporAja
            </span>
            <span className=\"text-[11px] font-medium text-slate-400\">
              {isUser ? \"Panel Warga\" : USER_ROLE_LABELS[role] ?? \"Admin\"}
            </span>
          </div>
        </Link>
      </div>

      <nav className=\"space-y-1 text-[14px]\">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                \"flex items-center gap-2 rounded-full px-3 py-2 font-medium transition-colors \" +
                (active
                  ? \"bg-blue-600 text-white\"
                  : \"text-slate-600 hover:bg-slate-100 hover:text-slate-900\")
              }
            >
              <span className=\"truncate\">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

