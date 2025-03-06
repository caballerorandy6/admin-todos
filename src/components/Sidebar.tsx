import Image from "next/image";
import Link from "next/link";
import SidebarItem, {
  SidebarItem as SidebarItemType,
} from "@/components/SidebarItem";
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
} from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const menuItem: SidebarItemType[] = [
  {
    href: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
    title: "Dashboard",
  },
  {
    href: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
    title: "Rest Todos",
  },
  {
    href: "/dashboard/server-todos",
    icon: <IoListOutline size={30} />,
    title: "Server Actions",
  },
];

const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="">
          {/* TODO: Next/Link hacia dashboard */}
          <Link href="#" title="home">
            {/* Next/Image */}
            <Image
              src="/thailus.webp"
              width={150}
              height={150}
              className="w-auto h-auto"
              alt="tailus logo"
              priority
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src="/background.webp"
            width={100}
            height={100}
            alt=""
            priority
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            Randy Caballero
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* TODO: src/components <SidebarItem /> */}
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
          {menuItem.map((item) => (
            <SidebarItem key={item.title} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
