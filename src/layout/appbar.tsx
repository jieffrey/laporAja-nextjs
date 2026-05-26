\"use client\";

import { useState } from \"react\";
import Link from \"next/link\";
import { usePathname } from \"next/navigation\";
import type { Session } from \"next-auth\";
import { USER_ROLE_LABELS } from \"@/lib/constant\";

type AppbarProps = {
  session: Session;
};

export default function Appbar({ session }: AppbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const name = session.user.name ?? \"Pengguna\";
  const role = session.user.role;

  const isUser = role === \"user\";

  const title =
    pathname === \"/user\"
      ? \"Dashboard\"
      : pathname.startsWith(\"/user/laporan\")
        ? \"Laporan Saya\"
        : pathname.startsWith(\"/user/profile\")
          ? \"Profil\"
          : pathname.startsWith(\"/admin/users\")
            ? \"Kelola Pengguna\"
            : pathname.startsWith(\"/admin/laporan\")
              ? \"Kelola Laporan\"
              : \"Dashboard\";

  return (
    <header className=\"sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl\">
      <div className=\"mx-auto flex h-14 max-w-6xl items-center justify-between px-4\">
        <div className=\"flex items-center gap-2\">
          <button
            className=\"flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 lg:hidden\"
            onClick={() => setOpen((v) => !v)}
            aria-label=\"Toggle sidebar\"
          >
            <span className=\"h-[2px] w-4 rounded-full bg-slate-500\" />
          </button>
          <div className=\"flex flex-col\">
            <span className=\"text-[14px] font-semibold text-slate-900\">
              {title}
            </span>
            <span className=\"text-[11px] text-slate-400\">
              {isUser ? \"Panel Warga\" : USER_ROLE_LABELS[role] ?? \"Admin\"}
            </span>
          </div>
        </div>

        <div className=\"flex items-center gap-3\">
          <div className=\"hidden text-[13px] text-slate-500 sm:block\">
            Hai,{" "}
            <span className=\"font-semibold text-slate-900 truncate max-w-[160px] inline-block align-bottom\">
              {name}
            </span>
          </div>
          <Link
            href=\"/user/profile\"
            className=\"flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[13px] font-bold text-white\"
          >
            {name.charAt(0).toUpperCase()}
          </Link>
        </div>
      </div>

      {/* Placeholder for mobile drawer (bisa diisi nanti) */}
      {open && (
        <div className=\"border-t border-slate-200 bg-white px-4 py-2 text-[13px] text-slate-500 lg:hidden\">
          Menu akan dibuat setelah halaman lain siap.
        </div>
      )}
    </header>
  );
}

