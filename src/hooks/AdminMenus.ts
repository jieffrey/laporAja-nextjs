import {
  RiLayoutGridFill,
  RiFileList3Fill,
  RiTeamFill,
  RiTrophyFill,
  RiUserFill,
  RiAddCircleFill,
  RiAccountCircleFill,
  RiCompassFill,
  RiMapPin2Fill,
} from "react-icons/ri";
import type { IconType } from "react-icons";
import type { UserRole } from "@/lib/constant";

export type MenuItem = {
  label: string;
  href: string;
  Icon: IconType;
  roles?: UserRole[];
};

export const adminMenus: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    Icon: RiLayoutGridFill,
  },
  {
    label: "Kelola Laporan",
    href: "/admin/laporan",
    Icon: RiFileList3Fill,
  },
  {
    label: "Kelola Pengguna",
    href: "/admin/users",
    Icon: RiTeamFill,
    roles: ["superadmin", "admin"],
  },
  {
    label: "Poin & Reward",
    href: "/admin/points",
    Icon: RiTrophyFill,
  },
  {
    label: "Profil",
    href: "/admin/profile",
    Icon: RiAccountCircleFill,
  },
];

export const userMenus: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/user",
    Icon: RiLayoutGridFill,
  },
  {
    label: "Jelajahi",
    href: "/user/explore",
    Icon: RiCompassFill,
  },
  {
    label: "Peta Laporan",
    href: "/user/peta",
    Icon: RiMapPin2Fill,
  },
  {
    label: "Leaderboard",
    href: "/user/leaderboard",
    Icon: RiTrophyFill,
  },
  {
    label: "Laporan Saya",
    href: "/user/laporan",
    Icon: RiFileList3Fill,
  },
  {
    label: "Buat Laporan",
    href: "/user/laporan/buat",
    Icon: RiAddCircleFill,
  },
  {
    label: "Profil",
    href: "/user/profile",
    Icon: RiUserFill,
  },
];

export function getPageTitle(pathname: string): string {
  const all = [...adminMenus, ...userMenus];
  // exact match dulu
  const exact = all.find((m) => m.href === pathname);
  if (exact) return exact.label;
  // prefix match, paling panjang menang
  const prefix = all
    .filter(
      (m) =>
        m.href !== "/admin" &&
        m.href !== "/user" &&
        pathname.startsWith(m.href),
    )
    .sort((a, b) => b.href.length - a.href.length)[0];
  return prefix?.label ?? "Dashboard";
}
