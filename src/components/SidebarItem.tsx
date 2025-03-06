"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarItem {
  href: string;
  icon: React.ReactNode;
  title: string;
}

const SidebarItem = ({ href, icon, title }: SidebarItem) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md transition-colors hover:text-white  hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 ${
          pathname === href
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : ""
        }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
