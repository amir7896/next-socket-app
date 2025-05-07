"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import { menuItems } from "@/constants/index";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // Check screen size on mount and on resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize(); // Check initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubMenuToggle = (title: string) => {
    setOpenSubMenu((prev) => (prev === title ? null : title));
  };

  const handleLinkClick = (hasSubItems: boolean) => {
    if (isSmallScreen && !hasSubItems) {
      closeSidebar(); // Only close sidebar on small screens if there are no sub-items
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 w-64 bg-white text-gray-700 h-screen shadow-lg transform transition-transform z-30
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:shadow-none`}
    >
      {/* Top Fixed Section: Logo + Close Button */}
      <div className="sticky top-0 bg-white z-40">
        <button
          className="absolute top-5 right-4 lg:hidden px-2 py-1 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={closeSidebar}
        >
          ✕
        </button>

        <div className="flex items-center justify-center mt-8 mb-6">
          <Image
            src="https://modernize-nextjs-free.vercel.app/images/logos/dark-logo.svg"
            alt="Company Logo"
            width={140}
            height={106}
          />
        </div>
      </div>

      {/* Scrollable Menu Section */}
      <div className="overflow-y-auto h-[calc(100vh-160px)] px-6 pb-6">
        {" "}
        {/* Adjust height if needed */}
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.title} className="flex flex-col">
              <Link href={item.link || ""} passHref>
                <div
                  className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                    item.link === pathname
                      ? "bg-gray-100 font-semibold text-gray-600"
                      : "hover:bg-gray-100"
                  } ${item.subItems ? "justify-between" : ""}`}
                  onClick={() => {
                    if (item.subItems) {
                      handleSubMenuToggle(item.title);
                    } else {
                      handleLinkClick(false);
                    }
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={`${item.title} Icon`}
                    width={20}
                    height={20}
                  />
                  <span className="ml-3">{item.title}</span>

                  {item.subItems && (
                    <span className="ml-auto text-gray-500">
                      {openSubMenu === item.title ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </Link>

              {item.subItems && openSubMenu === item.title && (
                <ul className="ml-6 mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.title}>
                      <Link href={subItem.link} passHref>
                        <div
                          className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                            subItem.link === pathname
                              ? "bg-gray-100 font-semibold text-gray-600"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleLinkClick(false)}
                        >
                          <Image
                            src={subItem.icon}
                            alt={`${subItem.title} Icon`}
                            width={20}
                            height={20}
                          />
                          <span className="ml-3">{subItem.title}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
